'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData, SkillContent } from '@/data/skills';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, ExternalLink, TrendingUp, Code2, 
  GraduationCap, Users, BookOpen, Github,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import Image from 'next/image';

export default function SkillPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<SkillContent | null>(null);

  useEffect(() => {
    const skillData = skillsData[params.slug];
    if (!skillData) {
      notFound();
    } else {
      setData(skillData);
    }
  }, [params.slug]);

  if (!data) return <div className="min-h-screen flex items-center justify-center bg-black"><div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[450px] flex items-end pb-16 border-b border-white/10 overflow-hidden">
        {/* Background Image with Overlays */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={data.heroImage} 
            alt={data.title}
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link href="/#ece-hub" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-6 group bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-4 text-white">
              {data.title}
            </h1>
            <p className="text-xl md:text-2xl text-indigo-200 font-medium mb-6 max-w-3xl">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Learning Path & Projects */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Learning Path */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                    <BookOpen className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold">The Learning Blueprint</h2>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500/50 before:to-transparent">
                  {data.learningPath.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-6">
                      <div className="w-10 h-10 rounded-full bg-black border-2 border-indigo-400 flex items-center justify-center flex-shrink-0 z-10">
                        <span className="text-sm font-bold text-indigo-300">{i + 1}</span>
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl font-bold text-white mb-3">{step.step}</h3>
                        <div className="flex flex-wrap gap-2">
                          {step.topics.map((topic, idx) => (
                            <span key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-sm border border-indigo-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Projects Masterclass */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                    <Code2 className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Project Masterclass</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.githubProjects.map((project, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-indigo-500/30 transition-colors group">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                      <p className="text-sm text-gray-400 mb-4 leading-relaxed">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 text-gray-400 border border-white/10 uppercase tracking-tight">
                            {t}
                          </span>
                        ))}
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 transition-colors">
                        View Repos <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right Column: Industry, Resources, Community */}
            <div className="space-y-8">
              
              {/* Industry Demand */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Industry Demand</h2>
                </div>
                
                <div className="mb-6 relative z-10">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                    data.industryDemand.level === 'Critical' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {data.industryDemand.level} Demand
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm mb-6 relative z-10 leading-relaxed">
                  {data.industryDemand.description}
                </p>

                <div className="space-y-3 relative z-10">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Top Hiring Companies</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.industryDemand.topCompanies.map((company, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-black/40 border border-emerald-500/10 text-xs font-medium text-gray-300">
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Resources */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                    <GraduationCap className="w-6 h-6 text-rose-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Mastery Resources</h2>
                </div>

                <div className="space-y-3">
                  {data.resources.map((res, i) => (
                    <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-black/40 hover:bg-rose-500/10 border border-white/5 transition-colors group">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5 group-hover:text-rose-300 transition-colors">{res.title}</h4>
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">{res.provider} • {res.type}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-rose-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Communities */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/20 flex items-center justify-center border border-sky-500/30">
                    <Users className="w-6 h-6 text-sky-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Community Pulse</h2>
                </div>

                <div className="space-y-3">
                  {data.communities.map((comm, i) => (
                    <a key={i} href={comm.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-xl bg-black/40 hover:bg-sky-500/10 border border-white/5 transition-colors group">
                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">{comm.name}</h4>
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">{comm.platform}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-sky-400 transition-colors" />
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
