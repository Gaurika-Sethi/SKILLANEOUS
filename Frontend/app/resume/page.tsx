'use client';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { FileText, Sparkles, Palette, Check } from 'lucide-react';

const ThemeSelection = () => {
  // State matches the enum in generatedResumeSchema: ["modern", "ats", "creative"]
  const [selectedTheme, setSelectedTheme] = useState<"modern"|"ats"|"creative"|null>(null);
  const router = useRouter();
  const themes = [
    {
      id: "ats",
      title: "ATS",
      description: "Optimized for Applicant Tracking Systems. Clean, structured, and easily parsed by recruiting software.",
      features: ["ATS-friendly format", "Professional structure", "High compatibility"],
      tagline: "Best for corporate jobs",
      icon: <FileText size={24} className="text-gray-400" />,
      activeColor: "border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
    },
    {
      id: "modern",
      title: "Modern",
      description: "Contemporary design with subtle visual elements. Balances professionalism with modern aesthetics.",
      features: ["Clean typography", "Structured sections", "Modern layout"],
      tagline: "Best for tech & startups",
      icon: <Sparkles size={24} className="text-purple-400" />,
      activeColor: "border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
    },
    {
      id: "creative",
      title: "Creative",
      description: "Visually distinctive design for creative roles. Stand out with unique layout and styling.",
      features: ["Visual design elements", "Photo required", "Creative freedom"],
      tagline: "Best for design & creative fields",
      icon: <Palette size={24} className="text-pink-400" />,
      activeColor: "border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.1)]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Choose Your Resume Theme</h1>
          <p className="text-gray-400 text-lg">
            Select a theme that best matches your career goals and target industry
          </p>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`relative cursor-pointer group p-8 rounded-[32px] bg-[#111116] border-2 transition-all duration-300 flex flex-col h-full ${
                selectedTheme === theme.id 
                ? theme.activeColor 
                : "border-white/5 hover:border-white/10"
              }`}
            >
              {/* Selection Checkmark */}
              {selectedTheme === theme.id && (
                <div className="absolute top-6 right-6 w-6 h-6 bg-white rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  <Check size={14} className="text-black font-bold" />
                </div>
              )}

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {theme.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide">{theme.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {theme.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-3 mb-12 flex-grow">
                {theme.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Bottom Tagline */}
              <div className={`text-xs font-bold uppercase tracking-widest mt-auto ${
                theme.id === 'creative' ? 'text-pink-400' : 'text-cyan-400'
              }`}>
                {theme.tagline}
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
        <button 
        disabled={!selectedTheme}
        onClick={() =>
        router.push(`/resume-form?theme=${selectedTheme}`)}
        className={`px-12 py-4 rounded-2xl border font-black uppercase tracking-[0.2em] text-sm transition-all
        ${
        selectedTheme
            ? "bg-[#1a1a20] border-white/10 text-white hover:border-white/20 hover:scale-105 active:scale-95"
            : "bg-[#0f0f14] border-white/5 text-gray-600 cursor-not-allowed"
            }`}
        >
        Continue with Theme
        </button>

        </div>

      </div>
    </div>
  );
};

export default ThemeSelection;