'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiUrl } from '@/utils/api';
import { 
  Zap, ExternalLink, Loader2, 
  Clock, Newspaper, AlertCircle,
  TrendingUp, ArrowRight
} from 'lucide-react';

interface NewsItem {
  title: string;
  link: string;
  image: string;
  category: string;
  date: string;
}

interface NewsData {
  news: NewsItem[];
  last_updated: string;
}

export default function MatrixIntelligenceFeed() {
  const [data, setData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(apiUrl('/api/industry-news'));
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setError('System unable to reach news uplink.');
        }
      } catch (err) {
        setError('Intelligence link failure.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center space-y-4 bg-white/[0.02] border border-white/5 rounded-3xl p-12">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-blue-400 font-bold tracking-widest text-[10px] uppercase">Decrypting Intelligence Stream...</p>
      </div>
    );
  }

  if (error || !data || data.news.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center space-y-4 bg-red-500/5 border border-red-500/10 rounded-3xl p-12">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <p className="text-red-400 font-bold tracking-widest text-[10px] uppercase">{error || 'No news data available'}</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Newspaper className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-widest">Global Intel Feed</h3>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
          <Clock className="w-3 h-3" />
          Updated {new Date(data.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {data.news.map((item, idx) => (
            <motion.a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              className="group relative flex items-start gap-4 p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Image Container */}
              <div className="w-24 h-24 shrink-0 rounded-xl overflow-hidden border border-white/10 relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 min-w-0 py-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[9px] font-bold text-blue-400 uppercase tracking-tighter rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase">
                    <TrendingUp className="w-3 h-3" />
                    Live
                  </div>
                </div>
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-white leading-tight mb-2 line-clamp-2 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1 text-[10px] font-bold text-blue-500 mt-auto">
                  Analyze Intel <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink className="w-4 h-4 text-white/40" />
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
}
