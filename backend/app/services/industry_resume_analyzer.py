"""
Industry-style resume report and rewrite generator.

This layer mirrors the way strong public resume screeners explain results:
content quality, standard sections, ATS essentials, and role/JD tailoring.
It stays deterministic and evidence-based so scores are explainable during demos.
"""
import re
from collections import Counter
from typing import Any, Dict, List, Optional

from app.models.schemas import (
    CandidateInfo,
    DomainInfo,
    IndustryCategory,
    IndustryCheck,
    IndustryReport,
    ResumeRewrite,
    SkillsData,
)


class IndustryResumeAnalyzer:
    """Generate category checks and an ATS-safe improved resume draft."""

    ACTION_VERBS = [
        "Built", "Developed", "Implemented", "Optimized", "Automated",
        "Designed", "Led", "Delivered", "Improved", "Integrated",
        "Analyzed", "Created", "Managed", "Launched", "Streamlined",
    ]
    WEAK_PHRASES = [
        "responsible for", "worked on", "helped with", "assisted in",
        "involved in", "participated in", "duties included",
    ]
    COMMON_TYPOS = {
        "javscript": "javascript",
        "pyhton": "python",
        "mangment": "management",
        "developement": "development",
        "experiance": "experience",
        "certifiaction": "certification",
        "achievment": "achievement",
        "collage": "college",
        "enginering": "engineering",
        "recieve": "receive",
        "seperate": "separate",
    }
    ROLE_KEYWORDS = {
        "Software / IT": ["api", "database", "cloud", "deployment", "testing", "security", "scalability"],
        "Data / AI": ["model", "dataset", "pipeline", "accuracy", "features", "visualization", "insights"],
        "Marketing": ["campaign", "conversion", "audience", "analytics", "growth", "content", "roi"],
        "Finance": ["forecasting", "reporting", "risk", "budget", "revenue", "compliance", "analysis"],
        "General": ["stakeholders", "process", "delivery", "collaboration", "operations", "impact", "quality"],
    }

    def build_report(
        self,
        parsed_data: Dict[str, Any],
        skills: SkillsData,
        domain: DomainInfo,
        keywords_analysis: Any,
        parsing_method: str = "standard",
        ocr_confidence: Optional[str] = None,
        comparison: Optional[Dict[str, Any]] = None,
    ) -> IndustryReport:
        text = parsed_data.get("raw_text", "") or ""
        sections = parsed_data.get("sections", {}) or {}
        formatting = parsed_data.get("formatting", {}) or {}
        candidate = parsed_data.get("candidate", CandidateInfo())
        candidate_dict = candidate.dict() if hasattr(candidate, "dict") else candidate

        checks_by_category = {
            "Content": [
                self._parse_rate_check(text, sections, candidate_dict, parsing_method, ocr_confidence),
                self._impact_check(text),
                self._repetition_check(text),
                self._writing_polish_check(text),
                self._action_language_check(text),
            ],
            "Sections": [
                self._section_check(sections, "summary", "Summary"),
                self._section_check(sections, "experience", "Experience"),
                self._section_check(sections, "projects", "Projects"),
                self._section_check(sections, "skills", "Skills"),
                self._section_check(sections, "education", "Education"),
            ],
            "ATS Essentials": [
                self._contact_check(candidate_dict),
                self._format_check(formatting, text),
                self._length_check(text),
                self._link_check(candidate_dict),
            ],
            "Tailoring": [
                self._keyword_check(text, domain.primary, keywords_analysis, comparison),
                self._skills_evidence_check(text, sections, skills),
                self._jd_match_check(comparison),
            ],
        }

        categories = [
            IndustryCategory(
                name=name,
                score=self._average_score(checks),
                issue_count=sum(check.issue_count for check in checks),
                checks=checks,
            )
            for name, checks in checks_by_category.items()
        ]

        top_actions = self._top_actions(categories)
        return IndustryReport(categories=categories, top_actions=top_actions)

    def build_rewrite(
        self,
        parsed_data: Dict[str, Any],
        skills: SkillsData,
        domain: DomainInfo,
        keywords_analysis: Any,
        comparison: Optional[Dict[str, Any]] = None,
    ) -> ResumeRewrite:
        text = parsed_data.get("raw_text", "") or ""
        candidate = parsed_data.get("candidate", CandidateInfo())
        candidate_dict = candidate.dict() if hasattr(candidate, "dict") else candidate
        experience = parsed_data.get("experience", {})
        experience_dict = experience.dict() if hasattr(experience, "dict") else experience or {}
        projects = parsed_data.get("projects", []) or []
        education = parsed_data.get("education", []) or []

        skill_groups = self._skill_groups(skills, keywords_analysis, comparison)
        top_skills = self._flatten_skill_groups(skill_groups)[:8]
        headline = self._headline(domain.primary, candidate_dict, top_skills)
        summary = self._summary(domain.primary, top_skills, experience_dict, projects)
        experience_bullets = self._experience_bullets(experience_dict, text, domain.primary)
        project_bullets = self._project_bullets(projects, top_skills, domain.primary)
        education_lines = self._education_lines(education)

        ats_safe = self._compose_resume(
            candidate_dict,
            headline,
            summary,
            skill_groups,
            experience_bullets,
            project_bullets,
            education_lines,
        )

        notes = [
            "Review every generated bullet for truth before submitting.",
            "Add exact numbers from your real work wherever placeholders imply scale.",
            "Tailor the summary and top skills to each job description.",
        ]
        return ResumeRewrite(
            headline=headline,
            summary=summary,
            skills=skill_groups,
            experience_bullets=experience_bullets,
            project_bullets=project_bullets,
            education=education_lines,
            ats_safe_resume=ats_safe,
            notes=notes,
        )

    def _parse_rate_check(self, text, sections, candidate, parsing_method, ocr_confidence) -> IndustryCheck:
        findings = []
        score = 100
        if parsing_method == "ocr_unavailable":
            score -= 40
            findings.append("Scanned or image-heavy PDF may not parse reliably.")
        elif parsing_method == "ocr":
            score -= 18 if ocr_confidence != "low" else 30
            findings.append(f"OCR extraction was required with {ocr_confidence or 'unknown'} confidence.")
        if len(sections) < 3:
            score -= 16
            findings.append("Fewer than three standard sections were confidently detected.")
        if not candidate.get("email") or not candidate.get("phone"):
            score -= 12
            findings.append("Contact fields are not fully machine-readable.")
        if len(text.split()) < 150:
            score -= 20
            findings.append("Extracted text is very short for a complete resume.")
        return self._check(
            "ATS Parse Rate",
            score,
            findings,
            "Use a text-based PDF/DOCX with standard headings and selectable contact details.",
        )

    def _impact_check(self, text) -> IndustryCheck:
        metrics = re.findall(
            r"\d+%|\$[\d,]+|\b\d+\s*(users|customers|students|clients|requests|records|hours|days|projects|deployments|tickets)\b",
            text,
            re.IGNORECASE,
        )
        count = len(metrics)
        score = 100 if count >= 5 else 82 if count >= 3 else 58 if count >= 1 else 38
        findings = [] if count >= 3 else [f"Only {count} measurable impact signal{'s' if count != 1 else ''} detected."]
        return self._check(
            "Quantifying Impact",
            score,
            findings,
            "Add numbers for users, scale, speed, accuracy, money, time saved, or team/project size.",
        )

    def _repetition_check(self, text) -> IndustryCheck:
        lines = [line.strip().lower() for line in text.splitlines() if len(line.strip()) > 24]
        duplicate_lines = len(lines) - len(set(lines))
        words = re.findall(r"[a-zA-Z]{5,}", text.lower())
        repeated_terms = [word for word, count in Counter(words).most_common(8) if count >= 8]
        issue_count = duplicate_lines + max(0, len(repeated_terms) - 3)
        score = max(35, 100 - issue_count * 12)
        findings = []
        if duplicate_lines:
            findings.append(f"{duplicate_lines} repeated content line{'s' if duplicate_lines != 1 else ''} found.")
        if len(repeated_terms) > 3:
            findings.append("Some words are repeated heavily across the resume.")
        return self._check(
            "Repetition",
            score,
            findings,
            "Merge duplicate responsibilities and vary bullets with specific technologies, actions, and outcomes.",
        )

    def _writing_polish_check(self, text) -> IndustryCheck:
        lower = text.lower()
        findings = []
        typo_hits = [bad for bad in self.COMMON_TYPOS if bad in lower]
        repeated_words = re.findall(r"\b(\w+)\s+\1\b", lower)
        encoding_hits = len(re.findall(r"â|�|\x00", text))
        long_sentences = [s for s in re.split(r"[.!?]\s+", text) if len(s.split()) > 38]
        if typo_hits:
            findings.append(f"Possible spelling issues: {', '.join(typo_hits[:4])}.")
        if repeated_words:
            findings.append("Repeated adjacent words detected.")
        if encoding_hits:
            findings.append("Encoding artifacts appear in extracted text.")
        if len(long_sentences) >= 3:
            findings.append("Several sentences are too long for quick recruiter scanning.")
        score = max(35, 100 - (len(typo_hits) * 10 + len(repeated_words) * 8 + min(25, encoding_hits * 4) + max(0, len(long_sentences) - 2) * 6))
        return self._check(
            "Spelling & Grammar",
            score,
            findings,
            "Proofread names/technologies, remove encoding artifacts, and keep bullets concise.",
        )

    def _action_language_check(self, text) -> IndustryCheck:
        lower = text.lower()
        weak_hits = [phrase for phrase in self.WEAK_PHRASES if phrase in lower]
        action_hits = sum(1 for verb in self.ACTION_VERBS if re.search(rf"\b{verb.lower()}\b", lower))
        score = min(100, 45 + action_hits * 8) - len(weak_hits) * 8
        findings = []
        if weak_hits:
            findings.append(f"Weak ownership phrases found: {', '.join(weak_hits[:3])}.")
        if action_hits < 5:
            findings.append("Not enough bullets begin with strong action verbs.")
        return self._check(
            "Action Language",
            score,
            findings,
            "Start bullets with built, led, optimized, automated, delivered, or improved.",
        )

    def _section_check(self, sections, key, label) -> IndustryCheck:
        content = sections.get(key, "") or ""
        score = 100 if len(content.strip()) > 50 else 72 if len(content.strip()) > 15 else 35
        findings = [] if score >= 80 else [f"{label} section is missing or too thin."]
        return self._check(label, score, findings, f"Add a clear {label.upper()} heading with relevant, text-based content.")

    def _contact_check(self, candidate) -> IndustryCheck:
        missing = [label for label in ("name", "email", "phone") if not candidate.get(label)]
        score = 100 - len(missing) * 18
        findings = [f"Missing contact field: {label}." for label in missing]
        return self._check("Contact Fields", score, findings, "Place name, email, phone, location, LinkedIn, and GitHub at the top.")

    def _format_check(self, formatting, text) -> IndustryCheck:
        findings = []
        score = 100
        if formatting.get("has_tables"):
            score -= 25
            findings.append("Tables detected.")
        if formatting.get("has_images"):
            score -= 15
            findings.append("Images or graphic elements detected.")
        if self._bullet_count(text) < 4 and len(text.split()) > 220:
            score -= 10
            findings.append("Bullet structure is limited.")
        return self._check("ATS-Safe Formatting", score, findings, "Use one column, normal text, simple bullets, and standard headings.")

    def _length_check(self, text) -> IndustryCheck:
        words = len(text.split())
        if 350 <= words <= 900:
            score = 100
            findings = []
        elif 220 <= words < 350 or 900 < words <= 1300:
            score = 78
            findings = [f"Resume length is {words} words; target roughly 350-900 for most early-career resumes."]
        else:
            score = 52
            findings = [f"Resume length is {words} words, which may be too short or too long."]
        return self._check("Resume Length", score, findings, "Keep the resume concise while preserving proof of projects, skills, and outcomes.")

    def _link_check(self, candidate) -> IndustryCheck:
        missing = []
        if not candidate.get("linkedin"):
            missing.append("LinkedIn")
        if not candidate.get("github"):
            missing.append("GitHub/portfolio")
        score = 100 - len(missing) * 12
        findings = [f"{item} link not detected." for item in missing]
        return self._check("Professional Links", score, findings, "Add clean LinkedIn and GitHub/portfolio links when relevant.")

    def _keyword_check(self, text, domain, keywords_analysis, comparison) -> IndustryCheck:
        if comparison:
            match = int(comparison.get("keyword_match_percentage", comparison.get("match_percentage", 0)))
            missing = comparison.get("missing_keywords", [])[:5]
            findings = [f"Missing JD keywords: {', '.join(missing)}."] if missing else []
            return self._check("JD Keyword Match", match, findings, "Mirror exact JD terms only when they truthfully match your experience.")
        missing = getattr(keywords_analysis, "missing", []) or []
        found = getattr(keywords_analysis, "found", []) or []
        domain_terms = self.ROLE_KEYWORDS.get(domain, self.ROLE_KEYWORDS["General"])
        domain_hits = sum(1 for term in domain_terms if term in text.lower())
        score = min(100, int((len(found) / max(1, len(found) + len(missing))) * 70 + (domain_hits / len(domain_terms)) * 30))
        findings = [f"Missing role keywords: {', '.join(missing[:5])}."] if missing[:5] else []
        return self._check("Role Keyword Match", score, findings, "Add missing role keywords inside real project or experience bullets.")

    def _skills_evidence_check(self, text, sections, skills) -> IndustryCheck:
        all_skills = self._flatten_skill_groups(self._skill_groups(skills, None, None))
        evidence = " ".join([sections.get("experience", ""), sections.get("projects", ""), sections.get("summary", "")]).lower() or text.lower()
        backed = [skill for skill in all_skills if skill.lower() in evidence]
        ratio = len(backed) / max(1, len(all_skills))
        score = int(ratio * 100) if all_skills else 45
        findings = [] if ratio >= 0.5 else ["Several listed skills are not backed by project or experience evidence."]
        return self._check("Evidence-Backed Skills", score, findings, "Mention top skills in bullets that show what you built, improved, or delivered.")

    def _jd_match_check(self, comparison) -> IndustryCheck:
        if not comparison:
            return self._check(
                "Tailoring Readiness",
                55,
                ["No job description was provided, so exact tailoring cannot be scored."],
                "Use Resume vs JD Comparison to generate role-specific keyword and gap analysis.",
            )
        score = int(comparison.get("match_percentage", 0))
        findings = []
        if score < 75:
            findings.append("Resume is not strongly aligned with the supplied JD yet.")
        return self._check("Overall JD Tailoring", score, findings, "Prioritize required skills, title language, and domain keywords from the JD.")

    def _check(self, name, score, findings, recommendation) -> IndustryCheck:
        clean_score = max(0, min(100, int(score)))
        status = "Pass" if clean_score >= 82 and not findings else "Warning" if clean_score >= 62 else "Needs Review"
        return IndustryCheck(
            name=name,
            score=clean_score,
            issue_count=len(findings),
            status=status,
            findings=findings,
            recommendation=recommendation,
        )

    def _average_score(self, checks: List[IndustryCheck]) -> int:
        return int(round(sum(check.score for check in checks) / max(1, len(checks))))

    def _top_actions(self, categories: List[IndustryCategory]) -> List[str]:
        checks = [check for category in categories for check in category.checks]
        weak = sorted(checks, key=lambda check: (check.score, -check.issue_count))
        return [check.recommendation for check in weak[:5]]

    def _skill_groups(self, skills: SkillsData, keywords_analysis=None, comparison=None) -> Dict[str, List[str]]:
        groups = {
            "Languages": skills.programming_languages[:10],
            "Frameworks": skills.frameworks[:10],
            "Tools": skills.tools[:10],
            "Databases": skills.databases[:10],
            "Soft Skills": skills.soft_skills[:8],
            "Other": skills.other[:8],
        }
        if comparison:
            missing = comparison.get("missing_keywords", [])[:4]
            if missing:
                groups["Target Keywords To Add If True"] = missing
        elif keywords_analysis:
            recommended = (getattr(keywords_analysis, "recommended", []) or [])[:4]
            if recommended:
                groups["Recommended Keywords"] = recommended
        return {key: value for key, value in groups.items() if value}

    def _flatten_skill_groups(self, groups: Dict[str, List[str]]) -> List[str]:
        values = []
        seen = set()
        for group_values in groups.values():
            for value in group_values:
                normalized = value.strip().lower()
                if normalized and normalized not in seen:
                    seen.add(normalized)
                    values.append(value)
        return values

    def _headline(self, domain, candidate, top_skills) -> str:
        role = {
            "Software / IT": "Software Engineering Candidate",
            "Data / AI": "AI and Data Science Candidate",
            "Marketing": "Marketing and Growth Candidate",
            "Finance": "Finance and Analytics Candidate",
        }.get(domain, f"{domain} Candidate")
        if top_skills:
            return f"{role} | {', '.join(top_skills[:3])}"
        return role

    def _summary(self, domain, top_skills, experience, projects) -> str:
        skill_text = ", ".join(top_skills[:5]) if top_skills else "role-relevant tools"
        project_count = len(projects)
        position_count = len(experience.get("positions", []) or [])
        proof = []
        if position_count:
            proof.append(f"{position_count} experience role{'s' if position_count != 1 else ''}")
        if project_count:
            proof.append(f"{project_count} project{'s' if project_count != 1 else ''}")
        proof_text = " and ".join(proof) if proof else "hands-on academic or independent work"
        return (
            f"{domain} profile with practical experience in {skill_text}. "
            f"Brings {proof_text}, clear problem-solving ability, and a focus on building reliable, measurable outcomes. "
            "Seeking roles where technical execution, learning speed, and collaboration matter."
        )

    def _experience_bullets(self, experience, text, domain) -> List[str]:
        bullets = self._extract_existing_bullets(text)
        rewritten = [self._rewrite_bullet(bullet, domain) for bullet in bullets[:5]]
        if rewritten:
            return rewritten
        positions = experience.get("positions", []) or []
        if positions:
            return [
                "Coordinated cross-functional activities, documented progress, and improved communication between stakeholders.",
                "Managed recurring tasks with consistent follow-through, prioritization, and attention to measurable outcomes.",
            ]
        return []

    def _project_bullets(self, projects, top_skills, domain) -> List[str]:
        result = []
        stack = ", ".join(top_skills[:3]) if top_skills else "relevant technologies"
        for project in projects[:4]:
            data = project.dict() if hasattr(project, "dict") else project
            title = data.get("title") or "Project"
            techs = data.get("technologies") or top_skills[:3]
            tech_text = ", ".join(techs[:4]) if techs else stack
            result.append(f"Built {title} using {tech_text}, focusing on usability, reliability, and clear user-facing outcomes.")
        if not result and top_skills:
            result.append(f"Built a portfolio project using {stack}, documenting the problem, solution, implementation, and measurable result.")
        return result

    def _education_lines(self, education) -> List[str]:
        lines = []
        for item in education[:3]:
            data = item.dict() if hasattr(item, "dict") else item
            parts = [data.get("degree"), data.get("institution"), data.get("year")]
            line = " | ".join(str(part) for part in parts if part)
            if line:
                lines.append(line)
        return lines

    def _compose_resume(self, candidate, headline, summary, skills, experience_bullets, project_bullets, education) -> str:
        lines = []
        name = candidate.get("name") or "Candidate Name"
        contact = [candidate.get("email"), candidate.get("phone"), candidate.get("location"), candidate.get("linkedin"), candidate.get("github")]
        lines.extend([name.upper(), headline, " | ".join(value for value in contact if value), "", "SUMMARY", summary, ""])
        if skills:
            lines.append("SKILLS")
            for label, values in skills.items():
                lines.append(f"{label}: {', '.join(values)}")
            lines.append("")
        if experience_bullets:
            lines.append("EXPERIENCE")
            lines.extend(f"- {bullet}" for bullet in experience_bullets)
            lines.append("")
        if project_bullets:
            lines.append("PROJECTS")
            lines.extend(f"- {bullet}" for bullet in project_bullets)
            lines.append("")
        if education:
            lines.append("EDUCATION")
            lines.extend(education)
        return "\n".join(line for line in lines if line is not None).strip()

    def _extract_existing_bullets(self, text) -> List[str]:
        bullets = []
        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith(("-", "*", "•", "●", "○", "–", "—")):
                cleaned = stripped.lstrip("-*•●○–— ").strip()
                if len(cleaned.split()) >= 4:
                    bullets.append(cleaned)
        return bullets

    def _rewrite_bullet(self, bullet, domain) -> str:
        cleaned = re.sub(r"\s+", " ", bullet).strip(" .")
        cleaned = re.sub(r"^(responsible for|worked on|helped with|assisted in)\s+", "", cleaned, flags=re.IGNORECASE)
        if not re.match(rf"^({'|'.join(self.ACTION_VERBS)})\b", cleaned, re.IGNORECASE):
            verb = "Built" if domain in ("Software / IT", "Data / AI") else "Delivered"
            cleaned = f"{verb} {cleaned[0].lower() + cleaned[1:] if cleaned else 'a measurable outcome'}"
        if not re.search(r"\d+%|\b\d+\s*(users|students|records|hours|days|projects|requests|deployments)\b", cleaned, re.IGNORECASE):
            cleaned += ", improving clarity, execution quality, and stakeholder value"
        return cleaned + "."

    def _bullet_count(self, text) -> int:
        return len(self._extract_existing_bullets(text))


industry_resume_analyzer = IndustryResumeAnalyzer()
