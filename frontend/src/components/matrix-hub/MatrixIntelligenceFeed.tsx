'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiUrl } from '@/utils/api';
import { 
  Zap, ExternalLink, Loader2, 
  Clock, Newspaper, AlertCircle,
  TrendingUp, ArrowRight, ChevronRight, ChevronLeft
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
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const nextSlide = useCallback(() => {
    if (data && data.news.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % data.news.length);
    }
  }, [data]);

  const prevSlide = useCallback(() => {
    if (data && data.news.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + data.news.length) % data.news.length);
    }
  }, [data]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  if (isLoading) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center space-y-4 bg-white/[0.02] border border-white/5 rounded-3xl p-12">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        <p className="text-blue-400 font-bold tracking-widest text-[10px] uppercase">Decrypting Global Feed...</p>
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

  const currentItem = data.news[currentIndex];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-1 w-8 bg-blue-500 rounded-full" />
          <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Global Field</h3>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
                {data.news.map((_, i) => (
                    <div 
                        key={i} 
                        className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-4 bg-blue-500' : 'w-1 bg-white/10'}`} 
                    />
                ))}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              Updated {new Date(data.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
      </div>

      <div className="flex-1 relative group overflow-hidden rounded-3xl border border-white/5 bg-[#0a0c14]">
        <AnimatePresence mode="wait">
          <motion.a
            key={currentIndex}
            href={currentItem.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-3/5 w-full overflow-hidden">
                <img 
                    src={currentItem.image} 
                    alt={currentItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-[#0a0c14]/20 to-transparent" />
                
                {/* Tactical Overlays */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-sm shadow-xl shadow-blue-900/40">
                        {currentItem.category}
                    </span>
                    <div className="flex items-center gap-2 px-2 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded text-[9px] font-bold text-emerald-400 uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-8 flex flex-col justify-between">
                <div>
                    <h4 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 tracking-tight transition-colors">
                        {currentItem.title}
                    </h4>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-2">
                        Real-time industry update detecting high-momentum clusters in the global {currentItem.category.toLowerCase()} market.
                    </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Market Impact: High</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                        Full Briefing <ArrowRight className="w-4 h-4 text-blue-500" />
                    </div>
                </div>
            </div>
          </motion.a>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={(e) => { e.preventDefault(); prevSlide(); }}
                className="p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-blue-600 transition-all"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
                onClick={(e) => { e.preventDefault(); nextSlide(); }}
                className="p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-blue-600 transition-all"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
}
