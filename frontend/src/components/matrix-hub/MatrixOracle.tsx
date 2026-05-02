'use client';

import { motion } from 'framer-motion';
import { 
  MessageCircle, Brain, Sparkles, 
  Send, Shield, Activity,
  Zap, ZapOff, Layers, Loader2
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function MatrixOracle() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Systems synchronized. I've analyzed the recent hiring surges at NVIDIA and Texas Instruments. Given your focus on technical precision, how can I help you architect your next domain leap?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    // Simulation of AI response - in real app, fetch from /api/chat
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Analyzing "${userMsg}" against global career matrices... I recommend prioritizing SystemVerilog UVM and RISC-V architecture modules to align with the current Q3 hiring surge.` 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-32 bg-[#020308] relative overflow-hidden">
      
      {/* ── Background Infrastructure ── */}
      <div className="absolute top-1/2 left-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Interactive Oracle Mockup */}
          <div className="lg:col-span-7 relative">
            <div className="hologram-card p-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <div className="bg-[#0a0c14]/90 rounded-[2.5rem] p-8 lg:p-12 overflow-hidden relative">
                
                {/* Header Readout */}
                <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 relative">
                       <Brain className="w-8 h-8 text-white" />
                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0c14] animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight italic">Nimma Oracle</h4>
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Neural Core Stable
                      </span>
                    </div>
                  </div>
                </div>

                {/* Chat Stream */}
                <div 
                  ref={scrollRef}
                  className="space-y-6 mb-10 h-[350px] overflow-y-auto pr-4 scrollbar-hide"
                >
                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] p-5 rounded-2xl text-sm font-medium leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none font-black uppercase italic' 
                          : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-none italic'
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                       </div>
                    </div>
                  )}
                </div>

                {/* Input Matrix */}
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="relative"
                >
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Query the Matrix..."
                    className="w-full bg-[#020308] border border-white/10 rounded-2xl py-5 pl-8 pr-16 text-xs font-bold text-white placeholder:text-slate-700 focus:border-blue-500/30 transition-all"
                  />
                  <button 
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-blue-500 text-white hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/30"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Feature Matrix */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-tactical text-blue-400 block mb-6">Strategic Intelligence Hub</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                Your AI <br />
                <span className="text-blue-500 italic text-6xl md:text-8xl">Oracle.</span>
              </h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Not just a chatbot, but a senior ECE career strategist synchronized with the global market. 
                Get tactical guidance on VLSI, Embedded, and AI Hardware 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { title: 'Technical Mentorship', icon: Brain, desc: 'Real-time debugging and architecture guidance.' },
                { title: 'Interview Simulation', icon: Activity, desc: 'Domain-specific technical drills with live feedback.' },
                { title: 'Project Orchestration', icon: Layers, desc: 'Identify high-impact projects based on market gaps.' },
              ].map((f, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-blue-500/30 transition-colors">
                    <f.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2 italic">{f.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="matrix-btn w-full lg:w-fit !px-12">
              Connect to Oracle
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
