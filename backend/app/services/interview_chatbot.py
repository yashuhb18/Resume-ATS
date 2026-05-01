"""
Virtual HR/interviewer chatbot grounded in resume and job-description context.

Provider order:
  1. OpenAI premium model, when OPENAI_API_KEY is configured.
  2. Strong local Ollama model, when OLLAMA_HOST/OLLAMA_MODEL is available.
  3. Deterministic local coach, always available.
"""
import os
import re
from typing import Any, Dict, List, Optional

import httpx

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None


class InterviewChatbot:
    """Context-grounded virtual interviewer and resume coach."""

    TECHNICAL_QUESTIONS = [
        "Walk me through the most relevant project on your resume for this role.",
        "Which technical skill in the JD is your strongest, and where have you used it?",
        "Tell me about a difficult bug or system issue you solved.",
    ]

    HR_QUESTIONS = [
        "Why are you interested in this role?",
        "What is one strength from your resume that the hiring team should remember?",
        "Tell me about a time you collaborated under pressure.",
    ]

    _GREETINGS = {
        "hi", "hii", "hiii", "hello", "hey", "yo", "hola", "sup",
        "ok", "okay", "k", "thanks", "thank you", "ty",
        "bye", "goodbye", "good morning", "good evening", "good afternoon",
    }
    _CAREER_TERMS = {
        "resume", "ats", "score", "job", "jd", "match", "fit", "skill",
        "skills", "interview", "hr", "shortlist", "project", "career",
        "roadmap", "learn", "improve", "gap", "gaps", "salary",
    }
    _last_provider = "local_fallback"

    def answer(
        self,
        message: str,
        resume: Optional[Dict[str, Any]],
        skills: Any,
        domain: Any,
        ats_analysis: Dict[str, Any],
        jd_text: str = "",
        comparison: Optional[Dict[str, Any]] = None,
        history: Optional[List[Dict[str, str]]] = None,
        mode: str = "coach",
    ) -> Dict[str, Any]:
        question = (message or "").strip()
        resume = resume or {"raw_text": "", "candidate": {}, "projects": [], "experience": {}, "education": []}
        resume_text = resume.get("raw_text", "") or ""
        comparison = comparison or {}
        history = history or []
        has_resume = bool(resume_text.strip())

        if self._is_trivial(question):
            return self._response(
                answer=self._greeting_reply(question, has_resume),
                mode=mode,
                skills=skills,
                comparison=comparison,
                ats_analysis=ats_analysis,
                has_resume=has_resume,
                evidence=[],
                provider="greeting_handler",
            )

        evidence = self._retrieve_evidence(question, resume_text, jd_text or "")
        intent = self._intent(question)

        llm_answer = self._answer_with_model(
            question=question,
            resume=resume,
            skills=skills,
            domain=domain,
            ats_analysis=ats_analysis,
            jd_text=jd_text or "",
            comparison=comparison,
            history=history,
            evidence=evidence,
            mode=mode,
        )

        if llm_answer:
            answer = llm_answer
            provider = self._last_provider
        else:
            answer = self._compose_answer(intent, resume, skills, domain, ats_analysis, comparison, evidence)
            provider = "local_fallback"

        return self._response(answer, mode, skills, comparison, ats_analysis, has_resume, evidence, provider)

    def _response(
        self,
        answer: str,
        mode: str,
        skills: Any,
        comparison: Dict[str, Any],
        ats_analysis: Dict[str, Any],
        has_resume: bool,
        evidence: List[str],
        provider: str,
    ) -> Dict[str, Any]:
        return {
            "success": True,
            "answer": answer,
            "mode": mode,
            "suggested_questions": self._suggested_questions(comparison, skills),
            "evidence": evidence[:4],
            "interviewer_score": self._interviewer_score(ats_analysis, comparison) if has_resume else None,
            "next_step": self._next_step(ats_analysis, comparison) if has_resume else "Upload a resume and optional JD to unlock grounded HR screening.",
            "provider": provider,
        }

    def _is_trivial(self, text: str) -> bool:
        cleaned = text.lower().strip().rstrip("!?.")
        if cleaned in self._GREETINGS:
            return True
        words = set(re.findall(r"[a-zA-Z]+", cleaned))
        return len(words) <= 2 and not (words & self._CAREER_TERMS) and not any(c.isdigit() for c in cleaned)

    def _greeting_reply(self, question: str, has_resume: bool) -> str:
        q = question.lower().strip()
        if q.startswith(("bye", "goodbye")):
            return "Goodbye. Best of luck with your interviews, and come back anytime for another prep round."
        if q.startswith(("thank", "ty")):
            return "You're welcome. I can also help with resume edits, JD fit, interview answers, or a prep roadmap."
        if has_resume:
            return (
                "Hello. I can see your resume is uploaded, so I can answer with your actual resume context. "
                "Ask for mock interview questions, JD fit, resume improvements, or a 30-day prep plan."
            )
        return (
            "Hi. I am your Virtual HR Interviewer and Career Coach. "
            "Upload a resume or job description for personalized advice, or ask a general career question now."
        )

    def _answer_with_model(
        self,
        question: str,
        resume: Dict[str, Any],
        skills: Any,
        domain: Any,
        ats_analysis: Dict[str, Any],
        jd_text: str,
        comparison: Dict[str, Any],
        history: List[Dict[str, str]],
        evidence: List[str],
        mode: str,
    ) -> Optional[str]:
        self._last_provider = "local_fallback"

        openai_answer = self._answer_with_openai(
            question, resume, skills, domain, ats_analysis, jd_text, comparison, history, evidence, mode
        )
        if openai_answer:
            return openai_answer

        ollama_answer = self._answer_with_ollama(
            question, resume, skills, domain, ats_analysis, jd_text, comparison, history, evidence
        )
        if ollama_answer:
            return ollama_answer

        return None

    def _answer_with_openai(
        self,
        question: str,
        resume: Dict[str, Any],
        skills: Any,
        domain: Any,
        ats_analysis: Dict[str, Any],
        jd_text: str,
        comparison: Dict[str, Any],
        history: List[Dict[str, str]],
        evidence: List[str],
        mode: str,
    ) -> Optional[str]:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key or OpenAI is None:
            return None

        client = OpenAI(api_key=api_key)
        model = os.getenv("OPENAI_MODEL", "gpt-5.2-chat-latest")
        context = self._build_context(resume, skills, domain, ats_analysis, jd_text, comparison, evidence)
        transcript = "\n".join(
            f"{item.get('role', 'user')}: {item.get('content', '')}"
            for item in history[-8:]
            if item.get("content")
        )

        instructions = (
            "You are ResQ's virtual HR interviewer, recruiter, resume strategist, and career coach, specializing in Electronics and Communication Engineering (ECE) and Electrical Engineering (EEE). "
            "Be warm, direct, and specific. Ground advice in the resume, JD, ATS score, skills, "
            "layout/readability signals, and retrieved evidence. Never invent companies, metrics, "
            "projects, certifications, or experience. If evidence is missing, say exactly what is missing. "
            "For mock interviews, ask one realistic question at a time and explain what a strong answer proves. "
            "For resume advice, give concrete rewrites, metrics to add, and keywords to include only when truthful. "
            "Provide clear ECE career roadmaps, certification recommendations, and placement preparation strategies when asked. "
            "Keep the answer concise, but go deeper when the user asks for a plan or analysis."
        )
        prompt = (
            f"Mode: {mode}\n\n"
            f"Conversation history:\n{transcript or 'Start of conversation.'}\n\n"
            f"Grounding context:\n{context}\n\n"
            f"User question:\n{question}\n\n"
            "Write the final assistant reply only."
        )

        # Prefer the modern Responses API for newer models, then fall back to
        # Chat Completions for older SDK/model combinations.
        try:
            if hasattr(client, "responses"):
                response = client.responses.create(
                    model=model,
                    instructions=instructions,
                    input=prompt,
                    max_output_tokens=1300,
                )
                answer = getattr(response, "output_text", "") or ""
                if answer.strip():
                    self._last_provider = f"openai/{model}"
                    return self._clean_model_output(answer.strip())
        except Exception as exc:
            print(f"OpenAI Responses chatbot fallback: {exc}")

        try:
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": instructions},
                    {"role": "user", "content": prompt},
                ],
                max_tokens=1300,
            )
            answer = (response.choices[0].message.content or "").strip()
            if answer:
                self._last_provider = f"openai/{model}"
                return self._clean_model_output(answer)
        except Exception as exc:
            print(f"OpenAI interview chatbot fallback: {exc}")
        return None

    def _answer_with_ollama(
        self,
        question: str,
        resume: Dict[str, Any],
        skills: Any,
        domain: Any,
        ats_analysis: Dict[str, Any],
        jd_text: str,
        comparison: Dict[str, Any],
        history: List[Dict[str, str]],
        evidence: List[str],
    ) -> Optional[str]:
        ollama_host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        ollama_model = os.getenv("OLLAMA_MODEL", "llama3.1:8b")

        try:
            tags_resp = httpx.get(f"{ollama_host}/api/tags", timeout=1.5)
            tags_resp.raise_for_status()
        except Exception:
            return None

        try:
            available_names = [m.get("name", "") for m in tags_resp.json().get("models", [])]
            available_bases = [name.split(":")[0] for name in available_names]
            if ollama_model.split(":")[0] not in available_bases:
                if available_names:
                    ollama_model = available_names[0]
                else:
                    return None
        except Exception:
            pass

        candidate = resume.get("candidate", {})
        candidate_dict = candidate.dict() if hasattr(candidate, "dict") else candidate
        name = candidate_dict.get("name") or "the candidate"
        domain_name = getattr(domain, "primary", "unknown domain")
        score = ats_analysis.get("score", 0)
        category = ats_analysis.get("category", "")
        match = comparison.get("match_percentage")
        skills_summary = self._top_skills(skills)
        evidence_snippet = " | ".join(evidence[:3]) or "No direct evidence retrieved."
        history_str = "\n".join(
            f"{'User' if item.get('role') == 'user' else 'Assistant'}: {(item.get('content') or '')[:120]}"
            for item in history[-4:]
        ) or "No prior messages."

        prompt = (
            "[INST] You are ResQ, a premium HR interviewer and career coach specializing in ECE and EEE domains. "
            "Answer only as the assistant. Do not write User:, Candidate:, Human:, or Question:. "
            "Use the candidate context and be honest if proof is missing.\n\n"
            f"Candidate: {name}\n"
            f"Domain: {domain_name}\n"
            f"ATS score: {score} ({category})\n"
            f"JD match: {match if match is not None else 'No JD uploaded'}\n"
            f"Top skills: {skills_summary}\n"
            f"Evidence: {evidence_snippet}\n"
            f"Resume excerpt: {self._clip(resume.get('raw_text', ''), 850) or 'No resume uploaded.'}\n"
            f"JD excerpt: {self._clip(jd_text, 500) or 'No JD uploaded.'}\n\n"
            f"History:\n{history_str}\n\n"
            f"User question: {question}\n[/INST]\n"
            "ResQ:"
        )

        try:
            with httpx.Client(timeout=75.0) as client:
                response = client.post(
                    f"{ollama_host}/api/generate",
                    json={
                        "model": ollama_model,
                        "prompt": prompt,
                        "stream": False,
                        "options": {
                            "temperature": 0.55,
                            "num_predict": 420,
                            "num_ctx": 3072,
                            "stop": ["\nUser:", "\nCandidate:", "\nHuman:", "\nQuestion:", "[INST]", "\n[INST]"],
                        },
                    },
                )
            if response.status_code == 200:
                answer = self._clean_model_output(response.json().get("response", ""))
                if len(answer.split()) >= 8:
                    self._last_provider = f"ollama/{ollama_model}"
                    return answer
            else:
                print(f"Ollama error {response.status_code}: {response.text[:200]}")
        except Exception as exc:
            print(f"Ollama request failed: {exc}")
        return None

    def _clean_model_output(self, raw: str) -> str:
        if not raw:
            return ""
        bad_prefixes = (
            "candidate:", "human:", "user:", "question:", "assistant:",
            "[inst]", "[candidate]", "[user]", "[human]", "[assistant]",
        )
        clean_lines = []
        for line in raw.splitlines():
            stripped = line.strip()
            lower = stripped.lower()
            if any(lower.startswith(prefix) for prefix in bad_prefixes):
                break
            if re.match(r"^\[[A-Z]+\]", stripped):
                break
            clean_lines.append(line)
        result = "\n".join(clean_lines).strip()
        if result.lower().startswith("resq:"):
            result = result[5:].strip()
        result = re.sub(r"\n{3,}", "\n\n", result)
        return result

    def _build_context(
        self,
        resume: Dict[str, Any],
        skills: Any,
        domain: Any,
        ats_analysis: Dict[str, Any],
        jd_text: str,
        comparison: Dict[str, Any],
        evidence: List[str],
    ) -> str:
        candidate = resume.get("candidate", {})
        candidate_dict = candidate.dict() if hasattr(candidate, "dict") else candidate
        methodology = ats_analysis.get("methodology", {})
        layout = methodology.get("computer_vision", {})
        quality = methodology.get("ml_quality", {})

        return "\n".join([
            f"Candidate: {candidate_dict}",
            f"Detected domain: {getattr(domain, 'primary', 'Unknown')} confidence={getattr(domain, 'confidence', None)}",
            f"Skills: {self._skills_dict(skills)}",
            f"ATS score/category: {ats_analysis.get('score')} / {ats_analysis.get('category')}",
            f"Content quality signals: score={quality.get('score')} label={quality.get('label')} features={quality.get('features', {})}",
            f"Layout quality signals: score={layout.get('layout_score')} risk={layout.get('risk_level')} issues={layout.get('issues', [])}",
            f"Experience parsed: {resume.get('experience', {})}",
            f"Projects parsed: {(resume.get('projects') or [])[:5]}",
            f"Education parsed: {(resume.get('education') or [])[:3]}",
            f"JD comparison: {comparison}",
            f"Retrieved evidence: {evidence[:6]}",
            f"Resume text excerpt:\n{self._clip(resume.get('raw_text', ''), 5500) or 'No resume uploaded yet.'}",
            f"JD text excerpt:\n{self._clip(jd_text, 3500) or 'No JD uploaded yet.'}",
        ])

    def _skills_dict(self, skills: Any) -> Dict[str, List[str]]:
        return {
            "programming_languages": getattr(skills, "programming_languages", []),
            "frameworks": getattr(skills, "frameworks", []),
            "tools": getattr(skills, "tools", []),
            "databases": getattr(skills, "databases", []),
            "soft_skills": getattr(skills, "soft_skills", []),
            "other": getattr(skills, "other", []),
        }

    def _clip(self, text: str, limit: int) -> str:
        text = re.sub(r"\s+", " ", text or "").strip()
        if len(text) <= limit:
            return text
        return text[:limit] + "..."

    def _intent(self, question: str) -> str:
        q = question.lower()
        if any(word in q for word in ["interview", "ask me", "mock", "question"]):
            return "mock_interview"
        if any(word in q for word in ["gap", "missing", "improve", "future", "roadmap", "learn"]):
            return "career_coach"
        if any(word in q for word in ["jd", "job", "match", "fit", "requirement"]):
            return "jd_fit"
        if any(word in q for word in ["hr", "recruiter", "shortlist", "hire"]):
            return "hr_screen"
        return "resume_qa"

    def _compose_answer(
        self,
        intent: str,
        resume: Dict[str, Any],
        skills: Any,
        domain: Any,
        ats_analysis: Dict[str, Any],
        comparison: Dict[str, Any],
        evidence: List[str],
    ) -> str:
        candidate = resume.get("candidate", {})
        candidate_dict = candidate.dict() if hasattr(candidate, "dict") else candidate
        name = candidate_dict.get("name") or "the candidate"
        domain_name = getattr(domain, "primary", "the target role")
        score = ats_analysis.get("score", 0)
        match = comparison.get("match_percentage")
        has_resume = bool((resume.get("raw_text") or "").strip())

        if not has_resume:
            return (
                "I can act as a general HR and interview coach right now. Tell me the role you are targeting, "
                "paste a JD, or ask for mock interview practice. Once you upload a resume, I will ground advice "
                "in your skills, score, missing keywords, projects, and recruiter-readiness signals."
            )

        if intent == "mock_interview":
            question = self._suggested_questions(comparison, skills)[0]
            return (
                f"As your interviewer, I would start with: {question}\n\n"
                "A strong answer should include the situation, your exact ownership, the tools used, the tradeoff you handled, "
                f"and a measurable outcome. Based on the resume, {name} should anchor the answer around {self._top_skills(skills)}."
            )

        if intent == "jd_fit":
            if match is None:
                return (
                    f"I can assess JD fit more deeply once a job description is uploaded. From the resume alone, "
                    f"{name} is aligned with {domain_name}, has an ATS score of {score}, and should strengthen "
                    "role-specific keywords before applying."
                )
            missing = comparison.get("missing_keywords", [])[:5]
            strengths = comparison.get("recruiter_report", {}).get("strengths", [])[:3]
            return (
                f"Recruiter fit read: the resume is at {match}% match for the uploaded JD.\n\n"
                f"Strengths: {', '.join(strengths) or 'relevant resume signals are present'}.\n"
                f"Main gaps: {', '.join(missing) if missing else 'no severe keyword gaps from the parsed JD'}.\n\n"
                "Best next move: tailor the summary and top project/experience bullets to the JD terms, but only where you can prove them truthfully."
            )

        if intent == "career_coach":
            suggestions = ats_analysis.get("suggestions", [])[:3]
            moves = []
            for item in suggestions:
                title = item.title if hasattr(item, "title") else item.get("title", "")
                examples = item.examples if hasattr(item, "examples") else item.get("examples", [])
                moves.append(f"{title}: {', '.join(examples[:2])}" if examples else title)
            if not moves:
                moves = ["Add clearer metrics", "Use stronger action verbs", "Back skills with project evidence"]
            return (
                f"Roadmap for {name}: first close ATS/JD gaps, then build proof.\n\n"
                f"Priority moves:\n- " + "\n- ".join(moves) +
                "\n\nFor interviews, prepare three stories: one technical win, one teamwork example, and one failure-to-learning story."
            )

        if intent == "hr_screen":
            category = ats_analysis.get("category", "Unknown")
            return (
                f"As HR, I would rate this profile as {category} on ATS readiness with a score of {score}. "
                f"The strongest visible direction is {domain_name}. I would shortlist if the role needs "
                f"{self._top_skills(skills)} and the candidate can explain measurable impact during the first screen."
            )

        if evidence:
            return (
                f"Based on the resume/JD evidence I found: {evidence[0]}\n\n"
                "My advice: answer with a real example, mention the tools used, explain your ownership, and close with measurable impact."
            )

        return (
            f"I do not see direct evidence in the parsed resume/JD for that exact question. Safely, {name} is positioned for "
            f"{domain_name}, with key skills around {self._top_skills(skills)}. If this matters for the role, add a truthful "
            "bullet or project detail that proves it."
        )

    def _retrieve_evidence(self, question: str, resume_text: str, jd_text: str) -> List[str]:
        query_terms = {
            term for term in re.findall(r"[a-zA-Z][a-zA-Z0-9+#.-]{2,}", question.lower())
            if term not in {"what", "how", "why", "tell", "about", "your", "resume", "job", "role", "should"}
        }
        chunks = []
        for source, text in (("Resume", resume_text), ("JD", jd_text)):
            for raw in re.split(r"[\n.!?]+", text or ""):
                chunk = re.sub(r"\s+", " ", raw).strip()
                if len(chunk) < 25:
                    continue
                terms = set(re.findall(r"[a-zA-Z][a-zA-Z0-9+#.-]{2,}", chunk.lower()))
                score = len(query_terms & terms)
                if score:
                    chunks.append((score, len(chunk), f"{source}: {chunk[:240]}"))
        chunks.sort(key=lambda item: (item[0], -item[1]), reverse=True)
        return [chunk for _, _, chunk in chunks[:6]]

    def _suggested_questions(self, comparison: Dict[str, Any], skills: Any) -> List[str]:
        questions = [
            self.TECHNICAL_QUESTIONS[0],
            self.HR_QUESTIONS[0],
            "What are the top three changes I should make before applying?",
        ]
        missing = comparison.get("missing_keywords", []) or []
        if missing:
            questions.insert(1, f"The JD mentions {missing[0]}. How should I prove or build this skill?")
        top_skill = self._top_skills(skills).split(", ")[0]
        if top_skill != "core role skills":
            questions.append(f"How should I explain my {top_skill} experience to HR?")
        return questions[:5]

    def _top_skills(self, skills: Any) -> str:
        values = []
        for attr in ("programming_languages", "frameworks", "tools", "databases", "soft_skills"):
            values.extend(getattr(skills, attr, [])[:3])
        unique = []
        for value in values:
            if value and value not in unique:
                unique.append(value)
        return ", ".join(unique[:5]) if unique else "core role skills"

    def _interviewer_score(self, ats_analysis: Dict[str, Any], comparison: Dict[str, Any]) -> int:
        ats_score = ats_analysis.get("score", 50)
        match = comparison.get("match_percentage")
        if match is None:
            return int(ats_score)
        return int((ats_score * 0.45) + (match * 0.55))

    def _next_step(self, ats_analysis: Dict[str, Any], comparison: Dict[str, Any]) -> str:
        score = self._interviewer_score(ats_analysis, comparison)
        if score >= 80:
            return "Prepare technical and HR stories with project proof, metrics, and role-specific keywords."
        if score >= 60:
            return "Tailor the resume to the JD, then practice clear explanations for the remaining gaps."
        return "Fix resume/JD gaps before applying and build one proof project for the weakest required skill."


interview_chatbot = InterviewChatbot()
