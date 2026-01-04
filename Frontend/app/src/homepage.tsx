'use client';

import React from 'react';
import { CheckCircle2, Circle, Sparkles, TrendingUp, User, Map, CheckSquare, FileText, Code, Database, Monitor, FolderKanban, Layers, Rocket, Clock } from 'lucide-react';

const CareerLanding = () => {
  const progressData = [
    { label: "Frontend Basics", progress: 100, status: "completed" },
    { label: "Backend Development", progress: 85, status: "in-progress" },
    { label: "Database & APIs", progress: 45, status: "in-progress" },
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
            animationDelay: '2s',
          }}
        />
        <div 
          className="absolute bottom-1/4 left-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl"
          style={{
            animation: 'pulse-gradient-3 12s ease-in-out infinite',
            transform: 'translate(-50%, 50%)',
            animationDelay: '4s',
          }}
        />
        <div 
          className="absolute top-1/2 right-1/3 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl"
          style={{
            animation: 'pulse-gradient-4 9s ease-in-out infinite',
            transform: 'translate(30%, -50%)',
            animationDelay: '1s',
          }}
        />
      </div>
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content Section */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a1a20] border border-gray-800 text-xs font-medium text-gray-400">
            <Sparkles size={14} className="text-cyan-400" />
            AI-Powered Career Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl leading-tight tracking-tight">
            Your Skills. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">Your</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">Path.</span> Your Career Now <span className="text-gray-200">Automated.</span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            AI that converts your goals into a personalized roadmap of skills, tasks, and projects.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <button className="relative group p-[2px] rounded-xl bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <div className="relative bg-[#0a0a0c]/90 backdrop-blur-md text-white px-8 py-4 rounded-[10px] text-sm tracking-widest uppercase transition-all group-hover:bg-[#0a0a0c]/70 group-hover:backdrop-blur-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">Generate My Roadmap</span>
              </div>
            </button>
            <button className="relative group px-8 py-4 rounded-xl border border-white/20 bg-[#14141a]/80 backdrop-blur-md hover:bg-[#1c1c24]/80 hover:backdrop-blur-lg hover:border-white/30 text-sm tracking-widest uppercase transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Explore How It Works</span>
            </button>
          </div>
        </div>

        {/* Right Dashboard Card Section */}
        <div className="relative group">
          {/* Ambient Lighting Background */}
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#8CE5E9]/10 via-[#C79BFF]/10 to-[#E1A7C4]/10 blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 -z-10 scale-100" />
          
          {/* Glass Card */}
          <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl hover:shadow-[0_0_40px_rgba(140,229,233,0.2)] transition-all duration-500">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-2xl mb-1">Full-Stack Developer Path</h3>
                <p className="text-gray-500 text-sm">Current: Building REST APIs</p>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium">
                <TrendingUp size={16} />
                12 day streak
              </div>
            </div>

            {/* Overall Progress */}
            <div className="mb-10">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-400 font-medium">Overall Progress</span>
                <span className="text-indigo-300 text-lg">67%</span>
              </div>
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-[67%] bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" />
              </div>
            </div>

            {/* Roadmap Steps */}
            <div className="space-y-4">
              {progressData.map((step, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                    step.status === 'completed' 
                      ? 'bg-cyan-950/10 border-cyan-500/20' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 w-full">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="text-cyan-400 shrink-0" size={20} />
                    ) : (
                      <Circle className="text-gray-600 shrink-0" size={20} />
                    )}
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm font-medium ${step.status === 'locked' ? 'text-gray-500' : 'text-gray-200'}`}>
                          {step.label}
                        </span>
                        <span className="text-xs text-gray-500">{step.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-800/50 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r from-cyan-400 to-pink-400 transition-all duration-1000`}
                          style={{ width: `${step.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Features Section */}
      <FeaturesSection />

      {/* Roadmap Section */}
      <RoadmapPreview />
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
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
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
                <h3 className="text-xl font-bold mb-4 leading-snug">
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

  return (
    <section className="relative min-h-screen bg-[#0a0a0c] py-24 px-6 overflow-hidden font-sans">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Your Personalized <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Roadmap</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-8">
            AI-generated learning path tailored to your goals and experience level
          </p>

          {/* Duration Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-gray-400 text-sm">Total Duration:</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 font-bold">
              35-46 weeks
            </span>
          </div>
        </div>

        {/* Roadmap Visualization */}
        <div className="relative flex items-center justify-center min-h-[800px] mb-20">
          
          {/* Central Core Hub */}
          <div className="absolute z-20 w-56 h-56 rounded-full bg-[#111116] border border-white/10 flex flex-col items-center justify-center text-center p-6 shadow-[0_0_60px_rgba(168,85,247,0.15)] ring-1 ring-white/5">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-lg mb-1">
              AI-Powered
            </h3>
            <p className="text-white font-bold text-xl leading-tight">Learning Path</p>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest font-semibold">35-46 weeks</p>
          </div>

          {/* SVG Connection Paths (Desktop Only) */}
          <div className="absolute inset-0 hidden lg:block pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 800">
              <circle cx="400" cy="400" r="280" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="10 10" />
            </svg>
          </div>

          {/* Cards Container - Grid on Mobile, Circular on Desktop */}
          <div className="relative w-full min-h-[800px]">
            {/* Mobile/Tablet Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={index} className="group transition-all duration-500">
                    <div className={`relative w-full p-6 rounded-[28px] bg-[#111116]/80 backdrop-blur-xl border ${phase.border} hover:bg-[#16161d] transition-all duration-300 hover:-translate-y-2`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 ${
                          phase.text === 'text-cyan-400' ? 'group-hover:text-cyan-400' :
                          phase.text === 'text-purple-400' ? 'group-hover:text-purple-400' :
                          'group-hover:text-pink-400'
                        }`}>
                          {phase.number}
                        </div>
                        <Icon className={`w-6 h-6 ${phase.text} opacity-80 group-hover:opacity-100`} />
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">
                        {phase.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {phase.description}
                      </p>
                      <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-[11px] uppercase tracking-widest font-bold text-gray-400">
                        <Clock className={`w-3.5 h-3.5 ${phase.text}`} />
                        {phase.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Circular Layout */}
            <div className="hidden lg:block absolute inset-0">
              {phases.map((phase, index) => {
                // Mathematical positioning for the circle layout on large screens
                const angle = (index * 60 - 90) * (Math.PI / 180);
                const radius = 320; 
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                const Icon = phase.icon;

                return (
                  <div
                    key={index}
                    className="group transition-all duration-500 absolute"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <div className={`relative w-full lg:w-64 p-6 rounded-[28px] bg-[#111116]/80 backdrop-blur-xl border ${phase.border} hover:bg-[#16161d] transition-all duration-300 hover:-translate-y-2`}>
                      
                      {/* Header: Number and Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 ${
                          phase.text === 'text-cyan-400' ? 'group-hover:text-cyan-400' :
                          phase.text === 'text-purple-400' ? 'group-hover:text-purple-400' :
                          'group-hover:text-pink-400'
                        }`}>
                          {phase.number}
                        </div>
                        <Icon className={`w-6 h-6 ${phase.text} opacity-80 group-hover:opacity-100`} />
                      </div>

                      {/* Content */}
                      <h4 className="text-white font-bold text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400">
                        {phase.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {phase.description}
                      </p>

                      {/* Footer duration */}
                      <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-[11px] uppercase tracking-widest font-bold text-gray-400">
                        <Clock className={`w-3.5 h-3.5 ${phase.text}`} />
                        {phase.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center space-y-8 pb-12">
          <p className="text-gray-500 text-sm italic">
            This is a <span className="text-orange-300/60">sample roadmap</span>. Your personalized path will be custom-tailored to your experience and goals.
          </p>
          
          <button className="relative group p-[2px] rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
            <div className="bg-[#0a0a0c] text-white px-10 py-4 rounded-[14px] font-bold text-xs tracking-widest uppercase transition-all group-hover:bg-transparent">
              Generate My Custom Roadmap
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CareerLanding;

