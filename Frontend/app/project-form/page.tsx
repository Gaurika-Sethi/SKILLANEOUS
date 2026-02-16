"use client";

import React, { useState, KeyboardEvent, useMemo, useEffect } from "react"; // Added useEffect
import { useRouter } from "next/navigation";
import { 
  Sparkles, Terminal, BookOpen, Settings2, ChevronRight, 
  X, Zap, Globe, Github, Layout, Clock, Server, Cpu, 
  ShieldCheck, Lock, Loader, Box, CheckCircle2, AlertTriangle
} from "lucide-react";

export default function ProjectGenerationForm() {
  const router = useRouter();
  // --- FORM STATE ---
  const [targetRole, setTargetRole] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [learningObjective, setLearningObjective] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0); // For isometric build stages

  // Tech Stack starts empty
  const [tags, setTags] = useState<string[]>([]); 
  
  const [currentInput, setCurrentInput] = useState("");
  const [outputPrefs, setOutputPrefs] = useState<string[]>([]);
  const [timeCommit, setTimeCommit] = useState("1-3hr");
  const [deployPrefs, setDeployPrefs] = useState<string[]>([]);

  // Loading animation logic
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 5);
      }, 1200);
      return () => clearInterval(interval);
    } else {
      setLoadingStep(0);
    }
  }, [loading]);

  // --- RGBA COLOR MAP ---
  const colors = {
    bgMain: "rgba(5, 5, 5, 1)",
    bgCard: "rgba(12, 12, 18, 1)",
    borderSoft: "rgba(255, 255, 255, 0.08)",
    textDim: "rgba(130, 130, 130, 1)",
    textWarn: "rgb(206, 62, 43)",
    textMuted: "rgba(180, 180, 180, 1)",
    accentCyan: "rgba(6, 182, 212, 1)",
    accentPurple: "rgba(168, 85, 247, 1)",
    accentPink: "rgba(236, 72, 153, 1)",
    white: "rgba(255, 255, 255, 1)",
    black: "rgba(0, 0, 0, 1)",
    successGreen: "rgba(34, 197, 94, 1)"
  };

  // --- VALIDATION LOGIC ---
  const isFormValid = useMemo(() => {
    return (
      targetRole.trim() !== "" &&
      learningObjective.trim() !== "" &&
      tags.length > 0 &&
      outputPrefs.length > 0 &&
      deployPrefs.length > 0
    );
  }, [targetRole, learningObjective, tags, outputPrefs, deployPrefs]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const value = currentInput.trim().replace(/,/g, "");
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        setCurrentInput("");
      }
    } else if (e.key === "Backspace" && !currentInput && tags.length > 0) {
      setTags(tags.slice(0, -1));
    }
  };

  const toggleMulti = (val: string, list: string[], setList: any) => {
    setList(list.includes(val) ? list.filter(i => i !== val) : [...list, val]);
  };

  const mapSkillLevel = (lvl: string) => {
  const m: Record<string, string> = {
    Beginner: "BEGINNER",
    Intermediate: "INTERMEDIATE",
    Advanced: "ADVANCED",
  };
  return m[lvl] || "BEGINNER";
};

const mapOutputPrefs = (prefs: string[]) => {
  const map: Record<string, string> = {
    "Resume ready": "RESUME_READY",
    "Portfolio": "PORTFOLIO",
    "Github": "GITHUB",
    "Deployable": "DEPLOYABLE",
    "No pref": "NO_PREF",
  };
  return prefs.map((p) => map[p]).filter(Boolean);
};

const mapDeployPrefs = (prefs: string[]) => {
  const map: Record<string, string> = {
    "None": "NONE",
    "Cloud": "CLOUD",
    "Docker": "DOCKER",
    "CI/CD": "CICD",
    "No pref": "NO_PREF",
  };
  return prefs.map((p) => map[p]).filter(Boolean);
};

