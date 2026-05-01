'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { topDomainsData, DomainContent } from '@/data/domains';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, ExternalLink, TrendingUp, Briefcase, 
  Users, Code2, GraduationCap, ChevronRight 
} from 'lucide-react';
import Image from 'next/image';

export default function DomainPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<DomainContent | null>(null);

  useEffect(() => {
    const domainData = topDomainsData[params.slug];
    if (!domainData) {
      notFound();
    } else {
      setData(domainData);
    }
  }, [params.slug]);

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end pb-20 border-b border-white/10 overflow-hidden">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={data.heroImage} 
            alt={data.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-purple-900/10 mix-blend-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/#ece-hub" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8 group bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to ECE Hub
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-4 text-white drop-shadow-lg">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 font-medium mb-6 max-w-3xl">
              {data.subtitle}
            </p>
            <p className="text-lg text-gray-300 max-w-4xl leading-relaxed">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Wider) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Industry Outlook */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Industry Outlook</h2>
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-xl">
                    {data.industryOutlook.growth}
                  </span>
                  <p className="text-gray-400">Projected Market Growth</p>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {data.industryOutlook.description}
                </p>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-purple-400 uppercase tracking-wider">Key Trends</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.industryOutlook.trends.map((trend, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200">
                        {trend}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Innovation Engine (Projects) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <Code2 className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Innovation Engine</h2>
                    <p className="text-gray-400 text-sm">God-level projects to master this domain</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {data.projects.map((project, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-indigo-500/30 transition-colors group">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          project.difficulty === 'Advanced' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                          'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-5 leading-relaxed">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.skills.map((skill, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-medium border border-indigo-500/20">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <a 
                        href={project.repoSearchQuery}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        Explore similar repos on GitHub
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right Column (Narrower) */}
            <div className="space-y-8">
              
              {/* Live Opportunities */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Briefcase className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Live Opportunities</h2>
                </div>

                <div className="space-y-3 mb-8 relative z-10">
                  <h3 className="text-sm font-semibold text-emerald-400/80 uppercase tracking-wider">Top Roles</h3>
                  {data.liveOpportunities.roles.map((role, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-300">
                      <ChevronRight className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-sm">{role}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 relative z-10">
                  <a 
                    href={data.liveOpportunities.linkedinQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 transition-colors"
                  >
                    <span className="font-semibold text-[#0A66C2] drop-shadow-[0_0_10px_rgba(10,102,194,0.5)]">Search LinkedIn</span>
                    <ExternalLink className="w-4 h-4 text-[#0A66C2]" />
                  </a>
                  <a 
                    href={data.liveOpportunities.indeedQuery}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl bg-[#2164f3]/10 hover:bg-[#2164f3]/20 border border-[#2164f3]/30 transition-colors"
                  >
                    <span className="font-semibold text-[#2164f3] drop-shadow-[0_0_10px_rgba(33,100,243,0.5)]">Search Indeed</span>
                    <ExternalLink className="w-4 h-4 text-[#2164f3]" />
                  </a>
                </div>
              </motion.div>

              {/* Community Pulse */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                    <Users className="w-6 h-6 text-orange-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Community Pulse</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-orange-400/80 uppercase tracking-wider mb-3">Active Subreddits</h3>
                    <div className="space-y-2">
                      {data.community.subreddits.map((sub, i) => (
                        <a key={i} href={sub.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-black/40 hover:bg-white/5 border border-white/5 transition-colors">
                          <span className="text-sm font-medium text-gray-300">{sub.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-orange-400/80 uppercase tracking-wider mb-3">LinkedIn Groups</h3>
                    <div className="space-y-2">
                      {data.community.linkedinGroups.map((group, i) => (
                        <a key={i} href={group.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-black/40 hover:bg-white/5 border border-white/5 transition-colors">
                          <span className="text-sm font-medium text-gray-300 truncate pr-4">{group.name}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-rose-500/20 bg-rose-500/5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                    <GraduationCap className="w-6 h-6 text-rose-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Top Courses</h2>
                </div>

                <div className="space-y-4">
                  {data.certifications.map((cert, i) => (
                    <a 
                      key={i}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl bg-black/40 border border-white/5 hover:border-rose-500/30 transition-colors group"
                    >
                      <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors mb-1">{cert.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{cert.provider}</span>
                        <span className="text-[10px] uppercase font-bold text-rose-500/70">{cert.type}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
