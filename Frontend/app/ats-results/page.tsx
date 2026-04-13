'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ListChecks,
  Sparkles,
  Target,
} from 'lucide-react';

type ATSAnalysisResult = {
  atsScore: number;
  missingKeywords: unknown;
  suggestions: unknown;
};

const getScoreTheme = (score: number) => {
  if (score >= 75) {
    return {
      accent: '#12ca49',
      accentSoft: 'rgba(34, 255, 136, 0.24)',
      accentGlow: 'rgba(34, 255, 137, 0.24)',
      label: 'Strong Match',
      gradient: 'linear-gradient(135deg, #40d35b 0%, #13b75d 55%, #06d466 100%)',
      description:
        'Your resume aligns well with the role and is likely to pass ATS screening effectively. A few targeted refinements can push this even higher.',
    };
  }

  if (score >= 60) {
    return {
      accent: '#cae11f',
      accentSoft: 'rgba(202, 225, 31, 0.20)',
      accentGlow: 'rgba(202, 225, 31, 0.34)',
      label: 'Moderate Match',
      gradient: 'linear-gradient(135deg, #d9f99d 0%, #facc15 100%)',
      description:
        'Your profile shows potential but still misses important role-specific signals. Improve keyword alignment and specificity to increase compatibility.',
    };
  }

  if (score >= 40) {
    return {
      accent: '#f97316',
      accentSoft: 'rgba(249, 115, 22, 0.20)',
      accentGlow: 'rgba(249, 115, 22, 0.36)',
      label: 'Weak Match',
      gradient: 'linear-gradient(135deg, #f49f01 0%, #f15602 100%)',
      description:
        'Your current resume has limited overlap with job requirements. Focus on core skills, role language, and measurable achievements to improve results.',
    };
  }

  return {
    accent: '#ef4444',
    accentSoft: 'rgba(239, 68, 68, 0.22)',
    accentGlow: 'rgba(239, 68, 68, 0.52)',
    label: 'Poor Match',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    description:
      'The resume currently has low compatibility with the target role. Substantial improvements are needed in structure, skills alignment, and role-specific wording.',
  };
};

const safeParseAnalysis = (rawValue: string | null): ATSAnalysisResult | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<ATSAnalysisResult>;
    const score = typeof parsed.atsScore === 'number' ? parsed.atsScore : NaN;
    if (!Number.isFinite(score)) {
      return null;
    }

    return {
      atsScore: score,
      missingKeywords: parsed.missingKeywords ?? [],
      suggestions: parsed.suggestions ?? [],
    };
  } catch {
    return null;
  }
};

const normalizeArray = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .flatMap((item) => {
      if (typeof item === 'string') {
        return [item.trim()];
      }

      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;
        if (typeof record.title === 'string') {
          return [record.title.trim()];
        }

        if (typeof record.keyword === 'string') {
          return [record.keyword.trim()];
        }

        if (Array.isArray(record.items)) {
          return record.items.flatMap((entry) => (typeof entry === 'string' ? [entry.trim()] : []));
        }
      }

      return [] as string[];
    })
    .filter(Boolean);
};

