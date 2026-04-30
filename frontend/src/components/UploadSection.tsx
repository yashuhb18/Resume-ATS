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
  accentColor = 'var(--brand-glow-core)',
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
    <div>
      <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </p>
      <div
        {...rootProps}
        className="relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300"
        style={{
          borderColor: isActive
            ? accentColor
            : file
            ? 'var(--emerald-neon)'
            : 'var(--surface-border2)',
          background: isActive
            ? `rgba(139,92,246,0.06)`
            : file
            ? 'rgba(52,211,153,0.04)'
            : 'var(--surface-raised)',
          boxShadow: isActive ? `0 0 0 3px rgba(139,92,246,0.15), 0 0 32px rgba(139,92,246,0.12)` : 'none',
        }}
      >
        <input {...inputProps} />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(52,211,153,0.12)' }}
              >
                <CheckCircle2 className="w-7 h-7" style={{ color: 'var(--emerald-neon)' }} />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <span className="font-medium text-sm truncate max-w-[200px]" style={{ color: 'var(--text-primary)' }}>
                  {file.name}
                </span>
                <button
                  onClick={e => { e.stopPropagation(); onRemove(); }}
                  className="p-1 rounded-full transition-colors"
                  style={{ background: 'var(--surface-muted)' }}
                >
                  <X className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                </button>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-faint)' }}>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all"
                style={{
                  background: isActive ? 'rgba(139,92,246,0.12)' : 'var(--surface-muted)',
                }}
              >
                <Upload
                  className="w-7 h-7 transition-colors"
                  style={{ color: isActive ? accentColor : 'var(--text-faint)' }}
                />
              </div>
              <p className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                {isActive ? 'Drop it here!' : 'Drag & drop your file'}
              </p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>or click to browse</p>
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {formats.map(f => (
                  <span
                    key={f}
                    className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                    style={{
                      background: 'var(--surface-subtle)',
                      borderColor: 'var(--surface-border2)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {f}
                  </span>
                ))}
                <span className="text-xs" style={{ color: 'var(--text-faint)' }}>• Max 5 MB</span>
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
      className="py-24"
      style={{ background: 'var(--surface-raised)' }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Mode tabs + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Tab switcher */}
          <div className="flex gap-3 mb-10 justify-center">
            {([
              { key: 'analyze', label: 'Single Upload', icon: Zap },
              { key: 'compare', label: 'Compare with JD', icon: GitCompare },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setMode(key); setJdFile(null); setValidationError(null); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                style={
                  mode === key
                    ? {
                        background: 'linear-gradient(135deg, var(--brand-mid), var(--brand-glow-core))',
                        color: '#fff',
                        boxShadow: 'var(--glow-brand-sm)',
                      }
                    : {
                        background: 'var(--surface-subtle)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--surface-border2)',
                      }
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="text-center">
            <h2 className="section-title text-3xl sm:text-4xl mb-3">
              {mode === 'analyze' ? 'Analyze Your Resume' : 'Compare Resume with Job Description'}
            </h2>
            <p className="section-subtitle">
              {mode === 'analyze'
                ? 'Upload your resume and let our AI analyze it for ATS compatibility'
                : 'Upload both files to see how well your resume matches the job'}
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
                className="btn-primary text-lg px-12 py-4"
              >
                {mode === 'analyze' ? 'Analyze Resume' : 'Compare & Analyze'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

