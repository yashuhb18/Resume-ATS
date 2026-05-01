'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Brain, Cpu, MessageSquare, X } from 'lucide-react';
import { apiUrl } from '@/utils/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function IntelligenceSidebar({ roadmapContext, onClose }: { roadmapContext: any, onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: `Intelligence Synchronized. I am your Gemini-powered Roadmap Oracle. How can I assist your trajectory in ${roadmapContext.domain}?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(apiUrl('/api/roadmap-chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: userMessage,
          context: roadmapContext,
          history: messages
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Quantum Anomaly: Could not sync with Gemini." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="fixed top-0 right-0 w-[450px] h-full bg-[#050505] border-l border-white/10 z-[100] flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
    >
      <header className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
            <Brain className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">Roadmap Oracle</h3>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Gemini 2.0 Flash Active</span>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white/40" />
          </button>
        )}
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 rounded-tl-none flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Processing DNA...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="p-6 border-t border-white/10 bg-white/[0.02]">
        <div className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your Oracle..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 pr-12 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-white/20"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 text-white rounded-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[8px] font-black text-center mt-4 uppercase tracking-[0.3em] text-white/20">
          Neural Transmission Secure
        </p>
      </footer>
    </motion.div>
  );
}
