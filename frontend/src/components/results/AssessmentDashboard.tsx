'use client';

import { useState } from 'react';
import { AssessmentResponse } from '@/types';
import { CheckCircle2, XCircle, ChevronRight, RefreshCw, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssessmentDashboard({ assessment }: { assessment: AssessmentResponse }) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!assessment || !assessment.questions || assessment.questions.length === 0) return null;

  const currentQuestion = assessment.questions[currentQuestionIdx];
  const totalQuestions = assessment.total_questions;

  const handleSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIdx]: option }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    assessment.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct_answer) score++;
    });
    return score;
  };

  const score = isSubmitted ? calculateScore() : 0;
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="card p-6 border-2 border-purple-500/20 bg-purple-500/5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Award className="w-6 h-6 text-purple-400" />
            {assessment.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {assessment.description}
          </p>
        </div>
        {!isSubmitted && (
          <div className="text-sm font-medium px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">
            Question {currentQuestionIdx + 1} of {totalQuestions}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key={`q-${currentQuestionIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
              {currentQuestion.question}
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestionIdx] === option;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      isSelected
                        ? 'border-purple-400 bg-purple-500/20'
                        : 'border-white/10 bg-white/5 hover:border-purple-500/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-purple-400' : 'border-white/30'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />}
                      </div>
                      <span style={{ color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestionIdx]}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestionIdx < totalQuestions - 1 ? 'Next Question' : 'Submit Assessment'}
                {currentQuestionIdx < totalQuestions - 1 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="text-center py-6">
              <div className="relative inline-flex items-center justify-center mb-4">
                <svg className="w-32 h-32 -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                  <circle
                    cx="64" cy="64" r="56" fill="none"
                    stroke={percentage >= 70 ? '#34d399' : percentage >= 40 ? '#fbbf24' : '#fb7185'}
                    strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={`${(percentage / 100) * 2 * Math.PI * 56} ${2 * Math.PI * 56}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold font-display" style={{ color: 'var(--text-primary)' }}>
                    {percentage}%
                  </span>
                </div>
              </div>
              <h4 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {percentage >= 70 ? 'Excellent Work!' : percentage >= 40 ? 'Good Effort!' : 'Keep Practicing!'}
              </h4>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                You scored {score} out of {totalQuestions} questions correctly.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>Detailed Review</h4>
              {assessment.questions.map((q, idx) => {
                const userAnswer = selectedAnswers[idx];
                const isCorrect = userAnswer === q.correct_answer;
                
                return (
                  <div key={idx} className={`p-4 rounded-xl border ${isCorrect ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'}`}>
                    <div className="flex gap-3">
                      <div className="mt-1 flex-shrink-0">
                        {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
                      </div>
                      <div>
                        <p className="font-medium mb-2" style={{ color: 'var(--text-primary)' }}>{q.question}</p>
                        <p className="text-sm mb-1">
                          <span className="text-white/50">Your Answer: </span>
                          <span className={isCorrect ? 'text-emerald-300' : 'text-rose-300'}>{userAnswer || 'Not answered'}</span>
                        </p>
                        {!isCorrect && (
                          <p className="text-sm mb-2">
                            <span className="text-white/50">Correct Answer: </span>
                            <span className="text-emerald-300">{q.correct_answer}</span>
                          </p>
                        )}
                        <p className="text-sm mt-3 p-3 rounded bg-black/20 text-white/70 border border-white/5">
                          <span className="font-semibold text-purple-300">Explanation: </span>
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setIsSubmitted(false);
                  setCurrentQuestionIdx(0);
                }}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
