'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiUrl } from '@/utils/api';
import { 
  Zap, Linkedin, Share2, MessageSquare, 
  ExternalLink, Loader2, Info, Globe, Briefcase
} from 'lucide-react';

interface SocialHook {
  platform: string;
  type: string;
  url: string;
  description: string;
}

interface PulseData {
  domain: string;
  briefing: string;
  social_hooks: SocialHook[];
}

export default function SocialPulse({ domain }: { domain: string }) {
  const [data, setData] = useState<PulseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPulse = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl('/api/pulse'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ domain })
        });
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (err) {
        console.error('Pulse Engine Failure:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (domain) fetchPulse();
  }, [domain]);

  if (isLoading) {
    return (
      <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
        <p className="text-gray-400 font-medium">Synchronizing Pulse Feed...</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Today's Briefing */}
      <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap className="w-12 h-12 text-indigo-400" />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="px-2 py-1 bg-indigo-500 text-[10px] font-bold text-white rounded uppercase tracking-tighter">Live</div>
          <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-2">
             Intelligence Briefing
          </h3>
        </div>
        
        <p className="text-lg text-white font-medium leading-relaxed">
          "{data.briefing}"
        </p>
      </div>

      {/* Social Pulse Hooks */}
      <div className="grid grid-cols-1 gap-4">
        {data.social_hooks.map((hook, idx) => (
          <a 
            key={idx}
            href={hook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-5 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.06] hover:border-indigo-500/30 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                {hook.platform.includes('LinkedIn') ? (
                  <Linkedin className="w-6 h-6 text-[#0A66C2]" />
                ) : hook.platform.includes('Reddit') ? (
                  <MessageSquare className="w-6 h-6 text-[#FF4500]" />
                ) : (
                  <Globe className="w-6 h-6 text-indigo-400" />
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{hook.platform}</h4>
                <p className="text-xs text-gray-500 font-medium">{hook.description}</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>
        ))}
      </div>

      {/* Subscription Alert */}
      <div className="flex items-start gap-3 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
        <Info className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
        <p className="text-xs text-emerald-200/70 leading-relaxed font-medium">
          <span className="text-emerald-400 font-bold">Coursera Plus Active:</span> All course links below are verified for your subscription. Start mastering these skills today with full access.
        </p>
      </div>
    </motion.div>
  );
}
