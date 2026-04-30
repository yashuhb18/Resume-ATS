"""
ATS Scorer Service - Calculates ATS compatibility score and provides insights
"""
import re
from typing import Dict, List, Any
from app.models.schemas import (
    SkillsData, DomainInfo, ScoreBreakdown, 
    ATSIssue, Suggestion, KeywordsAnalysis
)


class ATSScorer:
    """Calculate ATS score and provide improvement suggestions"""
    
    # Important keywords by domain
    DOMAIN_KEYWORDS = {
        'Software / IT': [
            'developed', 'built', 'implemented', 'designed', 'architected',
            'optimized', 'deployed', 'integrated', 'automated', 'tested',
            'scalable', 'performance', 'api', 'database', 'cloud', 'agile'
        ],
        'Data / AI': [
            'analyzed', 'modeled', 'predicted', 'visualized', 'processed',
            'accuracy', 'precision', 'recall', 'f1', 'auc', 'training',
            'dataset', 'feature', 'pipeline', 'insight', 'recommendation'
        ],
        'Marketing': [
            'campaign', 'engagement', 'conversion', 'roi', 'reach',
            'impression', 'click-through', 'brand', 'content', 'strategy',
            'audience', 'growth', 'optimization', 'analytics', 'social'
        ],
        'Finance': [
            'analyzed', 'forecasted', 'modeled', 'valued', 'audited',
            'budgeted', 'reported', 'compliance', 'risk', 'revenue',
            'cost reduction', 'profit', 'investment', 'portfolio', 'reconciled'
        ],
        'General': [
            'managed', 'led', 'achieved', 'improved', 'increased',
            'reduced', 'delivered', 'collaborated', 'created', 'developed',
            'implemented', 'designed', 'analyzed', 'optimized', 'trained'
        ]
    }
    
    # Required sections for a complete resume
    REQUIRED_SECTIONS = [
        'experience', 'education', 'skills'
    ]
    
    RECOMMENDED_SECTIONS = [
        'summary', 'projects', 'certifications'
    ]

    SCORE_WEIGHTS = {
        # Closest public ATS behavior: can the resume be parsed into clean fields?
        'formatting_score': 0.25,
        # Does the resume carry role/domain language recruiters and search filters use?
        'keyword_relevance': 0.20,
        # Are skills merely listed, or backed by experience/projects?
        'skill_relevance': 0.20,
        # Are bullets readable, quantified, and recruiter-friendly?
        'experience_clarity': 0.20,
        # Are the standard resume sections easy to detect?
        'section_completeness': 0.10,
        # Helpful signal, but less universal than experience/skills.
        'project_impact': 0.05,
    }
    
    def calculate_score(
        self, 
        parsed_data: Dict, 
        skills: SkillsData, 
        domain: DomainInfo,
        parsing_method: str = "standard",
        ocr_confidence: str = None,
        ml_analysis: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Calculate comprehensive ATS score
        
        Args:
            parsed_data: Parsed resume data
            skills: Extracted skills
            domain: Classified domain
            parsing_method: "standard" | "ocr" | "ocr_unavailable"
            ocr_confidence: "low" | "medium" | "high" (only when OCR used)
        """
        
        is_ocr = parsing_method == "ocr"
        ocr_min_score_floor = 25 if is_ocr else 0  # Minimum score floor for OCR
        
        raw_text = parsed_data.get('raw_text', '')
        sections = parsed_data.get('sections', {})
        formatting = parsed_data.get('formatting', {})
        cv_analysis = parsed_data.get('computer_vision', {})
        candidate = parsed_data.get('candidate', {})
        experience = parsed_data.get('experience', {})
        projects = parsed_data.get('projects', [])
        
        # Calculate individual scores using an explainable readiness model.
        keyword_score = self._calculate_keyword_score(raw_text, domain.primary, sections)
        section_score = self._calculate_section_score(sections, candidate)
        formatting_score = self._calculate_parseability_score(
            formatting,
            raw_text,
            sections,
            candidate,
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence
        )
        cv_layout_score = cv_analysis.get("layout_score")
        if isinstance(cv_layout_score, int):
            formatting_score = int((formatting_score * 0.75) + (cv_layout_score * 0.25))
        skill_score = self._calculate_skill_score(skills, raw_text, sections)
        experience_score = self._calculate_experience_score(experience, raw_text)
        project_score = self._calculate_project_score(projects, raw_text)
        ml_quality_score = None
        if ml_analysis:
            ml_quality_score = ml_analysis.get("score")
            if isinstance(ml_quality_score, int):
                experience_score = int((experience_score * 0.85) + (ml_quality_score * 0.15))
        
        # Create breakdown
        breakdown = ScoreBreakdown(
            keyword_relevance=keyword_score,
            section_completeness=section_score,
            formatting_score=formatting_score,
            skill_relevance=skill_score,
            experience_clarity=experience_score,
            project_impact=project_score
        )
        
        final_score = int(
            keyword_score * self.SCORE_WEIGHTS['keyword_relevance'] +
            section_score * self.SCORE_WEIGHTS['section_completeness'] +
            formatting_score * self.SCORE_WEIGHTS['formatting_score'] +
            skill_score * self.SCORE_WEIGHTS['skill_relevance'] +
            experience_score * self.SCORE_WEIGHTS['experience_clarity'] +
            project_score * self.SCORE_WEIGHTS['project_impact']
        )
        
        # Apply OCR minimum score floor
        if is_ocr and final_score < ocr_min_score_floor:
            final_score = ocr_min_score_floor
        
        # Determine category
        category = self._get_score_category(final_score)
        
        # Identify issues
        issues = self._identify_issues(
            raw_text, sections, formatting,
            skills, candidate, experience,
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence
        )
        
        # Add OCR notice if applicable
        if is_ocr:
            ocr_notice = ATSIssue(
                type='parsing',
                severity='Low',
                description=f'Resume was processed using OCR (scanned document detected). Confidence: {ocr_confidence or "unknown"}.',
                suggestion='For best results, upload a text-based PDF or DOCX file rather than a scanned document.'
            )
            issues.insert(0, ocr_notice)

        if ml_analysis and ml_analysis.get("label") == "weak":
            issues.append(ATSIssue(
                type='content_quality',
                severity='Medium',
                description='Content quality signals are weak for recruiter screening',
                suggestion='Add measurable achievements, stronger action verbs, clearer sections, and evidence-backed skills.'
            ))

        if cv_analysis.get("available"):
            for cv_issue in cv_analysis.get("issues", [])[:3]:
                issues.append(ATSIssue(
                    type='layout',
                    severity='High' if cv_analysis.get("risk_level") == "high" else 'Medium',
                    description=cv_issue,
                    suggestion='Use a single-column, text-first resume layout with simple section headers and bullet points.'
                ))
        
        # Generate suggestions
        suggestions = self._generate_suggestions(
            raw_text, domain.primary, skills, 
            sections, experience, projects, ml_analysis=ml_analysis
        )
        
        # Keywords analysis
        keywords_analysis = self._analyze_keywords(raw_text, domain.primary)
        
        return {
            'score': final_score,
            'breakdown': breakdown,
            'category': category,
            'issues': issues,
            'suggestions': suggestions,
            'keywords_analysis': keywords_analysis,
            'methodology': self._build_methodology(
                final_score,
                keyword_score,
                section_score,
                formatting_score,
                skill_score,
                experience_score,
                project_score,
                ml_analysis=ml_analysis,
                cv_analysis=cv_analysis
            )
        }
    
    def _calculate_keyword_score(self, text: str, domain: str, sections: Dict = None) -> int:
        """Score based on keyword presence and relevance"""
        text_lower = text.lower()
        keywords = self.DOMAIN_KEYWORDS.get(domain, self.DOMAIN_KEYWORDS['General'])
        
        found = sum(1 for kw in keywords if kw in text_lower)
        
        # Also check for general action verbs
        action_verbs = [
            'achieved', 'built', 'created', 'delivered', 'enhanced',
            'generated', 'improved', 'launched', 'managed', 'optimized'
        ]
        verb_count = sum(1 for v in action_verbs if v in text_lower)
        
        keyword_ratio = found / len(keywords)
        verb_ratio = min(1.0, verb_count / 5)

        # Reward role language in stronger evidence zones, not just a keyword dump.
        sections = sections or {}
        evidence_text = " ".join([
            sections.get('experience', ''),
            sections.get('projects', ''),
            sections.get('summary', '')
        ]).lower()
        evidence_hits = sum(1 for kw in keywords if kw in evidence_text)
        evidence_ratio = evidence_hits / len(keywords)
        
        score = int((keyword_ratio * 45) + (evidence_ratio * 30) + (verb_ratio * 25))
        return min(100, score)
    
    def _calculate_section_score(self, sections: Dict, candidate: Any) -> int:
        """Score based on section completeness"""
        score = 0
        
        # Required sections (54 points)
        for section in self.REQUIRED_SECTIONS:
            if section in sections and len(sections[section].strip()) > 50:
                score += 18
        
        # Contact info (24 points)
        candidate_dict = candidate.dict() if hasattr(candidate, 'dict') else candidate
        if candidate_dict.get('name'):
            score += 6
        if candidate_dict.get('email'):
            score += 9
        if candidate_dict.get('phone'):
            score += 9
        
        # Recommended sections (22 points)
        for section in self.RECOMMENDED_SECTIONS:
            if section in sections and len(sections[section].strip()) > 20:
                score += 7
        
        return min(100, score)

    def _calculate_parseability_score(
        self,
        formatting: Dict,
        text: str,
        sections: Dict,
        candidate: Any,
        parsing_method: str = "standard",
        ocr_confidence: str = None
    ) -> int:
        """Score the closest public ATS behavior: clean text extraction and field parsing."""
        score = 100
        word_count = formatting.get('word_count', len(text.split()))
        line_count = formatting.get('line_count', len(text.split('\n')))
        candidate_dict = candidate.dict() if hasattr(candidate, 'dict') else candidate

        if parsing_method == "ocr_unavailable":
            score -= 35
        elif parsing_method == "ocr":
            score -= 15
            if ocr_confidence == "low":
                score -= 15
            elif ocr_confidence == "medium":
                score -= 6

        if formatting.get('has_tables'):
            score -= 18
        if formatting.get('has_images'):
            score -= 10

        if word_count < 150:
            score -= 28
        elif word_count < 250:
            score -= 12
        elif word_count > 1600:
            score -= 8

        if line_count < 8 and word_count > 250:
            score -= 12

        if not candidate_dict.get('email'):
            score -= 12
        if not candidate_dict.get('phone'):
            score -= 8

        if len(sections) < 3:
            score -= 12

        bullet_count = self._count_bullets(text)
        if bullet_count < 4 and word_count > 250:
            score -= 8
        elif bullet_count > 60:
            score -= 4

        broken_chars = text.count('\ufffd') + text.count('\x00')
        if broken_chars:
            score -= min(12, broken_chars * 2)

        return max(0, min(100, score))
    
    def _calculate_formatting_score(
        self, 
        formatting: Dict, 
        text: str,
        is_ocr: bool = False,
        penalty_factor: float = 1.0
    ) -> int:
        """Score based on formatting quality
        
        Args:
            formatting: Formatting metadata
            text: Raw resume text
            is_ocr: Whether text was extracted via OCR
            penalty_factor: Multiplier for penalties (reduced for OCR)
        """
        score = 100
        
        # Penalize for tables (reduced for OCR since detection may be inaccurate)
        if formatting.get('has_tables'):
            score -= int(15 * penalty_factor)
        
        # Penalize for images (reduced for OCR)
        if formatting.get('has_images'):
            score -= int(10 * penalty_factor)
        
        # Check word count (too short or too long)
        # More lenient for OCR since extraction may miss some text
        word_count = formatting.get('word_count', len(text.split()))
        min_words = 150 if is_ocr else 200
        if word_count < min_words:
            score -= int(20 * penalty_factor)
        elif word_count > 1500:
            score -= int(10 * penalty_factor)
        
        # Check for good structure (bullet points)
        # More lenient for OCR since bullet detection may fail
        bullet_count = text.count('•') + text.count('●') + text.count('-')
        min_bullets = 3 if is_ocr else 5
        if bullet_count < min_bullets:
            score -= int(10 * penalty_factor)
        elif bullet_count > 50:
            score -= int(5 * penalty_factor)
        
        # Check for special characters that might cause issues
        # Skip this check for OCR since it introduces artifacts
        if not is_ocr:
            special_chars = ['→', '★', '☆', '✓', '✔', '✗', '❖', '◆']
            for char in special_chars:
                if char in text:
                    score -= 3
        
        return max(0, min(100, score))
    
    def _calculate_skill_score(self, skills: SkillsData, text: str = "", sections: Dict = None) -> int:
        """Score based on skill breadth and whether skills are backed by evidence."""
        score = 0
        
        # Base score on skill count
        if skills.total_count >= 15:
            score += 40
        elif skills.total_count >= 10:
            score += 30
        elif skills.total_count >= 5:
            score += 20
        else:
            score += 10
        
        # Bonus for technical skills
        if skills.programming_languages:
            score += 15
        if skills.frameworks:
            score += 15
        if skills.tools:
            score += 10
        if skills.databases:
            score += 10
        
        # Bonus for soft skills
        if skills.soft_skills:
            score += 10

        all_skills = (
            skills.programming_languages + skills.frameworks +
            skills.tools + skills.databases + skills.soft_skills + skills.other
        )
        evidence_text = text.lower()
        if sections:
            evidence_text = " ".join([
                sections.get('experience', ''),
                sections.get('projects', ''),
                sections.get('summary', '')
            ]).lower() or evidence_text

        evidence_hits = 0
        for skill in all_skills:
            normalized = skill.lower()
            if normalized and normalized in evidence_text:
                evidence_hits += 1

        if all_skills:
            evidence_ratio = evidence_hits / len(all_skills)
            score = int(score * 0.70 + min(100, evidence_ratio * 100) * 0.30)

        return min(100, score)
    
    def _calculate_experience_score(self, experience: Any, text: str = "") -> int:
        """Score based on experience quality"""
        if not experience:
            return 30
        
        exp_dict = experience.dict() if hasattr(experience, 'dict') else experience
        positions = exp_dict.get('positions', [])
        
        if not positions:
            return 30
        
        score = 25  # Base score
        
        # Score for number of positions
        if len(positions) >= 3:
            score += 20
        elif len(positions) >= 2:
            score += 15
        else:
            score += 10
        
        # Score for bullet quality
        avg_quality = exp_dict.get('overall_quality', 0)
        score += int(avg_quality * 0.40)

        metric_count = len(re.findall(r'\d+%|\$[\d,]+|\b\d+\s*(users|customers|clients|employees|projects|requests|hours|days|months|revenue|sales)\b', text, re.IGNORECASE))
        score += min(18, metric_count * 4)

        action_verb_hits = sum(1 for verb in self.DOMAIN_KEYWORDS['General'] if re.search(rf'\b{re.escape(verb)}\b', text, re.IGNORECASE))
        score += min(12, action_verb_hits * 2)
        
        return min(100, score)
    
    def _calculate_project_score(self, projects: List, text: str = "") -> int:
        """Score based on projects quality"""
        if not projects:
            return 40  # No projects is not terrible
        
        score = 50  # Base score for having projects
        
        # Score based on project count and quality
        for project in projects[:5]:
            project_dict = project.dict() if hasattr(project, 'dict') else project
            project_score = project_dict.get('score', 0)
            score += project_score * 0.1

        if self._has_metrics(text):
            score += 8
        
        return min(100, int(score))
    
    def _get_score_category(self, score: int) -> str:
        """Get score category label"""
        if score >= 80:
            return 'Excellent'
        elif score >= 60:
            return 'Good'
        elif score >= 40:
            return 'Needs Improvement'
        else:
            return 'Poor'
    
    def _identify_issues(
        self, text: str, sections: Dict, formatting: Dict,
        skills: SkillsData, candidate: Any, experience: Any,
        parsing_method: str = "standard",
        ocr_confidence: str = None
    ) -> List[ATSIssue]:
        """Identify ATS compatibility issues"""
        issues = []

        if parsing_method == "ocr_unavailable":
            issues.append(ATSIssue(
                type='parseability',
                severity='High',
                description='Resume may not be fully machine-readable',
                suggestion='Upload a text-based PDF or DOCX. Scanned resumes can fail parsing in many ATS systems.'
            ))
        elif parsing_method == "ocr" and ocr_confidence == "low":
            issues.append(ATSIssue(
                type='parseability',
                severity='High',
                description='Low-confidence OCR extraction detected',
                suggestion='Use an exported text PDF or DOCX instead of a scanned/photo-based resume.'
            ))
        
        # Formatting issues
        if formatting.get('has_tables'):
            issues.append(ATSIssue(
                type='formatting',
                severity='High',
                description='Tables detected in resume',
                suggestion='Replace tables with simple section headings and bullet points. ATS parsers often read table cells in the wrong order.'
            ))
        
        if formatting.get('has_images'):
            issues.append(ATSIssue(
                type='formatting',
                severity='Medium',
                description='Images or graphics detected',
                suggestion='Remove images, logos, and icons. Use text-only formatting for better ATS compatibility.'
            ))
        
        # Contact info issues
        candidate_dict = candidate.dict() if hasattr(candidate, 'dict') else candidate
        if not candidate_dict.get('email'):
            issues.append(ATSIssue(
                type='contact',
                severity='High',
                description='Email address not detected',
                suggestion='Add a clearly formatted email address at the top of your resume.'
            ))
        
        if not candidate_dict.get('phone'):
            issues.append(ATSIssue(
                type='contact',
                severity='Medium',
                description='Phone number not detected',
                suggestion='Add a phone number in standard format (e.g., (555) 123-4567).'
            ))
        
        # Section issues
        if 'experience' not in sections:
            issues.append(ATSIssue(
                type='section',
                severity='High',
                description='Work Experience section not detected',
                suggestion='Add a clearly labeled "Experience" or "Work Experience" section header.'
            ))
        
        if 'education' not in sections:
            issues.append(ATSIssue(
                type='section',
                severity='Medium',
                description='Education section not detected',
                suggestion='Add a clearly labeled "Education" section header.'
            ))
        
        if 'skills' not in sections:
            issues.append(ATSIssue(
                type='section',
                severity='Medium',
                description='Skills section not detected',
                suggestion='Add a dedicated "Skills" section to highlight your technical and soft skills.'
            ))
        
        # Skills issues
        if skills.total_count < 5:
            issues.append(ATSIssue(
                type='skills',
                severity='Medium',
                description='Limited skills detected',
                suggestion='Add more relevant skills. Include programming languages, tools, and soft skills.'
            ))
        
        # Content issues
        text_lower = text.lower()
        word_count = len(text.split())
        
        if word_count < 200:
            issues.append(ATSIssue(
                type='content',
                severity='High',
                description='Resume appears too short',
                suggestion='Add more detail about your experience, projects, and achievements.'
            ))

        if len(sections) < 3:
            issues.append(ATSIssue(
                type='structure',
                severity='Medium',
                description='Few standard resume sections detected',
                suggestion='Use clear headings such as Summary, Skills, Experience, Projects, Education, and Certifications.'
            ))
        
        # Check for generic descriptions
        generic_phrases = [
            'responsible for', 'duties included', 'helped with',
            'worked on', 'assisted in'
        ]
        generic_count = sum(1 for p in generic_phrases if p in text_lower)
        if generic_count >= 3:
            issues.append(ATSIssue(
                type='content',
                severity='Medium',
                description='Generic job descriptions detected',
                suggestion='Replace generic phrases like "responsible for" with action verbs like "developed", "led", or "implemented".'
            ))
        
        # Check for metrics
        has_metrics = bool(re.search(r'\d+%|\$[\d,]+|\d+\s*(users|customers|clients|employees|projects)', text))
        if not has_metrics:
            issues.append(ATSIssue(
                type='content',
                severity='Medium',
                description='No quantifiable achievements detected',
                suggestion='Add metrics and numbers to demonstrate impact (e.g., "Increased sales by 25%", "Managed team of 5").'
            ))

        if self._count_bullets(text) < 4 and word_count > 250:
            issues.append(ATSIssue(
                type='readability',
                severity='Medium',
                description='Limited bullet structure detected',
                suggestion='Use concise bullets under experience and projects so recruiters and ATS parsers can scan achievements quickly.'
            ))
        
        return issues
    
    def _generate_suggestions(
        self, text: str, domain: str, skills: SkillsData,
        sections: Dict, experience: Any, projects: List,
        ml_analysis: Dict[str, Any] = None
    ) -> List[Suggestion]:
        """Generate resume-specific suggestions instead of generic domain advice."""
        suggestions = []
        seen_titles = set()
        text_lower = text.lower()

        def add_suggestion(category: str, title: str, description: str, priority: str, examples: List[str]):
            if title in seen_titles:
                return
            seen_titles.add(title)
            suggestions.append(Suggestion(
                category=category,
                title=title,
                description=description,
                priority=priority,
                examples=examples
            ))

        word_count = len(text.split())
        bullet_count = self._count_bullets(text)
        metric_count = len(re.findall(
            r'\d+%|\$[\d,]+|\b\d+\s*(users|customers|clients|employees|projects|requests|hours|days|months|revenue|sales|leads|tickets|deployments)\b',
            text,
            re.IGNORECASE
        ))
        exp_dict = experience.dict() if hasattr(experience, 'dict') else experience or {}
        positions = exp_dict.get('positions', []) or []
        all_skills = self._all_skills(skills)
        top_skills = all_skills[:6]
        evidence_text = " ".join([
            sections.get('experience', ''),
            sections.get('projects', ''),
            sections.get('summary', '')
        ]).lower()
        skills_with_evidence = [
            skill for skill in all_skills
            if skill.lower() in evidence_text
        ]
        skills_without_evidence = [
            skill for skill in all_skills
            if skill.lower() not in evidence_text
        ]

        missing_sections = [
            name.title()
            for name in self.REQUIRED_SECTIONS
            if name not in sections or len(sections.get(name, '').strip()) < 50
        ]
        if missing_sections:
            add_suggestion(
                'Structure',
                f'Add clearer {", ".join(missing_sections[:2])} section{"s" if len(missing_sections[:2]) > 1 else ""}',
                'The parser could not confidently read every required resume section from this file.',
                'High',
                [
                    'Use exact headings such as Skills, Experience, Projects, and Education',
                    'Keep section content as selectable text, not inside images or complex tables',
                    'Place the most relevant section above less important details'
                ]
            )

        if metric_count < 2:
            metric_target = 'project and experience bullets' if projects and positions else 'resume bullets'
            add_suggestion(
                'Impact',
                f'Quantify impact in your {metric_target}',
                f'The resume only shows {metric_count} measurable achievement signal{"s" if metric_count != 1 else ""}. Recruiters need numbers to judge scale and outcomes.',
                'High',
                [
                    'Reduced processing time by 30% by optimizing API/database queries',
                    'Built a tool used by 500+ users or processing 10k+ records',
                    'Automated a workflow and saved 5 hours per week'
                ]
            )

        weak_verbs = ['helped', 'worked', 'assisted', 'was responsible', 'responsible for']
        weak_hits = [verb for verb in weak_verbs if verb in text_lower]
        if weak_hits:
            add_suggestion(
                'Content',
                'Rewrite weak responsibility phrases',
                f'The resume contains generic wording such as "{weak_hits[0]}". Replace it with ownership and outcome language.',
                'High',
                [
                    'Replace "worked on a project" with "Built the authentication module using React and FastAPI"',
                    'Replace "responsible for testing" with "Tested 20+ API flows and reduced release defects"',
                    'Start bullets with Built, Led, Optimized, Automated, Delivered, or Improved'
                ]
            )

        if bullet_count < 4 and word_count > 220:
            add_suggestion(
                'Readability',
                'Convert dense text into achievement bullets',
                'The resume has enough content, but not enough scannable bullet structure for ATS and recruiter review.',
                'High',
                [
                    'Built X using Y, improving Z by 30%',
                    'Led X-person team to deliver Y ahead of schedule',
                    'Automated X workflow, saving Y hours per week'
                ]
            )

        if all_skills and len(skills_with_evidence) / max(1, len(all_skills)) < 0.45 and skills_without_evidence:
            add_suggestion(
                category='Skills',
                title='Prove listed skills inside projects or experience',
                description=f'{len(skills_without_evidence)} detected skill{"s" if len(skills_without_evidence) != 1 else ""} appear weakly connected to work evidence. Move the most important ones into bullets.',
                priority='High',
                examples=[
                    f'Use {skill} in a project/experience bullet with what you built and the result'
                    for skill in skills_without_evidence[:4]
                ]
            )

        if skills.total_count < 6:
            add_suggestion(
                'Skills',
                'Expand the skills section with tools you actually used',
                f'The resume has {skills.total_count} detected skill{"s" if skills.total_count != 1 else ""}. Add more real tools from your own projects, coursework, internship, or work experience.',
                'Medium',
                [
                    f'Keep current strengths visible: {", ".join(top_skills[:4])}' if top_skills else 'Add your strongest languages, frameworks, tools, and databases',
                    'Add only skills you can explain in interview with a project or task',
                    'Group skills as Languages, Frameworks, Databases, Tools, and Soft Skills'
                ]
            )

        if 'summary' not in sections and (top_skills or positions or projects):
            add_suggestion(
                category='Structure',
                title='Add a targeted professional summary',
                description='A short summary should tell HR the role direction, strongest proof, and top technologies before they scan the full resume.',
                priority='Medium',
                examples=[
                    f'{domain} candidate with hands-on experience in {", ".join(top_skills[:3]) or "relevant tools"}',
                    'Mention your strongest project, measurable result, and target role in 2-3 lines'
                ]
            )

        if (not projects or len(projects) < 2) and len(positions) < 2 and domain in ('Software / IT', 'Data / AI'):
            add_suggestion(
                category='Projects',
                title='Add one stronger proof project',
                description='Because the resume has limited work/project evidence, one detailed project can make the profile more credible.',
                priority='Medium',
                examples=[
                    'Include problem, tech stack, your role, features built, deployment, and measurable outcome',
                    f'Use your current strengths: {", ".join(top_skills[:4]) or "your core technical stack"}',
                    'Add GitHub/live link if available'
                ]
            )

        if ml_analysis and ml_analysis.get("recommendations"):
            add_suggestion(
                category='Content Quality',
                title='Improve recruiter evidence signals',
                description='The resume quality model found patterns specific to this file that can be strengthened.',
                priority='Medium',
                examples=ml_analysis["recommendations"][:4]
            )
        
        if not suggestions:
            add_suggestion(
                'Final Polish',
                'Tailor the top third of the resume to the exact JD',
                'The resume does not show a severe generic issue. The best improvement is role-specific tailoring before each application.',
                'Low',
                [
                    'Mirror the JD title and top 3 required skills in the summary when truthful',
                    'Move the most relevant project or achievement higher',
                    'Keep every claim backed by a project, metric, or responsibility'
                ]
            )

        priority_order = {'High': 0, 'Medium': 1, 'Low': 2}
        suggestions.sort(key=lambda item: priority_order.get(item.priority, 3))
        return suggestions[:6]

    def _all_skills(self, skills: SkillsData) -> List[str]:
        """Return de-duplicated detected skills in display order."""
        values = (
            skills.programming_languages + skills.frameworks +
            skills.tools + skills.databases + skills.soft_skills + skills.other
        )
        unique = []
        seen = set()
        for value in values:
            normalized = value.strip().lower()
            if normalized and normalized not in seen:
                seen.add(normalized)
                unique.append(value)
        return unique

    def _count_bullets(self, text: str) -> int:
        """Count common bullet styles across text extraction variants."""
        bullet_lines = 0
        for line in text.splitlines():
            stripped = line.strip()
            if stripped.startswith(('\u2022', '\u25cf', '\u25cb', '-', '*', '\u2013', '\u2014')):
                bullet_lines += 1
            elif re.match(r'^\d+[\.)]\s+', stripped):
                bullet_lines += 1
        legacy_chars = text.count('â€¢') + text.count('â—') + text.count('â—‹')
        return bullet_lines + legacy_chars

    def _has_metrics(self, text: str) -> bool:
        """Detect measurable achievement evidence."""
        return bool(re.search(
            r'\d+%|\$[\d,]+|\b\d+\s*(users|customers|clients|employees|projects|requests|hours|days|months|revenue|sales|leads|tickets|deployments)\b',
            text,
            re.IGNORECASE
        ))

    def _build_methodology(
        self,
        final_score: int,
        keyword_score: int,
        section_score: int,
        formatting_score: int,
        skill_score: int,
        experience_score: int,
        project_score: int,
        ml_analysis: Dict[str, Any] = None,
        cv_analysis: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """Return explainable scoring metadata for UI/reporting."""
        methodology = {
            "model": "ATS Parseability + Recruiter Readiness v2",
            "score": final_score,
            "weights": {
                "ATS parseability": int(self.SCORE_WEIGHTS['formatting_score'] * 100),
                "Role keyword relevance": int(self.SCORE_WEIGHTS['keyword_relevance'] * 100),
                "Evidence-backed skills": int(self.SCORE_WEIGHTS['skill_relevance'] * 100),
                "Recruiter readability": int(self.SCORE_WEIGHTS['experience_clarity'] * 100),
                "Section completeness": int(self.SCORE_WEIGHTS['section_completeness'] * 100),
                "Project impact": int(self.SCORE_WEIGHTS['project_impact'] * 100),
            },
            "signals": {
                "ATS parseability": formatting_score,
                "Role keyword relevance": keyword_score,
                "Evidence-backed skills": skill_score,
                "Recruiter readability": experience_score,
                "Section completeness": section_score,
                "Project impact": project_score,
            },
            "note": "This is an explainable approximation. Real ATS products parse and rank differently by vendor and employer configuration."
        }
        if ml_analysis:
            methodology["ml_quality"] = {
                "backend": ml_analysis.get("backend"),
                "score": ml_analysis.get("score"),
                "label": ml_analysis.get("label"),
                "probabilities": ml_analysis.get("probabilities", {}),
                "features": ml_analysis.get("features", {}),
                "training": ml_analysis.get("training", {}),
            }
        if cv_analysis:
            methodology["computer_vision"] = {
                "backend": cv_analysis.get("backend"),
                "layout_score": cv_analysis.get("layout_score"),
                "risk_level": cv_analysis.get("risk_level"),
                "signals": cv_analysis.get("signals", {}),
                "issues": cv_analysis.get("issues", []),
            }
        return methodology
    
    def _get_missing_skills(self, skills: SkillsData, domain: str) -> List[str]:
        """Get skills that are commonly required but missing"""
        domain_skills = {
            'Software / IT': ['Python', 'JavaScript', 'React', 'AWS', 'Docker', 'Git', 'SQL', 'REST API'],
            'Data / AI': ['Python', 'SQL', 'TensorFlow', 'Pandas', 'Machine Learning', 'Statistics', 'Tableau'],
            'Marketing': ['Google Analytics', 'SEO', 'Content Strategy', 'HubSpot', 'Social Media Marketing'],
            'Finance': ['Excel', 'Financial Modeling', 'SQL', 'Power BI', 'Risk Analysis'],
            'Design': ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
            'HR': ['Workday', 'ATS', 'Recruiting', 'Employee Relations', 'HRIS'],
            'Sales': ['Salesforce', 'CRM', 'Pipeline Management', 'Negotiation', 'Cold Calling']
        }
        
        required = domain_skills.get(domain, domain_skills['Software / IT'])
        current = set(
            s.lower() for s in 
            skills.programming_languages + skills.frameworks + 
            skills.tools + skills.databases + skills.soft_skills
        )
        
        missing = [s for s in required if s.lower() not in current]
        return missing
    
    def _analyze_keywords(self, text: str, domain: str) -> KeywordsAnalysis:
        """Analyze keyword presence and recommendations"""
        text_lower = text.lower()
        
        # Get domain keywords
        domain_keywords = self.DOMAIN_KEYWORDS.get(domain, self.DOMAIN_KEYWORDS['General'])
        
        found = [kw for kw in domain_keywords if kw in text_lower]
        missing = [kw for kw in domain_keywords if kw not in text_lower]
        
        # Recommended keywords from other domains that might be relevant
        general_keywords = self.DOMAIN_KEYWORDS['General']
        recommended = [kw for kw in general_keywords if kw not in text_lower and kw not in missing]
        
        return KeywordsAnalysis(
            found=found,
            missing=missing[:10],
            recommended=recommended[:5]
        )
