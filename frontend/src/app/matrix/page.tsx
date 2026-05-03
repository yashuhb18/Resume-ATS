'use client';

import MatrixHubNav from '@/components/matrix-hub/MatrixHubNav';
import MatrixHero from '@/components/matrix-hub/MatrixHero';
import MatrixGlobalGrid from '@/components/matrix-hub/MatrixGlobalGrid';
import MatrixAcademicFacilities from '@/components/matrix-hub/MatrixAcademicFacilities';
import MatrixDomainGrid from '@/components/matrix-hub/MatrixDomainGrid';
import MatrixEngine from '@/components/matrix-hub/MatrixEngine';
import MatrixJobFeed from '@/components/matrix-hub/MatrixJobFeed';
import MatrixSkillGraph from '@/components/matrix-hub/MatrixSkillGraph';
import MatrixOracle from '@/components/matrix-hub/MatrixOracle';
import MatrixFooter from '@/components/matrix-hub/MatrixFooter';
import '@/styles/matrix-hub.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/utils/auth';

export default function MatrixHubPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.replace('/login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020308]">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="matrix-hub-root">
      
      {/* ── System Atmosphere ── */}
      <div className="scanline-overlay" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(2,3,8,0.4)_100%)] pointer-events-none z-50" />

      {/* ── Navigation ── */}
      <MatrixHubNav />

      {/* ── Immersive Ecosystem ── */}
      <main>
        {/* Section 1: Cinematic Hero */}
        <MatrixHero />

        {/* Section 2: Global EC Intelligence */}
        <MatrixGlobalGrid />

        {/* Section 3: Academic Repositories */}
        <MatrixAcademicFacilities />

        {/* Section 4: Trending Domains */}
        <MatrixDomainGrid />

        {/* Section 5: AI Matrix Engine Showcase */}
        <MatrixEngine />

        {/* Section 5: Live Job Intelligence */}
        <MatrixJobFeed />

        {/* Section 6: Personalized AI Career Graph */}
        <MatrixSkillGraph />

        {/* Section 7: AI Mentor Showcase */}
        <MatrixOracle />
      </main>

      {/* ── Footer ── */}
      <MatrixFooter />

    </div>
  );
}
