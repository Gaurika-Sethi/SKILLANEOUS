"use client";

import React, { useState } from "react";
import { 
  Sparkles, Terminal, Github, Save, ChevronDown, ChevronUp, 
  Database, Bug, FileJson, Beaker, Lock, 
  CheckCircle2, Copy, Layout, FolderTree, ListChecks, 
  FileText, RefreshCw, Check, Globe, Cpu, Server, Clock 
} from "lucide-react";

export default function ProjectDetailsPage() {
  // --- UI STATE ---
  const [expanded, setExpanded] = useState({
    overview: true,
    features: true,
    structure: true,
    checklist: true,
    resume: true,
    readme: true
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  // --- RGBA COLOR PALETTE ---
  const colors = {
    bgMain: "rgba(10, 10, 12, 1)",
    bgCard: "rgba(18, 18, 24, 1)",
    borderSoft: "rgba(255, 255, 255, 0.06)",
    textDim: "rgba(140, 140, 150, 1)",
    textMuted: "rgba(180, 180, 190, 1)",
    accentCyan: "rgba(34, 211, 238, 1)",
    white: "rgba(255, 255, 255, 1)",
    black: "rgba(0, 0, 0, 1)"
  };

  // --- DATA MODELS ---
  const folderContent = `src/
  controllers/
    auth.controller.ts
    user.controller.ts
  routes/
    auth.routes.ts
    user.routes.ts
  models/
    user.model.ts
  services/
    auth.service.ts
    user.service.ts
  middlewares/
    auth.middleware.ts
    error.middleware.ts
    validation.middleware.ts
  utils/
    logger.ts
    jwt.ts
    db.ts
  config/
    database.ts
    environment.ts
  tests/
    integration/
    unit/
  migrations/
    001_create_users_table.sql`;

  const resumePoints = [
    "Built production-ready REST API with JWT authentication and role-based access control",
    "Implemented PostgreSQL database with migration system and connection pooling",
    "Integrated comprehensive error handling, logging, and API documentation with Swagger",
    "Configured CI/CD pipeline with GitHub Actions for automated testing and deployment",
    "Applied security best practices including rate limiting, input validation, and XSS protection"
  ];

  const readmeMarkdown = `# FullstackStarterKit

A production-ready REST API boilerplate with Node.js, Express, PostgreSQL, and TypeScript.

## Features
- JWT Authentication with Refresh Tokens
- PostgreSQL with Migration System
- Structured Logging with Winston
- API Documentation with Swagger

## Getting Started
\`\`\`bash
npm install
npm run migrate
npm run dev
\`\`\``;

  // --- LOGIC HANDLERS ---
  const toggle = (section: keyof typeof expanded) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleCheck = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div 
      className="min-h-screen  pt-30 px-6 py-12 font-sans selection:bg-cyan-500/30"
      style={{ backgroundColor: colors.bgMain, color: colors.white }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* --- 01. HERO SECTION --- */}
        <div 
          className="relative p-10 rounded-[2.5rem] border-2 overflow-hidden"
          style={{ backgroundColor: colors.bgCard, borderColor: colors.borderSoft }}
        >
          <div className="relative z-10 space-y-8">
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest"
              style={{ backgroundColor: "rgba(34, 211, 238, 0.1)", borderColor: "rgba(34, 211, 238, 0.3)", color: colors.accentCyan }}
            >
              <Sparkles size={14} /> Recommended Project
            </div>

            <h1 
              className="text-5xl md:text-6xl font-black tracking-tighter uppercase leading-none"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(160, 160, 160, 1) 0%, rgba(255, 255, 255, 1) 45%, rgba(140, 140, 140, 1) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Fullstack Starter Kit
            </h1>

            <div className="flex flex-wrap gap-12">
              <MetaItem label="Target Role" value="Full Stack Developer" />
              <MetaItem label="Skill Level" value="Intermediate" />
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: colors.textDim }}>Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express", "PostgreSQL", "React", "TypeScript", "Docker"].map(tech => (
                    <span 
                      key={tech} className="px-3 py-1 rounded-full border text-xs font-bold"
                      style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)", color: colors.textMuted }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 02. PROJECT OVERVIEW --- */}
        <CollapsibleSection title="Project Overview" icon={<Layout size={20}/>} isOpen={expanded.overview} onToggle={() => toggle('overview')}>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed font-medium" style={{ color: colors.textMuted }}>
              This starter kit provides a solid foundation for building scalable backend services. It includes user authentication with JWT, role-based access control, PostgreSQL integration with migrations, and a complete CI/CD pipeline.
            </p>
          </div>
        </CollapsibleSection>

        {/* --- 03. FEATURES --- */}
        <CollapsibleSection title="Features" icon={<CheckCircle2 size={20}/>} isOpen={expanded.features} onToggle={() => toggle('features')}>
          <div className="grid grid-cols-1 gap-4">
            <FeatureCard title="Authentication & Authorization" desc="JWT-based authentication with refresh tokens and RBAC middleware." icon={<Lock size={18}/>} />
            <FeatureCard title="Database Integration" desc="PostgreSQL with connection pooling and migration scripts." icon={<Database size={18}/>} />
            <FeatureCard title="Error Handling & Logging" desc="Centralized error handling and structured logging with Winston." icon={<Bug size={18}/>} />
          </div>
        </CollapsibleSection>

        {/* --- 04. FOLDER STRUCTURE --- */}
        <CollapsibleSection title="Folder Structure" icon={<FolderTree size={20}/>} isOpen={expanded.structure} onToggle={() => toggle('structure')}>
          <div className="relative group">
            <pre className="p-8 rounded-3xl border-2 overflow-x-auto text-sm font-mono leading-relaxed" style={{ backgroundColor: "rgba(0,0,0,0.3)", borderColor: colors.borderSoft, color: "rgba(200, 200, 210, 1)" }}>
              {folderContent}
            </pre>
            <button 
              onClick={() => copyToClipboard(folderContent, 'folder')}
              className="absolute top-6 right-6 p-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/20 transition-all flex items-center gap-2"
            >
              {copiedId === 'folder' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              <span className="text-[10px] font-black uppercase">{copiedId === 'folder' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </CollapsibleSection>

        {/* --- 05. DEPLOYMENT CHECKLIST --- */}
        <CollapsibleSection title="Deployment Checklist" icon={<ListChecks size={20}/>} isOpen={expanded.checklist} onToggle={() => toggle('checklist')}>
          <div className="space-y-3">
            {[
              { t: "Create Dockerfile and docker-compose.yml", s: "Set up containerization for environments" },
              { t: "Run project locally using Docker", s: "Verify all services start correctly" },
              { t: "Add GitHub Actions workflow", s: "Automate testing on every commit" },
              { t: "Deploy to cloud platform", s: "Render, Railway, or AWS" }
            ].map((item, i) => (
              <ChecklistItem key={i} title={item.t} sub={item.s} checked={!!checkedItems[i]} onCheck={() => handleCheck(i)} />
            ))}
          </div>
        </CollapsibleSection>

        {/* --- 06. RESUME HIGHLIGHTS --- */}
        <CollapsibleSection title="Resume Highlights" icon={<FileText size={20}/>} isOpen={expanded.resume} onToggle={() => toggle('resume')}>
          <div className="space-y-4">
            <div className="space-y-3">
              {resumePoints.map((point, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-2xl border bg-white/[0.02]" style={{ borderColor: colors.borderSoft }}>
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span className="font-bold text-sm tracking-tight">{point}</span>
                  </div>
                  <button onClick={() => copyToClipboard(point, `res-${i}`)} className="p-2 hover:text-cyan-400 transition-colors">
                    {copiedId === `res-${i}` ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="opacity-30" />}
                  </button>
                </div>
              ))}
            </div>
            <button 
              onClick={() => copyToClipboard(resumePoints.join('\n'), 'res-all')}
              className="px-6 py-3 rounded-xl border font-black uppercase text-xs tracking-widest bg-white/5 border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              {copiedId === 'res-all' ? <Check size={14} /> : <Copy size={14} />}
              {copiedId === 'res-all' ? 'All Copied' : 'Copy All Highlights'}
            </button>
          </div>
        </CollapsibleSection>

        {/* --- 07. GITHUB README PREVIEW --- */}
        <CollapsibleSection title="GitHub README Preview" icon={<Github size={20}/>} isOpen={expanded.readme} onToggle={() => toggle('readme')}>
          <div className="rounded-3xl border-2 overflow-hidden" style={{ borderColor: colors.borderSoft }}>
            <div className="flex items-center justify-between px-6 py-4 bg-white/[0.03] border-b" style={{ borderColor: colors.borderSoft }}>
              <span className="text-[10px] font-black uppercase opacity-40 tracking-[0.2em]">Markdown Preview</span>
              <button 
                onClick={() => copyToClipboard(readmeMarkdown, 'readme')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-[10px] font-black uppercase hover:bg-white/20 transition-all flex items-center"
              >
                {copiedId === 'readme' ? <Check size={12} className="text-green-400 mr-1.5" /> : <Copy size={12} className="mr-1.5" />}
                {copiedId === 'readme' ? 'Copied' : 'Copy README'}
              </button>
            </div>
            <div className="p-8 font-mono text-sm leading-relaxed max-h-[400px] overflow-y-auto" style={{ color: colors.textMuted }}>
              <h2 className="text-white font-black mb-4 text-2xl"># FullstackStarterKit</h2>
              <p className="mb-6">A production-ready REST API boilerplate for building scalable backend services with Node.js, Express, PostgreSQL, and TypeScript.</p>
              
              <h3 className="text-white font-bold mb-2">## Features</h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>JWT Authentication with Refresh Tokens</li>
                <li>PostgreSQL with Migration System</li>
                <li>Structured Logging with Winston</li>
                <li>API Documentation with Swagger</li>
              </ul>

              <h3 className="text-white font-bold mb-2">## Quick Start</h3>
              <div className="bg-black/30 p-4 rounded-xl border border-white/5 text-cyan-400">
                <p>npm install</p>
                <p>npm run migrate</p>
                <p>npm run dev</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* --- 08. REGENERATE TRIGGER --- */}
        <div className="pt-20 pb-24 flex flex-col items-center gap-8">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="text-center space-y-2">
            <p className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: colors.textDim }}>End of blueprint</p>
            <h3 className="text-xl font-bold">Want a different approach?</h3>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-4 px-12 py-6 rounded-[2rem] font-black uppercase tracking-tighter text-2xl border-2 transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95"
            style={{ borderColor: "rgba(255, 255, 255, 0.15)" }}
          >
            <RefreshCw size={28} className="group-hover:rotate-180 transition-transform duration-700" />
            Regenerate Project
          </button>
        </div>

      </div>
    </div>
  );
}

