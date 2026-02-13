'use client';
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, Building, CheckCircle2, 
  XCircle, ShieldCheck, ArrowRight, FileCheck, Search, Loader2 
} from 'lucide-react';

const ATSCheckerPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [company, setCompany] = useState('');
  const [isTouched, setIsTouched] = useState({ file: false, jd: false });
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Validation
  const isFileValid = !!file;
  const isJdValid = jobDescription.trim().length > 20; 
  const isFormValid = isFileValid && isJdValid;

  // Simulate Scanning Logic
  const handleStartScan = () => {
    if (!isFormValid) return;
    setIsScanning(true);
    
    // Simulate progress increments
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    // After 4 seconds, you would typically route to the results page
    setTimeout(() => {
      setIsScanning(false);
      alert("Scan Complete! Redirecting to results..."); 
      // router.push('/ats-results');
    }, 4500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setIsTouched(prev => ({ ...prev, file: true }));
    if (selectedFile) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setUploadStatus('success');
      } else {
        setFile(null);
        setUploadStatus('error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-8 md:p-24 font-sans text-gray-200 overflow-hidden">
      <div className="w-full max-w-[720px] bg-gradient-to-r from-white/10 via-white/5 to-white/1 rounded-[40px] p-10 md:p-14 shadow-[0_0_24px_rgba(138,216,237,0.15)] relative overflow-hidden min-h-[600px] flex flex-col justify-center">
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 blur-[120px] pointer-events-none bg-cyan-500/10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 blur-[120px] pointer-events-none bg-purple-500/10" />

        {!isScanning ? (
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-12 relative z-10">
              <h1
                className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-4"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, rgb(117, 116, 116) 0%, rgb(255, 255, 255) 50%, rgb(117, 116, 116) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              >
                ATS <span>Optimizer</span>
              </h1>
              <p className="text-gray-500 text-sm tracking-wide">Compare your resume against specific job requirements.</p>
            </div>

            <div className="space-y-8 relative z-10">
              {/* 1. Resume Upload */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Upload Resume *</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative group cursor-pointer border-2 border-dashed rounded-[24px] p-8 transition-all duration-300 flex flex-col items-center justify-center gap-4
                    ${!isFileValid && isTouched.file ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-cyan-500/40 bg-white/5'}
                  `}
                >
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.docx" />
                  <div className={`p-4 rounded-full transition-transform duration-300 group-hover:scale-110 ${uploadStatus === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-400'}`}>
                    {uploadStatus === 'success' ? <FileCheck size={32} /> : <Upload size={32} />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-white">{file ? file.name : "Choose PDF or DOCX"}</p>
                    {uploadStatus === 'error' && <p className="text-xs text-red-400 mt-1">Invalid file format</p>}
                  </div>
                </div>
              </div>

              {/* 2. Job Description */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Job Description *</label>
                <div className="relative group">
                  <FileText className={`absolute left-4 top-5 ${!isJdValid && isTouched.jd ? 'text-red-400' : 'text-gray-500 group-focus-within:text-purple-400'}`} size={18} />
                  <textarea 
                    rows={4}
                    placeholder="Paste job details here..."
                    className={`w-full bg-[#0a0a0c] border rounded-2xl py-4 pl-12 text-white focus:outline-none transition-all resize-none
                      ${!isJdValid && isTouched.jd ? 'border-red-500/50 focus:ring-1 focus:ring-red-500/20' : 'border-white/10 focus:border-purple-500/50'}
                    `}
                    value={jobDescription}
                    onBlur={() => setIsTouched(prev => ({ ...prev, jd: true }))}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
              </div>

              {/* 3. Company */}
              <div className="space-y-3">
                <label className="text-[11px] font-bold tracking-[0.2em] text-gray-400 uppercase ml-1">Target Company (Optional)</label>
                <div className="relative group">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400" size={18} />
                  <input 
                    type="text"
                    placeholder="e.g. Google"
                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-2xl py-4 pl-12 text-white focus:outline-none focus:border-cyan-500/50 transition-all"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-6">
                <div className={`p-[2px] rounded-2xl transition-all duration-300 ${isFormValid ? 'bg-gradient-to-r from-cyan-400 to-purple-500 hover:scale-[1.02]' : 'bg-white/10 opacity-50'}`}>
                  <button 
                    disabled={!isFormValid}
                    onClick={handleStartScan}
                    className="w-full bg-[#111116] text-white font-black uppercase tracking-[0.2em] text-sm py-5 rounded-[15px] transition-all hover:bg-transparent flex items-center justify-center gap-3"
                  >
                    Check ATS Score <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* --- SCANNING ANIMATION SECTION --- */
          <div className="flex flex-col items-center justify-center space-y-10 animate-in zoom-in-95 duration-500 relative z-10">
            
            <div className="relative w-48 h-64 bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
              {/* Animated Laser Bar */}
              <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20 animate-scan-move" />
              
              {/* Virtual Document Content */}
              <div className="p-4 space-y-3 opacity-30">
                <div className="h-2 w-3/4 bg-gray-500 rounded" />
                <div className="h-2 w-1/2 bg-gray-500 rounded" />
                <div className="h-2 w-full bg-gray-500 rounded" />
                <div className="h-2 w-2/3 bg-gray-500 rounded" />
                <div className="h-2 w-5/6 bg-gray-500 rounded" />
                <div className="h-2 w-1/2 bg-gray-500 rounded" />
                <div className="h-2 w-full bg-gray-500 rounded" />
              </div>

              {/* Magnifying Glass Animation */}
              <div className="absolute inset-0 flex items-center justify-center z-30 animate-magnify-move">
                <div className="relative">
                  <Search className="text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]" size={48} strokeWidth={2.5} />
                  <div className="absolute inset-0 bg-purple-500/10 blur-xl rounded-full" />
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white tracking-widest uppercase">
                Analyzing <span className="text-cyan-400">Keywords</span>
              </h2>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">
                {scanProgress < 30 ? "Parsing PDF Data..." : scanProgress < 70 ? "Cross-referencing Job Skills..." : "Calculating Match Score..."}
              </p>
              
              {/* Progress Bar */}
              <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 animate-pulse">
              <Loader2 className="animate-spin" size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Engine Active</span>
            </div>
          </div>
        )}

        {/* Security Badge (Hidden during scan for focus) */}
        {!isScanning && (
          <div className="mt-12 flex items-center justify-center gap-2 text-[12px] text-gray-600 tracking-tighter">
            <ShieldCheck size={14} className="text-emerald-500/50" />
            <span>Encrypted. Your resume data is never stored on our servers.</span>
          </div>
        )}
      </div>

      {/* Custom Keyframe Animations */}
      <style jsx global>{`
        @keyframes scan-move {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        @keyframes magnify-move {
          0%, 100% { transform: translate(-20px, -20px); }
          25% { transform: translate(20px, -10px); }
          50% { transform: translate(10px, 20px); }
          75% { transform: translate(-10px, 10px); }
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