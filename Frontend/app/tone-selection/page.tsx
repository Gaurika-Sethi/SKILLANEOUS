"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react";

const TONES = [
  {
    id: "professional",
    title: "Professional",
    description: "Formal and comprehensive style",
  },
  {
    id: "concise",
    title: "Concise",
    description: "Brief and to-the-point",
  },
  {
    id: "impactful",
    title: "Impactful",
    description: "Results-driven language",
  },
  {
    id: "creative",
    title: "Creative",
    description: "Unique and expressive",
  },
];

export default function ToneSelection() {
  const router = useRouter();
  const [selectedTone, setSelectedTone] = useState("professional");
  const [targetRole, setTargetRole] = useState("");

  const handleGenerate = () => {
    if (!targetRole.trim()) {
      alert("Please specify a Target Role to optimize your resume.");
      return;
    }
    // Proceed to final generation/preview
    console.log("Generating with:", { selectedTone, targetRole });
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-sans">
      <div className="max-w-2xl mx-auto space-y-10">
        
        {/* Header Section */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Fine-Tune Your Resume</h1>
          <p className="text-gray-400 text-lg">
            Help us tailor your resume for the role you're aiming for
          </p>
        </header>

        <section className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-10 space-y-10 shadow-2xl">
          
          {/* Tone Selection Grid */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300">
              Resume Tone <span className="text-pink-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TONES.map((tone) => (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  className={`relative flex flex-col items-start p-6 rounded-2xl border-2 transition-all text-left ${
                    selectedTone === tone.id
                      ? "border-cyan-500 bg-cyan-500/5 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                      : "border-white/5 bg-[#262626] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedTone === tone.id ? "border-cyan-400 bg-cyan-400" : "border-gray-500"
                    }`}>
                      {selectedTone === tone.id && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <span className="font-bold text-lg">{tone.title}</span>
                  </div>
                  <p className="text-gray-500 text-sm ml-8">{tone.description}</p>
                  
                  {selectedTone === tone.id && (
                    <CheckCircle2 className="absolute top-4 right-4 text-cyan-400" size={20} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Target Role Input */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-300">
              Target Role <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Backend Developer, Machine Learning Engineer"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-[#262626] border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition placeholder:text-gray-600"
            />
            <p className="text-xs text-gray-500 italic">
              Your resume will be optimized for this role
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-6 pt-4">
            <button
              onClick={handleGenerate}
              className="w-full py-5 bg-[#262626] border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#323232] transition-all group"
            >
              <Sparkles size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
              <span className="text-gray-400 group-hover:text-white uppercase tracking-widest text-sm">
                Generate My Resume
              </span>
            </button>

            <button
              onClick={() => router.back()}
              className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium"
            >
              <ChevronLeft size={18} />
              Edit Resume Details
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}