// --- INTERNAL COMPONENTS ---

function MetaItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{label}</p>
      <p className="text-lg font-black tracking-tight">{value}</p>
    </div>
  );
}

function CollapsibleSection({ title, icon, children, isOpen, onToggle }: any) {
  return (
    <div className="rounded-[2rem] border-2 overflow-hidden" style={{ backgroundColor: "rgba(18, 18, 24, 1)", borderColor: "rgba(255, 255, 255, 0.06)" }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between p-7 hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-cyan-400">{icon}</div>
          <h2 className="text-xl md:text-2xl font-black tracking-tighter uppercase">{title}</h2>
        </div>
        {isOpen ? <ChevronUp size={24} className="opacity-30" /> : <ChevronDown size={24} className="opacity-30" />}
      </button>
      {isOpen && <div className="p-8 pt-2 border-t border-white/[0.04] animate-in fade-in slide-in-from-top-2 duration-300">{children}</div>}
    </div>
  );
}

function FeatureCard({ title, desc, icon }: any) {
  return (
    <div className="flex items-start gap-5 p-6 rounded-2xl border bg-white/[0.01] border-white/[0.06] group hover:bg-white/[0.03] transition-all">
      <div className="mt-1 p-2 rounded-lg bg-white/5 text-cyan-400 group-hover:scale-110 transition-transform">{icon}</div>
      <div>
        <h3 className="font-black text-lg mb-1">{title}</h3>
        <p className="text-sm opacity-50 font-medium">{desc}</p>
      </div>
    </div>
  );
}

function ChecklistItem({ title, sub, checked, onCheck }: any) {
  return (
    <label className={`flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${checked ? 'bg-cyan-500/10 border-cyan-500/40' : 'bg-white/[0.01] border-white/10'}`}>
      <input type="checkbox" checked={checked} onChange={onCheck} className="hidden" />
      <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'}`}>
        {checked && <Check size={14} className="text-black stroke-[4px]" />}
      </div>
      <div>
        <p className={`font-bold text-sm tracking-tight ${checked ? 'line-through opacity-50' : ''}`}>{title}</p>
        <p className="text-xs font-medium opacity-40 mt-0.5">{sub}</p>
      </div>
    </label>
  );
}