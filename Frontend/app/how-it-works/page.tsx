import {
  Upload,
  Cpu,
  Map,
  Target,
  Zap,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export default function HowItWorksPage() {
  // Data for "How It Works"
  const steps = [
    {
      number: "01",
      title: "Upload Your Profile",
      description:
        "Add your resume, CV, or connect your LinkedIn profile to begin the process.",
      icon: Upload,
      borderColor: "border-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/50",
    },
    {
      number: "02",
      title: "AI Analyzes Your Path",
      description:
        "Our AI identifies skills gaps and projects that accelerate your career growth.",
      icon: Cpu,
      borderColor: "border-purple-500/20",
      hoverBorder: "hover:border-purple-500/50",
    },
    {
      number: "03",
      title: "Get Your Roadmap",
      description:
        "Receive personalized project suggestions and a custom learning roadmap.",
      icon: Map,
      borderColor: "border-pink-500/20",
      hoverBorder: "hover:border-pink-500/50",
    },
  ];

  // Data for "Why This Works"
  const features = [
    {
      title: "Personalized, not generic",
      description:
        "Every roadmap is custom-built for your unique goals and background, not a template.",
      icon: Target,
      color: "text-cyan-400",
    },
    {
      title: "Focused on building",
      description:
        "Learn by doing with hands-on projects, moving beyond passive video courses.",
      icon: Zap,
      color: "text-purple-400",
    },
    {
      title: "Designed for real careers",
      description:
        "Build a portfolio that demonstrates the practical skills employers actually value.",
      icon: Briefcase,
      color: "text-pink-400",
    },
  ];

  return (
    <div className="bg-[#0a0a0c] font-sans">
      {/* SECTION 1: HOW IT WORKS */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h1 className="text-5xl font-bold text-white tracking-tight">
              How{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                It Works
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Three simple steps to transform your career trajectory using our
              intelligent AI analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className={`group relative p-10 rounded-[40px] bg-[#111116] border ${step.borderColor} ${step.hoverBorder} transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl overflow-hidden`}
                >
                  <div className="absolute -top-4 -right-4 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Icon size={80} />
                  </div>

                  <div className="relative mb-10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-inner">
                      <span className="text-4xl font-black text-gray-700/80 group-hover:text-white transition-colors tracking-tighter">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed mb-8">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-600 group-hover:text-white transition-colors">
                    <span>Learn More</span>
                    <ChevronRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY THIS WORKS */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why{" "}
                <span className="italic font-serif text-purple-400">
                  This
                </span>{" "}
                Works
              </h2>
              <p className="text-gray-500">
                We bridge the gap between theoretical knowledge and industry
                requirements by focusing on high-impact learning paths.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-3xl bg-[#111116]/50 border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#16161d]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                    <FeatureIcon
                      className={feature.color}
                      size={28}
                    />
                  </div>

                  <h4 className="text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  <div className="mt-8 h-1 w-0 bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:w-full transition-all duration-700 ease-in-out rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}