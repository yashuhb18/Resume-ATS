"""
Pydantic schemas for the Resume ATS application.
"""
from typing import List, Dict, Any, Optional, Union
from pydantic import BaseModel, Field

# --- Basic Components ---

class CandidateInfo(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None

class Experience(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    duration: Optional[str] = None
    description: Optional[str] = None
    bullet_quality: int = 0
    has_metrics: bool = False
    action_verbs_count: int = 0

class ExperienceSummary(BaseModel):
    total_years: float = 0.0
    total_months: int = 0
    positions: List[Experience] = []
    overall_quality: int = 0

class Project(BaseModel):
    title: Optional[str] = None
    technologies: List[str] = []
    description: Optional[str] = None
    impact: Optional[str] = None
    score: int = 0

class Education(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    year: Optional[str] = None
    gpa: Optional[str] = None

class SectionFormatting(BaseModel):
    has_tables: bool = False
    has_images: bool = False
    word_count: int = 0
    line_count: int = 0
    cv_layout_score: int = 85
    cv_risk_level: str = "low"

class ComputerVisionAnalysis(BaseModel):
    available: bool = False
    layout_score: int = 85
    risk_level: str = "low"
    issues: List[str] = []

# --- Skills & Domain Schemas ---

class SkillCategory(BaseModel):
    name: str
    skills: List[str]
    strength: str = "Moderate"  # Strong, Moderate, Weak

class SkillsData(BaseModel):
    programming_languages: List[str] = []
    frameworks: List[str] = []
    tools: List[str] = []
    databases: List[str] = []
    soft_skills: List[str] = []
    other: List[str] = []
    core_engineering: List[str] = []
    total_count: int = 0
    skill_categories: List[SkillCategory] = []

class DomainInfo(BaseModel):
    primary: str = "General"
    confidence: float = 0.0
    secondary: Optional[str] = None
    keywords_matched: List[str] = []

# --- ATS Scoring & Issues Schemas ---

class ScoreBreakdown(BaseModel):
    keyword_relevance: int = 0
    section_completeness: int = 0
    formatting_score: int = 0
    skill_relevance: int = 0
    experience_clarity: int = 0
    project_impact: int = 0

class Issue(BaseModel):
    """Unified Issue model for ATS and Layout analysis."""
    type: str = "general"
    category: Optional[str] = None
    severity: str = "Medium" # High, Medium, Low
    description: str
    message: Optional[str] = None # For compatibility
    suggestion: str

class ATSIssue(Issue):
    """Alias for Issue for backward compatibility."""
    pass

class Suggestion(BaseModel):
    category: str
    title: str
    description: str
    priority: str # High, Medium, Low
    examples: List[str] = []

class KeywordsAnalysis(BaseModel):
    found: List[str] = []
    missing: List[str] = []
    recommended: List[str] = []
    density_score: int = 0

class ATSScore(BaseModel):
    total_score: int = 0
    parsing_score: int = 0
    formatting_score: int = 0
    keyword_score: int = 0
    experience_score: int = 0

# --- Industry Analysis & Rewrite Schemas ---

class IndustryCheck(BaseModel):
    name: str
    score: int
    issue_count: int
    status: str
    findings: List[str]
    recommendation: str

class IndustryCategory(BaseModel):
    name: str
    score: int
    issue_count: int
    checks: List[IndustryCheck]

class IndustryReport(BaseModel):
    categories: List[IndustryCategory] = []
    top_actions: List[str] = []

class Optimization(BaseModel):
    section: str
    original: str
    optimized: str
    reason: str

class ResumeRewrite(BaseModel):
    headline: str = ""
    summary: str = ""
    skills: Dict[str, List[str]] = {}
    experience_bullets: List[str] = []
    project_bullets: List[str] = []
    education: List[str] = []
    ats_safe_resume: str = ""
    notes: List[str] = []

class SkillAnalysis(BaseModel):
    found: List[str] = []
    missing: List[str] = []
    relevance_score: int = 0

# --- Feature-Specific Schemas ---

class ProjectRecommendation(BaseModel):
    title: str
    description: str = ""
    difficulty: str = "Intermediate" # Beginner, Intermediate, Advanced
    impact: str = "High"
    tech_stack: List[str] = []
    skills_gained: List[str] = []  # Frontend-facing alias for tech_stack
    github_search_query: str = ""
    domain: Optional[str] = None

class AssessmentQuestion(BaseModel):
    question: str
    options: List[str]
    correct_answer: Union[int, str]
    explanation: str

class AssessmentResponse(BaseModel):
    title: str
    description: str = "Personalized assessment based on your profile."
    questions: List[AssessmentQuestion] = []
    total_questions: int = 0

class JDAnalysis(BaseModel):
    requirements: Dict[str, Any] = {}
    skills: Dict[str, List[str]] = {}
    keywords: List[str] = []

class MatchBreakdown(BaseModel):
    skill_match: int = 0
    keyword_match: int = 0
    experience_match: int = 0
    overall_match: int = 0

class RecruiterReport(BaseModel):
    fit_rating: str = ""
    overall_summary: str = ""
    match_breakdown: MatchBreakdown = MatchBreakdown()
    strengths: List[str] = []
    gaps: List[str] = []
    recommendation: str = ""
    next_steps: List[str] = []

class ComparisonSuggestion(BaseModel):
    category: str = "General"
    title: str = ""
    description: str = ""
    priority: str = "Medium"

class ComparisonResponse(BaseModel):
    success: bool = True
    candidate: CandidateInfo = CandidateInfo()
    ats_score: Union[ATSScore, int] = 0
    match_percentage: int = 0
    match_breakdown: MatchBreakdown = MatchBreakdown()
    jd_analysis: JDAnalysis = JDAnalysis()
    missing_skills: Dict[str, List[str]] = {}
    missing_keywords: List[str] = []
    suggestions: List[ComparisonSuggestion] = []
    recruiter_report: RecruiterReport = RecruiterReport()
    industry_report: Optional[IndustryReport] = None
    optimized_resume: ResumeRewrite = ResumeRewrite()
    score_methodology: Dict[str, Any] = {}
    computer_vision: ComputerVisionAnalysis = ComputerVisionAnalysis()
    project_recommendations: List[ProjectRecommendation] = []
    assessment: Optional[AssessmentResponse] = None
    parsing_method: str = "standard"
    ocr_confidence: Optional[str] = None

class InterviewMessage(BaseModel):
    role: str # user, assistant
    content: str

class InterviewChatResponse(BaseModel):
    message: str
    context: Dict[str, Any] = {}

# --- Roadmap & Global Engine Schemas ---

class RoadmapRequest(BaseModel):
    """Request schema for generating a career roadmap."""
    domain: Optional[str] = None
    resume_text: Optional[str] = None

class ProjectDetail(BaseModel):
    title: str
    github_repo: Optional[str] = None

class JobOpening(BaseModel):
    """Details of a live job opening."""
    title: str
    company: Optional[str] = "Top Industry Leader"
    location: Optional[str] = "Remote / Global"
    apply_link: str
    salary_range: Optional[str] = "Competitive Market Rate"

class RoadmapStep(BaseModel):
    """A single step in the career roadmap."""
    title: str
    description: str
    key_skills: List[str]
    course_link: Optional[str] = None
    youtube_link: Optional[str] = None
    projects: List[ProjectDetail] = []
    critical_project: Optional[str] = None # For backward compatibility

class RoadmapResponse(BaseModel):
    """Response schema containing the career roadmap."""
    domain: str
    role_suitability: str = "Candidate DNA matches industry requirements."
    news_headline: str
    market_demand_trend: List[int] = [65, 70, 68, 75, 82, 88, 92] # 7-point trend
    job_openings: List[JobOpening] = []
    beginner_steps: List[RoadmapStep]
    intermediate_steps: List[RoadmapStep]
    advanced_steps: List[RoadmapStep]

class PulseResponse(BaseModel):
    """Real-time pulse and search hooks."""
    domain: str
    briefing: str
    social_hooks: List[Dict[str, str]]

# --- Final Analysis Response ---

class AnalysisResponse(BaseModel):
    success: bool = True
    candidate: CandidateInfo = CandidateInfo()
    experience: ExperienceSummary = ExperienceSummary()
    projects: List[Project] = []
    education: List[Education] = []
    skills: Union[SkillsData, SkillAnalysis] = SkillsData()
    ats_score: Union[ATSScore, int] = 0
    score_breakdown: ScoreBreakdown = ScoreBreakdown()
    score_category: str = "Good"
    domain: DomainInfo = DomainInfo()
    issues: List[Issue] = []
    suggestions: List[Suggestion] = []
    keywords_analysis: KeywordsAnalysis = KeywordsAnalysis()
    optimized_resume: ResumeRewrite = ResumeRewrite()
    industry_report: Optional[IndustryReport] = None
    score_methodology: Dict[str, Any] = {}
    computer_vision: ComputerVisionAnalysis = ComputerVisionAnalysis()
    project_recommendations: List[ProjectRecommendation] = []
    assessment: Optional[AssessmentResponse] = None
    parsing_method: str = "standard"
    ocr_confidence: Optional[str] = None