const ATSResultsPage = () => {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<ATSAnalysisResult | null>(null);

  useEffect(() => {
    const storedAnalysis = safeParseAnalysis(window.sessionStorage.getItem('ats-analysis-result'));
    if (storedAnalysis) {
      setAnalysis(storedAnalysis);
    }
  }, []);

  const score = analysis?.atsScore ?? 0;
  const theme = useMemo(() => getScoreTheme(score), [score]);
  const scoreText = useMemo(() => `${Math.max(0, Math.min(100, score))}%`, [score]);
  const arcStyle = useMemo(
    () => ({
      background: `conic-gradient(${theme.accent} 0 ${scoreText}, rgba(255, 255, 255, 0.08) ${scoreText} 100%)`,
      boxShadow: `0 0 60px ${theme.accentGlow}`,
    }),
    [scoreText, theme.accent, theme.accentGlow]
  );

  const missingKeywords = normalizeArray(analysis?.missingKeywords);
  const suggestions = normalizeArray(analysis?.suggestions);

  return (
    <div className="min-h-screen bg-[#07070a] text-white relative overflow-hidden px-5 pt-16 pb-8 md:px-8 md:pt-20 md:pb-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 left-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute top-1/3 right-0 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <button
            type="button"
            onClick={() => router.push('/ats-score-check')}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-gray-200 backdrop-blur-md transition hover:border-cyan-400/30 hover:bg-cyan-400/10"
          >
            <ArrowLeft size={16} /> Back to scan
          </button>

          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-gray-300 backdrop-blur-md">
            <Sparkles size={13} className="text-cyan-300" /> ATS report generated
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.4fr] items-start">
          <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.05] p-6 md:p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(14,165,233,0.08)] lg:sticky lg:top-6">
            <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(circle at top left, rgba(34,211,238,0.12), transparent 42%), radial-gradient(circle at bottom right, rgba(168,85,247,0.12), transparent 38%)' }} />

            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                <Target size={14} className="text-cyan-300" /> ATS Score
              </div>

              <div className="flex flex-col items-center gap-6 text-center">
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-72 w-72 rounded-full blur-3xl" style={{ background: theme.accentSoft }} />
                  <div className="relative h-60 w-60 md:h-72 md:w-72 rounded-full p-[10px]" style={arcStyle}>
                    <div className="flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-[#0b0b10] backdrop-blur-md">
                      <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Overall Match</p>
                        <div className="text-6xl md:text-7xl font-black tracking-tighter" style={{ color: theme.accent }}>
                          {scoreText}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none" style={{ backgroundImage: theme.gradient, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                    ATS Score
                  </h1>
                  <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-gray-200">
                    {theme.label}
                  </p>
                  <p className="max-w-sm text-sm text-gray-400 leading-6">
                    {theme.description}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 md:p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.06)]">
            <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b10] p-4 md:p-5">
              <div className="absolute inset-0 pointer-events-none opacity-70" style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.06), transparent 38%, rgba(168,85,247,0.05))' }} />

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
                  <ListChecks size={14} className="text-cyan-300" /> Evidence & Guidance
                </div>

                <AccordionPanel
                  title="Missing Keywords"
                  subtitle="Key terms your resume should include."
                  icon={<ListChecks size={18} />}
                  defaultOpen
                >
                  <div className="flex flex-wrap gap-2">
                    {missingKeywords.length > 0 ? (
                      missingKeywords.map((item) => (
                        <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                          {item}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No missing keywords were returned.</p>
                    )}
                  </div>
                </AccordionPanel>

                <AccordionPanel
                  title="Suggestions"
                  subtitle="Targeted recommendations to improve your match score."
                  icon={<Lightbulb size={18} />}
                  defaultOpen={false}
                >
                  <div className="space-y-3">
                    {suggestions.length > 0 ? (
                      suggestions.map((item, index) => (
                        <div key={`${item}-${index}`} className="flex gap-3 rounded-xl border border-white/5 bg-[#0a0a0f] px-4 py-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_10px_rgba(217,70,239,0.7)]" />
                          <p className="text-sm leading-6 text-gray-300">{item}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No suggestions were returned.</p>
                    )}
                  </div>
                </AccordionPanel>

              </div>
            </div>
          </section>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push('/resume')}
        aria-label="Update resume"
        className="floating-update-btn fixed bottom-5 right-4 z-30 inline-flex items-center gap-2 rounded-2xl border border-violet-200/20 bg-[linear-gradient(145deg,rgba(48,41,74,0.96),rgba(86,43,86,0.92)_38%,rgba(97,44,120,0.92)_68%,rgba(64,53,113,0.96))] px-4 py-3 text-[13px] font-black uppercase tracking-[0.14em] text-violet-100 shadow-[0_12px_24px_rgba(88,55,130,0.42),inset_0_1px_1px_rgba(255,255,255,0.12)] transition hover:shadow-[0_16px_30px_rgba(121,76,172,0.48),inset_0_1px_1px_rgba(255,255,255,0.18)] active:translate-y-[1px] md:bottom-7 md:right-7 md:px-5 md:py-3.5"
      >
        Update Resume
        <span className="rounded-full bg-white/12 p-1.5 text-violet-100 border border-white/10">
          <ArrowRight size={14} />
        </span>
      </button>

      <style jsx global>{`
        @keyframes slow-drift {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -10px, 0) scale(1.03);
          }
        }

        .drift {
          animation: slow-drift 10s ease-in-out infinite;
        }

        @keyframes cta-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .floating-update-btn {
          animation: cta-float 3.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

function AccordionPanel({
  title,
  subtitle,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex w-full items-center justify-between gap-4 px-4 md:px-5 py-4 text-left transition hover:bg-white/[0.03]"
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-xl border border-white/10 bg-white/[0.04] p-2 text-cyan-300">{icon}</div>
          <div>
            <p className="text-base font-bold text-white">{title}</p>
            <p className="mt-1 text-sm text-gray-500 leading-6">{subtitle}</p>
          </div>
        </div>

        {isOpen ? <ChevronUp size={18} className="text-cyan-300" /> : <ChevronDown size={18} className="text-gray-500" />}
      </button>

      {isOpen && <div className="px-4 md:px-5 pb-5">{children}</div>}
    </div>
  );
}

export default ATSResultsPage;