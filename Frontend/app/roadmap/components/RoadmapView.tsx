"use client";

import { useState, useRef } from "react";
import { 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Sparkles, 
  Trophy,
  Download,
  AlertTriangle,
  ChevronDown,
  FileImage,
  FileText
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type Roadmap = {
  title: string;
  durationWeeks?: number;
  sections: {
    weekRange?: string;
    label: string;
    topics: {
      title: string;
      subtopics: string[];
    }[];
  }[];
};

export default function RoadmapView({ roadmap, visibility = "public" }: { roadmap: Roadmap; visibility?: "public" | "private" }) {
  const [selectedFormat, setSelectedFormat] = useState<"png" | "jpg" | "pdf">("png");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!roadmapRef.current) return;

    try {
      const canvas = await html2canvas(roadmapRef.current, {
        backgroundColor: "#050505",
        scale: 2,
        logging: false,
      });

      const fileName = `${roadmap.title.replace(/\s+/g, "_")}_roadmap`;

      if (selectedFormat === "png" || selectedFormat === "jpg") {
        const imgData = canvas.toDataURL(`image/${selectedFormat}`);
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${fileName}.${selectedFormat}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (selectedFormat === "pdf") {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: canvas.width > canvas.height ? "landscape" : "portrait",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(`${fileName}.pdf`);
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 py-24 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto" ref={roadmapRef}>
        
        {/* Private Roadmap Warning */}
        {visibility === "private" && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-orange-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-orange-300 mb-2">Private Roadmap - Limited Access</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This roadmap will be <strong>automatically deleted after 60 minutes</strong>. We recommend downloading it now to keep a permanent copy.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Download Button Section */}
        <div className="mb-8 flex justify-end items-center gap-3">
          {/* Format Selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border border-white/10 text-white font-medium rounded-xl hover:border-white/20 transition-all"
            >
              {selectedFormat === "png" && <FileImage size={18} />}
              {selectedFormat === "jpg" && <FileImage size={18} />}
              {selectedFormat === "pdf" && <FileText size={18} />}
              <span className="uppercase text-sm">{selectedFormat}</span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50 min-w-[120px]">
                {["png", "jpg", "pdf"].map((format) => (
                  <button
                    type="button"
                    key={format}
                    onClick={() => {
                      setSelectedFormat(format as "png" | "jpg" | "pdf");
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm uppercase font-medium transition-colors ${
                      selectedFormat === format
                        ? "bg-purple-600 text-white"
                        : "text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
          >
            <Download size={18} />
            Download
          </button>
        </div>
        
        {/* Header Section */}
        <header className="mb-20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
              <Sparkles size={14} className="text-purple-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">AI Optimized Path</span>
            </div>
            {roadmap.durationWeeks && (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Clock size={14} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
                  {roadmap.durationWeeks} Weeks Total
                </span>
              </div>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent leading-tight">
            {roadmap.title}
          </h1>
        </header>

        {/* Roadmap Container */}
        <div className="relative">
          
          {/* Main Vertical Spine with Neon Glow */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-purple-600 via-cyan-500 to-transparent opacity-40 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />

          <div className="space-y-20">
            {roadmap.sections.map((section, i) => (
              <Section key={i} section={section} index={i} />
            ))}
            
            {/* Final Milestone Indicator */}
            <div className="relative pl-14 pt-4">
               <div className="absolute left-0 right-207 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="z-10 w-15 h-15 rounded-full bg-gradient-to-tr from-yellow-300 via-orange-400 to-red-600 flex items-center justify-center shadow-lg shadow-orange-400/30">
                    <Trophy size={40} className="text-black" />
                  </div>
               </div>
               <h3 className="pl-6 pb-3 text-2xl font-bold text-white/90 underline underline-offset-6">Path Completed</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SECTION ---------------- */

function Section({ section, index }: { section: Roadmap["sections"][0]; index: number }) {
  return (
    <div className="relative pl-14 group">
      
      {/* Section Node */}
      <div className="absolute left-0 top-0 flex items-center justify-center">
        <div className="z-10 w-10 h-10 rounded-2xl bg-[#0a0a0a] border-2 border-white/20 flex items-center justify-center group-hover:border-purple-500 transition-all duration-500 group-hover:rotate-12">
           <span className="text-sm font-black text-white/40 group-hover:text-purple-400">
             {(index + 1).toString().padStart(2, '0')}
           </span>
        </div>
      </div>

      {/* Section Label Box */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          {section.weekRange && (
            <div className="flex items-center gap-2 text-cyan-500 mb-2">
              <Calendar size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{section.weekRange}</span>
            </div>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
            {section.label}
          </h2>
        </div>
      </div>

      {/* Topics Stack */}
      <div className="grid gap-6">
        {section.topics.map((topic, i) => (
          <Topic key={i} topic={topic} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- TOPIC ---------------- */

function Topic({ topic }: { topic: Roadmap["sections"][0]["topics"][0] }) {
  return (
    <div className="relative group/topic">
      {/* Connection Line */}
      <div className="absolute -left-14 top-1/2 w-8 h-[2px] bg-white/5 group-hover/topic:bg-purple-500/40 transition-colors" />

      <div className="border border-white/5 rounded-2xl bg-[#0f0f12] hover:bg-[#14141a] p-6 transition-all duration-300 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-white/5 text-gray-500 group-hover/topic:text-cyan-400 group-hover/topic:bg-cyan-400/10 transition-all duration-300">
              <CheckCircle2 size={20} />
            </div>
            <h3 className="text-lg font-bold text-white/70 group-hover/topic:text-white transition-colors">
              {topic.title}
            </h3>
          </div>
          <div className="opacity-0 group-hover/topic:opacity-100 transition-opacity">
             <ChevronRight size={20} className="text-purple-500" />
          </div>
        </div>

        {/* Subtopics Badges */}
        <div className="flex flex-wrap gap-2">
          {topic.subtopics.map((sub, i) => (
            <span
              key={i}
              className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-md
                         bg-white/[0.03] border border-white/5 
                         text-gray-500 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
            >
              {sub}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}