export interface CandidateInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  strength: 'Strong' | 'Moderate' | 'Weak';
}

export interface SkillsData {
  programming_languages: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
  soft_skills: string[];
  other: string[];
  total_count: number;
  skill_categories: SkillCategory[];
}

export interface Project {
  title: string;
  technologies: string[];
  description: string | null;
  impact: string | null;
  score: number;
}

export interface Experience {
  company: string | null;
  role: string | null;
  duration: string | null;
  description: string | null;
  bullet_quality: number;
  has_metrics: boolean;
  action_verbs_count: number;
}

export interface ExperienceSummary {
  total_years: number;
  total_months: number;
  positions: Experience[];
  overall_quality: number;
}

export interface Education {
  degree: string | null;
  institution: string | null;
  year: string | null;
  gpa: string | null;
}

export interface DomainInfo {
  primary: string;
  confidence: number;
  secondary: string | null;
  keywords_matched: string[];
}

export interface ATSIssue {
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  suggestion: string;
}

export interface Suggestion {
  category: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  examples: string[];
}

export interface ScoreBreakdown {
  keyword_relevance: number;
  section_completeness: number;
  formatting_score: number;
  skill_relevance: number;
  experience_clarity: number;
  project_impact: number;
}

export interface ScoreMethodology {
  model: string;
  score: number;
  weights: Record<string, number>;
  signals: Record<string, number>;
  note: string;
  ml_quality?: {
    backend: string;
    score: number;
    label: string;
    probabilities: Record<string, number>;
    features: Record<string, number>;
    training?: Record<string, any>;
  };
  computer_vision?: {
    backend: string;
    layout_score: number;
    risk_level: string;
    signals: Record<string, any>;
    issues: string[];
  };
}

export interface KeywordsAnalysis {
  found: string[];
  missing: string[];
  recommended: string[];
}

export interface ComputerVisionAnalysis {
  available: boolean;
  backend: string;
  layout_score: number;
  risk_level: string;
  pages_analyzed: number;
  signals: Record<string, any>;
  issues: string[];
  page_reports: Record<string, any>[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface InterviewChatResponse {
  success: boolean;
  answer: string;
  mode: string;
  suggested_questions: string[];
  evidence: string[];
  interviewer_score: number | null;
  next_step: string | null;
  provider: 'openai' | 'local_fallback' | string;
}

export interface AnalysisResult {
  success: boolean;
  candidate: CandidateInfo;
  ats_score: number;
  score_breakdown: ScoreBreakdown;
  score_category: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
  domain: DomainInfo;
  skills: SkillsData;
  projects: Project[];
  experience: ExperienceSummary;
  education: Education[];
  issues: ATSIssue[];
  suggestions: Suggestion[];
  keywords_analysis: KeywordsAnalysis;
  score_methodology?: ScoreMethodology;
  computer_vision?: ComputerVisionAnalysis;
  // OCR metadata
  parsing_method: 'standard' | 'ocr' | 'ocr_unavailable';
  ocr_confidence: 'low' | 'medium' | 'high' | null;
}

// Comparison types
export interface MatchBreakdown {
  skill_match: number;
  keyword_match: number;
  experience_match: number;
  overall_match: number;
}

export interface JDAnalysis {
  requirements: Record<string, any>;
  skills: Record<string, string[]>;
  keywords: string[];
}

export interface RecruiterReport {
  fit_rating: string;
  overall_summary: string;
  match_breakdown: MatchBreakdown;
  strengths: string[];
  gaps: string[];
  recommendation: string;
  next_steps: string[];
}

export interface ComparisonSuggestion {
  category: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface ComparisonResult {
  success: boolean;
  candidate: CandidateInfo;
  ats_score: number;
  match_percentage: number;
  match_breakdown: MatchBreakdown;
  jd_analysis: JDAnalysis;
  missing_skills: Record<string, string[]>;
  missing_keywords: string[];
  suggestions: ComparisonSuggestion[];
  recruiter_report: RecruiterReport;
  score_methodology?: ScoreMethodology;
  computer_vision?: ComputerVisionAnalysis;
  parsing_method: 'standard' | 'ocr' | 'ocr_unavailable';
  ocr_confidence: 'low' | 'medium' | 'high' | null;
}
