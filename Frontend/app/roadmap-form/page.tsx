"use client";

import { API_BASE_URL } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
 
import { 
  Plus, 
  Trash2, 
  Target, 
  Clock, 
  Lightbulb, 
  Wrench, 
  ChevronRight,
  AlertCircle,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react";

interface SkillEntry {
  skill: string;
  years: string;
  level: "beginner" | "intermediate" | "advanced";
}

export default function RoadmapForm() {
  const router = useRouter();
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fieldToWorkIn: "",
    purpose: "",
    whatToLearn: "",
    timeline: { value: 0, unit: "months" },
    visibility: "public" as "public" | "private"
  });

  const [existingSkills, setExistingSkills] = useState<SkillEntry[]>([
    { skill: "", years: "0", level: "beginner" }
  ]);

  const addSkill = () => setExistingSkills([...existingSkills, { skill: "", years: "0", level: "beginner" }]);
  
  const removeSkill = (index: number) => {
    setExistingSkills(existingSkills.filter((_, i) => i !== index));
  };

  const handleYearChange = (index: number, val: string) => {
    const numericVal = parseFloat(val);
    const newSkills = [...existingSkills];
    // Ensure value is not negative
    if (numericVal < 0) {
      newSkills[index].years = "0";
    } else {
      newSkills[index].years = val;
    }
    setExistingSkills(newSkills);
  };

  const isFormValid = () => {
  return (
    formData.fieldToWorkIn.trim() !== "" &&
    formData.purpose.trim() !== "" &&
    (formData.visibility === "public" || formData.visibility === "private")
  );
};




  const handleSubmitRoadmap = async () => {
  setShowErrors(true);
  if (!isFormValid()) return;

  setIsLoading(true);

  const payload = {
    targetField: formData.fieldToWorkIn,
    primaryPurpose: formData.purpose,
    skills: existingSkills
      .filter(s => s.skill.trim())
      .map(s => ({
        name: s.skill,
        years: Number(s.years),
        level: s.level,
      })),
    specificFocus: formData.whatToLearn,
    visibility: formData.visibility,
  };

  try {
    // 1️⃣ Create roadmap request
    const reqRes = await fetch(`${API_BASE_URL}/api/v1/roadmap/create-data`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const reqText = await reqRes.text();
    const reqData = JSON.parse(reqText);

    if (!reqRes.ok) throw new Error(reqData.message || "Create roadmap request failed");

    const roadmapRequestId = reqData?.data?._id;
    if (!roadmapRequestId) throw new Error("roadmapRequestId missing from response");

    // 2️⃣ Generate roadmap (AI)
    const genRes = await fetch(`${API_BASE_URL}/api/v1/roadmap/generate-roadmap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roadmapRequestId }),
    });

    const genText = await genRes.text();
    const genData = JSON.parse(genText);

    if (!genRes.ok) throw new Error(genData.message || "Failed to generate roadmap");

    // 3️⃣ Get structured roadmap
    const roadmapJson = genData?.data?.structured;
    console.log("GEN DATA FULL:", genData);

    if (!roadmapJson?.title || !Array.isArray(roadmapJson?.phases)) {
      throw new Error("Invalid roadmap JSON structure - missing title or phases");
    }

// ✅ 4️⃣ Convert backend format to frontend format & SAVE TO SESSION STORAGE BEFORE NAVIGATING
const roadmapForDisplay = {
  title: roadmapJson.title,
  roadmapRequestId,
  sections: roadmapJson.phases.map((phase: any) => ({
    id: phase.id,
    label: phase.label,
    topics: phase.topics || [],
  })),
};

sessionStorage.setItem("roadmap_json", JSON.stringify(roadmapForDisplay));
sessionStorage.setItem("roadmapRequestId", roadmapRequestId);

    // ⏳ Give browser a tick to commit storage (prevents race condition)
    setTimeout(() => {
      router.push(`/roadmap?roadmapRequestId=${roadmapRequestId}&visibility=${formData.visibility}`);
    }, 50);

  } catch (err) {
    console.error(err);
    setIsLoading(false);
    alert("Server error while creating roadmap");
  }
};


  const inputClass = (value: any) => `w-full bg-[#262626] border rounded-xl px-4 py-3 focus:outline-none transition-colors ${
    showErrors && (value === "" || value === undefined) 
    ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]" 
    : "border-white/5 focus:border-purple-500/50"
  }`;

  const timelineInputClass = (value: number) => `flex-1 bg-[#262626] border rounded-xl px-4 py-3 focus:outline-none transition-colors ${
    showErrors && value <= 0
    ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.1)]"
    : "border-white/5 focus:border-purple-500/50"
  }`;

  const optionalInputClass = `w-full bg-[#262626] border border-white/5 rounded-xl px-4 py-3 focus:outline-none transition-colors focus:border-purple-500/50`;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-sans">
      <style jsx global>{`
        /* Hide arrows for Chrome, Safari, Edge, Opera */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Hide arrows for Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-10">
        <header>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-5xl font-bold tracking-tight">Create Roadmap</h1>
            <span className="bg-cyan-900/50 text-cyan-400 text-xs font-medium px-2.5 py-1 rounded-full border border-cyan-500/30">AI Powered</span>
          </div>
          <p className="text-gray-400 text-lg">Define your trajectory and bridge your skill gaps.</p>
        </header>

        {/* 1. THE GOAL */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-purple-400">
            <Target size={22} />
            <h2 className="text-2xl font-semibold text-white">The Goal</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Target Field <span className="text-pink-500">*</span></label>
              <input 
                type="text" 
                placeholder="e.g. Cybersecurity" 
                value={formData.fieldToWorkIn}
                onChange={(e) => setFormData({...formData, fieldToWorkIn: e.target.value})}
                className={inputClass(formData.fieldToWorkIn)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Primary Purpose <span className="text-pink-500">*</span></label>
              <textarea 
                placeholder="What are you trying to achieve?" 
                rows={3}
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                className={inputClass(formData.purpose)} 
              />
            </div>
          </div>
        </section>

        {/* 2. EXISTING SKILLS */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400">
            <Wrench size={22} />
            <h2 className="text-2xl font-semibold text-white">Current Toolkit</h2>
          </div>

          <div className="space-y-6">
            {existingSkills.map((s, index) => (
              <div key={index} className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="md:col-span-4 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Skill Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. React" 
                    value={s.skill}
                    onChange={(e) => {
                      const newSkills = [...existingSkills];
                      newSkills[index].skill = e.target.value;
                      setExistingSkills(newSkills);
                    }}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:border-cyan-500/50" 
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Exp (Years)</label>
                  <input 
                    type="number" 
                    placeholder="0" 
                    value={s.years}
                    onChange={(e) => handleYearChange(index, e.target.value)}
                    className="w-full bg-[#121212] border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none" 
                  />
                </div>

                <div className="md:col-span-5 space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase">Proficiency</label>
                  <div className="flex bg-[#121212] p-1 rounded-lg border border-white/10 gap-1">
                    <button
                      type="button"
                      onClick={() => { const n = [...existingSkills]; n[index].level = "beginner"; setExistingSkills(n); }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${
                        s.level === "beginner" ? "bg-gradient-to-r from-cyan-600 to-cyan-400 text-white shadow-lg shadow-cyan-500/20" : "text-gray-500"
                      }`}
                    >Beginner</button>
                    
                    <button
                      type="button"
                      onClick={() => { const n = [...existingSkills]; n[index].level = "intermediate"; setExistingSkills(n); }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${
                        s.level === "intermediate" ? "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg shadow-purple-500/20" : "text-gray-500"
                      }`}
                    >Intermediate</button>

                    <button
                      type="button"
                      onClick={() => { const n = [...existingSkills]; n[index].level = "advanced"; setExistingSkills(n); }}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${
                        s.level === "advanced" ? "bg-gradient-to-r from-pink-600 to-pink-400 text-white shadow-lg shadow-pink-500/20" : "text-gray-500"
                      }`}
                    >Advanced</button>
                  </div>
                </div>

                <div className="md:col-span-1 flex justify-center pb-1">
                  {existingSkills.length > 1 && (
                    <button onClick={() => removeSkill(index)} className="text-gray-600 hover:text-red-400 transition-colors">
                      <Trash2 size={20}/>
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="button" onClick={addSkill} className="flex items-center gap-2 text-cyan-400 text-sm font-bold hover:text-cyan-300 px-1"><Plus size={20} /> ADD ANOTHER SKILL</button>
          </div>
        </section>
        {/* 3. SPECIFIC TOPICS */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-yellow-400">
            <Lightbulb size={22} />
            <h2 className="text-2xl font-semibold text-white">Specific Focus</h2>
          </div>
          <input 
            type="text" 
            placeholder="e.g. AWS, System Design..." 
            value={formData.whatToLearn}
            onChange={(e) => setFormData({...formData, whatToLearn: e.target.value})}
            className={optionalInputClass} 
          />
        </section>

        {/* 5. VISIBILITY */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-2 text-indigo-400">
            <Eye size={22} />
            <h2 className="text-2xl font-semibold text-white">Visibility</h2> <span className="text-pink-500">*</span>
          </div>
          <div className="flex bg-[#262626] p-1 rounded-xl border border-white/5 max-w-md gap-1">
            <button
              type="button"
              onClick={() => setFormData({...formData, visibility: "public"})}
              className={`flex-1 py-3 px-6 text-sm font-bold rounded-lg transition-all capitalize flex items-center justify-center gap-2 ${
                formData.visibility === "public" ? "bg-gradient-to-r from-indigo-400 to-cyan-600 text-white shadow-lg shadow-emerald-500/20" : "text-gray-500"
              }`}
            >
              <Eye size={18} />
              Public
            </button>
            
            <button
              type="button"
              onClick={() => setFormData({...formData, visibility: "private"})}
              className={`flex-1 py-3 px-6 text-sm font-bold rounded-lg transition-all capitalize flex items-center justify-center gap-2 ${
                formData.visibility === "private" ? "bg-gradient-to-r from-pink-600 to-purple-400 text-white shadow-lg shadow-slate-500/20" : "text-gray-500"
              }`}
            >
              <EyeOff size={18} />
              Private
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            {formData.visibility === "public" 
              ? "Your roadmap will be visible to others and can be shared."
              : "Your roadmap will be private and only visible to you."}
          </p>
        </section>

        <div className="pt-6">
          <button 
            type="button"
            onClick={handleSubmitRoadmap}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-black text-lg rounded-2xl transition-all active:scale-[0.97] shadow-2xl shadow-purple-500/20 ${
              isLoading 
                ? "opacity-60 cursor-not-allowed" 
                : "hover:opacity-90"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                GENERATING ROADMAP...
              </>
            ) : (
              <>
                GENERATE CUSTOM ROADMAP <ChevronRight size={24} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}