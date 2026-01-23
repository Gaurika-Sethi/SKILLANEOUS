"use client";

import Link from "next/link";
import { 
  Linkedin, 
  Github,
  ArrowRight, 
  Target, 
  Code, 
  FileText
} from "lucide-react";
import { FaMedium } from "react-icons/fa";

export default function AboutPage() {
  const cardClass = "bg-[#111116] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-300 shadow-2xl shadow-purple-500/5";
  
  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 font-sans selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto space-y-32">
        
    
        {/* --- About SKILLANEOUS --- */}
        <section className="pt-20 space-y-12">
          <h2 className="text-4xl underline underline-offset-6 font-black text-cyan-400 tracking-tight items-center text-center">About SKILLANEOUS</h2>
          <div className="">
            <div className="">
              <p className="text-gray-300 text-2xl leading-relaxed tracking-tight text-center items-center">
                Skillaneous is built to help individuals navigate their careers with clarity, structure, and confidence. In a rapidly evolving job market, knowing what to learn and how to progress matters more than ever. Skillaneous bridges that gap by transforming personal goals, existing skills, and experience into clear, actionable roadmaps.
                We combine intelligent systems with thoughtful design to deliver personalized learning paths, career roadmaps, and resume solutions tailored to each user’s needs. Whether you’re starting out, transitioning roles, or aiming to advance in your field, Skillaneous adapts to where you are and where you want to go. Our focus is simple: reduce confusion, eliminate guesswork, and provide direction that actually works. Skillaneous is not just a tool — it’s a structured approach to career growth, designed for long-term impact.
              </p>
            </div>
          </div>
        </section>

        {/* --- MISSION --- */}
        <section className="space-y-12">
          <h2 className="text-4xl underline underline-offset-6 font-black text-indigo-400 tracking-tight items-center text-center">Mission Statement</h2>
          <div className="">
            <div className="">
              <p className="text-gray-300 text-2xl leading-relaxed tracking-tight text-center items-center">
                Our mission is to simplify career growth by transforming ambition into clear, structured, and actionable pathways.
                Skillaneous empowers individuals to make informed decisions about their learning and career progression by providing personalized guidance that adapts to their skills, experience, and goals.
              </p>
            </div>
          </div>
        </section>

         {/* --- VISION --- */}
        <section className="space-y-12">
          <h2 className="text-4xl underline underline-offset-6 font-black text-violet-400 tracking-tight items-center text-center">Vision Statement</h2>
          <div className="">
            <div className="">
              <p className="text-gray-300 text-2xl leading-relaxed tracking-tight text-center items-center">
                Our vision is to become the most trusted platform for career direction and skill development worldwide.
                We envision a future where every individual has access to clear guidance, meaningful learning paths, and the confidence to navigate an evolving professional landscape without uncertainty or guesswork.
              </p>
            </div>
          </div>
        </section>

        {/* --- THE APPROACH --- */}
        <section className="space-y-12">
          <h2 className="text-4xl underline underline-offset-6 decoration-purple-400 font-black text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            The Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={cardClass}>
              <Target className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-lg font-bold mb-3 text-cyan-400">Personalized Roadmaps</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Career paths designed around your goals, experience, and timeline. Not generic templates — real guidance.
              </p>
            </div>
            <div className={cardClass}>
              <Code className="text-purple-400 mb-4" size={32} />
              <h3 className="text-lg font-bold mb-3 text-purple-400">Real Skills & Projects</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Focus on what matters. Build portfolio projects that demonstrate capability, not just completion.
              </p>
            </div>
            <div className={cardClass}>
              <FileText className="text-pink-400 mb-4" size={32} />
              <h3 className="text-lg font-bold mb-3 text-pink-400">Strategic Resumes</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Position your experience with intention. Resume building as strategy, not just formatting.
              </p>
            </div>
          </div>
        </section>

        {/* --- MEET THE TEAM --- */}
        <section className="space-y-16">
          <div className="text-center space-y-2">
            <h2 className="text-7xl font-black text-transparent bg-gradient-to-br from-cyan-500 via-purple-400 to-pink-600 bg-clip-text">Meet the Team</h2>
            <p className="text-gray-500 text-xl">The people building SKILLANEOUS</p>
          </div>

          <div className="space-y-24">
            {/* Developer 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 group">
              <div className="w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="./gaurika_pic.jpg" 
                  alt="Gaurika Sethi"
                  className="w-full h-full object-cover opacity-100"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-cyan-400 to-pink-300 bg-clip-text text-transparent">Gaurika Sethi</h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Co-Founder & Backend Developer</p>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">
                  B.Tech student at GGSIPU's University School of Automation and Robotics, pursuing Automation & Robotics Engineering (2024-2028). Skilled in React.js, Node.js, Python, Machine Learning, Tailwind CSS, and UI/UX design, with a focus on building scalable web apps and innovative tech solutions. Passionate about AI-driven tools, frontend engineering, open-source contributions, and robotics advancements—eager to create impactful projects. Tech blogger based in Delhi.
                </p>
                <div className="flex gap-3">
                  <TeamSocialButton icon={<Linkedin size={18} />} label="LinkedIn" href="https://www.linkedin.com/in/gaurika-sethi-53043b321/" />
                  <TeamSocialButton icon={<Github size={18} />} label="GitHub" href="https://github.com/Gaurika-Sethi" />
                  <TeamSocialButton icon={<FaMedium size={18} />} label="Medium" href="https://medium.com/@pixelsnsyntax" />
                </div>
              </div>
            </div>

            {/* Developer 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
              <div className="w-full md:w-1/2 aspect-square rounded-3xl overflow-hidden">
                <img 
                  src="./rishi_pic.png" 
                  alt="Rishi Raj Goel"
                  className="w-full h-full object-cover opacity-100"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <h3 className="text-3xl font-black bg-gradient-to-r from-purple-500 via-pink-400 to-cyan-300 bg-clip-text text-transparent">Rishi Raj Goel</h3>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Co-Founder & Frontend Developer</p>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Student at Guru Gobind Singh Indraprastha University pursuing Automation Robotics (2024-2028). Tech enthusiast with strong skills in programming, AR systems development, and innovative problem-solving approaches. Passionate about robotics, automation technologies, and leveraging cutting-edge tools to create impactful solutions. Based in Delhi, actively exploring advancements in automation, AI integration, and real-world robotic applications to drive the next generation of intelligent systems
                </p>
                <div className="flex gap-3">
                  <TeamSocialButton icon={<Linkedin size={18} />} label="LinkedIn" href="https://www.linkedin.com/in/rishi-raj-goel-a77350326/" />
                  <TeamSocialButton icon={<Github size={18} />} label="GitHub" href="https://github.com/Rishi11pixel" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function TeamSocialButton({ icon, label, href }: { icon: React.ReactNode, label: string, href?: string }) {
  const className = "flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-sm font-bold text-gray-300";
  
  if (href) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {icon} {label}
      </Link>
    );
  }
  
  return (
    <button className={className}>
      {icon} {label}
    </button>
  );
}