"""
ResQ - FastAPI Backend
"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
import os
import tempfile
from typing import Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from app.services.resume_parser import ResumeParser
from app.services.ats_scorer import ATSScorer
from app.services.skill_extractor import SkillExtractor
from app.services.domain_classifier import DomainClassifier
from app.services.report_generator import ReportGenerator
from app.services.jd_comparator import JDComparator
from app.services.ml_quality_analyzer import ml_quality_analyzer
from app.services.interview_chatbot import interview_chatbot
from app.services.industry_resume_analyzer import industry_resume_analyzer
from app.services.project_recommender import project_recommender
from app.services.mock_assessment import mock_assessment_generator
from app.services.roadmap_generator import roadmap_generator
from app.services.pulse_engine import pulse_engine
from app.models.schemas import AnalysisResponse, ComparisonResponse, InterviewChatResponse, ProjectRecommendation, AssessmentResponse, RoadmapRequest, RoadmapResponse, PulseResponse

app = FastAPI(
    title="ResQ",
    description="AI-powered resume analysis and ATS scoring",
    version="1.0.0"
)

# CORS configuration. The app does not use cookies, so wildcard origins are safe.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
resume_parser = ResumeParser()
ats_scorer = ATSScorer()
skill_extractor = SkillExtractor()
domain_classifier = DomainClassifier()
report_generator = ReportGenerator()
jd_comparator = JDComparator()

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_EXTENSIONS = {".pdf", ".docx"}


def extract_jd_text(file_path: str, file_ext: str) -> str:
    """Extract text from a JD file."""
    if file_ext == ".pdf":
        from pypdf import PdfReader
        with open(file_path, "rb") as f:
            jd_text = ""
            reader = PdfReader(f)
            for page in reader.pages:
                jd_text += page.extract_text() or ""
            return jd_text
    if file_ext == ".docx":
        from docx import Document
        doc = Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs])
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


@app.get("/")
async def root():
    return {"message": "ResQ API", "status": "running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.get("/api/health")
async def api_health_check():
    return await health_check()


@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze_resume(file: UploadFile = File(...)):
    """
    Analyze uploaded resume and return comprehensive ATS analysis
    """
    # Validate file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Read file content
    content = await file.read()
    
    # Validate file size
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 5MB limit"
        )
    
    try:
        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=file_ext) as tmp_file:
            tmp_file.write(content)
            tmp_path = tmp_file.name
        
        # Parse resume
        parsed_data = resume_parser.parse(tmp_path, file_ext)
        
        # Get OCR metadata
        parsing_method = parsed_data.get("parsing_method", "standard")
        ocr_confidence = parsed_data.get("ocr_confidence")
        
        # Extract skills
        skills_data = skill_extractor.extract(parsed_data["raw_text"])
        
        # Classify domain
        domain_data = domain_classifier.classify(parsed_data["raw_text"], skills_data)

        # Analyze resume content quality with PyTorch when available
        ml_analysis = ml_quality_analyzer.analyze(parsed_data, skills_data)
        
        # Calculate ATS score (OCR-aware)
        ats_analysis = ats_scorer.calculate_score(
            parsed_data, 
            skills_data, 
            domain_data,
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence,
            ml_analysis=ml_analysis
        )
        
        keywords_analysis = ats_analysis["keywords_analysis"]
        industry_report = industry_resume_analyzer.build_report(
            parsed_data=parsed_data,
            skills=skills_data,
            domain=domain_data,
            keywords_analysis=keywords_analysis,
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence,
        )
        optimized_resume = industry_resume_analyzer.build_rewrite(
            parsed_data=parsed_data,
            skills=skills_data,
            domain=domain_data,
            keywords_analysis=keywords_analysis,
        )
        
        # ECE features
        missing_skills = ats_analysis.get("issues", [])
        # Extract missing skill names if possible, else empty
        missing_skill_names = [issue.suggestion for issue in missing_skills if issue.type == "Missing Skill"]
        project_recs = project_recommender.recommend(domain=domain_data, missing_skills=missing_skill_names)
        assessment_data = mock_assessment_generator.generate_assessment(domain=domain_data, skills=skills_data)

        # Cleanup temporary file
        os.unlink(tmp_path)

        # Build response
        response = AnalysisResponse(
            success=True,
            candidate=parsed_data["candidate"],
            ats_score=ats_analysis["score"],
            score_breakdown=ats_analysis["breakdown"],
            score_category=ats_analysis["category"],
            domain=domain_data,
            skills=skills_data,
            projects=parsed_data["projects"],
            experience=parsed_data["experience"],
            education=parsed_data["education"],
            issues=ats_analysis["issues"],
            suggestions=ats_analysis["suggestions"],
            keywords_analysis=keywords_analysis,
            industry_report=industry_report,
            optimized_resume=optimized_resume,
            score_methodology=ats_analysis.get("methodology", {}),
            computer_vision=parsed_data.get("computer_vision", {}),
            project_recommendations=project_recs,
            assessment=assessment_data,
            # OCR metadata
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence
        )
        
        return response
        
    except Exception as e:
        # Cleanup on error
        if 'tmp_path' in locals() and os.path.exists(tmp_path):
            os.unlink(tmp_path)
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/download-report")
async def download_report(request: Request):
    """
    Generate and download PDF report from analysis data
    """
    try:
        analysis_data = await request.json()
        
        # Generate PDF
        pdf_bytes = report_generator.generate_pdf(analysis_data)
        
        # Return PDF response
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={
                "Content-Disposition": "attachment; filename=resq-resume-report.pdf"
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/compare", response_model=ComparisonResponse)
async def compare_resume_with_jd(
    resume_file: UploadFile = File(...),
    jd_file: UploadFile = File(...)
):
    """
    Compare resume against job description and return match analysis
    """
    temp_resume_path = None
    temp_jd_path = None
    
    try:
        # Validate resume file
        resume_ext = os.path.splitext(resume_file.filename)[1].lower()
        if resume_ext not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"Invalid resume file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
            )
        
        # Validate JD file (can be PDF or text file)
        jd_ext = os.path.splitext(jd_file.filename)[1].lower()
        if jd_ext not in {".pdf", ".docx", ".txt"}:
            raise HTTPException(
                status_code=400,
                detail="Invalid JD file type. Allowed types: .pdf, .docx, .txt"
            )
        
        # Read resume content
        resume_content = await resume_file.read()
        if len(resume_content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail="Resume file size exceeds 5MB limit"
            )
        
        # Read JD content
        jd_content = await jd_file.read()
        if len(jd_content) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail="JD file size exceeds 5MB limit"
            )
        
        # Create temporary files
        with tempfile.NamedTemporaryFile(delete=False, suffix=resume_ext) as tmp:
            tmp.write(resume_content)
            temp_resume_path = tmp.name
        
        with tempfile.NamedTemporaryFile(delete=False, suffix=jd_ext) as tmp:
            tmp.write(jd_content)
            temp_jd_path = tmp.name
        
        # Parse resume
        resume_parsed = resume_parser.parse(temp_resume_path, resume_ext)
        parsing_method = resume_parsed.get("parsing_method", "standard")
        ocr_confidence = resume_parsed.get("ocr_confidence")
        
        # Extract skills
        skills_data = skill_extractor.extract(resume_parsed["raw_text"])
        
        # Calculate ATS score
        domain_data = domain_classifier.classify(resume_parsed["raw_text"], skills_data)
        ml_analysis = ml_quality_analyzer.analyze(resume_parsed, skills_data)
        ats_analysis = ats_scorer.calculate_score(
            resume_parsed,
            skills_data,
            domain_data,
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence,
            ml_analysis=ml_analysis
        )
        
        # Extract JD text
        jd_text = extract_jd_text(temp_jd_path, jd_ext)
        
        # Compare resume with JD
        comparison = jd_comparator.compare(
            resume_parsed["raw_text"],
            {
                "programming_languages": skills_data.programming_languages,
                "frameworks": skills_data.frameworks,
                "tools": skills_data.tools,
                "databases": skills_data.databases,
                "soft_skills": skills_data.soft_skills,
                "other": skills_data.other,
            },
            jd_text
        )
        
        # Build JD Analysis
        from app.models.schemas import JDAnalysis, MatchBreakdown, RecruiterReport, ComparisonSuggestion
        
        jd_analysis = JDAnalysis(
            requirements=comparison["jd_requirements"],
            skills=comparison["jd_skills"],
            keywords=comparison["jd_keywords"]
        )
        
        # Build Match Breakdown
        match_breakdown = MatchBreakdown(
            skill_match=comparison["skill_match_percentage"],
            keyword_match=comparison["keyword_match_percentage"],
            experience_match=comparison["experience_match_percentage"],
            overall_match=comparison["match_percentage"]
        )
        
        # Build Recruiter Report
        recruiter_data = comparison["recruiter_report"]
        recruiter_report = RecruiterReport(
            fit_rating=recruiter_data["fit_rating"],
            overall_summary=recruiter_data["overall_summary"],
            match_breakdown=match_breakdown,
            strengths=recruiter_data["strengths"],
            gaps=recruiter_data["gaps"],
            recommendation=recruiter_data["recommendation"],
            next_steps=recruiter_data["next_steps"]
        )
        
        # Build suggestions
        suggestions = [
            ComparisonSuggestion(
                category=s.get("category", "General"),
                title=s.get("title", ""),
                description=s.get("description", ""),
                priority=s.get("priority", "Medium")
            )
            for s in comparison["suggestions"]
        ]
        
        industry_report = industry_resume_analyzer.build_report(
            parsed_data=resume_parsed,
            skills=skills_data,
            domain=domain_data,
            keywords_analysis=ats_analysis["keywords_analysis"],
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence,
            comparison=comparison,
        )
        optimized_resume = industry_resume_analyzer.build_rewrite(
            parsed_data=resume_parsed,
            skills=skills_data,
            domain=domain_data,
            keywords_analysis=ats_analysis["keywords_analysis"],
            comparison=comparison,
        )

        # ECE Features
        missing_skills_list = comparison.get("missing_keywords", [])
        project_recs = project_recommender.recommend(domain=domain_data, missing_skills=missing_skills_list)
        assessment_data = mock_assessment_generator.generate_assessment(domain=domain_data, skills=skills_data)

        # Build response
        response = ComparisonResponse(
            success=True,
            candidate=resume_parsed["candidate"],
            ats_score=ats_analysis["score"],
            match_percentage=comparison["match_percentage"],
            match_breakdown=match_breakdown,
            jd_analysis=jd_analysis,
            missing_skills=comparison["missing_skills"],
            missing_keywords=comparison["missing_keywords"],
            suggestions=suggestions,
            recruiter_report=recruiter_report,
            industry_report=industry_report,
            optimized_resume=optimized_resume,
            score_methodology=ats_analysis.get("methodology", {}),
            computer_vision=resume_parsed.get("computer_vision", {}),
            project_recommendations=project_recs,
            assessment=assessment_data,
            parsing_method=parsing_method,
            ocr_confidence=ocr_confidence
        )
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup temporary files
        if temp_resume_path and os.path.exists(temp_resume_path):
            os.unlink(temp_resume_path)
        if temp_jd_path and os.path.exists(temp_jd_path):
            os.unlink(temp_jd_path)


@app.post("/api/interview-chat", response_model=InterviewChatResponse)
async def interview_chat(
    resume_file: Optional[UploadFile] = File(None),
    jd_file: Optional[UploadFile] = File(None),
    message: str = Form("Act as my virtual interviewer and HR. What should I improve?"),
    mode: str = Form("coach"),
    history: str = Form("[]")
):
    """Virtual HR/interviewer chatbot with full resume and optional JD access."""
    temp_resume_path = None
    temp_jd_path = None

    try:
        resume_parsed = {
            "raw_text": "",
            "candidate": {},
            "projects": [],
            "experience": {},
            "education": [],
            "sections": {},
            "formatting": {},
            "computer_vision": {},
        }
        skills_data = skill_extractor.extract("")
        domain_data = domain_classifier.classify("", skills_data)
        ats_analysis = {
            "score": 0,
            "category": "No Resume Uploaded",
            "suggestions": [],
            "methodology": {},
        }

        if resume_file and resume_file.filename:
            resume_ext = os.path.splitext(resume_file.filename)[1].lower()
            if resume_ext not in ALLOWED_EXTENSIONS:
                raise HTTPException(status_code=400, detail="Invalid resume file type. Allowed types: .pdf, .docx")

            resume_content = await resume_file.read()
            if len(resume_content) > MAX_FILE_SIZE:
                raise HTTPException(status_code=400, detail="Resume file size exceeds 5MB limit")

            with tempfile.NamedTemporaryFile(delete=False, suffix=resume_ext) as tmp:
                tmp.write(resume_content)
                temp_resume_path = tmp.name

            resume_parsed = resume_parser.parse(temp_resume_path, resume_ext)
            parsing_method = resume_parsed.get("parsing_method", "standard")
            ocr_confidence = resume_parsed.get("ocr_confidence")
            skills_data = skill_extractor.extract(resume_parsed["raw_text"])
            domain_data = domain_classifier.classify(resume_parsed["raw_text"], skills_data)
            ml_analysis = ml_quality_analyzer.analyze(resume_parsed, skills_data)
            ats_analysis = ats_scorer.calculate_score(
                resume_parsed,
                skills_data,
                domain_data,
                parsing_method=parsing_method,
                ocr_confidence=ocr_confidence,
                ml_analysis=ml_analysis
            )

        jd_text = ""
        comparison = None
        if jd_file and jd_file.filename:
            jd_ext = os.path.splitext(jd_file.filename)[1].lower()
            if jd_ext not in {".pdf", ".docx", ".txt"}:
                raise HTTPException(status_code=400, detail="Invalid JD file type. Allowed types: .pdf, .docx, .txt")

            jd_content = await jd_file.read()
            if len(jd_content) > MAX_FILE_SIZE:
                raise HTTPException(status_code=400, detail="JD file size exceeds 5MB limit")

            with tempfile.NamedTemporaryFile(delete=False, suffix=jd_ext) as tmp:
                tmp.write(jd_content)
                temp_jd_path = tmp.name

            jd_text = extract_jd_text(temp_jd_path, jd_ext)
            comparison = jd_comparator.compare(
                resume_parsed["raw_text"],
                {
                    "programming_languages": skills_data.programming_languages,
                    "frameworks": skills_data.frameworks,
                    "tools": skills_data.tools,
                    "databases": skills_data.databases,
                    "soft_skills": skills_data.soft_skills,
                    "other": skills_data.other,
                },
                jd_text
            )

        import json
        try:
            parsed_history = json.loads(history) if history else []
        except Exception:
            parsed_history = []

        return interview_chatbot.answer(
            message=message,
            resume=resume_parsed,
            skills=skills_data,
            domain=domain_data,
            ats_analysis=ats_analysis,
            jd_text=jd_text,
            comparison=comparison,
            history=parsed_history,
            mode=mode,
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if temp_resume_path and os.path.exists(temp_resume_path):
            os.unlink(temp_resume_path)
        if temp_jd_path and os.path.exists(temp_jd_path):
            os.unlink(temp_jd_path)


@app.post("/api/generate-roadmap", response_model=RoadmapResponse)
async def generate_roadmap(request: RoadmapRequest):
    """
    Generate a dynamic career roadmap for a specific domain.
    """
    try:
        roadmap_data = roadmap_generator.generate(
            domain=request.domain
        )
        return RoadmapResponse(**roadmap_data)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/roadmap-from-file", response_model=RoadmapResponse)
async def roadmap_from_file(file: UploadFile = File(...)):
    """
    Generate a dynamic career roadmap directly from an uploaded resume file (PDF/Doc).
    """
    temp_path = None
    try:
        # 1. Save uploaded file temporarily
        suffix = os.path.splitext(file.filename)[1].lower()
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            content = await file.read()
            tmp.write(content)
            temp_path = tmp.name

        # 2. Parse the file using our existing robust parser
        from app.services.resume_parser import ResumeParser
        parser = ResumeParser()
        print(f"DEBUG: Parsing file {file.filename} with suffix {suffix}")
        parse_result = parser.parse(temp_path, suffix)
        resume_text = parse_result.get("raw_text", "")
        print(f"DEBUG: Extracted {len(resume_text)} characters")
        
        # 3. Generate roadmap from extracted text
        print("DEBUG: Calling Roadmap Generator...")
        roadmap_data = roadmap_generator.generate(
            resume_text=resume_text
        )
        print("DEBUG: Roadmap Generation Success")
        return RoadmapResponse(**roadmap_data)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if temp_path and os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except:
                pass


@app.post("/api/pulse", response_model=PulseResponse)
async def get_pulse(request: RoadmapRequest):
    """
    Get live social pulse and industry briefing for a domain.
    """
    try:
        pulse_data = pulse_engine.get_pulse(domain=request.domain)
        return PulseResponse(**pulse_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/roadmap-chat")
async def roadmap_chat(request: Request):
    """Conversational intelligence for the roadmap."""
    from app.services.roadmap_chat import roadmap_chat_service
    data = await request.json()
    query = data.get("query")
    context = data.get("context", {})
    history = data.get("history", [])
    
    response_text = await roadmap_chat_service.chat(query, context, history)
    return {"response": response_text}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
