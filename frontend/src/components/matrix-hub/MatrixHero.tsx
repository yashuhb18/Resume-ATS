'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Fingerprint, Zap, Terminal, 
  ChevronDown, Cpu, Activity,
  Globe, Shield, CheckCircle2,
  AlertCircle, Loader2
} from 'lucide-react';
import { useRef, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function MatrixHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: false
  });

  const handleStartScan = () => {
    if (!file) return;
    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 50);
  };

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#020308]">
      
      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020308]/50 to-[#020308] z-10" />
        <img 
          src="/hero_semiconductor_fab_1777720047115.png" 
          alt="Semiconductor Fab"
          className="w-full h-full object-cover opacity-40 mix-blend-screen"
        />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* ── Floating Tactical Widgets ── */}
      {!isScanning && (
        <div className="absolute inset-0 z-20 pointer-events-none hidden lg:block">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] p-6 hologram-card group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <span className="text-tactical text-blue-400">Nodes Active</span>
                <p className="text-white font-black">12,402</p>
              </div>
            </div>
            <div className="flex gap-1 h-8 items-end">
              {[40, 70, 45, 90, 65, 80].map((h, i) => (
                <div key={i} className="w-1 bg-blue-500/30 rounded-full" style={{ height: `${h}%` }} />
              ))}
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-[10%] p-6 hologram-card group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                <Cpu className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <span className="text-tactical text-purple-400">Market Intel</span>
                <p className="text-white font-black">VLSI_UP +18%</p>
              </div>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: ['0%', '68%'] }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="h-full bg-purple-500 shadow-[0_0_10px_#8b5cf6]" 
              />
            </div>
          </motion.div>
        </div>
      )}

      {/* ── Core Narrative ── */}
      <div className="container mx-auto px-6 relative z-30 text-center">
        <AnimatePresence mode="wait">
          {!isScanning ? (
            <motion.div
              key="hero-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div className="flex flex-col items-center gap-8">
                <motion.div 
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,241,0.3)] relative"
                >
                  <div {...getRootProps()} className="w-full h-full flex items-center justify-center cursor-pointer">
                    <input {...getInputProps()} />
                    <Fingerprint className="w-12 h-12 text-white" />
                    <div className="absolute inset-0 rounded-[2rem] border border-white/20 animate-ping opacity-20" />
                  </div>
                </motion.div>
                
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
                  Student Intelligence <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">Hub.</span>
                </h1>

                {file ? (
                  <p className="text-lg md:text-xl text-emerald-400 max-w-2xl mx-auto font-black tracking-tight uppercase italic">
                    Payload Loaded: {file.name}
                  </p>
                ) : (
                  <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium tracking-tight leading-relaxed">
                    Initiate a high-fidelity intelligence scan. Drop your tactical profile (resume) to 
                    architect your global trajectory with absolute technical precision.
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                {file ? (
                  <button 
                    onClick={handleStartScan}
                    className="px-12 py-5 bg-blue-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-500/20 hover:bg-blue-500 transition-all flex items-center gap-4 group"
                  >
                    <Zap className="w-4 h-4 text-white" />
                    Initialize Scan
                  </button>
                ) : (
                  <div {...getRootProps()} className="cursor-pointer px-12 py-5 bg-transparent border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white hover:bg-white/5 hover:border-blue-500/30 transition-all flex items-center gap-4 group">
                    <input {...getInputProps()} />
                    <Zap className="w-4 h-4 text-blue-400 group-hover:scale-125 transition-transform" />
                    Initialize Hub Sync
                  </div>
                )}
                <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 font-black text-xs uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 transition-all flex items-center gap-3">
                  <Terminal className="w-4 h-4" />
                  Manual Entry
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scanning-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 lg:p-20 bg-[#0a0c14]/80 border border-blue-500/30 rounded-3xl text-center space-y-12 relative overflow-hidden"
            >
              {/* Scan Line Animation */}
              <motion.div 
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[2px] bg-blue-500 shadow-[0_0_20px_#3b82f6] z-20 pointer-events-none"
              />
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-center">
                   <div className="w-24 h-24 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">Syncing Intelligence...</h3>
                   <span className="text-blue-400 font-mono text-sm">{scanProgress}% COMPLETE</span>
                </div>
                
                <div className="max-w-md mx-auto space-y-4 text-left">
                   {[
                     { l: 'Keyword Extraction', s: scanProgress > 30 ? 'COMPLETED' : 'PENDING' },
                     { l: 'Domain Mapping', s: scanProgress > 60 ? 'COMPLETED' : 'PENDING' },
                     { l: 'Gap Analysis', s: scanProgress > 90 ? 'COMPLETED' : 'PENDING' },
                   ].map((step, i) => (
                     <div key={i} className="flex justify-between items-center px-6 py-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{step.l}</span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${step.s === 'COMPLETED' ? 'text-emerald-500' : 'text-slate-700'}`}>{step.s}</span>
                     </div>
                   ))}
                </div>

                {scanProgress >= 100 && (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-8">
                      <p className="text-emerald-400 font-black uppercase tracking-widest mb-6">Intelligence Sync Successful</p>
                      <button className="px-8 py-4 bg-emerald-600 rounded-xl font-black text-xs uppercase tracking-widest text-white">Access Personal Intelligence Hub</button>
                   </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">Scan Forward</span>
        <ChevronDown className="w-4 h-4 text-white" />
      </motion.div>

    </section>
  );
}
