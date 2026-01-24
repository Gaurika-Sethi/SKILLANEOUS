"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Upload, Plus, Trash2, AlertCircle } from "lucide-react";

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

export default function ResumeFormClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const theme = (searchParams.get("theme") || "modern") as "modern" | "ats" | "creative";

  const isPhotoRequired = theme === "creative";
  const [photo, setPhoto] = useState<File | null>(null);
  const [showErrors, setShowErrors] = useState(false);
  
  // --- Form State ---
  const [personal, setPersonal] = useState({ fullName: "", email: "", phone: "", location: "" });
  const [links, setLinks] = useState([{ label: "", url: "" }]);
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experiences, setExperiences] = useState<Experience[]>([{ role: "", company: "", startDate: "", endDate: "", isPresent: false, description: "" }]);
  const [projects, setProjects] = useState<Project[]>([{ title: "", techStack: "", duration: "", description: "", linkType: "github", linkUrl: "" }]);
  const [education, setEducation] = useState({ institution: "", degree: "", location: "", graduationYear: "" });
  const [achievements, setAchievements] = useState("");

  const removeEntry = (setter: any, state: any[], index: number) => {
    setter(state.filter((_, i) => i !== index));
  };

  const isMissing = (val: string) => showErrors && val.trim() === "";

  const isFormValid = () => {
    const hasPersonal = personal.fullName && personal.email && personal.phone && personal.location;
    const hasSummary = summary.trim() !== "";
    const hasSkills = skills.trim() !== "";
    const hasPhoto = !isPhotoRequired || (isPhotoRequired && photo);
    const hasExperience = experiences.every(exp => exp.role && exp.company && exp.startDate && (exp.isPresent || exp.endDate) && exp.description);
    const hasProjects = projects.every(proj => proj.title && proj.techStack && proj.duration && proj.description && proj.linkUrl);
    const hasEducation = education.institution && education.degree && education.graduationYear;

    return hasPersonal && hasSummary && hasSkills && hasPhoto && hasExperience && hasProjects && hasEducation;
  };

  const handleGenerate = async () => {
  console.log("🚀 Generate button clicked");
  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  setShowErrors(true);
  if (!isFormValid()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const formData = new FormData();

  formData.append(
    "personalInfo",
    JSON.stringify({
      fullName: personal.fullName,
      email: personal.email,
      phone: personal.phone,
      location: personal.location,
      links,
    })
  );

  formData.append("summary", summary);

  formData.append(
    "parsedSkills",
    JSON.stringify(skills.split(",").map(s => s.trim()))
  );

  formData.append(
    "experience",
    JSON.stringify(
      experiences.map(e => ({
        role: e.role,
        company: e.company,
        startDate: e.startDate,
        endDate: e.isPresent ? "Present" : e.endDate,
        description: e.description.split("\n"),
      }))
    )
  );

  formData.append(
    "projects",
    JSON.stringify(
      projects.map(p => ({
        title: p.title,
        techStack: p.techStack.split(","),
        duration: p.duration,
        description: p.description.split("\n"),
        links: [{ type: p.linkType, url: p.linkUrl }],
      }))
    )
  );

  formData.append("education", JSON.stringify(education));

  formData.append(
    "achievements",
    JSON.stringify(
      achievements.split("\n").map(a => a.trim()).filter(Boolean)
    )
  );

  if (photo) {
    formData.append("photo", photo);
  }

  

  const res = await fetch(`https://skillaneous.onrender.com/api/v1/resume/create-data`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Failed to save resume data");
    return;
  }

  const resumeDataId = data.data._id;

  router.push(
    `/tone-selection?resumeDataId=${resumeDataId}&theme=${theme}`
  );
};

  const inputClass = (value: string) => `w-full bg-[#262626] border rounded-xl px-4 py-3 focus:outline-none transition-colors ${
    isMissing(value) ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]" : "border-white/5 focus:border-purple-500/50"
  }`;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        
        <header>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl font-bold tracking-tight">Build Your Resume</h1>
            <span className="bg-purple-900/50 text-purple-400 text-xs font-medium px-2.5 py-1 rounded-full border border-purple-500/30 capitalize">{theme}</span>
          </div>
          <p className="text-gray-400 text-lg">Create a resume tailored to your career path</p>
          {showErrors && !isFormValid() && (
            <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-xl border border-red-400/20">
              <AlertCircle size={18} />
              <span className="text-sm font-medium">Please fill in all required fields highlighted in red.</span>
            </div>
          )}
        </header>

        {/* 1. PERSONAL DETAILS */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-8">
          <h2 className="text-2xl font-semibold">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-300">Full Name <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="John Doe" value={personal.fullName} onChange={(e) => setPersonal({...personal, fullName: e.target.value})} className={inputClass(personal.fullName)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email <span className="text-pink-500">*</span></label>
              <input type="email" placeholder="john@example.com" value={personal.email} onChange={(e) => setPersonal({...personal, email: e.target.value})} className={inputClass(personal.email)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Phone <span className="text-pink-500">*</span></label>
              <input type="tel" placeholder="+1 (555) 123-4567" value={personal.phone} onChange={(e) => setPersonal({...personal, phone: e.target.value})} className={inputClass(personal.phone)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-300">Location <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="San Francisco, CA" value={personal.location} onChange={(e) => setPersonal({...personal, location: e.target.value})} className={inputClass(personal.location)} />
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-300">Photo{isPhotoRequired && <span className="text-pink-500">*</span>}</label>
              <label className={`flex items-center gap-2 w-fit bg-[#262626] border rounded-xl px-4 py-2.5 cursor-pointer hover:bg-[#323232] transition text-sm ${isPhotoRequired && !photo && showErrors ? "border-red-500" : "border-white/10"}`}>
                <Upload size={18} className="text-cyan-400" /> {photo ? photo.name : "Upload Photo"}
                <input type="file" className="hidden" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
              </label>
            </div>

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

        {/* 2. SUMMARY (Star Added) */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Professional Summary</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Summary <span className="text-pink-500">*</span></label>
            <textarea placeholder="Brief overview of your profile..." rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} className={inputClass(summary)} />
          </div>
        </section>

        {/* 3. SKILLS (Star Added) */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Skills <span className="text-pink-500">*</span></label>
            <input type="text" placeholder="JavaScript, React..." value={skills} onChange={(e) => setSkills(e.target.value)} className={inputClass(skills)} />
          </div>
        </section>

        {/* 4. EXPERIENCE */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Experience</h2>
          {experiences.map((exp, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6 relative">
              <div className="flex justify-between items-center">
                <h3 className="text-cyan-400 font-medium text-sm">Experience {index + 1}</h3>
                {index > 0 && (
                  <button type="button" onClick={() => removeEntry(setExperiences, experiences, index)} className="text-red-400 hover:text-red-300"><Trash2 size={20} /></button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-sm text-gray-300">Role <span className="text-pink-500">*</span></label>
                  <input type="text" value={exp.role} onChange={(e) => { const n = [...experiences]; n[index].role = e.target.value; setExperiences(n); }} className={inputClass(exp.role)} />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">Company <span className="text-pink-500">*</span></label>
                  <input type="text" value={exp.company} onChange={(e) => { const n = [...experiences]; n[index].company = e.target.value; setExperiences(n); }} className={inputClass(exp.company)} />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">Start Date <span className="text-pink-500">*</span></label>
                  <input type="date" value={exp.startDate} onChange={(e) => { const n = [...experiences]; n[index].startDate = e.target.value; setExperiences(n); }} className={inputClass(exp.startDate) + " [color-scheme:dark]"} />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">End Date <span className="text-pink-500">*</span></label>
                  <input type="date" disabled={exp.isPresent} value={exp.endDate} onChange={(e) => { const n = [...experiences]; n[index].endDate = e.target.value; setExperiences(n); }} className={inputClass(exp.isPresent ? "present" : exp.endDate) + " [color-scheme:dark] disabled:opacity-30"} />
                </div>
                <div className="md:col-span-2 flex items-center gap-3">
                  <input type="checkbox" checked={exp.isPresent} onChange={(e) => { const n = [...experiences]; n[index].isPresent = e.target.checked; setExperiences(n); }} className="w-5 h-5 rounded border-white/10 bg-[#262626] text-purple-600" />
                  <label className="text-sm text-gray-300">Present</label>
                </div>
                <div className="md:col-span-2 space-y-2"><label className="text-sm text-gray-300">Description <span className="text-pink-500">*</span></label>
                  <textarea rows={4} value={exp.description} onChange={(e) => { const n = [...experiences]; n[index].description = e.target.value; setExperiences(n); }} className={inputClass(exp.description)} />
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
            <div key={index} className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6 relative">
              <div className="flex justify-between items-center">
                <h3 className="text-cyan-400 font-medium text-sm">Project {index + 1}</h3>
                {index > 0 && (
                  <button type="button" onClick={() => removeEntry(setProjects, projects, index)} className="text-red-400 hover:text-red-300"><Trash2 size={20} /></button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 space-y-2"><label className="text-sm text-gray-300">Title <span className="text-pink-500">*</span></label>
                  <input type="text" value={proj.title} onChange={(e) => { const n = [...projects]; n[index].title = e.target.value; setProjects(n); }} className={inputClass(proj.title)} />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">Tech Stack <span className="text-pink-500">*</span></label>
                  <input type="text" value={proj.techStack} onChange={(e) => { const n = [...projects]; n[index].techStack = e.target.value; setProjects(n); }} className={inputClass(proj.techStack)} />
                </div>
                <div className="space-y-2"><label className="text-sm text-gray-300">Duration <span className="text-pink-500">*</span></label>
                  <input type="text" value={proj.duration} onChange={(e) => { const n = [...projects]; n[index].duration = e.target.value; setProjects(n); }} className={inputClass(proj.duration)} />
                </div>
                <div className="md:col-span-2 space-y-2"><label className="text-sm text-gray-300">Description <span className="text-pink-500">*</span></label>
                  <textarea rows={4} value={proj.description} onChange={(e) => { const n = [...projects]; n[index].description = e.target.value; setProjects(n); }} className={inputClass(proj.description)} />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm text-gray-300">Link <span className="text-pink-500">*</span></label>
                  <div className="flex gap-3">
                    <select value={proj.linkType} onChange={(e) => { const n = [...projects]; n[index].linkType = e.target.value; setProjects(n); }} className="bg-[#262626] border border-white/5 rounded-xl px-4 py-3 text-sm [color-scheme:dark]">
                      <option value="github">GitHub</option>
                      <option value="live">Live</option>
                      <option value="figma">Figma</option>
                      <option value="demo">Demo</option>
                      <option value="docs">Docs</option>
                      <option value="other">Other</option>
                    </select>
                    <input type="text" placeholder="URL" value={proj.linkUrl} onChange={(e) => { const n = [...projects]; n[index].linkUrl = e.target.value; setProjects(n); }} className={inputClass(proj.linkUrl)} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setProjects([...projects, { title: "", techStack: "", duration: "", description: "", linkType: "github", linkUrl: "" }])} className="flex items-center gap-2 bg-[#1a1a1a] border border-white/10 rounded-xl px-6 py-3 text-sm font-medium hover:bg-[#262626] transition"><Plus size={18} className="text-cyan-400" /> Add Project</button>
        </section>

        {/* 6. EDUCATION */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-semibold">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Institution <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="University Name" value={education.institution} onChange={(e) => setEducation({...education, institution: e.target.value})} className={inputClass(education.institution)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Degree <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="Course Name" value={education.degree} onChange={(e) => setEducation({...education, degree: e.target.value})} className={inputClass(education.degree)} />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm text-gray-300">Graduation Year <span className="text-pink-500">*</span></label>
              <input type="text" placeholder="e.g. 2024" value={education.graduationYear} onChange={(e) => setEducation({...education, graduationYear: e.target.value})} className={inputClass(education.graduationYear)} />
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-semibold">Achievements <span className="text-gray-500 font-normal text-sm">(Optional)</span></h2>
          <textarea placeholder="Notable accomplishments..." rows={4} value={achievements} onChange={(e) => setAchievements(e.target.value)} className="w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none resize-none" />
        </section>

        <section className="sticky bottom-0 bg-black pt-6 pb-10 z-50">
  <button
    type="button"
    onClick={handleGenerate}
    className="w-full px-10 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5"
  >
    Generate Resume
  </button>
</section>

      </div>
    </div>
  );
}