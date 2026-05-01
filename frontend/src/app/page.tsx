'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import UploadSection from '@/components/UploadSection';
import EceSpecialization from '@/components/EceSpecialization';
import ResultsDashboard from '@/components/ResultsDashboard';
import PrivacyBanner from '@/components/PrivacyBanner';
import Footer from '@/components/Footer';
import LoadingOverlay from '@/components/LoadingOverlay';
import WakeUpScreen from '@/components/WakeUpScreen';
import BackendStatusBanner from '@/components/BackendStatusBanner';
import VirtualInterviewerChat from '@/components/VirtualInterviewerChat';
import { AnalysisResult, ComparisonResult } from '@/types';
import { apiUrl } from '@/utils/api';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult | null>(null);
  const [activeResumeFile, setActiveResumeFile] = useState<File | null>(null);
  const [activeJdFile, setActiveJdFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if user already verified in this session.
  useEffect(() => {
    const verified = sessionStorage.getItem('backend_verified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  const handleVerified = () => {
    setIsVerified(true);
    sessionStorage.setItem('backend_verified', 'true');
  };

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
      {/* Verification gate — wakes up the backend */}
      {!isVerified && <WakeUpScreen onVerified={handleVerified} />}

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
          <PrivacyBanner />
        </>
      )}
      
      <Footer />
      <VirtualInterviewerChat resumeFile={activeResumeFile} jdFile={activeJdFile} />
    </main>
  );
}
