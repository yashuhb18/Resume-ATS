'use client';

import { motion } from 'framer-motion';
import { 
  Brain, Send, Zap, Loader2, Sparkles, Shield, Activity, Layers
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export default function NimmaAI() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Intelligence Core Synchronized. I am Nimma-AI, your department's primary companion. How can I help you architect your academic or global career trajectory today?" }
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
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    
    setInput('');
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/api/nimma-chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMsg,
          history: newMessages.slice(-6) // Send recent history for context
        })
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || "My processors encountered a sync error. Please re-deploy your query."
      }]);
    } catch (error) {
      console.error("Nimma-AI Error:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "External Link Failure. Connectivity to the Intelligence Core was interrupted." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-32 bg-[#020308] relative overflow-hidden border-t border-white/5">
      
      {/* ── Background Infrastructure ── */}
      <div className="absolute top-1/2 left-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Interactive AI Mockup */}
          <div className="lg:col-span-7 relative">
            <div className="hologram-card p-1 bg-gradient-to-br from-blue-500/20 to-purple-500/20">
              <div className="bg-[#0a0c14]/90 rounded-[2.5rem] p-8 lg:p-12 overflow-hidden relative">
                
                {/* Header Readout */}
                <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 relative">
                       <Brain className="w-8 h-8 text-white" />
                       <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0c14] animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tight italic">Nimma-AI</h4>
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3" /> Intelligence Core Active
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
                          ? 'bg-indigo-600 text-white rounded-tr-none font-black uppercase italic' 
                          : 'bg-white/5 border border-white/5 text-slate-300 rounded-tl-none'
                      }`}>
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                       <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
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
                    placeholder="Coordinate with Nimma-AI..."
                    className="w-full bg-[#020308] border border-white/10 rounded-2xl py-5 pl-8 pr-16 text-xs font-bold text-white placeholder:text-slate-700 focus:border-indigo-500/30 transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={isTyping}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/30 disabled:opacity-50"
                  >
                    {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right: Feature Matrix */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-tactical text-indigo-400 block mb-6">Unified Platform Intelligence</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                Deploy <br />
                <span className="text-indigo-500 italic text-6xl md:text-8xl">Nimma-AI.</span>
              </h2>
              <p className="text-lg text-slate-400 font-medium leading-relaxed">
                Your centralized companion for the Student Intelligence Hub. 
                Nimma-AI synchronizes your academic journey with global industry requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { title: 'Platform Navigation', icon: Sparkles, desc: 'Find academic materials, roadmaps, and news instantly.' },
                { title: 'Career Strategy', icon: Brain, desc: 'Deep insights into VLSI, Embedded, and Semiconductor paths.' },
                { title: 'Community Support', icon: Shield, desc: "By the students, for the students. Updates you can trust." },
              ].map((f, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:border-indigo-500/30 transition-colors">
                    <f.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2 italic">{f.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-12 py-5 bg-indigo-600 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white shadow-2xl shadow-indigo-500/20 hover:bg-indigo-500 transition-all active:scale-95">
              Initiate Sync
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
