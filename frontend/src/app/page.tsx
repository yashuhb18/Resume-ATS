'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import UploadSection from '@/components/UploadSection';
import EceSpecialization from '@/components/EceSpecialization';
import ResultsDashboard from '@/components/ResultsDashboard';
import Footer from '@/components/Footer';
import LoadingOverlay from '@/components/LoadingOverlay';
import BackendStatusBanner from '@/components/BackendStatusBanner';
import VirtualInterviewerChat from '@/components/VirtualInterviewerChat';
import { AnalysisResult, ComparisonResult } from '@/types';
import { apiUrl } from '@/utils/api';
import { isLoggedIn, getUser, logActivity } from '@/utils/auth';

export default function Home() {
  const router = useRouter();
  const [isAnalyzing,       setIsAnalyzing]       = useState(false);
  const [results,           setResults]           = useState<AnalysisResult | null>(null);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult | null>(null);
  const [activeResumeFile,  setActiveResumeFile]  = useState<File | null>(null);
  const [activeJdFile,      setActiveJdFile]      = useState<File | null>(null);
  const [error,             setError]             = useState<string | null>(null);



  /* ── Handlers ──────────────────────────────────────────────────────── */
  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setResults(null);
    setComparisonResults(null);
    setActiveResumeFile(file);
    setActiveJdFile(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(apiUrl('/api/analyze'), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze resume');
      }

      const data = await response.json();
      setResults(data);

      // Log activity
      await logActivity('resume_analyze', {
        filename: file.name,
        ats_score: data.ats_score,
        domain: data.domain?.primary,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCompare = async (resumeFile: File, jdFile: File) => {
    setIsAnalyzing(true);
    setError(null);
    setResults(null);
    setComparisonResults(null);
    setActiveResumeFile(resumeFile);
    setActiveJdFile(jdFile);

    const formData = new FormData();
    formData.append('resume_file', resumeFile);
    formData.append('jd_file', jdFile);

    try {
      const response = await fetch(apiUrl('/api/compare'), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to compare resume with job description');
      }

      const data = await response.json();
      setComparisonResults(data);

      await logActivity('compare', {
        resume: resumeFile.name,
        match_percentage: data.match_percentage,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setComparisonResults(null);
    setActiveResumeFile(null);
    setActiveJdFile(null);
    setError(null);
  };

  return (
    <main className="min-h-screen">
      <Header />
      <BackendStatusBanner />

      {isAnalyzing && <LoadingOverlay />}

      {results || comparisonResults ? (
        <ResultsDashboard
          results={results || undefined}
          comparisonResults={comparisonResults || undefined}
          resumeFile={activeResumeFile}
          jdFile={activeJdFile}
          onReset={handleReset}
        />
      ) : (
        <>
          <Hero />
          <UploadSection
            onAnalyze={handleAnalyze}
            onCompare={handleCompare}
            error={error}
          />
          <EceSpecialization />
          <HowItWorks />
          <Features />
        </>
      )}

      <Footer />
      <VirtualInterviewerChat resumeFile={activeResumeFile} jdFile={activeJdFile} />
    </main>
  );
}
