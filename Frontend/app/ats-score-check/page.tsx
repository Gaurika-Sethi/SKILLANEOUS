'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '../../lib/api';
import {
  Upload,
  FileText,
  Building,
  ShieldCheck,
  ArrowRight,
  FileCheck,
  Search,
  Loader2,
} from 'lucide-react';

type ATSAnalysisResult = {
  atsScore: number;
  missingKeywords: unknown;
  suggestions: unknown;
};

const ATSCheckerPage = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [company, setCompany] = useState('');
  const [isTouched, setIsTouched] = useState({ file: false, jd: false });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<{ intervalId: number | null; timeoutId: number | null }>({
    intervalId: null,
    timeoutId: null,
  });
  const scanFinishedRef = useRef(false);
  const backendResultRef = useRef<ATSAnalysisResult | null>(null);

  const isFileValid = !!file;
  const isJdValid = jobDescription.trim().length > 20;
  const isFormValid = isFileValid && isJdValid;

  useEffect(() => {
    return () => {
      if (timersRef.current.intervalId !== null) {
        window.clearInterval(timersRef.current.intervalId);
      }
      if (timersRef.current.timeoutId !== null) {
        window.clearTimeout(timersRef.current.timeoutId);
      }
    };
  }, []);

  const clearTimers = () => {
    if (timersRef.current.intervalId !== null) {
      window.clearInterval(timersRef.current.intervalId);
      timersRef.current.intervalId = null;
    }
    if (timersRef.current.timeoutId !== null) {
      window.clearTimeout(timersRef.current.timeoutId);
      timersRef.current.timeoutId = null;
    }
  };

  const routeToResults = (result: ATSAnalysisResult) => {
    window.sessionStorage.setItem('ats-analysis-result', JSON.stringify(result));
    router.push('/ats-results');
  };

  const submitToBackend = async () => {
    if (!file) {
      return;
    }

    const targetRole = company.trim() || jobDescription.trim().split(/\r?\n/).find(Boolean) || 'Target role';
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', targetRole);
    formData.append('jobDescription', jobDescription);

    const response = await fetch(`${API_BASE_URL}/api/v1/ats/analyze`, {
      method: 'POST',
      body: formData,
    });

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload?.message || 'ATS analysis failed');
    }

    return payload?.data as ATSAnalysisResult;
  };

  const handleStartScan = () => {
    if (!isFormValid || !file) {
      return;
    }

    setIsScanning(true);
    setScanProgress(0);
    setIsSubmitting(true);
    backendResultRef.current = null;
    scanFinishedRef.current = false;
    clearTimers();

    timersRef.current.intervalId = window.setInterval(() => {
      setScanProgress((previous) => {
        if (previous >= 100) {
          return 100;
        }
        return previous + 1;
      });
    }, 40);

    void submitToBackend()
      .then((result) => {
        backendResultRef.current = result ?? null;
        if (scanFinishedRef.current && backendResultRef.current) {
          routeToResults(backendResultRef.current);
        }
      })
      .catch((error) => {
        clearTimers();
        setIsScanning(false);
        setIsSubmitting(false);
        console.error('ATS backend error:', error);
      });

    timersRef.current.timeoutId = window.setTimeout(() => {
      clearTimers();
      setScanProgress(100);
      setIsScanning(false);
      scanFinishedRef.current = true;
      setIsSubmitting(false);

      if (backendResultRef.current) {
        routeToResults(backendResultRef.current);
      }
    }, 4200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setIsTouched((previous) => ({ ...previous, file: true }));

    if (!selectedFile) {
      setFile(null);
      setUploadStatus('idle');
      return;
    }

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (validTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      setUploadStatus('success');
      return;
    }

    setFile(null);
    setUploadStatus('error');
  };

  return (
    <div className="min-h-screen bg-[#07070a] flex flex-col items-center justify-center p-6 md:p-12 font-sans text-gray-200 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="absolute -bottom-28 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-[760px] rounded-[36px] border border-white/10 bg-white/[0.04] shadow-[0_0_40px_rgba(14,165,233,0.12)] backdrop-blur-xl relative overflow-hidden min-h-[640px] flex flex-col justify-center p-8 md:p-12">
        {!isScanning ? (
          <div className="animate-in fade-in duration-500 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.35em] text-cyan-300">
                <ShieldCheck size={13} /> ATS scan simulator
              </div>
              <h1
                className="mt-5 text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none"
                style={{
                  backgroundImage: 'linear-gradient(135deg, rgba(148,163,184,1) 0%, rgba(255,255,255,1) 45%, rgba(125,211,252,1) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                ATS <span>Optimizer</span>
              </h1>
              <p className="mt-4 text-sm text-gray-400 tracking-wide">
                Compare your resume against a target job description and route into a polished ATS report.
              </p>
            </div>

            <div className="space-y-7">
              <div className="space-y-3">
                <label className="text-[11px] font-bold tracking-[0.22em] text-gray-400 uppercase ml-1">
                  Upload Resume *
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative group cursor-pointer border-2 border-dashed rounded-[24px] p-8 transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
                    !isFileValid && isTouched.file
                      ? 'border-rose-500/50 bg-rose-500/5'
                      : 'border-white/10 hover:border-cyan-500/40 bg-white/5'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.docx"
                  />
                  <div
                    className={`p-4 rounded-full transition-transform duration-300 group-hover:scale-110 ${
                      uploadStatus === 'success'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : uploadStatus === 'error'
                          ? 'bg-rose-500/15 text-rose-300'
                          : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {uploadStatus === 'success' ? <FileCheck size={32} /> : <Upload size={32} />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white">{file ? file.name : 'Choose PDF or DOCX'}</p>
                    {uploadStatus === 'error' && <p className="text-xs text-rose-400 mt-1">Invalid file format</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold tracking-[0.22em] text-gray-400 uppercase ml-1">
                  Job Description *
                </label>
                <div className="relative group">
                  <FileText
                    className={`absolute left-4 top-5 ${!isJdValid && isTouched.jd ? 'text-rose-400' : 'text-gray-500 group-focus-within:text-cyan-300'}`}
                    size={18}
                  />
                  <textarea
                    rows={4}
                    placeholder="Paste the job description here..."
                    className={`w-full rounded-2xl border bg-[#0b0b10] py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none transition-all resize-none ${
                      !isJdValid && isTouched.jd
                        ? 'border-rose-500/50 focus:ring-1 focus:ring-rose-500/20'
                        : 'border-white/10 focus:border-cyan-500/50'
                    }`}
                    value={jobDescription}
                    onBlur={() => setIsTouched((previous) => ({ ...previous, jd: true }))}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold tracking-[0.22em] text-gray-400 uppercase ml-1">
                  Target Company (Optional)
                </label>
                <div className="relative group">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-300" size={18} />
                  <input
                    type="text"
                    placeholder="e.g. Google"
                    className="w-full rounded-2xl border border-white/10 bg-[#0b0b10] py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4">
                <div className={`p-[2px] rounded-2xl transition-all duration-300 ${isFormValid ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 hover:scale-[1.015]' : 'bg-white/10 opacity-50'}`}>
                  <button
                    disabled={!isFormValid}
                    onClick={handleStartScan}
                    className="w-full rounded-[15px] bg-[#111118] py-5 text-sm font-black uppercase tracking-[0.22em] text-white transition-all hover:bg-transparent flex items-center justify-center gap-3 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Scanning...' : 'Check ATS Score'} <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-10 animate-in zoom-in-95 duration-500 relative z-10">
            <div className="relative w-52 h-72 bg-white/[0.05] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl shadow-cyan-950/20">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 animate-scan-move" />

              <div className="p-5 space-y-3 opacity-35">
                <div className="h-2 w-3/4 rounded bg-gray-400/70" />
                <div className="h-2 w-1/2 rounded bg-gray-400/70" />
                <div className="h-2 w-full rounded bg-gray-400/70" />
                <div className="h-2 w-2/3 rounded bg-gray-400/70" />
                <div className="h-2 w-5/6 rounded bg-gray-400/70" />
                <div className="h-2 w-1/2 rounded bg-gray-400/70" />
                <div className="h-2 w-full rounded bg-gray-400/70" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center z-30 animate-magnify-move">
                <div className="relative">
                  <Search className="text-fuchsia-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" size={52} strokeWidth={2.4} />
                  <div className="absolute inset-0 rounded-full bg-fuchsia-500/10 blur-2xl" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase">
                Analyzing <span className="text-cyan-300">Keywords</span>
              </h2>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
                {scanProgress < 30 ? 'Parsing PDF Data...' : scanProgress < 70 ? 'Cross-referencing Job Skills...' : 'Calculating Match Score...'}
              </p>

              <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-500 transition-all duration-300"
                  style={{ width: `${Math.max(0, Math.min(100, scanProgress))}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 animate-pulse">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Engine Active</span>
            </div>
          </div>
        )}

        {!isScanning && (
          <div className="mt-12 flex items-center justify-center gap-2 text-[12px] text-gray-500 tracking-tighter relative z-10">
            <ShieldCheck size={14} className="text-emerald-400/60" />
            <span>Encrypted. Your resume data is never stored on our servers.</span>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan-move {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }

        @keyframes magnify-move {
          0%,
          100% {
            transform: translate(-20px, -20px);
          }
          25% {
            transform: translate(20px, -10px);
          }
          50% {
            transform: translate(10px, 20px);
          }
          75% {
            transform: translate(-10px, 10px);
          }
        }

        .animate-scan-move {
          animation: scan-move 3s infinite linear;
        }

        .animate-magnify-move {
          animation: magnify-move 4s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ATSCheckerPage;