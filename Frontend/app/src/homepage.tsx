'use client';

import React from 'react';
import { CheckCircle2, Circle, Sparkles, TrendingUp } from 'lucide-react';

const CareerLanding = () => {
  const progressData = [
    { label: "Frontend Basics", progress: 100, status: "completed" },
    { label: "Backend Development", progress: 85, status: "in-progress" },
    { label: "Database & APIs", progress: 45, status: "in-progress" },
    { label: "DevOps & Deployment", progress: 0, status: "locked" },
  ];

  return (
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
  );
};

export default CareerLanding;

