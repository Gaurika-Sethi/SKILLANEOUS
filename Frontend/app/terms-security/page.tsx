"use client";

import React from "react";
import { 
  ShieldCheck, 
  Gavel, 
  UserCheck, 
  FileCode, 
  AlertTriangle, 
  RefreshCw, 
  Lock, 
  Terminal,
  Server,
  Key,
  Database,
  Ban,
  Scale
} from "lucide-react";

export default function TermsSecurityPage() {
  // --- COLOR PALETTE ---
  const colors = {
    bgMain: "rgba(10, 10, 12, 1)",
    bgCard: "rgba(18, 18, 24, 1)",
    borderSoft: "rgba(255, 255, 255, 0.06)",
    textDim: "rgba(140, 140, 150, 1)",
    textMuted: "rgba(180, 180, 190, 1)",
    accentCyan: "rgba(34, 211, 238, 1)",
    white: "rgba(255, 255, 255, 1)",
  };

  return (
    <div 
      className="min-h-screen px-6 py-20 font-sans selection:bg-cyan-500/30"
      style={{ backgroundColor: colors.bgMain, color: colors.white }}
    >
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(${colors.accentCyan} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center space-y-6 pb-10">
          <h1 
            className="pt-20 text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none"
            style={{
              backgroundImage: "linear-gradient(135deg, rgb(10, 100, 153) 0%, rgb(108, 215, 223) 45%, rgb(6, 107, 114) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Terms & Security
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
            Simple rules to keep the platform fair, secure, and helpful for everyone.
          </p>
        </div>

        {/* --- 01. USING SKILLANEOUS --- */}
        <TermSection icon={<Terminal size={22}/>} title="Using SKILLANEOUS">
          <p className="mb-6 font-medium text-lg" style={{ color: colors.textMuted }}>
            SKILLANEOUS is designed for personal career development. By accessing the platform, you agree to:
          </p>
          <div className="space-y-4">
            <DataPoint text="Provide accurate information about your current skills and career goals" />
            <DataPoint text="Use the platform exclusively for personal, non-commercial growth" />
            <DataPoint text="Respect the community and avoid misuse, spamming, or harassment" />
            <DataPoint text="Not scrape, reverse-engineer, or automate access to our proprietary AI models" />
          </div>
        </TermSection>

        {/* --- 02. YOUR RESPONSIBILITY --- */}
        <TermSection icon={<UserCheck size={22}/>} title="Your Responsibility">
          <p className="mb-8 font-medium text-lg" style={{ color: colors.textDim }}>You are the primary admin of your career data:</p>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureBox 
              icon={<Key size={18}/>} 
              title="Account Security" 
              desc="Keep your credentials safe. You are responsible for all activity occurring under your account protocol." 
            />
            <FeatureBox 
              icon={<Database size={18}/>} 
              title="Data Accuracy" 
              desc="The more accurate your profile, the better our AI can tailor your roadmaps. Keep your stats updated." 
            />
          </div>
          <div className="mt-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex gap-4">
            <AlertTriangle className="text-yellow-500 shrink-0" size={20} />
            <p className="text-sm font-medium text-yellow-200/70">
              <strong>AI Guidance:</strong> Our suggestions are based on patterns and data. They are helpful paths, but not guaranteed career outcomes.
            </p>
          </div>
        </TermSection>

        {/* --- 03. CONTENT & OWNERSHIP --- */}
        <TermSection icon={<FileCode size={22}/>} title="Content & Ownership">
          <div className="space-y-8">
            <div className="group">
              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-cyan-500/50" /> Your Content
              </h4>
              <p className="text-lg leading-relaxed" style={{ color: colors.textMuted }}>
                You own your profile data, resumes, and generated roadmaps. We use this data only to deliver and improve our services to you.
              </p>
            </div>
            <div className="group">
              <h4 className="text-white font-black uppercase text-xs tracking-widest mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-cyan-500/50" /> Our Platform
              </h4>
              <p className="text-lg leading-relaxed" style={{ color: colors.textMuted }}>
                SKILLANEOUS owns the underlying code, proprietary AI models, brand design, and system architecture. Redistribution of our technology is strictly prohibited.
              </p>
            </div>
          </div>
        </TermSection>

        {/* --- 04. SECURITY ENCRYPTION --- */}
        <TermSection icon={<ShieldCheck size={22}/>} title="Security Protocol">
          <p className="mb-8 font-medium text-lg" style={{ color: colors.textMuted }}>
            We protect your data with industry-standard "Deep-Shield" measures:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SecurityCard icon={<Lock size={18}/>} text="AES-256 Encryption at rest and in transit" />
            <SecurityCard icon={<Server size={18}/>} text="SOC 2 Compliant Infrastructure" />
            <SecurityCard icon={<UserCheck size={18}/>} text="Strict Internal Access Controls" />
            <SecurityCard icon={<RefreshCw size={18}/>} text="24/7 Threat Monitoring" />
          </div>
        </TermSection>

        {/* --- 05. UPDATES & LIABILITY --- */}
        <TermSection icon={<Scale size={22}/>} title="Updates & Liability">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <h5 className="font-black text-white uppercase text-xs tracking-widest mb-2">Service Terms</h5>
              <p className="text-sm leading-relaxed" style={{ color: colors.textDim }}>
                Terms may evolve as we scale. Significant updates will be flagged in your dashboard. Continued usage after changes implies acceptance of new protocols.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <h5 className="font-black text-white uppercase text-xs tracking-widest mb-2">Termination</h5>
              <p className="text-sm leading-relaxed" style={{ color: colors.textDim }}>
                You can delete your account anytime. We reserve the right to suspend access for users violating security protocols or community guidelines.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <h5 className="font-black text-white uppercase text-xs tracking-widest mb-2">Liability Limitation</h5>
              <p className="text-sm leading-relaxed" style={{ color: colors.textDim }}>
                While we strive for 100% uptime, SKILLANEOUS is provided "as-is". We are not liable for indirect damages or specific career outcomes.
              </p>
            </div>
          </div>
        </TermSection>

        {/* --- FOOTER --- */}
        <div className="pt-20 text-center border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">
            System Origin: Skillaneous.io // All Rights Reserved
          </p>
        </div>

      </div>
    </div>
  );
}

// --- REUSABLE SUB-COMPONENTS ---

function TermSection({ icon, title, children }: any) {
  return (
    <div 
      className="p-10 rounded-[2.5rem] border-2 transition-all duration-500 hover:border-white/10 group" 
      style={{ backgroundColor: "rgba(18, 18, 24, 1)", borderColor: "rgba(255, 255, 255, 0.06)" }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all">
          {icon}
        </div>
        <h2 className="text-3xl font-black tracking-tighter uppercase">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

function DataPoint({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
      <p className="text-lg font-medium opacity-80 group-hover:opacity-100 transition-opacity leading-snug">
        {text}
      </p>
    </div>
  );
}

function FeatureBox({ icon, title, desc }: any) {
  return (
    <div className="p-6 rounded-2xl border bg-white/[0.01] border-white/[0.06] hover:bg-white/[0.03] transition-all">
      <div className="flex items-center gap-3 mb-3 text-cyan-400">
        {icon}
        <h3 className="font-black text-sm uppercase tracking-widest text-white">{title}</h3>
      </div>
      <p className="text-sm opacity-50 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function SecurityCard({ icon, text }: any) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-black/40 border border-white/5">
      <div className="text-cyan-500/50">{icon}</div>
      <span className="text-xs font-black uppercase tracking-wider opacity-70">{text}</span>
    </div>
  );
}