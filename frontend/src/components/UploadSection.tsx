'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, X, AlertCircle, CheckCircle2, Zap, GitCompare } from 'lucide-react';

interface UploadSectionProps {
  onAnalyze: (file: File) => void;
  onCompare?: (resumeFile: File, jdFile: File) => void;
  error: string | null;
}

type Mode = 'analyze' | 'compare';

/* ─── Reusable drop zone ─── */
function DropZone({
  file,
  isActive,
  rootProps,
  inputProps,
  onRemove,
  label,
  formats,
  accentColor = 'var(--brand-primary)',
}: {
  file: File | null;
  isActive: boolean;
  rootProps: object;
  inputProps: object;
  onRemove: () => void;
  label: string;
  formats: string[];
  accentColor?: string;
}) {
  return (
    <div className="group">
      <p className="text-xs font-black uppercase tracking-widest mb-4 ml-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <div
        {...rootProps}
        className="relative border-2 border-dashed rounded-[2rem] p-12 text-center cursor-pointer transition-all duration-500 overflow-hidden"
        style={{
          borderColor: isActive
            ? accentColor
            : file
            ? 'var(--inst-emerald)'
            : 'rgba(255,255,255,0.1)',
          background: isActive
            ? `rgba(99,102,241,0.08)`
            : file
            ? 'rgba(16,185,129,0.04)'
            : 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(12px)',
          boxShadow: isActive 
            ? `0 0 40px -10px ${accentColor}44, inset 0 0 20px ${accentColor}11` 
            : file
            ? `0 0 30px -10px rgba(16,185,129,0.2)`
            : 'none',
        }}
      >
        {/* Decorative corner glow */}
        <div 
          className="absolute -top-12 -right-12 w-24 h-24 blur-[60px] opacity-20 pointer-events-none transition-colors"
          style={{ background: isActive ? accentColor : file ? 'var(--inst-emerald)' : 'transparent' }}
        />

        <input {...inputProps} />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl transition-transform group-hover:scale-105 duration-500"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
                  border: '1px solid rgba(16,185,129,0.2)'
                }}
              >
                <CheckCircle2 className="w-10 h-10" style={{ color: 'var(--inst-emerald)' }} />
              </div>
              <div className="flex items-center gap-4 mb-3 bg-white/5 pl-5 pr-2 py-2 rounded-2xl border border-white/5">
                <FileText className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm truncate max-w-[200px] text-white">
                  {file.name}
                </span>
                <button
                  onClick={e => { e.stopPropagation(); onRemove(); }}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR ANALYSIS
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:rotate-6 shadow-xl"
                style={{
                  background: isActive ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.03)',
                  border: isActive ? `1px solid ${accentColor}44` : '1px solid rgba(255,255,255,0.05)'
                }}
              >
                <Upload
                  className="w-10 h-10 transition-colors duration-500"
                  style={{ color: isActive ? accentColor : 'var(--text-muted)' }}
                />
              </div>
              <h3 className="text-xl font-black mb-2 text-white">
                {isActive ? 'Release to Start' : 'Analyze Your Masterpiece'}
              </h3>
              <p className="text-sm font-medium mb-6 text-slate-500">
                Drag & drop or <span className="text-indigo-400 underline decoration-indigo-400/30 underline-offset-4">browse files</span>
              </p>
              
              <div className="flex items-center gap-3 justify-center">
                {formats.map(f => (
                  <span
                    key={f}
                    className="px-3 py-1 rounded-lg text-[10px] font-black tracking-tighter border border-white/5 bg-white/5 text-slate-400"
                  >
                    {f}
                  </span>
                ))}
                <div className="w-1 h-1 rounded-full bg-white/10" />
                <span className="text-[10px] font-black text-slate-600">MAX 5MB</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export default function UploadSection({ onAnalyze, onCompare, error }: UploadSectionProps) {
  const [mode, setMode]                 = useState<Mode>('analyze');
  const [file, setFile]                 = useState<File | null>(null);
  const [jdFile, setJdFile]             = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const onDropResume = useCallback((accepted: File[], rejected: any[]) => {
    setValidationError(null);
    if (rejected.length > 0) {
      const code = rejected[0].errors[0]?.code;
      setValidationError(
        code === 'file-too-large' ? 'File size exceeds 5MB limit'
          : code === 'file-invalid-type' ? 'Invalid type. Please upload PDF or DOCX'
          : 'Invalid file',
      );
      return;
    }
    if (accepted.length > 0) setFile(accepted[0]);
  }, []);

  const onDropJD = useCallback((accepted: File[], rejected: any[]) => {
    setValidationError(null);
    if (rejected.length > 0) {
      const code = rejected[0].errors[0]?.code;
      setValidationError(
        code === 'file-too-large' ? 'File size exceeds 5MB limit'
          : code === 'file-invalid-type' ? 'Invalid type. Please upload PDF, DOCX, or TXT'
          : 'Invalid file',
      );
      return;
    }
    if (accepted.length > 0) setJdFile(accepted[0]);
  }, []);

  const { getRootProps: getResumeRootProps, getInputProps: getResumeInputProps, isDragActive: isResumeActive } =
    useDropzone({
      onDrop: onDropResume,
      accept: {
        'application/pdf': ['.pdf'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      },
      maxSize: 5 * 1024 * 1024,
      multiple: false,
    });

  const { getRootProps: getJDRootProps, getInputProps: getJDInputProps, isDragActive: isJDActive } =
    useDropzone({
      onDrop: onDropJD,
      accept: {
        'application/pdf': ['.pdf'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'text/plain': ['.txt'],
      },
      maxSize: 5 * 1024 * 1024,
      multiple: false,
    });

  const displayError = error || validationError;
  const canSubmit = mode === 'analyze' ? !!file : !!(file && jdFile);

  return (
    <section
      id="upload"
      className="py-32 relative overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Mode tabs + heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Tab switcher: Pill style with sliding highlight */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/5 relative">
              {([
                { key: 'analyze', label: 'Single Upload', icon: Zap },
                { key: 'compare', label: 'Compare with JD', icon: GitCompare },
              ] as const).map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => { setMode(key); setJdFile(null); setValidationError(null); }}
                  className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 z-10 ${
                    mode === key ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${mode === key ? 'text-white' : 'text-slate-600'}`} />
                  {label}
                  {mode === key && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-indigo-600 rounded-xl -z-10 shadow-lg shadow-indigo-500/20"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient">
              {mode === 'analyze' ? 'Analyze Your Resume' : 'Intelligent Match Analysis'}
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {mode === 'analyze'
                ? 'Deploy our neural network to dismantle your resume and rebuild it for maximum ATS visibility.'
                : 'Synchronize your architectural profile with industry requirements for a precision match score.'}
            </p>
          </div>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {displayError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{
                  background: 'rgba(251,113,133,0.07)',
                  borderColor: 'rgba(251,113,133,0.2)',
                  color: '#fb7185',
                }}
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{displayError}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drop zones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={mode === 'compare' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}
        >
          <DropZone
            file={file}
            isActive={isResumeActive}
            rootProps={getResumeRootProps()}
            inputProps={getResumeInputProps()}
            onRemove={() => { setFile(null); setValidationError(null); }}
            label="Your Resume"
            formats={['PDF', 'DOCX']}
          />

          {mode === 'compare' && (
            <DropZone
              file={jdFile}
              isActive={isJDActive}
              rootProps={getJDRootProps()}
              inputProps={getJDInputProps()}
              onRemove={() => { setJdFile(null); setValidationError(null); }}
              label="Job Description"
              formats={['PDF', 'DOCX', 'TXT']}
              accentColor="var(--violet-electric)"
            />
          )}
        </motion.div>

        {/* Submit button */}
        <AnimatePresence>
          {canSubmit && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="mt-8 text-center"
            >
              <button
                onClick={() =>
                  mode === 'analyze'
                    ? onAnalyze(file!)
                    : onCompare?.(file!, jdFile!)
                }
                className="btn-primary text-xl px-16 py-5 rounded-[2rem] shadow-2xl shadow-indigo-500/40 active:scale-95 transition-transform"
              >
                {mode === 'analyze' ? 'START ANALYSIS' : 'GENERATE MATCH REPORT'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

