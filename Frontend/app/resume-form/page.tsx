"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Upload, Plus, Trash2 } from "lucide-react";

interface Experience {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  description: string;
}

interface Project {
  title: string;
  techStack: string;
  duration: string;
  description: string;
  linkType: string;
  linkUrl: string;
}

export default function ResumeForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = (searchParams.get("theme") || "modern") as "modern" | "ats" | "creative";

  const isPhotoRequired = theme === "creative";
  const [photo, setPhoto] = useState<File | null>(null);
  
  // --- Form State ---
  const [personal, setPersonal] = useState({ fullName: "", email: "", phone: "", location: "" });
  const [links, setLinks] = useState([{ label: "", url: "" }]);
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([{ role: "", company: "", startDate: "", endDate: "", isPresent: false, description: "" }]);
  const [projects, setProjects] = useState<Project[]>([{ title: "", techStack: "", duration: "", description: "", linkType: "GitHub", linkUrl: "" }]);
  const [education, setEducation] = useState({ institution: "", degree: "", location: "", graduationYear: "" });
  const [achievements, setAchievements] = useState("");

  // --- Deletion Handlers ---
  const removeEntry = (setter: any, state: any[], index: number) => {
    setter(state.filter((_, i) => i !== index));
  };

  // --- Validation Logic ---
  const isFormValid = () => {
    const hasPersonal = personal.fullName && personal.email && personal.phone && personal.location;
    const hasSummary = summary.trim() !== "";
    const hasSkills = skills.trim() !== "";
    const hasPhoto = !isPhotoRequired || (isPhotoRequired && photo);
    const hasExperience = experiences.every(exp => exp.role && exp.company && exp.startDate && (exp.isPresent || exp.endDate) && exp.description);
    const hasProjects = projects.every(proj => proj.title && proj.techStack && proj.duration && proj.description && proj.linkUrl);
    const hasEducation = education.institution && education.degree && education.location && education.graduationYear;

    return hasPersonal && hasSummary && hasSkills && hasPhoto && hasExperience && hasProjects && hasEducation;
  };

  const handleGenerate = () => {
    if (!isFormValid()) {
      alert("Please fill in all required fields marked with * before proceeding.");
      return;
    }
    router.push("/tone-selection");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Header */}
        <header>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl font-bold tracking-tight">Build Your Resume</h1>
            <span className="bg-purple-900/50 text-purple-400 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-500/30 capitalize">{theme}</span>
          </div>
          <p className="text-gray-400 text-lg">Create a resume tailored to your career path</p>
        </header>

        {/* 1. PERSONAL DETAILS (Includes External Links) */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-8">
          <h2 className="text-2xl font-semibold">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="John Doe" value={personal.fullName} onChange={(e) => setPersonal({...personal, fullName: e.target.value})} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email <span className="text-pink-500">*</span></label>
              <input type="email" placeholder="john@example.com" value={personal.email} onChange={(e) => setPersonal({...personal, email: e.target.value})} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Phone <span className="text-pink-500">*</span></label>
              <input type="tel" placeholder="+1 (555) 123-4567" value={personal.phone} onChange={(e) => setPersonal({...personal, phone: e.target.value})} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-300">Location <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="San Francisco, CA" value={personal.location} onChange={(e) => setPersonal({...personal, location: e.target.value})} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-300">Photo (Optional) {isPhotoRequired && <span className="text-pink-500">*</span>}</label>
              <label className="flex items-center gap-2 w-fit bg-[#262626] border border-white/10 rounded-xl px-4 py-2.5 cursor-pointer hover:bg-[#323232] transition text-sm">
                <Upload size={18} className="text-cyan-400" /> {photo ? photo.name : "Upload Photo"}
                <input type="file" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
              </label>
            </div>

            {/* EXTERNAL LINKS SECTION */}
            <div className="md:col-span-2 space-y-4">
              <label className="text-sm font-medium text-gray-300">External Links <span className="text-gray-500 font-normal ml-1">(Max 3)</span></label>
              {links.map((link, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <input type="text" placeholder="Label" value={link.label} onChange={(e) => {
                    const newLinks = [...links]; newLinks[index].label = e.target.value; setLinks(newLinks);
                  }} className="flex-1 bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
                  <input type="text" placeholder="https://..." value={link.url} onChange={(e) => {
                    const newLinks = [...links]; newLinks[index].url = e.target.value; setLinks(newLinks);
                  }} className="flex-[2] bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
                  {links.length > 1 && (
                    <button type="button" onClick={() => removeEntry(setLinks, links, index)} className="text-red-400 hover:text-red-300 p-2"><Trash2 size={20} /></button>
                  )}
                </div>
              ))}
              <button type="button" onClick={() => links.length < 3 && setLinks([...links, { label: "", url: "" }])} disabled={links.length >= 3} className="flex items-center gap-2 text-cyan-400 text-sm font-medium disabled:opacity-50"><Plus size={18} /> Add Link</button>
            </div>
          </div>
        </section>

        {/* 2. SUMMARY & 3. SKILLS ... (Same as previous) */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Professional Summary</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Summary <span className="text-pink-500">*</span></label>
            <textarea placeholder="Brief overview of your profile..." rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none resize-none" />
          </div>
        </section>

        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Skills <span className="text-pink-500">*</span></label>
            <input type="text" placeholder="JavaScript, React..." value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
          </div>
        </section>

        {/* 4. EXPERIENCE */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Experience</h2>
          {experiences.map((exp, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6 relative group">
              <div className="flex justify-between items-center">
                <h3 className="text-cyan-400 font-medium text-sm">Experience {index + 1}</h3>
                {index > 0 && (
                  <button type="button" onClick={() => removeEntry(setExperiences, experiences, index)} className="text-red-400 hover:text-red-300 transition-opacity"><Trash2 size={20} /></button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-sm text-gray-300">Role <span className="text-pink-500">*</span></label>
                  <input type="text" placeholder="Software Engineer" value={exp.role} onChange={(e) => { const n = [...experiences]; n[index].role = e.target.value; setExperiences(n); }} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">Company <span className="text-pink-500">*</span></label>
                  <input type="text" placeholder="Tech Corp" value={exp.company} onChange={(e) => { const n = [...experiences]; n[index].company = e.target.value; setExperiences(n); }} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">Start Date <span className="text-pink-500">*</span></label>
                  <input type="date" className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none [color-scheme:dark]" onChange={(e) => { const n = [...experiences]; n[index].startDate = e.target.value; setExperiences(n); }} />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">End Date <span className="text-pink-500">*</span></label>
                  <input type="date" disabled={exp.isPresent} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none disabled:opacity-30 [color-scheme:dark]" onChange={(e) => { const n = [...experiences]; n[index].endDate = e.target.value; setExperiences(n); }} />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <input type="checkbox" checked={exp.isPresent} onChange={(e) => { const n = [...experiences]; n[index].isPresent = e.target.checked; setExperiences(n); }} className="w-5 h-5 rounded border-white/10 bg-[#262626] text-purple-600" />
                  <label className="text-sm text-gray-300">Present</label>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm text-gray-300">Description <span className="text-pink-500">*</span></label>
                  <textarea placeholder="Responsibilities..." rows={4} value={exp.description} onChange={(e) => { const n = [...experiences]; n[index].description = e.target.value; setExperiences(n); }} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none resize-none" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setExperiences([...experiences, { role: "", company: "", startDate: "", endDate: "", isPresent: false, description: "" }])} className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl px-6 py-3 text-sm font-medium hover:bg-[#262626] transition"><Plus size={18} className="text-cyan-400" /> Add Experience</button>
        </section>

        {/* 5. PROJECTS */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Projects</h2>
          {projects.map((proj, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6 relative group">
              <div className="flex justify-between items-center">
                <h3 className="text-cyan-400 font-medium text-sm">Project {index + 1}</h3>
                {index > 0 && (
                  <button type="button" onClick={() => removeEntry(setProjects, projects, index)} className="text-red-400 hover:text-red-300"><Trash2 size={20} /></button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2"><label className="text-sm text-gray-300">Title <span className="text-pink-500">*</span></label>
                  <input type="text" placeholder="Project Name" value={proj.title} onChange={(e) => { const n = [...projects]; n[index].title = e.target.value; setProjects(n); }} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">Tech Stack <span className="text-pink-500">*</span></label>
                  <input type="text" placeholder="React, Node.js..." value={proj.techStack} onChange={(e) => { const n = [...projects]; n[index].techStack = e.target.value; setProjects(n); }} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">Duration <span className="text-pink-500">*</span></label>
                  <input type="text" placeholder="3 months" value={proj.duration} onChange={(e) => { const n = [...projects]; n[index].duration = e.target.value; setProjects(n); }} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
                </div>
                <div className="md:col-span-2 space-y-2"><label className="text-sm text-gray-300">Description <span className="text-pink-500">*</span></label>
                  <textarea placeholder="Describe the project..." rows={4} value={proj.description} onChange={(e) => { const n = [...projects]; n[index].description = e.target.value; setProjects(n); }} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none resize-none" />
                </div>
                <div className="md:col-span-2 space-y-2"><label className="text-sm text-gray-300">Link <span className="text-pink-500">*</span></label>
                  <div className="flex gap-3">
                    <select value={proj.linkType} onChange={(e) => { const n = [...projects]; n[index].linkType = e.target.value; setProjects(n); }} className="bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none text-sm [color-scheme:dark]"><option>GitHub</option><option>Live Demo</option></select>
                    <input type="text" placeholder="https://..." value={proj.linkUrl} onChange={(e) => { const n = [...projects]; n[index].linkUrl = e.target.value; setProjects(n); }} className="flex-1 bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setProjects([...projects, { title: "", techStack: "", duration: "", description: "", linkType: "GitHub", linkUrl: "" }])} className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl px-6 py-3 text-sm font-medium hover:bg-[#262626] transition"><Plus size={18} className="text-cyan-400" /> Add Project</button>
        </section>

        {/* 6. EDUCATION & 7. ACHIEVEMENTS (Same as previous) */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2"><label className="text-sm text-gray-300">Institution <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="University Name" value={education.institution} onChange={(e) => setEducation({...education, institution: e.target.value})} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
            <div className="space-y-2"><label className="text-sm text-gray-300">Degree <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="Course Name" value={education.degree} onChange={(e) => setEducation({...education, degree: e.target.value})} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none" />
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Achievements <span className="text-gray-500 font-normal text-sm">(Optional)</span></h2>
          <textarea placeholder="Notable accomplishments..." rows={4} value={achievements} onChange={(e) => setAchievements(e.target.value)} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none resize-none" />
        </section>

        {/* FOOTER BUTTON */}
        <div className="pt-6">
          <button onClick={handleGenerate} className="w-full px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5">
            Generate Resume
          </button>
        </div>
      </div>
    </div>
  );
}