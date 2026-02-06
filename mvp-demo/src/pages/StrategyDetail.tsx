import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  Download,
  Share2,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Trophy,
  FileText,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';
import { MOCK_STRATEGIES } from '../data/mockData';
import { PILLARS } from '../lib/constants';

export default function StrategyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const strategy =
    MOCK_STRATEGIES.find((s) => s.id === id) || MOCK_STRATEGIES[0];

  const [expandedPillars, setExpandedPillars] = useState<Set<string>>(
    new Set([strategy.pillars[0]?.id])
  );
  const [showToast, setShowToast] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedCompletion, setAnimatedCompletion] = useState(0);

  // Animate coherence score on mount
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = strategy.coherenceScore / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= strategy.coherenceScore) {
        setAnimatedScore(strategy.coherenceScore);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [strategy.coherenceScore]);

  // Animate completion bar on mount
  useEffect(() => {
    const duration = 1200;
    const steps = 50;
    const increment = strategy.completionPercent / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= strategy.completionPercent) {
        setAnimatedCompletion(strategy.completionPercent);
        clearInterval(timer);
      } else {
        setAnimatedCompletion(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [strategy.completionPercent]);

  const togglePillar = (pillarId: string) => {
    setExpandedPillars((prev) => {
      const next = new Set(prev);
      if (next.has(pillarId)) {
        next.delete(pillarId);
      } else {
        next.add(pillarId);
      }
      return next;
    });
  };

  const handleExport = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Build radar chart data
  const radarData = strategy.pillars.map((p) => ({
    pillar: p.letter,
    score: p.score,
    fullMark: 100,
  }));

  // SVG circular progress for coherence score
  const scoreRadius = 54;
  const scoreCircumference = 2 * Math.PI * scoreRadius;
  const scoreOffset =
    scoreCircumference - (animatedScore / 100) * scoreCircumference;

  const statusLabel =
    strategy.status === 'complete'
      ? 'Complete'
      : strategy.status === 'draft'
        ? 'Brouillon'
        : 'Archive';

  const statusColor =
    strategy.status === 'complete'
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      : strategy.status === 'draft'
        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
        : 'bg-slate-500/20 text-slate-400 border-slate-500/30';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/15 px-5 py-4 shadow-2xl backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500"
            >
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <span className="text-sm font-medium text-emerald-100">
              Export PDF genere avec succes !
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/app/dashboard')}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:border-amber-500/30 hover:text-amber-400"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {strategy.brandName}
                </h1>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs font-medium text-slate-300">
                  {strategy.industry}
                </span>
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${statusColor}`}
                >
                  {statusLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleExport}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400"
            >
              <Download className="h-4 w-4" />
              Exporter PDF
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400"
            >
              <Share2 className="h-4 w-4" />
              Partager
            </motion.button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Overview cards */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* Coherence Score */}
          <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-amber-500/20">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl transition-all group-hover:bg-amber-500/10" />
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
              <Trophy className="h-3.5 w-3.5 text-amber-500" />
              Coherence Score
            </div>
            <div className="flex items-center gap-4">
              <div className="relative h-[130px] w-[130px]">
                <svg
                  className="h-full w-full -rotate-90"
                  viewBox="0 0 120 120"
                >
                  {/* Background ring */}
                  <circle
                    cx="60"
                    cy="60"
                    r={scoreRadius}
                    fill="none"
                    stroke="rgba(148,163,184,0.1)"
                    strokeWidth="8"
                  />
                  {/* Progress ring */}
                  <circle
                    cx="60"
                    cy="60"
                    r={scoreRadius}
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={scoreCircumference}
                    strokeDashoffset={scoreOffset}
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient
                      id="scoreGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-3xl font-bold text-white">
                    {animatedScore}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    / 100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Completion */}
          <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-emerald-500/20">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl transition-all group-hover:bg-emerald-500/10" />
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
              <FileText className="h-3.5 w-3.5 text-emerald-500" />
              Completion
            </div>
            <div className="mt-3">
              <div className="mb-2 font-display text-3xl font-bold text-white">
                {animatedCompletion}%
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${strategy.completionPercent}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                />
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {strategy.pillars.filter((p) => p.score > 0).length} / 6
                piliers completes
              </div>
            </div>
          </div>

          {/* Superfans */}
          <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-pink-500/20">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-pink-500/5 blur-2xl transition-all group-hover:bg-pink-500/10" />
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
              <Sparkles className="h-3.5 w-3.5 text-pink-500" />
              Superfans
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className="font-display text-3xl font-bold text-white">
                {strategy.superfanCount}
              </span>
              <span className="mb-1 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <TrendingUp className="h-3.5 w-3.5" />
                +23%
              </span>
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Croissance mensuelle
            </div>
          </div>

          {/* Last Updated */}
          <div className="glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:border-violet-500/20">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-violet-500/5 blur-2xl transition-all group-hover:bg-violet-500/10" />
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
              <FileText className="h-3.5 w-3.5 text-violet-500" />
              Derniere mise a jour
            </div>
            <div className="mt-3">
              <span className="font-display text-2xl font-bold text-white">
                {new Date(strategy.updatedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <div className="mt-2 text-xs text-slate-500">
                Cree le{' '}
                {new Date(strategy.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Radar Chart */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-10"
        >
          <div className="glass overflow-hidden rounded-2xl p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <h2 className="font-display text-lg font-semibold text-white">
                Profil ADVERT
              </h2>
            </div>
            <div className="mx-auto max-w-xl">
              <ResponsiveContainer width="100%" height={380}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="75%"
                  data={radarData}
                >
                  <PolarGrid
                    stroke="rgba(148,163,184,0.15)"
                    strokeDasharray="3 3"
                  />
                  <PolarAngleAxis
                    dataKey="pillar"
                    tick={{
                      fill: '#94a3b8',
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: 'Space Grotesk, system-ui, sans-serif',
                    }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fill="#f59e0b"
                    fillOpacity={0.3}
                    dot={{
                      r: 4,
                      fill: '#f59e0b',
                      stroke: '#fbbf24',
                      strokeWidth: 2,
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            {/* Legend row */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              {strategy.pillars.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-xs text-slate-400">
                    <span
                      className="font-bold"
                      style={{ color: p.color }}
                    >
                      {p.letter}
                    </span>{' '}
                    {p.name}{' '}
                    <span className="text-slate-500">({p.score})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Collapsible Pillar Sections */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
              <FileText className="h-4 w-4 text-amber-500" />
            </div>
            <h2 className="font-display text-lg font-semibold text-white">
              Detail des Piliers
            </h2>
          </div>

          <div className="space-y-4">
            {strategy.pillars.map((pillar, index) => {
              const isExpanded = expandedPillars.has(pillar.id);

              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + index * 0.07 }}
                  className="glass overflow-hidden rounded-2xl"
                >
                  {/* Pillar header */}
                  <button
                    onClick={() => togglePillar(pillar.id)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <div className="flex items-center gap-4">
                      {/* Colored letter circle */}
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold shadow-lg"
                        style={{
                          backgroundColor: `${pillar.color}20`,
                          color: pillar.color,
                          boxShadow: `0 0 20px ${pillar.color}15`,
                        }}
                      >
                        {pillar.letter}
                      </div>

                      <div>
                        <span className="text-base font-semibold text-white">
                          {pillar.name}
                        </span>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {PILLARS.find((p) => p.id === pillar.id)
                            ?.description || ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Score badge */}
                      <div
                        className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold"
                        style={{
                          borderColor: `${pillar.color}40`,
                          backgroundColor: `${pillar.color}15`,
                          color: pillar.color,
                        }}
                      >
                        {pillar.score}
                        <span className="text-[10px] font-normal opacity-60">
                          /100
                        </span>
                      </div>

                      {/* Chevron */}
                      <div className="text-slate-500">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expandable content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: {
                            duration: 0.4,
                            ease: [0.04, 0.62, 0.23, 0.98],
                          },
                          opacity: { duration: 0.25, delay: 0.05 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/5 px-6 py-6">
                          {/* Pillar content paragraph */}
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-6 max-w-3xl leading-relaxed text-slate-300"
                          >
                            {pillar.content}
                          </motion.p>

                          {/* Variables list */}
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {pillar.variables.map((variable, vIdx) => (
                              <motion.div
                                key={variable.name}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.12 + vIdx * 0.06 }}
                                className="glass-light group/var rounded-xl p-4 transition-all hover:border-white/15"
                              >
                                <div className="mb-2 flex items-center justify-between">
                                  <h4 className="text-sm font-semibold text-white">
                                    {variable.name}
                                  </h4>
                                  <span
                                    className="text-xs font-bold"
                                    style={{ color: pillar.color }}
                                  >
                                    {variable.score}%
                                  </span>
                                </div>
                                <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-slate-400">
                                  {variable.value}
                                </p>
                                {/* Score bar */}
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${variable.score}%`,
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      delay: 0.2 + vIdx * 0.08,
                                      ease: 'easeOut',
                                    }}
                                    className="h-full rounded-full"
                                    style={{
                                      backgroundColor: pillar.color,
                                    }}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Bottom spacer */}
        <div className="h-16" />
      </main>
    </div>
  );
}