const handleSubmit = async () => {
  setError(null);
  setLoading(true);

  const payload = {
    targetRole: targetRole.trim(),
    skillLevel: mapSkillLevel(skillLevel),
    learningObjective: learningObjective.trim(),
    techStack: tags,
    outputPreference: mapOutputPrefs(outputPrefs),
    deploymentPreference: mapDeployPrefs(deployPrefs),
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to generate project");

    const projectId = data?.data?.projectId;
    const requestId = data?.data?.requestId;
    
    setTimeout(() => {
      router.push(`/project-display?id=${projectId || requestId}`);
    }, 1500); // Small buffer to show "Assembly Complete"
  } catch (err: any) {
    setError(err.message || "Something went wrong");
    setLoading(false);
  }
};

  return (
    <div 
      className="min-h-screen px-6 py-16 font-sans selection:bg-indigo-500/30 relative"
      style={{ backgroundColor: colors.bgMain, color: colors.white }}
    >
      <style jsx global>{`
        @keyframes isoFloat {
          0%, 100% { transform: translateY(0px) rotateX(45deg) rotateZ(45deg); }
          50% { transform: translateY(-20px) rotateX(45deg) rotateZ(45deg); }
        }
        @keyframes blockIn {
          0% { transform: translate(100px, -100px); opacity: 0; }
          100% { transform: translate(0, 0); opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .iso-container {
          perspective: 1000px;
        }
        .iso-box {
          transform-style: preserve-3d;
          animation: isoFloat 4s ease-in-out infinite;
        }
        .module-block {
          animation: blockIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* --- ISOMETRIC LOADING OVERLAY --- */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl">
          <div className="iso-container relative w-64 h-64 flex items-center justify-center">
            {/* The Main Wireframe */}
            <div className="iso-box relative w-32 h-32 border-2 border-white/10 flex items-center justify-center">
              
              {/* Module 1: Core Logic (Cyan) - Always there */}
              <div className="absolute inset-2 bg-cyan-500/20 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center">
                <Settings2 size={24} className="text-cyan-400 -rotate-45" />
              </div>

              {/* Module 2: UI Layer (Purple) - Appears in step 1 */}
              {loadingStep >= 1 && (
                <div className="module-block absolute inset-0 -translate-y-full bg-purple-500/20 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center">
                  <Layout size={24} className="text-purple-400 -rotate-45" />
                </div>
              )}

              {/* Module 3: Trial (Red) - Appears in step 2, then shakes and disappears */}
              {loadingStep === 2 && (
                <div className="animate-[shake_0.4s_infinite] absolute -right-16 -top-16 w-20 h-20 bg-red-500/20 border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center">
                  <AlertTriangle size={24} className="text-red-500 -rotate-45" />
                </div>
              )}

              {/* Module 4: Database (Green) - Final success module */}
              {loadingStep >= 3 && (
                <div className="module-block absolute -bottom-8 -right-8 w-24 h-24 bg-green-500/20 border border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center justify-center">
                  <Server size={24} className="text-green-400 -rotate-45" />
                </div>
              )}
            </div>

            {/* Grid Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none" />
          </div>

          <div className="mt-12 text-center space-y-4">
            <h2 className="text-3xl font-black text-white tracking-widest uppercase italic">
              Assembling <span className="text-indigo-400">Project</span>
            </h2>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 w-8 rounded-full transition-all duration-500 ${loadingStep >= i ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'bg-white/10'}`} />
                ))}
              </div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mt-4">
                {loadingStep === 0 && "Synthesizing requirements..."}
                {loadingStep === 1 && "Building architectural blocks..."}
                {loadingStep === 2 && "Validating dependencies..."}
                {loadingStep === 3 && "Integrating tech stack..."}
                {loadingStep === 4 && "Finalizing blueprint..."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- ORIGINAL FORM UI --- */}
      <div className={`max-w-5xl mx-auto transition-all duration-700 ${loading ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* --- HEADER --- */}
        <header className="mb-16 space-y-4">
          <div className="flex items-center gap-5 pt-20">
            <div 
              className="p-3 rounded-xl border"
              style={{ 
                backgroundColor: "rgba(99, 102, 241, 0.1)", 
                borderColor: "rgba(99, 102, 241, 0.2)"
              }}
            >
              <Terminal size={28} style={{ color: "rgba(129, 140, 248, 1)" }} />
            </div>
            
            <h1 
              className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(180, 180, 180, 1) 0%, rgba(255, 255, 255, 1) 45%, rgba(150, 150, 150, 1) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
              }}
            >
              Project Generation
            </h1>
          </div>
          <p className="text-lg font-medium max-w-xl" style={{ color: colors.textMuted }}>
            Configure your technical blueprint. Every field is mandatory to proceed.
          </p>
        </header>

        <form className="space-y-16" onSubmit={(e) => { e.preventDefault(); if (!isFormValid || loading) return; handleSubmit(); }}>
          
          {/* --- SECTION 01: DIRECTION --- */}
          <section className="space-y-8">
            <FormSectionHeader number="01" title="Direction" icon={<Zap size={18}/>} rgbaColor={colors.accentCyan} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest" style={{ color: colors.textDim }}>Target Role <span style={{ color: colors.textWarn }}>*</span></label>
                <input 
                  type="text" 
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Fullstack Developer" 
                  className="w-full rounded-2xl border-2 p-5 focus:outline-none transition-all text-lg font-bold"
                  style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSoft, color: colors.white }}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest" style={{ color: colors.textDim }}>Skill Level <span style={{ color: colors.textWarn }}>*</span></label>
                <div className="flex gap-2 p-1.5 border-2 rounded-2xl h-[70px]" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSoft }}>
                  <LevelButton 
                    label="Beginner" active={skillLevel === "Beginner"} onClick={() => setSkillLevel("Beginner")} 
                    gradient="linear-gradient(90deg, rgba(59, 130, 246, 1), rgba(99, 102, 241, 1), rgba(6, 182, 212, 1))" 
                  />
                  <LevelButton 
                    label="Intermediate" active={skillLevel === "Intermediate"} onClick={() => setSkillLevel("Intermediate")} 
                    gradient="linear-gradient(90deg, rgba(217, 70, 239, 1), rgba(236, 72, 153, 1), rgba(239, 68, 68, 1))" 
                  />
                  <LevelButton 
                    label="Advanced" active={skillLevel === "Advanced"} onClick={() => setSkillLevel("Advanced")} 
                    gradient="linear-gradient(90deg, rgba(124, 58, 237, 1), rgba(147, 51, 234, 1), rgba(79, 70, 229, 1))" 
                  />
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 02: LEARNINGS --- */}
          <section className="space-y-8">
            <FormSectionHeader number="02" title="Learnings" icon={<BookOpen size={18}/>} rgbaColor={colors.accentPurple} />
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest" style={{ color: colors.textDim }}>Learning Objective <span style={{ color: colors.textWarn }}>*</span></label>
                <textarea 
                  rows={3} value={learningObjective} onChange={(e) => setLearningObjective(e.target.value)}
                  placeholder="What architecture or concepts do you want to master?" 
                  className="w-full border-2 rounded-2xl p-5 focus:outline-none transition-all text-lg font-bold resize-none"
                  style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSoft, color: colors.white }}
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest" style={{ color: colors.textDim }}>Tech Stack <span style={{ color: colors.textWarn }}>*</span> (Type skill and press Comma)</label>
                <div className="min-h-[70px] flex flex-wrap gap-2 p-4 border-2 rounded-2xl focus-within:border-indigo-500/30 transition-all" style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSoft }}>
                  {tags.map((tag, index) => (
                    <span 
                        key={index} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black border animate-in fade-in zoom-in duration-200"
                        style={{ backgroundColor: "rgba(99, 102, 241, 0.1)", borderColor: "rgba(99, 102, 241, 0.3)", color: "rgba(165, 180, 252, 1)" }}
                    >
                      {tag} <button type="button" title={`Remove ${tag}`} onClick={() => setTags(tags.filter((_, i) => i !== index))} className="hover:text-white transition-colors"><X size={14} /></button>
                    </span>
                  ))}
                  <input 
                    type="text" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? "e.g. TypeScript, GraphQL..." : "Add more..."} 
                    className="flex-1 min-w-[180px] bg-transparent outline-none text-lg font-bold"
                    style={{ color: colors.white }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 03: PERSONALIZATION --- */}
          <section className="space-y-12">
            <FormSectionHeader number="03" title="Personalization" icon={<Settings2 size={18}/>} rgbaColor={colors.accentPink} />
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest" style={{ color: colors.textDim }}>Output Preference <span style={{ color: colors.textWarn }}>*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <SelectCard label="Resume Ready" icon={<Layout size={20}/>} rgba="236, 72, 153" active={outputPrefs.includes('Resume ready')} onClick={() => toggleMulti('Resume ready', outputPrefs, setOutputPrefs)} />
                  <SelectCard label="Portfolio" icon={<Sparkles size={20}/>} rgba="245, 158, 11" active={outputPrefs.includes('Portfolio')} onClick={() => toggleMulti('Portfolio', outputPrefs, setOutputPrefs)} />
                  <SelectCard label="Github" icon={<Github size={20}/>} rgba="16, 185, 129" active={outputPrefs.includes('Github')} onClick={() => toggleMulti('Github', outputPrefs, setOutputPrefs)} />
                  <SelectCard label="Deployable" icon={<Globe size={20}/>} rgba="59, 130, 246" active={outputPrefs.includes('Deployable')} onClick={() => toggleMulti('Deployable', outputPrefs, setOutputPrefs)} />
                  <SelectCard label="No Pref" icon={null} rgba="156, 163, 175" active={outputPrefs.includes('No pref')} onClick={() => toggleMulti('No pref', outputPrefs, setOutputPrefs)} />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest" style={{ color: colors.textDim }}>Deployment <span style={{ color: colors.textWarn }}>*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <SelectCard label="None" icon={<ShieldCheck size={20}/>} rgba="100, 116, 139" active={deployPrefs.includes('None')} onClick={() => toggleMulti('None', deployPrefs, setDeployPrefs)} />
                  <SelectCard label="Cloud" icon={<Globe size={20}/>} rgba="6, 182, 212" active={deployPrefs.includes('Cloud')} onClick={() => toggleMulti('Cloud', deployPrefs, setDeployPrefs)} />
                  <SelectCard label="Docker" icon={<Cpu size={20}/>} rgba="139, 92, 246" active={deployPrefs.includes('Docker')} onClick={() => toggleMulti('Docker', deployPrefs, setDeployPrefs)} />
                  <SelectCard label="CI/CD" icon={<Server size={20}/>} rgba="249, 115, 22" active={deployPrefs.includes('CI/CD')} onClick={() => toggleMulti('CI/CD', deployPrefs, setDeployPrefs)} />
                  <SelectCard label="No Pref" icon={null} rgba="156, 163, 175" active={deployPrefs.includes('No pref')} onClick={() => toggleMulti('No pref', deployPrefs, setDeployPrefs)} />
                </div>
              </div>
            </div>
          </section>

          {/* --- SUBMIT --- */}
          <div className="pt-10 pb-20">
            <button 
              type="submit"
              disabled={!isFormValid || loading}
              className="group relative w-full font-black py-7 rounded-2xl transition-all flex items-center justify-center gap-3 tracking-tight text-xl uppercase"
              style={{ 
                backgroundColor: isFormValid && !loading ? colors.white : isFormValid && loading ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.05)", 
                color: isFormValid ? colors.black : colors.textDim,
                border: isFormValid ? "none" : `2px solid ${colors.borderSoft}`,
                cursor: isFormValid && !loading ? "pointer" : "not-allowed",
                opacity: loading ? 0.85 : 1,
              }}
            >
              {!isFormValid && <Lock size={20} style={{ opacity: 0.3 }} />}
              {loading && <Loader size={20} className="animate-spin" />}
              {loading ? "Generating Project..." : "Generate Project Blueprint"}
              {isFormValid && !loading && ( <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />)}
            </button>
            {error && (
              <p className="text-center mt-4 text-sm font-bold" style={{ color: colors.textWarn }}>
                {error}
                </p>
              )}
            <p className="text-center mt-6 text-xs font-black uppercase tracking-[0.3em]" style={{ color: isFormValid ? colors.successGreen : colors.textWarn }}>
              {isFormValid ? "Engine ready for synthesis" : "Fill all required sections to unlock"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

/* --- REUSABLE COMPONENTS --- */

function FormSectionHeader({ number, title, icon, rgbaColor }: any) {
  return (
    <div className="flex items-center gap-4">
      <div 
        className="flex items-center gap-2 px-4 py-1.5 rounded-xl border-2"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderColor: "rgba(255, 255, 255, 0.08)", color: rgbaColor }}
      >
        {icon}
        <span className="text-xs font-black uppercase tracking-widest">Section {number}</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">{title}</h2>
      <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0))" }} />
    </div>
  );
}

function LevelButton({ label, active, onClick, gradient }: any) {
  return (
    <button
      type="button" onClick={onClick}
      className="relative flex-1 rounded-xl text-base font-black transition-all overflow-hidden uppercase tracking-tight"
      style={{ 
        color: active ? "rgba(255,255,255,1)" : "rgba(100,100,100,1)",
        transform: active ? "scale(1.02)" : "scale(1)"
      }}
    >
      {active && <div className="absolute inset-0" style={{ background: gradient }} />}
      <span className="relative z-10">{label}</span>
    </button>
  );
}

function SelectCard({ label, sublabel, icon, active, onClick, rgba }: any) {
  return (
    <button
      type="button" onClick={onClick}
      className="relative p-5 rounded-2xl border-2 text-left transition-all duration-300 min-h-[110px] flex flex-col justify-end"
      style={{ 
        backgroundColor: active ? `rgba(${rgba}, 0.12)` : "rgba(12, 12, 18, 1)", 
        borderColor: active ? `rgba(${rgba}, 0.6)` : "rgba(255, 255, 255, 0.05)",
        color: active ? "rgba(255, 255, 255, 1)" : "rgba(140, 140, 140, 1)",
        transform: active ? "scale(1.02)" : "scale(1)"
      }}
    >
      <div className="absolute top-4 left-4">
        {icon && <div style={{ color: active ? `rgba(${rgba}, 1)` : "rgba(60, 60, 60, 1)" }}>{icon}</div>}
      </div>
      <div className="mt-auto">
        <div className="text-sm font-black uppercase tracking-tight leading-tight">{label}</div>
        {sublabel && <div className="text-[11px] font-bold uppercase tracking-tight opacity-50 mt-1">{sublabel}</div>}
      </div>
    </button>
  );
}