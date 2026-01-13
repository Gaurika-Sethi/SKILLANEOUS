"use client";

import { 
  CheckCircle2, 
  Zap, 
  Layout, 
  Target,
  Sparkles,
  MousePointer2,
  Share2,
  LayoutList,
  MessageCircle,
  ShoppingBag,
  User,
  Cpu,
  Palette
} from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 py-20 font-sans selection:bg-purple-500/30">
      {/* --- UPDATED CUSTOM CSS FOR SMOOTH DIMMING/BRIGHTENING --- */}
      <style jsx global>{`
        @keyframes soft-neon-pulse {
          0%, 100% {
            /* Dim state */
            border-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 20px rgba(236, 72, 153, 0); /* Glow off */
            filter: brightness(0.85); /* Overall dimness */
          }
          50% {
            /* Bright state */
            border-color: rgba(245, 35, 199, 0.6); /* Pink border tint */
            box-shadow: 0 0 60px rgba(236, 72, 153, 0.25); /* Soft pink glow */
            filter: brightness(1.15); /* Overall brightness peaks */
          }
        }
        /* Increased duration to 6s for extreme smoothness */
        .animate-neon-pulse {
          animation: soft-neon-pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          will-change: filter, box-shadow, border-color;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* --- PAGE HEADER --- */}
        <header className="text-center mb-32 space-y-4">
          <h1 className="text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
            Features
          </h1>
          <p className="text-gray-500 text-xl font-medium">Tools designed to turn direction into real progress.</p>
        </header>

        <div className="space-y-40">
          
          {/* --- FEATURE 01: ROADMAPS --- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FeatureBadge number="01" color="text-cyan-400" bgColor="bg-cyan-400/10" />
              <h2 className="text-5xl font-black leading-tight">
                Personalized Career <br /> Roadmaps
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                AI-generated roadmaps that break career goals into structured phases, each focused on skills, outcomes, and progression.
              </p>
              
              <div className="space-y-4">
                <RoadmapPhase 
                  number="1" 
                  title="Foundation" 
                  duration="2-3 months" 
                  desc="Core programming concepts, version control, basic projects"
                  hoverClass="hover:bg-gradient-to-r hover:from-indigo-600/10 hover:to-cyan-400/10 hover:border-cyan-500/50"
                  iconColor="text-cyan-400"
                />
                <RoadmapPhase 
                  number="2" 
                  title="Skill Building" 
                  duration="3-4 months" 
                  desc="Framework mastery, API integration, database design"
                  hoverClass="hover:bg-gradient-to-r hover:from-violet-600/10 hover:to-violet-400/10 hover:border-purple-500/50"
                  iconColor="text-purple-400"
                />
                <RoadmapPhase 
                  number="3" 
                  title="Portfolio Development" 
                  duration="2-3 months" 
                  desc="Real-world projects, deployment, documentation"
                  hoverClass="hover:bg-gradient-to-r hover:from-fuchsia-600/10 hover:to-pink-400/10 hover:border-pink-500/50"
                  iconColor="text-pink-400"
                />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-[2.5rem] blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
              <div className="relative rounded-[2.5rem] border border-white/10 overflow-hidden aspect-[4/5] bg-[#0a0a0a]">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  alt="Tech Abstract"
                />
              </div>
            </div>
          </section>

          {/* --- FEATURE 02: RECOMMENDATIONS --- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="pt-25 relative order-2 lg:order-1 group">
              <div className="absolute -inset-0 translate-y-14 bg-purple-500/10 rounded-[2.5rem] blur-2xl group-hover:bg-purple-500/20 transition-all"></div>
              <div className="relative rounded-[2.5rem] border border-white/10 overflow-hidden aspect-video bg-[#0a0a0a]">
                <img 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-all duration-700"
                  alt="Cyber Security"
                />
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <FeatureBadge number="02" color="text-purple-400" bgColor="bg-purple-400/10" />
              <h2 className="text-5xl font-black leading-tight">
                Skill & Project <br /> Recommendations
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Context-aware task and project recommendations aligned with your current level and long-term goals.
              </p>
              
              <div className="space-y-4">
                <RecCard level="Beginner" title="Personal Portfolio Website" color="cyan" />
                <RecCard level="Intermediate" title="Task Management API" color="purple" />
                <RecCard level="Advanced" title="Real-time Chat App" color="pink" />
              </div>
            </div>
          </section>

          {/* --- FEATURE 03: AI RESUME (UPDATED WITH DIM/BRIGHT PULSE) --- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FeatureBadge number="03" color="text-pink-400" bgColor="bg-pink-400/10" />
              <h2 className="text-5xl font-black leading-tight">AI Resume Generation</h2>
              <p className="text-gray-400 text-lg">
                Generate resumes that reflect real work, real skills, and clear intent — powered by AI.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <ResumeUtility icon={<Target size={18}/>} text="Role-based optimization" />
                <ResumeUtility icon={<Layout size={18}/>} text="Multiple themes" />
                <ResumeUtility icon={<Zap size={18}/>} text="Skills prioritization" />
                <ResumeUtility icon={<CheckCircle2 size={18}/>} text="ATS-friendly" />
              </div>
            </div>
            <div className="flex justify-center items-center">
                {/* The Card with the new Dim/Bright Animation Class */}
                <div className="relative w-full max-w-md aspect-[3/4] rounded-[2.5rem] border border-white/10 bg-[#0f0f12] p-10 animate-neon-pulse ease-in-out">
                    <div className="absolute top-8 right-8 bg-pink-500/20 text-pink-400 text-[10px] px-3 py-1 rounded-full border border-pink-500/30 font-black tracking-widest shadow-lg shadow-pink-500/10">
                        AI-POWERED
                    </div>
                    
                    {/* Resume Skeleton Content - Now static, riding the parent's brightness wave */}
                    <div className="space-y-6 opacity-80">
                       <div className="h-10 w-1/3 bg-white/20 rounded-xl" />
                       <div className="space-y-3">
                          <div className="h-3 w-full bg-white/10 rounded-lg" />
                          <div className="h-3 w-5/6 bg-white/10 rounded-lg" />
                       </div>
                       
                       <div className="pt-12 space-y-6">
                          <div className="h-24 w-full bg-white/5 rounded-2xl border border-white/5" />
                          <div className="h-32 w-full bg-white/5 rounded-2xl border border-white/5" />
                          <div className="h-20 w-full bg-white/5 rounded-2xl border border-white/5" />
                       </div>
                    </div>
                </div>
            </div>
          </section>

          {/* --- FEATURE 04: PORTFOLIO --- */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="grid grid-cols-2 gap-6 order-2 lg:order-1">
                <ProjectBox title="Task Manager" icon={LayoutList} colorClass="text-cyan-400" glow="shadow-cyan-500/10" />
                <ProjectBox title="Chat App" icon={MessageCircle} colorClass="text-purple-400" glow="shadow-purple-500/10" />
                <ProjectBox title="E-commerce" icon={ShoppingBag} colorClass="text-pink-400" glow="shadow-pink-500/10" />
                <ProjectBox title="Portfolio" icon={User} colorClass="text-indigo-400" glow="shadow-indigo-500/10" />
             </div>
             <div className="space-y-8 order-1 lg:order-2">
              <FeatureBadge number="04" color="text-cyan-400" bgColor="bg-cyan-400/10" />
              <h2 className="text-5xl font-black leading-tight">Portfolio-Ready Output</h2>
              <p className="text-gray-400 text-lg">
                Finish with outputs you can confidently share — projects, resumes, and proof of skill.
              </p>
              <div className="space-y-4">
                <FeatureMiniCard icon={<MousePointer2 size={20} className="text-cyan-400"/>} title="Visual emphasis on outcomes" desc="Every project highlights what you can do, not just what you completed." />
                <FeatureMiniCard icon={<Share2 size={20} className="text-purple-400"/>} title="Ready to share" desc="Export-ready resumes, documented projects, and presentation-quality deliverables." />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

/* --- REUSABLE COMPONENTS --- */
// (The reusable components at the bottom remain unchanged from the previous version)
function FeatureBadge({ number, color, bgColor }: { number: string, color: string, bgColor: string }) {
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 ${bgColor}`}>
       <Sparkles size={12} className={color} />
       <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${color}`}>Feature {number}</span>
    </div>
  );
}

function RoadmapPhase({ number, title, duration, desc, hoverClass, iconColor }: any) {
  return (
    <div className={`flex gap-5 p-5 bg-[#111116] border border-white/5 rounded-2xl transition-all duration-500 group/item ${hoverClass}`}>
      <div className={`h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black transition-colors ${iconColor} group-hover/item:border-white/20`}>
        {number}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-lg text-white group-hover/item:translate-x-1 transition-transform">{title}</h4>
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{duration}</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed group-hover/item:text-gray-400">{desc}</p>
      </div>
    </div>
  );
}

