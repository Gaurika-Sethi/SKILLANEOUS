"use client";

import React from "react";
import { 
  ShieldCheck, 
  Eye, 
  Cookie, 
  BrainCircuit, 
  UserCog, 
  Lock, 
  ShieldAlert, 
  Fingerprint,
  ChevronRight,
  Database,
  Trash2,
  Settings2,
  FileSearch
} from "lucide-react";

export default function PrivacyPage() {
  // --- RGBA COLOR PALETTE (Matching your theme) ---
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
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* --- HERO HEADER --- */}
        <div className="text-center space-y-6 pb-10">
          <h1 
            className="pt-20 text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none"
            style={{
              backgroundImage: "linear-gradient(135deg, rgb(93, 8, 110) 0%, rgb(209, 133, 224) 45%, rgb(142, 18, 167) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Privacy & Cookies
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto" style={{ color: colors.textMuted }}>
            We respect your privacy and believe in transparency. Your data helps power personalized roadmaps. <br /> <span className="text-white">AND WE NEVER SELL IT.</span>
          </p>
        </div>

        {/* --- 01. OUR PROMISE --- */}
        <PolicySection icon={<ShieldCheck size={22}/>} title="Our Promise">
          <p className="text-lg leading-relaxed font-medium" style={{ color: colors.textMuted }}>
            SKILLANEOUS is an early-stage platform focused on helping students and developers build their careers. We collect only what’s necessary to deliver personalized AI-powered roadmaps and resumes. We don't sell your data, and we give you full control over your information.
          </p>
        </PolicySection>

        {/* --- 02. WHAT WE COLLECT --- */}
        <PolicySection icon={<Eye size={22}/>} title="What We Collect">
          <div className="space-y-4">
            <DataPoint title="Account info" desc="Email address, name, and password when you sign up" />
            <DataPoint title="Profile data" desc="Your skills, career goals, interests, and experience you share with us" />
            <DataPoint title="Usage data" desc="Which features you use, roadmaps you view, and how you interact with the platform" />
            <DataPoint title="Device info" desc="Basic technical data like browser type, IP address, and device information" />
          </div>
        </PolicySection>

        {/* --- 03. HOW WE USE DATA --- */}
        <PolicySection icon={<Fingerprint size={22}/>} title="How We Use Your Data">
          <p className="mb-6 font-medium" style={{ color: colors.textDim }}>Your data helps us create a personalized experience:</p>
          <ul className="space-y-4">
            <ListItem text="Generate AI-powered career roadmaps based on your goals and skill level" />
            <ListItem text="Build and optimize resumes tailored to your experience" />
            <ListItem text="Recommend relevant projects, courses, and resources" />
            <ListItem text="Improve our AI models and platform features (using aggregated, anonymized data)" />
            <ListItem text="Send you important updates about your account and progress" />
          </ul>
        </PolicySection>

        {/* --- 04. COOKIES --- */}
        <PolicySection icon={<Cookie size={22}/>} title="Cookies">
          <p className="mb-8 font-medium text-lg" style={{ color: colors.textMuted }}>
            We use cookies to make SKILLANEOUS work smoothly and understand how people use it:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border bg-white/[0.02]" style={{ borderColor: colors.borderSoft }}>
              <h4 className="font-black uppercase text-xs tracking-widest mb-2">Essential Cookies</h4>
              <p className="text-sm opacity-50">Required for the site to function. These keep you logged in and remember your preferences.</p>
            </div>
            <div className="p-6 rounded-2xl border bg-white/[0.02]" style={{ borderColor: colors.borderSoft }}>
              <h4 className="font-black uppercase text-xs tracking-widest mb-2">Analytics Cookies</h4>
              <p className="text-sm opacity-50">Help us understand which features are most useful and where we can improve. Data is aggregated and anonymous.</p>
            </div>
          </div>
        </PolicySection>

        {/* --- 05. AI & THIRD PARTY --- */}
        <PolicySection icon={<BrainCircuit size={22}/>} title="AI & Third-Party Services">
          <p className="text-lg leading-relaxed font-medium" style={{ color: colors.textMuted }}>
            We use AI to power your roadmaps and recommendations. Your personal data is processed securely within our infrastructure and <span className="text-white">is not shared with external AI training systems.</span>
          </p>
          <p className="mt-6 text-lg leading-relaxed font-medium" style={{ color: colors.textMuted }}>
            We work with trusted providers for hosting, analytics, and payments, all of whom meet high security standards. We only share the minimum data necessary for these services to function.
          </p>
        </PolicySection>

        {/* --- 06. YOUR CONTROL --- */}
        <PolicySection icon={<UserCog size={22}/>} title="Your Control">
          <p className="mb-8 font-medium text-lg" style={{ color: colors.textDim }}>You're in charge of your data. Here's what you can do:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ControlCard icon={<FileSearch size={18}/>} title="Access Your Data" desc="Request a copy of everything we have about you" />
            <ControlCard icon={<Settings2 size={18}/>} title="Update Information" desc="Edit your profile, skills, and preferences anytime" />
            <ControlCard icon={<Trash2 size={18}/>} title="Delete Your Account" desc="Permanently remove all your data from our systems" />
            <ControlCard icon={<ShieldAlert size={18}/>} title="Opt Out" desc="Control emails and data processing in your settings" />
          </div>
        </PolicySection>

        {/* --- 07. SECURITY --- */}
        <PolicySection icon={<Lock size={22}/>} title="Security">
          <p className="mb-6 font-medium text-lg" style={{ color: colors.textMuted }}>We take security seriously and use industry-standard measures to protect your information:</p>
          <ul className="space-y-4">
            <ListItem text="All data is encrypted in transit and at rest" />
            <ListItem text="Strict access controls limit who can view user data" />
            <ListItem text="Regular security audits and monitoring" />
            <ListItem text="Secure cloud infrastructure with SOC 2 compliance" />
          </ul>
        </PolicySection>

        {/* --- FOOTER --- */}
        <div className="pt-20 text-center">
          <p className="text-xs font-black uppercase tracking-[0.4em] opacity-30">
            © 2026 SKILLANEOUS — Build your path.
          </p>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function PolicySection({ icon, title, children }: any) {
  return (
    <div 
      className="p-10 rounded-[2.5rem] border-2 transition-all hover:bg-white/[0.01]" 
      style={{ backgroundColor: "rgba(18, 18, 24, 1)", borderColor: "rgba(255, 255, 255, 0.06)" }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-white/[0.05] border border-white/10 text-cyan-400">
          {icon}
        </div>
        <h2 className="text-3xl font-black tracking-tighter uppercase">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

function DataPoint({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
      <p className="text-lg leading-relaxed">
        <strong className="text-white font-black">{title}:</strong>{" "}
        <span style={{ color: "rgba(180, 180, 190, 1)" }}>{desc}</span>
      </p>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="mt-1.5 p-0.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
      <span className="text-lg font-medium opacity-80 group-hover:opacity-100 transition-opacity">{text}</span>
    </div>
  );
}

function ControlCard({ icon, title, desc }: any) {
  return (
    <div className="p-6 rounded-2xl border bg-white/[0.01] border-white/[0.06] hover:bg-white/[0.03] hover:border-cyan-500/30 transition-all group cursor-pointer">
      <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform origin-left">{icon}</div>
      <h3 className="font-black text-lg mb-1 uppercase tracking-tight">{title}</h3>
      <p className="text-sm opacity-50 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}