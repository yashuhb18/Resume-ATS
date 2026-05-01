'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Briefcase,
  ClipboardCheck,
  Loader2,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
  Wand2,
  X,
} from 'lucide-react';
import { ChatMessage, InterviewChatResponse } from '@/types';
import { apiUrl } from '@/utils/api';

interface VirtualInterviewerChatProps {
  resumeFile: File | null;
  jdFile?: File | null;
}

export default function VirtualInterviewerChat({ resumeFile, jdFile }: VirtualInterviewerChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I am your Nimma-MITra Intelligence Guide. I can review your resume, run mock hardware interviews, and provide domain-specific career acceleration strategies.',
    },
  ]);
  const [input, setInput] = useState(
    resumeFile ? 'Act as HR. Would you shortlist me for this role?' : 'How should I prepare for a software engineer interview?'
  );
  const [isSending, setIsSending] = useState(false);
  const [lastResponse, setLastResponse] = useState<InterviewChatResponse | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending]);

  const starterQuestions = useMemo(() => {
    if (lastResponse?.suggested_questions?.length) return lastResponse.suggested_questions;
    if (resumeFile && jdFile) {
      return ['Would HR shortlist me?', 'Top JD gaps?', 'Ask a technical question', 'Rewrite my summary'];
    }
    if (resumeFile) {
      return ['How strong is my resume?', 'Mock interview question', 'What should I improve first?', '30-day prep plan'];
    }
    return ['Interview roadmap', 'Best resume format', 'Common HR questions', 'How to explain projects'];
  }, [lastResponse, resumeFile, jdFile]);

  const contextLabel = resumeFile
    ? jdFile
      ? 'Resume + JD connected'
      : 'Resume connected'
    : 'Career coach mode';

  const ask = async (question: string = input) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || isSending) return;

    const userMessage: ChatMessage = { role: 'user', content: cleanQuestion };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const formData = new FormData();
      if (resumeFile) formData.append('resume_file', resumeFile);
      if (jdFile) formData.append('jd_file', jdFile);
      formData.append('message', cleanQuestion);
      formData.append('mode', jdFile ? 'interviewer_hr_jd' : resumeFile ? 'interviewer_hr_resume' : 'general_career_hr');
      formData.append('history', JSON.stringify(messages.slice(-8)));

      const response = await fetch(apiUrl('/api/interview-chat'), {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Interview coach failed');
      }
      const data: InterviewChatResponse = await response.json();
      setLastResponse(data);
      setMessages([...nextMessages, { role: 'assistant', content: data.answer }]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: 'assistant',
          content: error instanceof Error ? error.message : 'I could not answer that right now.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="relative h-16 w-16 rounded-full flex items-center justify-center shadow-2xl border"
          style={{
            background: 'linear-gradient(145deg, #101828, #4f46e5 55%, #14b8a6)',
            borderColor: 'rgba(255,255,255,0.22)',
            boxShadow: '0 20px 54px rgba(15,23,42,0.35)',
          }}
          aria-label="Open interview coach"
        >
          <MessageCircle className="h-7 w-7 text-white" />
          <span
            className="absolute -right-0.5 -top-0.5 h-5 w-5 rounded-full border-2"
            style={{
              background: resumeFile ? 'var(--emerald-neon)' : '#fbbf24',
              borderColor: 'var(--surface-base)',
            }}
          />
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-[calc(100vw-2rem)] sm:w-[460px] max-h-[84vh] overflow-hidden rounded-lg border shadow-2xl"
          style={{
            background: 'linear-gradient(180deg, var(--surface-raised), var(--surface-base))',
            borderColor: 'var(--surface-border2)',
            boxShadow: '0 28px 80px rgba(2,6,23,0.35)',
          }}
        >
          <div
            className="p-4 border-b"
            style={{
              borderColor: 'var(--surface-border)',
              background: 'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(79,70,229,0.16), rgba(20,184,166,0.08))',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="h-11 w-11 rounded-lg flex items-center justify-center border"
                  style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.14)' }}
                >
                  <Bot className="h-5 w-5" style={{ color: 'var(--emerald-neon)' }} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                    ResQ Interview Coach
                  </h2>
                  <div className="mt-1 flex items-center gap-2 text-xs" style={{ color: 'var(--text-faint)' }}>
                    <ShieldCheck className="h-3.5 w-3.5" style={{ color: 'var(--emerald-neon)' }} />
                    <span>{contextLabel}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg border transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.14)', color: 'var(--text-muted)' }}
                aria-label="Close interview coach"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg border p-3" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)' }}>
                <div className="flex items-center gap-2 text-xs mb-1" style={{ color: 'var(--text-faint)' }}>
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Readiness
                </div>
                <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {lastResponse?.interviewer_score !== null && lastResponse?.interviewer_score !== undefined
                    ? `${lastResponse.interviewer_score}%`
                    : resumeFile
                    ? 'Ready'
                    : 'Open'}
                </p>
              </div>
              <div className="rounded-lg border p-3" style={{ background: 'var(--surface-subtle)', borderColor: 'var(--surface-border)' }}>
                <div className="flex items-center gap-2 text-xs mb-1" style={{ color: 'var(--text-faint)' }}>
                  <Briefcase className="h-3.5 w-3.5" />
                  Context
                </div>
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {contextLabel}
                </p>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="h-80 overflow-y-auto rounded-lg border p-4 mb-4 space-y-4"
              style={{ background: 'rgba(15,23,42,0.28)', borderColor: 'var(--surface-border)' }}
            >
              {messages.map((message, index) => (
                <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(20,184,166,0.10)' }}>
                      <Bot className="h-4 w-4" style={{ color: 'var(--emerald-neon)' }} />
                    </div>
                  )}
                  <div
                    className="max-w-[82%] rounded-lg px-4 py-3 text-sm leading-relaxed"
                    style={{
                      background:
                        message.role === 'user'
                          ? 'linear-gradient(135deg, #4f46e5, #14b8a6)'
                          : 'var(--surface-raised)',
                      color: message.role === 'user' ? '#fff' : 'var(--text-secondary)',
                      border: message.role === 'user' ? 'none' : '1px solid var(--surface-border)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--surface-subtle)' }}>
                      <UserRound className="h-4 w-4" style={{ color: 'var(--text-muted)' }} />
                    </div>
                  )}
                </div>
              ))}

              {isSending && (
                <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Reviewing your context...
                </div>
              )}
            </div>

            {lastResponse?.next_step && (
              <div className="mb-4 rounded-lg border p-3" style={{ background: 'rgba(20,184,166,0.06)', borderColor: 'rgba(20,184,166,0.20)' }}>
                <div className="flex items-center gap-2 text-xs font-semibold mb-1" style={{ color: 'var(--emerald-neon)' }}>
                  <Wand2 className="h-3.5 w-3.5" />
                  Next step
                </div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{lastResponse.next_step}</p>
              </div>
            )}

            <div className="flex gap-2 overflow-x-auto pb-2 mb-3">
              {starterQuestions.slice(0, 4).map(question => (
                <button
                  key={question}
                  onClick={() => ask(question)}
                  disabled={isSending}
                  className="px-3 py-2 rounded-lg text-xs font-semibold border disabled:opacity-50 whitespace-nowrap"
                  style={{ background: 'var(--surface-raised)', borderColor: 'var(--surface-border2)', color: 'var(--text-secondary)' }}
                >
                  <Sparkles className="inline h-3 w-3 mr-1" />
                  {question}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                value={input}
                onChange={event => setInput(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    ask();
                  }
                }}
                disabled={isSending}
                className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none disabled:opacity-50"
                style={{ background: 'var(--surface-raised)', borderColor: 'var(--surface-border2)', color: 'var(--text-primary)' }}
                placeholder="Ask HR, JD fit, mock interview, or resume strategy..."
              />
              <button
                onClick={() => ask()}
                disabled={isSending || !input.trim()}
                className="btn-primary px-5 disabled:opacity-50"
                aria-label="Send question"
              >
                {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
