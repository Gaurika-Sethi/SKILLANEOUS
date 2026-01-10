'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Sparkles, TrendingUp, User, Map, CheckSquare, FileText, Code, Database, Monitor, FolderKanban, Layers, Rocket, Clock, Linkedin, Github, Cpu, Zap, Target, ArrowRight } from 'lucide-react';

const CareerLanding = () => {
  const progressData = [
    { label: "Frontend Basics", progress: 100, status: "completed" },
    { label: "Backend Development", progress: 80, status: "in-progress" },
    { label: "Database & APIs", progress: 40, status: "in-progress" },
    { label: "DevOps & Deployment", progress: 0, status: "locked" },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-[#0a0a0c] text-white p-8 md:p-16 flex items-center justify-center font-sans relative overflow-hidden">
      {/* Pulsating Radial Gradients Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl"
          style={{
            animation: 'pulse-gradient-1 8s ease-in-out infinite',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl"
          style={{
            animation: 'pulse-gradient-2 10s ease-in-out infinite',
            transform: 'translate(50%, -50%)',
            animationDelay: '0s',
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl"
          style={{
            animation: 'pulse-gradient-3 12s ease-in-out infinite',
            transform: 'translate(-50%, 50%)',
            animationDelay: '0s',
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl"
          style={{
            animation: 'pulse-gradient-4 9s ease-in-out infinite',
            transform: 'translate(30%, -50%)',
            animationDelay: '0s',
          }}
        />
      </div>
      
      <div className="max-w-6xl w-full gap-12 items-center relative z-10">
        
        {/* Left Content Section */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a20] border border-gray-800 text-xs text-gray-400">
            <Sparkles size={14} className="text-cyan-400" />
            AI-Powered Career Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl leading-tight tracking-tight">
            Your Skills. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Your </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">Path</span>. Your Career Now <span className="text-gray-200">Automated.</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-m">
            AI that converts your goals into a personalized roadmap of skills, tasks, and projects.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/roadmap-form" className="relative group p-[2px] rounded-xl bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <div className="relative bg-[#0a0a0c]/90 backdrop-blur-md text-white px-8 py-4 rounded-[10px] text-sm tracking-widest uppercase transition-all group-hover:bg-[#0a0a0c]/70 group-hover:backdrop-blur-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Generate My Roadmap</span>
              </div>
            </Link>
           <Link
           href="/how-it-works"
           className="relative group inline-flex items-center justify-center px-8 py-4 rounded-xl border border-white/20 bg-[#14141a]/80 backdrop-blur-md hover:bg-[#1c1c24]/80 hover:backdrop-blur-lg hover:border-white/30 text-sm tracking-widest uppercase transition-all overflow-hidden"
           ><div className="absolute inset-0 bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           <span className="relative z-10">Explore How It Works</span>
           </Link>

          </div>
        </div>

        
      </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Roadmap Section */}
      <RoadmapPreview />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Final CTA Section */}
      <FinalCTA />
    </>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      title: "Personalized Skill Profiles",
      description: "AI analyzes your current skills and learning style to create a custom development plan.",
      icon: <User className="text-cyan-400" size={24} />,
    },
    {
      title: "AI-Generated Career Roadmaps",
      description: "Get step-by-step paths from your current position to your dream role.",
      icon: <Map className="text-cyan-400" size={24} />,
    },
    {
      title: "Task & Project Recommendations",
      description: "Receive curated tasks and real-world projects to build practical experience.",
      icon: <CheckSquare className="text-cyan-400" size={24} />,
    },
    {
      title: "Portfolio-Ready Output",
      description: "Everything you build is documented and ready to showcase to employers.",
      icon: <FileText className="text-cyan-400" size={24} />,
    },
  ];

  return (
    <section className="bg-[#0a0a0c] text-white py-24 px-8 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl tracking-tight">
            Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#837FA4] via-[#7EA9AC] to-[#C390D4]">SKILLANEOUS</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Intelligent tools designed for modern learners and developers
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 hover:border-[#8CE5E9]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(140,229,233,0.1)]"
            >
              {/* Ambient Lighting Background */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10 scale-105 overflow-hidden" />
              
              {/* Content */}
              <div className="relative">
                {/* Icon Container with Glass Effect */}
                <div className="w-14 h-14 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center mb-8 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-110">
                  <div className="transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-xl mb-4 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RoadmapPreview = () => {
  const phases = [
    {
      number: 1,
      title: "Foundation",
      description: "Core web development fundamentals",
      duration: "6-8 weeks",
      icon: Code,
      accent: "from-cyan-400/20 to-cyan-400/5",
      border: "border-cyan-400/30",
      text: "text-cyan-400",
    },
    {
      number: 2,
      title: "Backend Mastery",
      description: "Server-side development & databases",
      duration: "8-10 weeks",
      icon: Database,
      accent: "from-purple-400/20 to-purple-400/5",
      border: "border-purple-400/30",
      text: "text-purple-400",
    },
    {
      number: 3,
      title: "Frontend Mastery",
      description: "Modern UI frameworks & state management",
      duration: "8-10 weeks",
      icon: Monitor,
      accent: "from-pink-400/20 to-pink-400/5",
      border: "border-pink-400/30",
      text: "text-pink-400",
    },
    {
      number: 4,
      title: "Minor Project",
      description: "Build your first full-stack application",
      duration: "3-4 weeks",
      icon: FolderKanban,
      accent: "from-cyan-400/20 to-cyan-400/5",
      border: "border-cyan-400/30",
      text: "text-cyan-400",
    },
    {
      number: 5,
      title: "Advanced Topics",
      description: "System design, testing & optimization",
      duration: "6-8 weeks",
      icon: Layers,
      accent: "from-purple-400/20 to-purple-400/5",
      border: "border-purple-400/30",
      text: "text-purple-400",
    },
    {
      number: 6,
      title: "Industry Ready Project",
      description: "Production-grade portfolio project",
      duration: "4-6 weeks",
      icon: Rocket,
      accent: "from-pink-400/20 to-pink-400/5",
      border: "border-pink-400/30",
      text: "text-pink-400",
    },
  ];

  const RADIUS = 250;
  const CENTER = 400; // Relative to SVG viewBox

  // Function to calculate SVG coordinates for arcs
  const getPoint = (index: number) => {
    const angle = (index * 60 - 90) * (Math.PI / 180);
    return {
      x: CENTER + RADIUS * Math.cos(angle),
      y: CENTER + RADIUS * Math.sin(angle)
    };
  };
  return (
    <section className="relative bg-[#0a0a0c] py-24 px-6 overflow-hidden min-h-screen font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl  text-white mb-4">
            Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">Roadmap</span>
          </h2>
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <Clock className="w-5 h-5 text-cyan-400" />
              <span className="text-xl  text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">35-46 weeks</span>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[800px]">
          {/* SVG Connector Arcs */}
          <svg 
            className="absolute inset-0 w-full h-full hidden lg:block pointer-events-none" 
            viewBox="0 0 800 800"
            style={{ zIndex: 0 }}
          >
            {phases.map((_, i) => {
              if (i === phases.length - 1) return null; // Don't connect 6 back to 1
              
              const start = getPoint(i);
              const end = getPoint(i + 1);
              
              // SVG Arc Path: A rx ry x-axis-rotation large-arc-flag sweep-flag x y
              const d = `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 0 1 ${end.x} ${end.y}`;
              
              return (
                <path
                  key={`arc-${i}`}
                  d={d}
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                />
              );
            })}
          </svg>

          {/* Central Hub */}
          <div className="relative z-30 w-60 h-60 rounded-full bg-[#111116] border border-white/10 flex flex-col items-center justify-center text-center p-6 shadow-[0_0_50px_rgba(168,85,247,0.1)] ring-1 ring-white/5">
            <h3 className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-1">AI-Powered</h3>
            <p className="text-lg text-white">Learning Path</p>
            <div className="text-sm text-gray-500 mt-1">35-46 weeks</div>
          </div>

          {/* Orbiting Cards (Desktop) */}
          <div className="absolute inset-0 hidden lg:block">
            {phases.map((phase, index) => {
              const point = getPoint(index);
              const IconComponent = phase.icon;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 hover:scale-105"
                  style={{
                    top: `${(point.y / 800) * 100}%`,
                    left: `${(point.x / 800) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20
                  }}
                >
                  <div className={`w-64 p-6 rounded-[28px] bg-[#111116]/95 backdrop-blur-xl border ${phase.border} shadow-2xl group`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs  text-gray-400 group-hover:text-white transition-colors">
                        {phase.number}
                      </div>
                      <IconComponent className={`w-6 h-6 ${phase.text}`} />
                    </div>
                    <h3 className="text-white  text-lg mb-2">{phase.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed mb-4">{phase.description}</p>
                    <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                      <Clock className={`w-3 h-3 ${phase.text}`} />
                      <span className="text-[10px] uppercase tracking-widest  text-gray-500">{phase.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden w-full relative z-20">
            {phases.map((phase, index) => {
              const IconComponent = phase.icon;
              return (
                <div key={index} className={`p-6 rounded-[28px] bg-[#111116] border ${phase.border}`}>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-500 ">{phase.number}</span>
                    <IconComponent className={`w-6 h-6 ${phase.text}`} />
                  </div>
                  <h3 className="text-white  text-lg">{phase.title}</h3>
                  <p className="text-gray-500 text-sm">{phase.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link href="/roadmap-form" className="relative group p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:scale-105 transition-all inline-block">
            <div className="bg-[#0a0a0c] text-white px-10 py-4 rounded-[14px]  text-xs tracking-widest uppercase transition-all duration-500 ease-in-out group-hover:bg-transparent">
              Generate My Custom Roadmap
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Your Profile",
      description: "Add your resume, CV, or connect your LinkedIn profile",
      color: "from-cyan-500/20 to-cyan-500/5",
      borderColor: "border-cyan-500/20",
      hoverBorder: "hover:border-cyan-400/50",
      glowColor: "group-hover:shadow-cyan-500/20",
      icons: [Linkedin, FileText, Github]
    },
    {
      number: "02",
      title: "AI Analyzes Your Path",
      description: "Our AI identifies skills gaps and projects that accelerate your growth",
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-400/50",
      glowColor: "group-hover:shadow-purple-500/20",
      icons: [Sparkles, Cpu, Zap]
    },
    {
      number: "03",
      title: "Get Your Roadmap",
      description: "Receive personalized project suggestions and a custom learning roadmap",
      color: "from-pink-500/20 to-pink-500/5",
      borderColor: "border-pink-500/20",
      hoverBorder: "hover:border-pink-400/50",
      glowColor: "group-hover:shadow-pink-500/20",
      icons: [Target, Map, Rocket]
    }
  ];

  return (
    <section className="bg-[#0a0a0c] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl  text-white tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-400">It Works</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Three simple steps to transform your career trajectory
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon0 = step.icons[0];
            const Icon1 = step.icons[1];
            const Icon2 = step.icons[2];
            
            return (
              <div 
                key={idx}
                className={`group relative p-10 rounded-[30px] bg-gradient-to-br ${step.color} border ${step.borderColor} ${step.hoverBorder} transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_20px_20px_rgba(180,202,237,0.2)] ${step.glowColor} flex flex-col items-center text-center overflow-hidden`}
              >
                {/* Floating Background Icons */}
                <div className="absolute top-6 left-6 opacity-40 group-hover:opacity-100 group-hover:rotate-[+7deg] group-hover:scale-110 transition-all duration-500 ease-in-out ">
                  <Icon0 size={32} className="text-gray-200 border border-gray-200/40 rounded-lg p-1" />
                </div>
                <div className="absolute top-6 right-6 opacity-40 group-hover:opacity-100 group-hover:rotate-[+7deg] group-hover:scale-110 transition-all duration-500 ease-in-out ">
                  <Icon1 size={32} className="text-gray-200 border border-gray-200/40 rounded-lg p-1" />
                </div>
                <div className="absolute bottom-6 left-6 opacity-40 group-hover:opacity-100 group-hover:rotate-[+7deg] group-hover:scale-110 transition-all duration-500 ease-in-out">
                  <Icon2 size={32} className="text-gray-200 border border-gray-200/40 rounded-lg p-1" />
                </div>
                

                {/* Central Plate with Number */}
                <div className="relative mb-8 transition-all duration-500 group-hover:scale-125 group-hover:rotate-[+7deg]">
                  {/* The "Plate" background */}
                  <div className="w-32 h-32 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-3xl flex items-center justify-center shadow-outer shadow-gray-100/30">
                    <span className="text-6xl  text-gray-400/10 group-hover:text-gray-100/15 transition-colors duration-300 tracking-tighter select-none">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="space-y-4 relative z-10">
                  <h3 className={`text-2xl  transition-colors duration-300 ${idx === 1 ? 'text-purple-300' : 'text-white'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-sm max-w-[240px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Bottom accent glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="bg-[#0a0a0c] py-24 px-6 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Main Card Container */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/5 rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          
          {/* Floating Corner Icons */}
          <div className="absolute top-8 right-8 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-400/50 group hover:text-purple-400 transition-colors">
            <Sparkles size={24} />
          </div>
          <div className="absolute bottom-8 left-8 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400/50 group hover:text-cyan-400 transition-colors">
            <Zap size={24} />
          </div>

          {/* Header Text */}
          <h2 className="text-4xl md:text-6xl  text-white mb-6 leading-tight">
            Ready to Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Your</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">Career?</span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Join other learners who are already building their future with AI-powered roadmaps. Start your journey today absolutely free.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {/* Primary CTA with Gradient Border Wrapper */}
            {/* Added 'group' to the wrapper so the child button can react to its hover state */}
            <div className="group p-[1px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 w-full sm:w-auto hover:scale-105 transition-all duration-500 ease-in-out shadow-[0_0_20px_rgba(168,85,247,0)] hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              
              <button className="bg-[#0a0a0c] group-hover:bg-transparent text-white px-10 py-4 rounded-[15px]  flex items-center justify-center gap-3 w-full transition-all duration-300 ease-in-out bg-clip-padding">
                <span className="uppercase tracking-widest text-sm">Start Free Now</span>
                <ArrowRight 
                  size={18} 
                  className="group-hover:translate-x-1 transition-transform duration-300" 
                />
              </button>
              
            </div>

            {/* Secondary CTA */}
            <Link href="/how-it-works"
             className="px-10 py-4 rounded-2xl border border-white/10 bg-white/5 text-white  uppercase tracking-widest text-sm hover:bg-white/10 transition-all w-full sm:w-auto">
              See How It Works
            </Link>
          </div>

          {/* Trust Badges / Features */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs  text-gray-500 uppercase tracking-tighter">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-xs  text-gray-500 uppercase tracking-tighter">Setup in 2 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-500" />
              <span className="text-xs  text-gray-500 uppercase tracking-tighter">Cancel Anytime</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareerLanding;

