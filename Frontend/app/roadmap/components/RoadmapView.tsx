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
  FileText,
  X,
  ExternalLink,
  BookOpen,
  Loader2
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
  const [expandedTopics, setExpandedTopics] = useState<Set<string>>(new Set());
  const [loadingTopics, setLoadingTopics] = useState<Set<string>>(new Set());
  const [selectedSubtopic, setSelectedSubtopic] = useState<{
    title: string;
    topic: string;
    sectionLabel: string;
  } | null>(null);
  const [isLoadingSubtopic, setIsLoadingSubtopic] = useState(false);
  const roadmapRef = useRef<HTMLDivElement>(null);

  const toggleTopic = (sectionIndex: number, topicIndex: number) => {
    const key = `${sectionIndex}-${topicIndex}`;
    const newExpanded = new Set(expandedTopics);
    const newLoading = new Set(loadingTopics);
    
    if (newExpanded.has(key)) {
      // Collapsing - no loading needed
      newExpanded.delete(key);
    } else {
      // Expanding - show loading
      newExpanded.add(key);
      newLoading.add(key);
      
      // Simulate AI generation delay
      setTimeout(() => {
        setLoadingTopics((prev) => {
          const updated = new Set(prev);
          updated.delete(key);
          return updated;
        });
      }, 1500); // 1.5 second loading
    }
    
    setExpandedTopics(newExpanded);
    setLoadingTopics(newLoading);
  };

  const handleSubtopicClick = (
    subtopic: string,
    topicTitle: string,
    sectionLabel: string
  ) => {
    setIsLoadingSubtopic(true);
    setSelectedSubtopic({
      title: subtopic,
      topic: topicTitle,
      sectionLabel,
    });
    
    // Simulate AI generation delay
    setTimeout(() => {
      setIsLoadingSubtopic(false);
    }, 1200); // 1.2 second loading
  };

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
    <div className="min-h-screen bg-[rgba(5,5,5,1)] text-white px-6 py-24 font-sans selection:bg-[rgba(168,85,247,0.3)]">
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes slowPing {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .shimmer-text {
          background: linear-gradient(
            90deg,
            rgba(207, 144, 60, 1) 0%,
            rgba(214, 158, 36, 1) 25%,
            rgba(231, 187, 40, 1) 50%,
            rgba(192, 138, 13, 1) 75%,
            rgba(202, 127, 14, 1) 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        .slow-ping {
          animation: slowPing 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
      <div className="max-w-4xl mx-auto" ref={roadmapRef}>
        
        {/* Private Roadmap Warning */}
        {visibility === "private" && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-[rgba(220,38,38,0.15)] via-[rgba(194,65,12,0.05)] to-[rgba(220,38,38,0.15)] border border-[rgba(249,115,22,0.3)]">
            <div className="flex items-start gap-4">
              <AlertTriangle size={24} className="text-[rgba(234,88,12,1)] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[rgba(251,146,60,1)] mb-2">Private Roadmap - Limited Access</h3>
                <p className="text-[rgba(229,231,235,1)] text-sm leading-relaxed">
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
              className="flex items-center gap-2 px-4 py-3 bg-[rgba(26,26,26,1)] border border-[rgba(255,255,255,0.1)] text-white font-medium rounded-xl hover:border-[rgba(255,255,255,0.2)] transition-all"
            >
              {selectedFormat === "png" && <FileImage size={18} />}
              {selectedFormat === "jpg" && <FileImage size={18} />}
              {selectedFormat === "pdf" && <FileText size={18} />}
              <span className="uppercase text-sm">{selectedFormat}</span>
              <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 right-0 bg-[rgba(26,26,26,1)] border border-[rgba(255,255,255,0.1)] rounded-xl overflow-hidden shadow-xl z-50 min-w-[120px]">
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
                        ? "bg-[rgba(147,51,234,1)] text-white"
                        : "text-[rgba(209,213,219,1)] hover:bg-[rgba(255,255,255,0.05)]"
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
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[rgba(147,51,234,1)] to-[rgba(8,145,178,1)] hover:from-[rgba(168,85,247,1)] hover:to-[rgba(6,182,212,1)] text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[rgba(168,85,247,0.2)]"
          >
            <Download size={18} />
            Download
          </button>
        </div>
        
        {/* Header Section */}
        <header className="mb-20 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[rgba(168,85,247,0.1)] border border-[rgba(168,85,247,0.2)] px-3 py-1 rounded-full">
              <Sparkles size={14} className="text-[rgba(192,132,252,1)]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[rgba(192,132,252,1)]">AI Optimized Path</span>
            </div>
            {roadmap.durationWeeks && (
              <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] px-3 py-1 rounded-full">
                <Clock size={14} className="text-[rgba(156,163,175,1)]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[rgba(209,213,219,1)]">
                  {roadmap.durationWeeks} Weeks Total
                </span>
              </div>
            )}
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-b from-white to-[rgba(255,255,255,0.4)] bg-clip-text text-transparent leading-tight">
            {roadmap.title}
          </h1>
        </header>

        {/* Roadmap Container */}
        <div className="relative">
          
          {/* Main Vertical Spine with Neon Glow */}
          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[rgba(147,51,234,1)] via-[rgba(6,182,212,1)] to-transparent opacity-40 shadow-[0_0_15px_rgba(147,51,234,0.3)]" />

          <div className="space-y-20">
            {roadmap.sections.map((section, i) => (
              <Section 
                key={i} 
                section={section} 
                index={i}
                expandedTopics={expandedTopics}
                loadingTopics={loadingTopics}
                onToggleTopic={toggleTopic}
                onSubtopicClick={handleSubtopicClick}
              />
            ))}
            
            {/* Final Milestone Indicator */}
            <div className="relative pl-14 pt-8 pb-4">
               <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full bg-[rgba(217,119,6,0.1)] slow-ping"></div>
                  <div className="z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[rgba(180,83,9,1)] via-[rgba(217,119,6,1)] to-[rgba(245,158,11,1)] flex items-center justify-center shadow-[0_0_25px_rgba(217,119,6,0.3)] animate-pulse">
                    <Trophy size={36} className="text-[rgba(69,26,3,1)] drop-shadow-md" />
                  </div>
               </div>
               <div className="pl-8">
                 <h3 className="text-3xl md:text-4xl font-black tracking-tight shimmer-text drop-shadow-[0_0_8px_rgba(160,130,92,0.3)]">
                    Path Completed!
                 </h3>
                 <p className="text-[rgba(156,163,175,1)] text-sm mt-2 font-medium">
                   Congratulations on finishing your learning journey
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sliding Side Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-[rgba(10,10,10,1)] border-l border-[rgba(255,255,255,0.1)] shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          selectedSubtopic ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedSubtopic && (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-[rgba(255,255,255,0.1)] flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-[rgba(107,114,128,1)] uppercase tracking-widest mb-1">
                  {selectedSubtopic.sectionLabel}
                </p>
                <p className="text-sm text-[rgba(34,211,238,1)] mb-2">{selectedSubtopic.topic}</p>
                <h2 className="text-2xl font-bold text-white">{selectedSubtopic.title}</h2>
              </div>
              <button
                onClick={() => setSelectedSubtopic(null)}
                className="p-2 hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-colors"
              >
                <X size={24} className="text-[rgba(156,163,175,1)] hover:text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {isLoadingSubtopic ? (
                /* Loading State */
                <div className="space-y-6 animate-pulse">
                  {/* Description Skeleton */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Loader2 size={18} className="text-[rgba(192,132,252,1)] animate-spin" />
                      <div className="h-4 w-24 bg-[rgba(255,255,255,0.1)] rounded"></div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0.05)] rounded-xl p-4 border border-[rgba(255,255,255,0.05)] space-y-2">
                      <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded w-full"></div>
                      <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded w-[95%]"></div>
                      <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded w-[90%]"></div>
                      <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded w-[85%]"></div>
                    </div>
                  </div>

                  {/* Resources Skeleton */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Loader2 size={18} className="text-[rgba(34,211,238,1)] animate-spin" />
                      <div className="h-4 w-32 bg-[rgba(255,255,255,0.1)] rounded"></div>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl space-y-2">
                          <div className="h-4 bg-[rgba(255,255,255,0.1)] rounded w-3/4"></div>
                          <div className="h-3 bg-[rgba(255,255,255,0.1)] rounded w-full"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Actual Content */
                <>
                  {/* Description Section */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[rgba(192,132,252,1)]">
                      <BookOpen size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Overview</h3>
                    </div>
                    <p className="text-[rgba(209,213,219,1)] leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
                      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>

                  {/* Resources Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-[rgba(34,211,238,1)]">
                      <Sparkles size={18} />
                      <h3 className="text-sm font-bold uppercase tracking-wider">Free Resources</h3>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Resource 1 */}
                      <a
                        href="#"
                        className="block p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(6,182,212,0.3)] transition-all group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-1 group-hover:text-[rgba(34,211,238,1)] transition-colors">
                              Official Documentation
                            </h4>
                            <p className="text-xs text-[rgba(156,163,175,1)]">
                              Comprehensive guide covering all fundamentals
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-[rgba(107,114,128,1)] group-hover:text-[rgba(34,211,238,1)] transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </a>

                      {/* Resource 2 */}
                      <a
                        href="#"
                        className="block p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(6,182,212,0.3)] transition-all group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-1 group-hover:text-[rgba(34,211,238,1)] transition-colors">
                              Video Tutorial Series
                            </h4>
                            <p className="text-xs text-[rgba(156,163,175,1)]">
                              Step-by-step video explanations for beginners
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-[rgba(107,114,128,1)] group-hover:text-[rgba(34,211,238,1)] transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </a>

                      {/* Resource 3 */}
                      <a
                        href="#"
                        className="block p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(6,182,212,0.3)] transition-all group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-1 group-hover:text-[rgba(34,211,238,1)] transition-colors">
                              Interactive Practice Platform
                            </h4>
                            <p className="text-xs text-[rgba(156,163,175,1)]">
                              Hands-on exercises and coding challenges
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-[rgba(107,114,128,1)] group-hover:text-[rgba(34,211,238,1)] transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </a>

                      {/* Resource 4 */}
                      <a
                        href="#"
                        className="block p-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(6,182,212,0.3)] transition-all group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-1 group-hover:text-[rgba(34,211,238,1)] transition-colors">
                              Community Forum & Q&A
                            </h4>
                            <p className="text-xs text-[rgba(156,163,175,1)]">
                              Get help from experienced developers
                            </p>
                          </div>
                          <ExternalLink size={16} className="text-[rgba(107,114,128,1)] group-hover:text-[rgba(34,211,238,1)] transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {selectedSubtopic && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSelectedSubtopic(null)}
        />
      )}
    </div>
  );
}

/* ---------------- SECTION ---------------- */

function Section({ 
  section, 
  index,
  expandedTopics,
  loadingTopics,
  onToggleTopic,
  onSubtopicClick
}: { 
  section: Roadmap["sections"][0]; 
  index: number;
  expandedTopics: Set<string>;
  loadingTopics: Set<string>;
  onToggleTopic: (sectionIndex: number, topicIndex: number) => void;
  onSubtopicClick: (subtopic: string, topicTitle: string, sectionLabel: string) => void;
}) {
  return (
    <div className="relative pl-14 group">
      
      {/* Section Node */}
      <div className="absolute left-0 top-0 flex items-center justify-center">
        <div className="z-10 w-10 h-10 rounded-2xl bg-[rgba(10,10,10,1)] border-2 border-[rgba(255,255,255,0.2)] flex items-center justify-center group-hover:border-[rgba(168,85,247,1)] transition-all duration-500 group-hover:rotate-12">
           <span className="text-sm font-black text-[rgba(255,255,255,0.4)] group-hover:text-[rgba(192,132,252,1)]">
             {(index + 1).toString().padStart(2, '0')}
           </span>
        </div>
      </div>

      {/* Section Label Box */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.05)] pb-6">
        <div>
          {section.weekRange && (
            <div className="flex items-center gap-2 text-[rgba(6,182,212,1)] mb-2">
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
          <Topic 
            key={i} 
            topic={topic} 
            sectionIndex={index}
            topicIndex={i}
            isExpanded={expandedTopics.has(`${index}-${i}`)}
            isLoading={loadingTopics.has(`${index}-${i}`)}
            onToggle={() => onToggleTopic(index, i)}
            onSubtopicClick={(subtopic) => onSubtopicClick(subtopic, topic.title, section.label)}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- TOPIC ---------------- */

function Topic({ 
  topic,
  sectionIndex,
  topicIndex,
  isExpanded,
  isLoading,
  onToggle,
  onSubtopicClick
}: { 
  topic: Roadmap["sections"][0]["topics"][0];
  sectionIndex: number;
  topicIndex: number;
  isExpanded: boolean;
  isLoading: boolean;
  onToggle: () => void;
  onSubtopicClick: (subtopic: string) => void;
}) {
  return (
    <div className="relative group/topic">
      {/* Connection Line */}
      <div className="absolute -left-14 top-1/2 w-8 h-[2px] bg-[rgba(255,255,255,0.05)] group-hover/topic:bg-[rgba(168,85,247,0.4)] transition-colors" />

      <div 
        className={`border rounded-2xl bg-[rgba(15,15,18,1)] transition-all duration-500 ease-in-out cursor-pointer ${
          isExpanded 
            ? "border-[rgba(168,85,247,0.5)] shadow-[0_0_30px_rgba(168,85,247,0.2)]" 
            : "border-[rgba(255,255,255,0.05)] hover:bg-[rgba(20,20,26,1)] hover:border-[rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        }`}
      >
        
        <div 
          onClick={onToggle}
          className="p-6 flex items-start justify-between"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className={`p-2.5 rounded-xl transition-all duration-300 ${
              isExpanded 
                ? "bg-[rgba(168,85,247,0.2)] text-[rgba(192,132,252,1)]" 
                : "bg-[rgba(255,255,255,0.05)] text-[rgba(107,114,128,1)] group-hover/topic:text-[rgba(34,211,238,1)] group-hover/topic:bg-[rgba(34,211,238,0.1)]"
            }`}>
              <CheckCircle2 size={20} />
            </div>
            <h3 className={`text-lg font-bold transition-colors ${
              isExpanded ? "text-white" : "text-[rgba(255,255,255,0.7)] group-hover/topic:text-white"
            }`}>
              {topic.title}
            </h3>
          </div>
          <div className={`transition-all duration-300 ${
            isExpanded ? "rotate-90 opacity-100" : "opacity-0 group-hover/topic:opacity-100"
          }`}>
             <ChevronRight size={20} className={isExpanded ? "text-[rgba(192,132,252,1)]" : "text-[rgba(168,85,247,1)]"} />
          </div>
        </div>

        {/* Expanded Content */}
        <div 
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-6 space-y-4 border-t border-[rgba(255,255,255,0.05)] pt-4">
            {isLoading ? (
              /* Loading State for Topic Content */
              <div className="space-y-4 animate-pulse">
                {/* Description Skeleton */}
                <div className="bg-[rgba(255,255,255,0.05)] rounded-xl p-4 border border-[rgba(255,255,255,0.05)] space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Loader2 size={16} className="text-[rgba(192,132,252,1)] animate-spin" />
                    <div className="h-3 w-32 bg-[rgba(255,255,255,0.1)] rounded"></div>
                  </div>
                  <div className="h-2.5 bg-[rgba(255,255,255,0.1)] rounded w-full"></div>
                  <div className="h-2.5 bg-[rgba(255,255,255,0.1)] rounded w-[95%]"></div>
                  <div className="h-2.5 bg-[rgba(255,255,255,0.1)] rounded w-[90%]"></div>
                </div>

                {/* Subtopics Skeleton */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Loader2 size={14} className="text-[rgba(34,211,238,1)] animate-spin" />
                    <div className="h-3 w-24 bg-[rgba(255,255,255,0.1)] rounded"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-12 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Actual Content */
              <>
                {/* Brief Description */}
                <div className="bg-[rgba(255,255,255,0.05)] rounded-xl p-4 border border-[rgba(255,255,255,0.05)]">
                  <p className="text-sm text-[rgba(209,213,219,1)] leading-relaxed">
                    This topic covers essential concepts and practical applications. You'll learn the fundamentals, 
                    best practices, and advanced techniques to master this area. Understanding these concepts is 
                    crucial for your development journey and will provide a solid foundation for future learning.
                  </p>
                </div>

                {/* Subtopics Grid */}
                <div>
                  <p className="text-xs text-[rgba(107,114,128,1)] uppercase tracking-wider font-bold mb-3">
                    Key Subtopics
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {topic.subtopics.map((sub, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSubtopicClick(sub);
                        }}
                        className="px-4 py-3 text-sm font-medium rounded-lg text-left
                                   bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] 
                                   text-[rgba(156,163,175,1)] hover:text-[rgba(34,211,238,1)] hover:bg-[rgba(34,211,238,0.05)] hover:border-[rgba(34,211,238,0.3)] 
                                   transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[rgba(6,182,212,0.1)]
                                   flex items-center justify-between group"
                      >
                        <span>{sub}</span>
                        <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[rgba(34,211,238,1)]" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}