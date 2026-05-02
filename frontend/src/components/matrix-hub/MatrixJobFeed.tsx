'use client';

import { motion } from 'framer-motion';
import { 
  Briefcase, MapPin, DollarSign, 
  Globe, ExternalLink, Zap,
  TrendingUp, Activity
} from 'lucide-react';

const mockJobs = [
  { title: 'VLSI Verification Engineer', company: 'NVIDIA', loc: 'Santa Clara, CA', sal: '$160k - $220k', domain: 'VLSI' },
  { title: 'Embedded Firmware Dev', company: 'Qualcomm', loc: 'Bangalore, IN', sal: '₹18L - ₹32L', domain: 'Embedded' },
  { title: 'Robotics Software Lead', company: 'Tesla', loc: 'Austin, TX', sal: '$140k - $190k', domain: 'Robotics' },
  { title: 'ASIC Design Intern', company: 'Intel', loc: 'Hillsboro, OR', sal: 'Competitive', domain: 'VLSI' },
  { title: 'IoT Systems Architect', company: 'ARM', loc: 'Cambridge, UK', sal: '£65k - £90k', domain: 'IoT' },
];

export default function MatrixJobFeed() {
  return (
    <section className="py-32 bg-[#020308] relative overflow-hidden">
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-tactical text-emerald-500">Live Opportunity Matrix</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              High-Velocity <br />
              <span className="text-blue-500 text-6xl md:text-8xl italic">Pipelines.</span>
            </h2>
          </div>
          <button className="matrix-btn">
            View All Intelligence
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Animated Scrolling Feed */}
          <div className="lg:col-span-8 h-[600px] overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020308] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020308] to-transparent z-10" />
            
            <motion.div 
              animate={{ y: [0, -1000] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="space-y-6"
            >
              {[...mockJobs, ...mockJobs, ...mockJobs].map((job, i) => (
                <div key={i} className="hologram-card p-8 bg-[#0a0c14]/60 border-white/5 flex items-center justify-between hover:border-blue-500/30 transition-all group">
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                      <Briefcase className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight group-hover:text-blue-400 transition-colors">{job.title}</h4>
                      <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">
                        <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> {job.company}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {job.loc}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-xs font-black text-emerald-400">{job.sal}</span>
                    <div className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-black text-blue-400 uppercase tracking-[0.2em]">
                      {job.domain}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Hiring Trends Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="hologram-card p-10 bg-blue-600 border-blue-400 text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                 <TrendingUp className="w-24 h-24" />
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tight mb-8">Quarterly <br />Hiring Surge</h3>
               <div className="space-y-6">
                 {[
                   { label: 'Semiconductor Fab', val: 88 },
                   { label: 'Embedded Linux', val: 74 },
                   { label: 'FPGA Acceleration', val: 92 },
                 ].map((t, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span>{t.label}</span>
                       <span>{t.val}%</span>
                     </div>
                     <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                       <motion.div initial={{ width: 0 }} whileInView={{ width: `${t.val}%` }} className="h-full bg-white shadow-[0_0_10px_white]" />
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="hologram-card p-10 bg-[#0d0f1a]/80">
              <div className="flex items-center gap-4 mb-8">
                <Activity className="w-6 h-6 text-emerald-400" />
                <h4 className="text-lg font-black uppercase tracking-tight text-white">System Signal</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed italic mb-8">
                "Multiple hiring bursts detected at Intel and Texas Instruments. Skill cluster focus: RISC-V and UVM Verification."
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-tactical text-slate-600 block mb-2">Confidence Level</span>
                <div className="flex gap-1">
                   {[1, 2, 3, 4, 5].map(i => (
                     <div key={i} className="flex-1 h-1 rounded bg-blue-500 shadow-[0_0_5px_#3b82f6]" />
                   ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
