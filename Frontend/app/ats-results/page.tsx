'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
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
  if (score < 50) {
    return {
      accent: '#ef4444',
      accentSoft: 'rgba(239, 68, 68, 0.22)',
      accentGlow: 'rgba(239, 68, 68, 0.52)',
      label: 'Poor Compatibility',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      description:
        'Your profile currently misses several role-defining signals. Focus on adding direct keyword matches and stronger, measurable outcomes to raise compatibility quickly.',
    };
  }

  if (score < 75) {
    return {
      accent: '#f97316',
      accentSoft: 'rgba(249, 115, 22, 0.20)',
      accentGlow: 'rgba(249, 115, 22, 0.38)',
      label: 'Improvement Required',
      gradient: 'linear-gradient(135deg, #ff7411 0%, #ef4c3a 100%)',
      description:
        'You have a decent baseline, but keyword coverage and phrasing still need refinement. Tightening section content should noticeably improve ATS matching.',
    };
  }

  if (score < 85) {
    return {
      accent: '#a3e635',
      accentSoft: 'rgba(163, 230, 53, 0.20)',
      accentGlow: 'rgba(163, 230, 53, 0.34)',
      label: 'Acceptable Compatibility',
      gradient: 'linear-gradient(135deg, #a9f222 0%, #7bea1a 100%)',
      description:
        'Your resume aligns well with the target role and should clear many ATS filters. A few strategic edits can move this into an elite match range.',
    };
  }

  return {
    accent: '#16db41',
    accentSoft: 'rgba(26, 228, 66, 0.2)',
    accentGlow: 'rgba(48, 220, 14, 0.39)',
    label: 'Excellent Compatibility',
    gradient: 'linear-gradient(135deg, #1fdd42 0%, #0bce2e 40% ,#07bb28 100%)',
    description:
      'Excellent alignment with the job profile. Your resume is highly ATS-friendly and already communicates strong relevance for this role.',
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