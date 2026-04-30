"""
JD Comparator Service - Compares resume against job description
"""
import re
from typing import Dict, List, Any, Tuple
from collections import Counter
from app.models.schemas import KeywordsAnalysis


class JDComparator:
    """Compare resume against job description and generate insights"""
    
    # Skill extraction patterns
    SKILL_INDICATORS = [
        r'\b(proficient|experienced|skilled|expertise|expert|knowledge|familiar)\s+(?:in|with|of)\s+([^,.\n]+)',
        r'\b(should|must|required|looking for|need|seeking)\s+(?:.*?)\s+(?:in|with|of)\s+([^,.\n]+)',
        r'(years?|yrs?)\s+(?:of\s+)?(?:experience|expertise)\s+(?:in|with)\s+([^,.\n]+)',
    ]
    
    # Experience requirement patterns
    EXPERIENCE_PATTERNS = [
        r'(\d+)\+?\s+years?\s+(?:of\s+)?(?:experience|expertise)(?:\s+in)?',
        r'(\d+)\+?\s+(?:years?|yrs?)\s+professional',
    ]
    
    # Soft skills list
    SOFT_SKILLS = {
        'communication', 'teamwork', 'leadership', 'collaboration', 'problem solving',
        'critical thinking', 'analytical', 'organization', 'time management', 'adaptability',
        'creativity', 'attention to detail', 'work ethic', 'reliability', 'accountability',
        'initiative', 'flexibility', 'learning ability', 'mentoring', 'decision making',
        'project management', 'stakeholder management', 'presentation', 'negotiation',
        'interpersonal', 'emotional intelligence', 'customer service', 'sales'
    }

    SKILL_ALIASES = {
        'nextjs': 'next.js',
        'next.js': 'next.js',
        'nodejs': 'node.js',
        'node.js': 'node.js',
        'reactjs': 'react',
        'react.js': 'react',
        'postgres': 'postgresql',
        'postgresql': 'postgresql',
        'mongo': 'mongodb',
        'mongo db': 'mongodb',
        'amazon web services': 'aws',
        'google cloud': 'gcp',
        'google cloud platform': 'gcp',
        'microsoft azure': 'azure',
        'rest': 'rest api',
        'restful api': 'rest api',
        'rest api': 'rest api',
        'ci/cd': 'ci/cd',
        'cicd': 'ci/cd',
        'machine learning': 'machine learning',
        'ml': 'machine learning',
        'artificial intelligence': 'ai',
        'powerbi': 'power bi',
        'ms excel': 'excel',
    }
    
    def __init__(self):
        pass
    
    def compare(
        self,
        resume_text: str,
        resume_skills: Dict[str, List[str]],
        jd_text: str
    ) -> Dict[str, Any]:
        """
        Compare resume against job description and return analysis
        """
        # Extract JD components
        jd_requirements = self._extract_jd_requirements(jd_text)
        jd_skills = self._extract_jd_skills(jd_text)
        jd_keywords = self._extract_jd_keywords(jd_text)
        
        # Extract resume components
        resume_keywords = self._extract_resume_keywords(resume_text)
        
        # Calculate matches
        skill_match = self._calculate_skill_match(resume_skills, jd_skills)
        keyword_match = self._calculate_keyword_match(resume_keywords, jd_keywords)
        experience_match = self._calculate_experience_match(resume_text, jd_requirements)
        
        # Overall match percentage
        match_percentage = self._calculate_overall_match(
            skill_match,
            keyword_match,
            experience_match
        )
        
        # Generate missing items
        missing_skills = self._get_missing_skills(resume_skills, jd_skills)
        missing_keywords = self._get_missing_keywords(resume_keywords, jd_keywords)
        
        # Generate suggestions
        suggestions = self._generate_suggestions(
            match_percentage,
            missing_skills,
            missing_keywords,
            jd_requirements,
            resume_text
        )
        
        # Generate recruiter report
        recruiter_report = self._generate_recruiter_report(
            match_percentage,
            skill_match,
            keyword_match,
            experience_match,
            missing_skills,
            jd_requirements
        )
        
        return {
            "match_percentage": match_percentage,
            "skill_match_percentage": skill_match,
            "keyword_match_percentage": keyword_match,
            "experience_match_percentage": experience_match,
            "jd_requirements": jd_requirements,
            "jd_skills": jd_skills,
            "jd_keywords": jd_keywords,
            "missing_skills": missing_skills,
            "missing_keywords": missing_keywords,
            "suggestions": suggestions,
            "recruiter_report": recruiter_report
        }
    
    def _extract_jd_requirements(self, jd_text: str) -> Dict[str, Any]:
        """Extract experience and requirements from JD"""
        requirements = {
            "years_of_experience": None,
            "education": [],
            "certifications": [],
            "other": []
        }
        
        # Extract years of experience
        exp_match = re.search(r'(\d+)\+?\s+years?\s+(?:of\s+)?(?:experience|expertise)', jd_text, re.IGNORECASE)
        if exp_match:
            requirements["years_of_experience"] = int(exp_match.group(1))
        
        # Extract education requirements
        edu_patterns = [
            r"(?:bachelor|b\.?s\.?|master|m\.?s\.?|phd|ph\.?d\.?|diploma)\s+(?:in|of)?\s+([^,.\n]+)",
        ]
        for pattern in edu_patterns:
            matches = re.findall(pattern, jd_text, re.IGNORECASE)
            requirements["education"].extend(matches)
        
        # Extract certification requirements
        cert_patterns = [
            r"(?:certified|certification|cert|license)\s+(?:in|as)?\s+([^,.\n]+)",
        ]
        for pattern in cert_patterns:
            matches = re.findall(pattern, jd_text, re.IGNORECASE)
            requirements["certifications"].extend(matches)
        
        return requirements
    
    def _extract_jd_skills(self, jd_text: str) -> Dict[str, List[str]]:
        """Extract technical skills from JD"""
        jd_skills = {
            "programming_languages": [],
            "frameworks": [],
            "tools": [],
            "databases": [],
            "other": []
        }
        
        # Common technology keywords
        programming_langs = ['python', 'java', 'javascript', 'typescript', 'c#', 'c++', 'cpp', 'rust', 'go', 'golang', 'ruby', 'php', 'swift', 'kotlin', 'scala', 'r', 'matlab']
        frameworks = ['react', 'react.js', 'reactjs', 'angular', 'vue', 'django', 'flask', 'spring', 'fastapi', 'express', 'node.js', 'nodejs', 'nextjs', 'next.js', 'asp.net', '.net']
        tools = ['git', 'github actions', 'docker', 'kubernetes', 'jenkins', 'aws', 'azure', 'gcp', 'ci/cd', 'postgres', 'mongodb', 'redis', 'kafka', 'elasticsearch', 'tableau', 'power bi', 'excel']
        databases = ['postgresql', 'postgres', 'mysql', 'mongodb', 'firebase', 'cassandra', 'dynamodb', 'oracle', 'sql server']
        
        text_lower = jd_text.lower()
        
        # Extract programming languages
        for lang in programming_langs:
            if self._contains_term(text_lower, lang):
                jd_skills["programming_languages"].append(self._normalize_skill(lang))
        
        # Extract frameworks
        for fw in frameworks:
            if self._contains_term(text_lower, fw):
                jd_skills["frameworks"].append(self._normalize_skill(fw))
        
        # Extract tools
        for tool in tools:
            if self._contains_term(text_lower, tool):
                jd_skills["tools"].append(self._normalize_skill(tool))
        
        # Extract databases
        for db in databases:
            if self._contains_term(text_lower, db):
                jd_skills["databases"].append(self._normalize_skill(db))

        for category in jd_skills:
            jd_skills[category] = sorted(set(jd_skills[category]))
        
        return jd_skills
    
    def _extract_jd_keywords(self, jd_text: str) -> List[str]:
        """Extract important keywords from JD"""
        # Remove common words and extract meaningful keywords
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'as', 'by', 'from', 'is', 'are', 'be', 'have', 'has',
            'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can',
            'we', 'you', 'they', 'he', 'she', 'it', 'our', 'your', 'their'
        }
        
        words = jd_text.lower().split()
        keywords = []
        
        for i, word in enumerate(words):
            # Clean word
            clean_word = re.sub(r'[^a-z0-9\+\#\-]', '', word).strip()
            
            if len(clean_word) > 3 and clean_word not in stop_words and not clean_word.isdigit():
                keywords.append(clean_word)

        # Add high-signal two-word phrases often used in job descriptions.
        normalized_text = re.sub(r'[^a-z0-9\+\#\-\s]', ' ', jd_text.lower())
        for phrase in [
            'machine learning', 'data analysis', 'project management', 'rest api',
            'cloud computing', 'problem solving', 'unit testing', 'system design',
            'stakeholder management', 'customer service'
        ]:
            if phrase in normalized_text:
                keywords.append(phrase)
        
        # Get most common keywords
        keyword_freq = Counter(keywords)
        top_keywords = [kw for kw, count in keyword_freq.most_common(35) if count >= 1]
        
        return top_keywords
    
    def _extract_resume_keywords(self, resume_text: str) -> List[str]:
        """Extract keywords from resume"""
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'as', 'by', 'from', 'is', 'are', 'be', 'have', 'has',
            'do', 'does', 'did', 'will', 'would', 'should', 'could', 'can',
            'we', 'you', 'they', 'he', 'she', 'it', 'our', 'your', 'their'
        }
        
        words = resume_text.lower().split()
        keywords = []
        
        for word in words:
            clean_word = re.sub(r'[^a-z0-9\+\#\-]', '', word).strip()
            if len(clean_word) > 3 and clean_word not in stop_words and not clean_word.isdigit():
                keywords.append(clean_word)
        
        normalized_text = re.sub(r'[^a-z0-9\+\#\-\s]', ' ', resume_text.lower())
        for phrase in [
            'machine learning', 'data analysis', 'project management', 'rest api',
            'cloud computing', 'problem solving', 'unit testing', 'system design',
            'stakeholder management', 'customer service'
        ]:
            if phrase in normalized_text:
                keywords.append(phrase)

        keyword_freq = Counter(keywords)
        top_keywords = [kw for kw, count in keyword_freq.most_common(35) if count >= 1]
        
        return top_keywords
    
    def _calculate_skill_match(self, resume_skills: Dict[str, List[str]], jd_skills: Dict[str, List[str]]) -> int:
        """Calculate skill match percentage"""
        if not any(jd_skills.values()):
            return 100  # No specific skills required
        
        total_jd_skills = sum(len(v) for v in jd_skills.values())
        if total_jd_skills == 0:
            return 100
        
        matched_skills = 0
        
        # Normalize resume skills to lowercase
        resume_skills_lower = {
            k: [self._normalize_skill(s) for s in v] 
            for k, v in resume_skills.items() if v
        }
        
        # Check matches
        for category, skills in jd_skills.items():
            resume_category = resume_skills_lower.get(category, [])
            for skill in skills:
                skill_lower = self._normalize_skill(skill)
                if skill_lower in resume_category or any(self._soft_skill_match(skill_lower, rs) for rs in resume_category):
                    matched_skills += 1
        
        match_percentage = int((matched_skills / total_jd_skills) * 100) if total_jd_skills > 0 else 100
        return min(100, match_percentage)
    
    def _calculate_keyword_match(self, resume_keywords: List[str], jd_keywords: List[str]) -> int:
        """Calculate keyword match percentage"""
        if not jd_keywords:
            return 100
        
        jd_keywords_lower = [kw.lower() for kw in jd_keywords]
        resume_keywords_lower = [kw.lower() for kw in resume_keywords]
        
        matched = sum(
            1 for kw in jd_keywords_lower
            if kw in resume_keywords_lower or any(self._soft_keyword_match(kw, rkw) for rkw in resume_keywords_lower)
        )
        match_percentage = int((matched / len(jd_keywords_lower)) * 100)
        
        return min(100, match_percentage)
    
    def _calculate_experience_match(self, resume_text: str, jd_requirements: Dict[str, Any]) -> int:
        """Calculate experience match percentage"""
        required_years = jd_requirements.get("years_of_experience")
        if required_years is None:
            return 100  # No specific experience required
        
        # Extract experience from resume
        exp_match = re.search(r'(\d+)\+?\s+years?\s+(?:of\s+)?(?:experience|expertise)', resume_text, re.IGNORECASE)
        
        if not exp_match:
            return 50  # Some experience implied but not explicitly stated
        
        resume_years = int(exp_match.group(1))
        
        if resume_years >= required_years:
            return 100
        else:
            match_percentage = int((resume_years / required_years) * 100)
            return min(100, match_percentage)
    
    def _calculate_overall_match(self, skill_match: int, keyword_match: int, experience_match: int) -> int:
        """Calculate overall match percentage with weighted average"""
        return int((skill_match * 0.5 + keyword_match * 0.3 + experience_match * 0.2))
    
    def _get_missing_skills(self, resume_skills: Dict[str, List[str]], jd_skills: Dict[str, List[str]]) -> Dict[str, List[str]]:
        """Get skills mentioned in JD but not in resume"""
        missing = {}
        
        resume_skills_lower = {
            k: [self._normalize_skill(s) for s in v] 
            for k, v in resume_skills.items() if v
        }
        
        for category, skills in jd_skills.items():
            missing_in_category = []
            resume_category = resume_skills_lower.get(category, [])
            
            for skill in skills:
                skill_lower = self._normalize_skill(skill)
                if skill_lower not in resume_category and not any(self._soft_skill_match(skill_lower, rs) for rs in resume_category):
                    missing_in_category.append(skill)
            
            if missing_in_category:
                missing[category] = missing_in_category
        
        return missing
    
    def _get_missing_keywords(self, resume_keywords: List[str], jd_keywords: List[str]) -> List[str]:
        """Get keywords in JD but not in resume"""
        resume_keywords_lower = [kw.lower() for kw in resume_keywords]
        jd_keywords_lower = [kw.lower() for kw in jd_keywords]
        
        missing = [
            kw for kw in jd_keywords_lower
            if kw not in resume_keywords_lower and not any(self._soft_keyword_match(kw, rkw) for rkw in resume_keywords_lower)
        ]
        return missing[:15]  # Top 15 missing keywords

    def _contains_term(self, text: str, term: str) -> bool:
        """Match skill terms that may include punctuation like c#, .net, or next.js."""
        escaped = re.escape(term.lower())
        return bool(re.search(rf'(?<![a-z0-9]){escaped}(?![a-z0-9])', text))

    def _normalize_skill(self, skill: str) -> str:
        cleaned = re.sub(r'\s+', ' ', skill.lower().strip())
        cleaned = cleaned.replace('c++', 'cpp')
        return self.SKILL_ALIASES.get(cleaned, cleaned)

    def _soft_skill_match(self, required: str, candidate: str) -> bool:
        if required == candidate:
            return True
        return required in candidate or candidate in required

    def _soft_keyword_match(self, required: str, candidate: str) -> bool:
        if required == candidate:
            return True
        if len(required) <= 4 or len(candidate) <= 4:
            return False
        return required in candidate or candidate in required
    
    def _generate_suggestions(
        self,
        match_percentage: int,
        missing_skills: Dict[str, List[str]],
        missing_keywords: List[str],
        jd_requirements: Dict[str, Any],
        resume_text: str
    ) -> List[Dict[str, str]]:
        """Generate actionable suggestions"""
        suggestions = []
        
        # Low match - needs improvements
        if match_percentage < 40:
            suggestions.append({
                "category": "Overall Match",
                "title": "Significant Gap Detected",
                "description": f"Your resume has only {match_percentage}% match with the job description. Consider adding more relevant skills and keywords.",
                "priority": "High"
            })
        
        # Missing skills
        if missing_skills:
            total_missing = sum(len(v) for v in missing_skills.values())
            suggestions.append({
                "category": "Skills",
                "title": f"Add {total_missing} Missing Skills",
                "description": f"The JD requires skills you haven't mentioned: {', '.join(list(missing_skills.values())[0][:3])}. Update your resume to highlight if you have experience with these.",
                "priority": "High"
            })
        
        # Missing keywords
        if missing_keywords and len(missing_keywords) > 0:
            suggestions.append({
                "category": "Keywords",
                "title": "Include Important Keywords",
                "description": f"Add keywords from the JD to improve ATS visibility: {', '.join(missing_keywords[:5])}",
                "priority": "Medium"
            })
        
        # Experience requirements
        req_years = jd_requirements.get("years_of_experience")
        if req_years:
            if not re.search(r'\d+\s+years?\s+(?:of\s+)?experience', resume_text, re.IGNORECASE):
                suggestions.append({
                    "category": "Experience",
                    "title": "Highlight Your Experience",
                    "description": f"The position requires {req_years}+ years of experience. Clearly state your years of experience in your resume.",
                    "priority": "High"
                })
        
        # Action verbs
        if not re.search(r'\b(led|developed|designed|implemented|achieved|increased|reduced)\b', resume_text, re.IGNORECASE):
            suggestions.append({
                "category": "Impact",
                "title": "Use Stronger Action Verbs",
                "description": "Use action verbs to demonstrate impact. Replace generic descriptions with strong verbs like 'led', 'developed', 'designed', 'implemented'.",
                "priority": "Medium"
            })
        
        return suggestions
    
    def _generate_recruiter_report(
        self,
        match_percentage: int,
        skill_match: int,
        keyword_match: int,
        experience_match: int,
        missing_skills: Dict[str, List[str]],
        jd_requirements: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Generate professional recruiter report"""
        
        # Determine overall fit rating
        if match_percentage >= 80:
            fit_rating = "Excellent Fit"
            summary = "This resume is a strong match for the position. The candidate has most required skills and experience."
        elif match_percentage >= 60:
            fit_rating = "Good Fit"
            summary = "This resume matches well with the job requirements. The candidate has relevant experience but may need some upskilling."
        elif match_percentage >= 40:
            fit_rating = "Moderate Fit"
            summary = "The candidate has some relevant experience but is missing several key requirements. Consider with training needs in mind."
        else:
            fit_rating = "Poor Fit"
            summary = "This resume has limited alignment with the job requirements. Significant gaps in skills and experience."
        
        missing_skills_summary = []
        for category, skills in missing_skills.items():
            if skills:
                missing_skills_summary.append(f"{category}: {', '.join(skills[:3])}")
        
        report = {
            "fit_rating": fit_rating,
            "overall_summary": summary,
            "match_breakdown": {
                "skill_match": skill_match,
                "keyword_match": keyword_match,
                "experience_match": experience_match,
                "overall_match": match_percentage
            },
            "strengths": self._identify_strengths(skill_match, keyword_match, experience_match),
            "gaps": missing_skills_summary if missing_skills_summary else ["No major gaps identified"],
            "recommendation": self._get_recommendation(match_percentage),
            "next_steps": self._get_next_steps(match_percentage, missing_skills)
        }
        
        return report
    
    def _identify_strengths(self, skill_match: int, keyword_match: int, experience_match: int) -> List[str]:
        """Identify candidate strengths"""
        strengths = []
        
        if skill_match >= 80:
            strengths.append("Strong technical skill alignment")
        if keyword_match >= 80:
            strengths.append("Good keyword and terminology match")
        if experience_match >= 80:
            strengths.append("Meets or exceeds experience requirements")
        
        if not strengths:
            strengths.append("Resume demonstrates some relevant capabilities")
        
        return strengths
    
    def _get_recommendation(self, match_percentage: int) -> str:
        """Get recruiter recommendation"""
        if match_percentage >= 80:
            return "Highly recommended to proceed to next stage of evaluation"
        elif match_percentage >= 60:
            return "Recommended for consideration, may require interview to assess specific skills"
        elif match_percentage >= 40:
            return "Consider if you have training budget or can accept career growth potential"
        else:
            return "Not recommended for this specific role; explore other positions"
    
    def _get_next_steps(self, match_percentage: int, missing_skills: Dict[str, List[str]]) -> List[str]:
        """Get recommended next steps"""
        steps = []
        
        if match_percentage >= 80:
            steps.append("Schedule technical interview")
            steps.append("Verify claims with work samples or portfolio")
        elif match_percentage >= 60:
            steps.append("Conduct initial phone screening")
            steps.append("Assess technical skills through coding challenge or task")
        elif match_percentage >= 40:
            total_missing = sum(len(v) for v in missing_skills.values())
            steps.append(f"Note {total_missing} skills gaps for interview discussion")
            steps.append("Evaluate if gaps can be filled through training")
        else:
            steps.append("Archive for future opportunities")
            steps.append("Suggest candidate explore other relevant positions")
        
        return steps
