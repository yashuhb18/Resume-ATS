'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, CircuitBoard, Zap, 
  Layers, Database, Brain,
  TrendingUp, ArrowUpRight, Loader2,
  CheckCircle2,
  Radio, Navigation, Wifi, Car, Activity
} from 'lucide-react';
import { useState } from 'react';
import MatrixDomainDetails from './MatrixDomainDetails';
import MatrixRoadmapView from './MatrixRoadmapView';

const domains = [
  {
    id: 'vlsi',
    title: 'VLSI & ASIC Logic',
    desc: 'Silicon architecture, RTL mastery, and physical design precision.',
    image: '/hero_semiconductor_fab_1777720047115.png',
    stat: 'Demand: +22%',
    icon: Cpu
  },
  {
    id: 'embedded',
    title: 'Embedded Systems',
    desc: 'Bare-metal C, RTOS synchronization, and hardware-software synergy.',
    image: '/embedded_iot_macro_1777720354595.png',
    stat: 'Hiring: HIGH',
    icon: CircuitBoard
  },
  {
    id: 'ai-hw',
    title: 'AI Hardware Intel',
    desc: 'Neural acceleration, TPU design, and edge-computing optimization.',
    image: '/ai_hardware_chip_1777720376249.png',
    stat: 'Growth: 4.2x',
    icon: Brain
  },
  {
    id: 'wireless',
    title: '5G & Wireless Comm',
    desc: 'Next-gen network protocols, RF engineering, and signal integrity.',
    image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=800',
    stat: 'Momentum: +15%',
    icon: Radio
  },
  {
    id: 'robotics',
    title: 'Robotics & Automation',
    desc: 'ROS architecture, kinematics, and industrial automation control.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    stat: 'Surge: +30%',
    icon: Navigation
  },
  {
    id: 'pcb',
    title: 'PCB & Product Dev',
    desc: 'Advanced EDA flow, hardware prototyping, and manufacturing sync.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
    stat: 'Active: HIGH',
    icon: Layers
  },
  {
    id: 'iot',
    title: 'IoT & Smart Systems',
    desc: 'Connected ecosystem architecture, MQTT protocols, and cloud sync.',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800',
    stat: 'Hiring: MASSIVE',
    icon: Wifi
  },
  {
    id: 'analog',
    title: 'Analog & Mixed-Signal',
    desc: 'Precision silicon design, RF frontend, and power management.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800',
    stat: 'Demand: ELITE',
    icon: Activity
  },
  {
    id: 'automotive',
    title: 'Automotive & EV Tech',
    desc: 'Electric drivetrain, autonomous sensors, and vehicle-to-X comms.',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800',
    stat: 'Growth: 8.5x',
    icon: Car
  }
];

export default function MatrixDomainGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [showRoadmap, setShowRoadmap] = useState<string | null>(null);

  const handleInit = (id: string) => {
    if (activeId === id && !isGenerating) {
      setShowRoadmap(id);
      return;
    }
    setActiveId(id);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowRoadmap(id);
    }, 2500);
  };

  return (
    <section className="py-32 bg-[#020308] relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <span className="text-tactical text-blue-500">Specialization Clusters</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              Trending <br />
              <span className="text-blue-500">Domains.</span>
            </h2>
          </div>
          <p className="text-slate-500 font-medium max-w-sm text-right">
            Initialize your autonomous career trajectory and access deep intelligence resource matrices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domains.map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative"
            >
              <div 
                onClick={() => handleInit(domain.id)}
                className={`hologram-card h-[500px] flex flex-col transition-all cursor-pointer ${activeId === domain.id ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,241,0.2)]' : 'hover:border-blue-500/30'}`}
              >
                
                {/* Visual Anchor */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] to-transparent z-10" />
                  <img 
                    src={domain.image} 
                    alt={domain.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                  />
                  {activeId === domain.id && isGenerating && (
                    <div className="absolute inset-0 z-30 bg-blue-600/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center px-4">
                       <Loader2 className="w-10 h-10 text-white animate-spin" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">Architecting Neural Path...</span>
                    </div>
                  )}
                  {activeId === domain.id && !isGenerating && (
                    <div className="absolute inset-0 z-30 bg-emerald-600/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                       <CheckCircle2 className="w-10 h-10 text-white" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">Trajectory Synced</span>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-blue-400">
                      {domain.stat}
                    </div>
                  </div>
                </div>

                {/* Content Matrix */}
                <div className="flex-1 p-8 flex flex-col justify-between relative z-20">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-blue-500/30 transition-colors">
                        <domain.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-3 uppercase tracking-tight">{domain.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {domain.desc}
                      </p>
                    </div>
                    {activeId === domain.id && !isGenerating && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setShowDetails(domain.id); }}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/20"
                      >
                         <Zap className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <span className="text-tactical group-hover:text-white transition-colors">
                      {activeId === domain.id ? (isGenerating ? 'Processing...' : 'Launch Roadmap') : 'Initialize Sector'}
                    </span>
                    <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all ${activeId === domain.id ? 'bg-blue-500 border-blue-500' : 'group-hover:bg-blue-500 group-hover:border-blue-500'}`}>
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deep Intelligence Drawer */}
      <AnimatePresence>
        {showDetails && (
          <MatrixDomainDetails 
            domainId={showDetails} 
            onClose={() => setShowDetails(null)} 
          />
        )}
      </AnimatePresence>

      {/* Neural Roadmap View */}
      <AnimatePresence>
        {showRoadmap && (
          <MatrixRoadmapView 
            domainId={showRoadmap} 
            onClose={() => setShowRoadmap(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
    </section>
  );
}
