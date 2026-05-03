'use client';

import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  ChevronRight,
  Users
} from 'lucide-react';

const semesters = [
  { id: 3, title: '3rd Semester' },
  { id: 4, title: '4th Semester' },
  { id: 5, title: '5th Semester' },
  { id: 6, title: '6th Semester' },
  { id: 7, title: '7th Semester' },
];

export default function MatrixAcademicFacilities() {
  return (
    <section id="academic-facilities" className="relative py-32 bg-[#f8fafc] overflow-hidden border-y border-slate-200">
      
      {/* Light Mode Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center border border-emerald-200 shadow-sm">
              <GraduationCap className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-[10px] font-black text-emerald-600 tracking-[0.3em] uppercase">Intelligence Repository</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter"
          >
            Academic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Facilities.</span>
          </motion.h2>
        </div>

        {/* Semester Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {semesters.map((sem, idx) => (
            <motion.div
              key={sem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="bg-white border border-slate-200 rounded-[2rem] p-10 hover:border-emerald-500/30 transition-all duration-500 group-hover:-translate-y-2 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.15)] flex flex-col items-center text-center">
                
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-8">
                  {sem.title}
                </h3>

                {/* Link Placeholder */}
                <div className="w-full pt-8 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Access Drive
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm flex flex-col items-center text-center gap-6"
        >
          <div className="w-16 h-16 rounded-[1.5rem] bg-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-600/20">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h4 className="text-slate-900 text-xl font-black uppercase tracking-tight mb-2">
              By the Students, For the Students
            </h4>
            <p className="text-slate-500 font-medium max-w-2xl leading-relaxed">
              This platform is an app for the students by the students. The academic notes and materials will be actively updated and curated by the student community.
            </p>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.3em]">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Community-Driven Intelligence
          </div>
        </motion.div>

      </div>
    </section>
  );
}
