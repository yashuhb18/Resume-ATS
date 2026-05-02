'use client';

import { motion } from 'framer-motion';
import { 
  Target, Sparkles, Brain, 
  TrendingUp, BarChart3, Activity,
  Zap, Layers, Loader2
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';

const initialRadarData = [
  { subject: 'Digital Logic', A: 120, fullMark: 150 },
  { subject: 'Verilog', A: 98, fullMark: 150 },
  { subject: 'Embedded C', A: 86, fullMark: 150 },
  { subject: 'FPGA', A: 99, fullMark: 150 },
  { subject: 'RTOS', A: 85, fullMark: 150 },
  { subject: 'PCB Design', A: 65, fullMark: 150 },
];

export default function MatrixSkillGraph() {
  const [data, setData] = useState(initialRadarData);
  const [isSyncing, setIsSyncing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const newData = data.map(d => ({
        ...d,
        A: Math.min(150, Math.max(50, d.A + (Math.random() * 20 - 10)))
      }));
      setData(newData);
      setIsSyncing(false);
    }, 2000);
  };

  return (
    <section className="py-32 bg-[#020308] relative overflow-hidden">
      
      {/* ── Background Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <span className="text-tactical text-blue-400 block mb-6">Neural Skill Mapping</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-8 italic">
            Your Career <br />
            <span className="text-blue-500">Graph.</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Visualize your professional DNA against global industry benchmarks in real-time.
          </p>
        </div>

        <div className="hologram-card p-12 bg-[#0a0c14]/40 border-blue-500/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Tactical Metrics */}
            <div className="lg:col-span-4 space-y-12">
               <div className="space-y-4">
                 <h4 className="text-tactical text-slate-600">Vector Alignment</h4>
                 <div className="flex items-baseline gap-4">
                   <span className="text-6xl font-black text-white tracking-tighter italic">84.2</span>
                   <span className="text-emerald-500 font-black text-sm uppercase tracking-widest flex items-center gap-1">
                     <TrendingUp className="w-4 h-4" /> ELITE_TIER
                   </span>
                 </div>
               </div>

               <div className="space-y-6">
                 {[
                   { label: 'Technical Precision', val: 92 },
                   { label: 'Domain Adaptability', val: 78 },
                   { label: 'Industry Readiness', val: 88 },
                 ].map((m, i) => (
                   <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-blue-500/10 transition-all cursor-default">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                        <span className="text-xs font-black text-white">{m.val}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${m.val}%` }}
                          animate={{ width: isSyncing ? '50%' : `${m.val}%` }}
                          className="h-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,241,0.5)]" 
                        />
                      </div>
                   </div>
                 ))}
               </div>

               <button 
                 onClick={handleSync}
                 disabled={isSyncing}
                 className="w-full matrix-btn flex items-center justify-center gap-3"
               >
                 {isSyncing ? (
                   <>
                     <Loader2 className="w-4 h-4 animate-spin" />
                     Syncing DNA...
                   </>
                 ) : (
                   <>
                     <Zap className="w-4 h-4" />
                     Sync Career DNA
                   </>
                 )}
               </button>
            </div>

            {/* Right: Immersive Radar Visualization */}
            <div className="lg:col-span-8 aspect-square lg:aspect-auto h-[600px] relative">
               <div className="absolute inset-0 z-0">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-blue-500/5 rounded-full border-dashed"
                  />
               </div>
               
               <div className="relative z-10 w-full h-full">
                 {mounted && (
                   <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                       <PolarGrid stroke="#ffffff05" strokeWidth={2} />
                       <PolarAngleAxis 
                          dataKey="subject" 
                          tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }} 
                       />
                       <Radar
                         name="Career DNA"
                         dataKey="A"
                         stroke="#3b82f6"
                         strokeWidth={4}
                         fill="#3b82f6"
                         fillOpacity={0.2}
                       />
                     </RadarChart>
                   </ResponsiveContainer>
                 )}
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
