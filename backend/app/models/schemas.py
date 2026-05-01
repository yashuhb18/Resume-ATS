"""
Pydantic models for API request/response schemas
"""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class CandidateInfo(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None


class SkillCategory(BaseModel):
    name: str
    skills: List[str]
    strength: str  # Strong, Moderate, Weak


class SkillsData(BaseModel):
    programming_languages: List[str] = []
    frameworks: List[str] = []
    tools: List[str] = []
    databases: List[str] = []
    soft_skills: List[str] = []
    core_engineering: List[str] = []
    other: List[str] = []
    total_count: int = 0
    skill_categories: List[SkillCategory] = []


class Project(BaseModel):
    title: str
    technologies: List[str] = []
    description: Optional[str] = None
    impact: Optional[str] = None
    score: int = 0  # 0-100


class Experience(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    duration: Optional[str] = None
    description: Optional[str] = None
    bullet_quality: int = 0
    has_metrics: bool = False
    action_verbs_count: int = 0


class ExperienceSummary(BaseModel):
    total_years: float = 0
    total_months: int = 0
    positions: List[Experience] = []
    overall_quality: int = 0


class Education(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    year: Optional[str] = None
    gpa: Optional[str] = None


class DomainInfo(BaseModel):
    primary: str
    confidence: float
    secondary: Optional[str] = None
    keywords_matched: List[str] = []


class ATSIssue(BaseModel):
    type: str
    severity: str  # High, Medium, Low
    description: str
    suggestion: str


class Suggestion(BaseModel):
    category: str
    title: str
    description: str
    priority: str  # High, Medium, Low
    examples: List[str] = []


class ScoreBreakdown(BaseModel):
    keyword_relevance: int = 0
    section_completeness: int = 0
    formatting_score: int = 0
    skill_relevance: int = 0
    experience_clarity: int = 0
    project_impact: int = 0


class KeywordsAnalysis(BaseModel):
    found: List[str] = []
    missing: List[str] = []
    recommended: List[str] = []


class IndustryCheck(BaseModel):
    name: str
    score: int = 0
    issue_count: int = 0
    status: str = "Needs Review"  # Pass, Warning, Needs Review
    findings: List[str] = []
    recommendation: str = ""


class IndustryCategory(BaseModel):
    name: str
    score: int = 0
    issue_count: int = 0
    checks: List[IndustryCheck] = []


class IndustryReport(BaseModel):
    model: str = "Industry Resume Screener v1"
    benchmark: str = "Parseability, content evidence, section structure, ATS essentials, and tailoring"
    categories: List[IndustryCategory] = []
    top_actions: List[str] = []


class ResumeRewrite(BaseModel):
    headline: str = ""
    summary: str = ""
    skills: Dict[str, List[str]] = {}
    experience_bullets: List[str] = []
    project_bullets: List[str] = []
    education: List[str] = []
    ats_safe_resume: str = ""
    notes: List[str] = []


class ComputerVisionAnalysis(BaseModel):
    available: bool = False
    backend: str = "unknown"
    layout_score: int = 0
    risk_level: str = "unknown"
    pages_analyzed: int = 0
    signals: Dict[str, Any] = {}
    issues: List[str] = []
    page_reports: List[Dict[str, Any]] = []


class ChatMessage(BaseModel):
    role: str
    content: str


class InterviewChatResponse(BaseModel):
    success: bool
    answer: str
    mode: str
    suggested_questions: List[str] = []
    evidence: List[str] = []
    interviewer_score: Optional[int] = None
    next_step: Optional[str] = None
    provider: str = "local_fallback"


class ProjectRecommendation(BaseModel):
    title: str
    description: str
    skills_gained: List[str]
    difficulty: str
    domain: str


class AssessmentQuestion(BaseModel):
    question: str
    options: List[str]
    correct_answer: str
    explanation: str


class AssessmentResponse(BaseModel):
    title: str
    description: str
    questions: List[AssessmentQuestion]
    total_questions: int


class AnalysisResponse(BaseModel):
    success: bool
    candidate: CandidateInfo
    ats_score: int
    score_breakdown: ScoreBreakdown
    score_category: str  # Excellent, Good, Needs Improvement, Poor
    domain: DomainInfo
    skills: SkillsData
    projects: List[Project] = []
    experience: ExperienceSummary
    education: List[Education] = []
    issues: List[ATSIssue] = []
    suggestions: List[Suggestion] = []
    keywords_analysis: KeywordsAnalysis
    industry_report: IndustryReport = IndustryReport()
    optimized_resume: ResumeRewrite = ResumeRewrite()
    score_methodology: Dict[str, Any] = {}
    computer_vision: ComputerVisionAnalysis = ComputerVisionAnalysis()
    # ECE/EEE Additions
    project_recommendations: List[ProjectRecommendation] = []
    assessment: Optional[AssessmentResponse] = None
    # OCR metadata
    parsing_method: str = "standard"  # "standard" | "ocr" | "ocr_unavailable"
    ocr_confidence: Optional[str] = None  # "low" | "medium" | "high" (only when OCR used)


class JDAnalysis(BaseModel):
    """Job Description Analysis"""
    requirements: Dict[str, Any]
    skills: Dict[str, List[str]]
    keywords: List[str]


class MatchBreakdown(BaseModel):
    """Match percentage breakdown"""
    skill_match: int
    keyword_match: int
    experience_match: int
    overall_match: int


class RecruiterReport(BaseModel):
    """Professional recruiter report"""
    fit_rating: str
    overall_summary: str
    match_breakdown: MatchBreakdown
    strengths: List[str]
    gaps: List[str]
    recommendation: str
    next_steps: List[str]


class ComparisonSuggestion(BaseModel):
    """Suggestion for JD comparison"""
    category: str
    title: str
    description: str
    priority: str  # High, Medium, Low


class ComparisonResponse(BaseModel):
    """Resume vs Job Description comparison response"""
    success: bool
    candidate: CandidateInfo
    ats_score: int
    match_percentage: int
    match_breakdown: MatchBreakdown
    jd_analysis: JDAnalysis
    missing_skills: Dict[str, List[str]]
    missing_keywords: List[str]
    suggestions: List[ComparisonSuggestion]
    recruiter_report: RecruiterReport
    industry_report: IndustryReport = IndustryReport()
    optimized_resume: ResumeRewrite = ResumeRewrite()
    score_methodology: Dict[str, Any] = {}
    computer_vision: ComputerVisionAnalysis = ComputerVisionAnalysis()
    project_recommendations: List[ProjectRecommendation] = []
    assessment: Optional[AssessmentResponse] = None
    parsing_method: str = "standard"
    ocr_confidence: Optional[str] = None


class RoadmapRequest(BaseModel):
    """Request schema for generating a career roadmap."""
    domain: Optional[str] = None
    resume_text: Optional[str] = None


class ProjectDetail(BaseModel):
    title: str
    github_repo: Optional[str] = None

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
    beginner_steps: List[RoadmapStep]
    intermediate_steps: List[RoadmapStep]
    advanced_steps: List[RoadmapStep]

class SocialHook(BaseModel):
    """Deep link to a social platform."""
    platform: str
    type: str
    url: str
    description: str

class PulseResponse(BaseModel):
    """Response schema for the Pulse engine."""
    domain: str
    briefing: str
    social_hooks: List[SocialHook]