function RecCard({ level, title,color }: any) {
  const colorStyles = {
    cyan: 'border-cyan-500/20 bg-cyan-500/[0.03] text-cyan-400 hover:border-cyan-500/50',
    purple: 'border-purple-500/20 bg-purple-500/[0.03] text-purple-400 hover:border-purple-500/50',
    pink: 'border-pink-500/20 bg-pink-500/[0.03] text-pink-400 hover:border-pink-500/50'
  }[color as 'cyan' | 'purple' | 'pink'];

  return (
    <div className={`p-4 border  rounded-3xl transition-all duration-500 group hover:scale-[1.02] ${colorStyles}`}>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{level}</span>
      <h4 className="font-bold text-xl mt-2 mb-4 text-white">{title}</h4>
      <div className="flex flex-wrap gap-2">
      </div>
    </div>
  );
}

function ResumeUtility({ icon, text }: any) {
  return (
    <div className="flex items-center gap-3 p-4 bg-[#111116] border border-white/10 rounded-2xl hover:border-pink-500/30 transition-colors">
      <div className="text-pink-400">{icon}</div>
      <span className="text-xs font-bold text-gray-300">{text}</span>
    </div>
  );
}

function ProjectBox({ title, icon: Icon, colorClass, glow }: any) {
  return (
    <div className={`aspect-square bg-[#111116] border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-5 group hover:border-white/30 transition-all cursor-default shadow-2xl ${glow}`}>
       <div className={`p-5 rounded-2xl bg-white/5 border border-white/5 ${colorClass} group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500`}>
          <Icon size={36} strokeWidth={1.5} />
       </div>
       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">{title}</span>
    </div>
  );
}

function FeatureMiniCard({ icon, title, desc }: any) {
  return (
    <div className="p-6 bg-[#111116] border border-white/10 rounded-3xl space-y-3 group hover:border-white/20 transition-all">
      <div className="flex items-center gap-4">
        <div className="group-hover:rotate-12 transition-transform">{icon}</div>
        <h4 className="font-bold text-white text-lg">{title}</h4>
      </div>
      <p className="text-sm text-gray-500 leading-relaxed pl-9">{desc}</p>
    </div>
  );
}