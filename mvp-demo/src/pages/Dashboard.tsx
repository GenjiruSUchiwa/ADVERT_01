import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText,
  Target,
  Users,
  TrendingUp,
  Plus,
  Clock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  PenLine,
  BarChart3,
  Zap,
} from 'lucide-react';
import { MOCK_STRATEGIES, DASHBOARD_METRICS } from '../data/mockData';
import type { Strategy } from '../data/mockData';
import { PILLARS } from '../lib/constants';

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 260, damping: 24 },
  },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
} as const;

/* ------------------------------------------------------------------ */
/*  Helper: format date for display                                    */
/* ------------------------------------------------------------------ */

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function todayFormatted(): string {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Circular progress indicator for coherence scores */
function CoherenceRing({
  score,
  size = 56,
  strokeWidth = 5,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(148,163,184,0.15)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        />
      </svg>
      <span
        className="absolute font-display font-bold text-sm"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

/** Mini pillar bars (A-D-V-E-R-T) */
function PillarBars({ pillars }: { pillars: Strategy['pillars'] }) {
  return (
    <div className="flex items-end gap-1 h-6">
      {pillars.map((p) => (
        <div key={p.id} className="flex flex-col items-center gap-0.5">
          <motion.div
            className="w-3 rounded-sm"
            style={{
              backgroundColor: p.color,
              opacity: 0.85,
            }}
            initial={{ height: 0 }}
            animate={{ height: `${Math.max(p.score / 100, 0.12) * 24}px` }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          />
          <span className="text-[8px] font-bold text-slate-500">{p.letter}</span>
        </div>
      ))}
    </div>
  );
}

/** Status badge */
function StatusBadge({ status }: { status: Strategy['status'] }) {
  const isComplete = status === 'complete';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        isComplete
          ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/25'
          : 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/25'
      }`}
    >
      {isComplete ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <PenLine className="h-3 w-3" />
      )}
      {isComplete ? 'Complete' : 'Brouillon'}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Recent activity mock data                                          */
/* ------------------------------------------------------------------ */

const RECENT_ACTIVITY = [
  {
    id: 1,
    icon: Sparkles,
    text: 'Score de coherence SPAWT mis a jour',
    detail: '81/100',
    time: 'Il y a 2h',
    color: '#f59e0b',
  },
  {
    id: 2,
    icon: FileText,
    text: 'Strategie Wari Pay completee',
    detail: '83% acheve',
    time: 'Il y a 5h',
    color: '#10b981',
  },
  {
    id: 3,
    icon: Users,
    text: '+12 superfans Maison Kente',
    detail: '89 total',
    time: 'Hier',
    color: '#8b5cf6',
  },
  {
    id: 4,
    icon: BarChart3,
    text: 'Pilier Track AfriHealth analyse',
    detail: 'Score 58',
    time: 'Hier',
    color: '#06b6d4',
  },
  {
    id: 5,
    icon: Zap,
    text: 'Nouvelle recommandation IA disponible',
    detail: 'Voir',
    time: 'Il y a 2j',
    color: '#ec4899',
  },
];

/* ------------------------------------------------------------------ */
/*  Main Dashboard Component                                           */
/* ------------------------------------------------------------------ */

export default function Dashboard() {
  const navigate = useNavigate();

  const metricCards = [
    {
      label: 'Strategies Actives',
      value: DASHBOARD_METRICS.totalStrategies,
      icon: FileText,
      color: '#f59e0b',
      bg: 'from-amber-500/20 to-amber-600/5',
    },
    {
      label: 'Score Coherence Moyen',
      value: `${DASHBOARD_METRICS.avgCoherenceScore}/100`,
      icon: Target,
      color: '#8b5cf6',
      bg: 'from-violet-500/20 to-violet-600/5',
    },
    {
      label: 'Total Superfans',
      value: DASHBOARD_METRICS.totalSuperfans.toLocaleString(),
      icon: Users,
      color: '#10b981',
      bg: 'from-emerald-500/20 to-emerald-600/5',
    },
    {
      label: 'Croissance',
      value: `+${DASHBOARD_METRICS.growthRate}%`,
      icon: TrendingUp,
      color: '#06b6d4',
      bg: 'from-cyan-500/20 to-cyan-600/5',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Background ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-amber-500/[0.04] blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-violet-500/[0.03] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/*  HEADER                                                       */}
        {/* ============================================================ */}
        <motion.header
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Bonjour, Amina{' '}
              <motion.span
                className="inline-block origin-bottom-right"
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{ duration: 1.8, delay: 0.6, ease: 'easeInOut' }}
              >
                👋
              </motion.span>
            </h1>
            <p className="mt-1 text-sm text-slate-400 capitalize">{todayFormatted()}</p>
          </div>

          <motion.button
            onClick={() => navigate('/app/wizard')}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/30 hover:brightness-110 active:scale-[0.97]"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus className="h-5 w-5" />
            Nouvelle Strategie
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </motion.button>
        </motion.header>

        {/* ============================================================ */}
        {/*  METRICS ROW                                                  */}
        {/* ============================================================ */}
        <motion.div
          className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {metricCards.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                variants={cardVariants}
                className="glass group relative overflow-hidden rounded-2xl p-5 transition-shadow hover:shadow-lg hover:shadow-amber-500/5"
              >
                {/* Subtle top glow */}
                <div
                  className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full blur-2xl opacity-40 transition-opacity group-hover:opacity-60"
                  style={{ backgroundColor: metric.color }}
                />

                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      {metric.label}
                    </p>
                    <p className="font-display mt-2 text-3xl font-bold tracking-tight text-white">
                      {metric.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${metric.bg}`}
                  >
                    <Icon className="h-5 w-5" style={{ color: metric.color }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ============================================================ */}
        {/*  MAIN CONTENT: Strategy Grid + Sidebar                        */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* ---------- Strategy Cards (2/3 width) ---------- */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-white">
                Vos Strategies
              </h2>
              <span className="text-xs text-slate-500">
                {MOCK_STRATEGIES.length} strategies
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {MOCK_STRATEGIES.map((strategy) => (
                <motion.div key={strategy.id} variants={cardVariants}>
                  <Link
                    to={`/app/strategy/${strategy.id}`}
                    className="glass group relative block overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/5 hover:border-amber-500/20"
                  >
                    {/* Hover glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(251,191,36,0.04), transparent 40%)',
                      }}
                    />

                    {/* Top row: name + status */}
                    <div className="mb-3 flex items-start justify-between">
                      <div className="min-w-0">
                        <h3 className="font-display truncate text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                          {strategy.brandName}
                        </h3>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {strategy.industry}
                        </p>
                      </div>
                      <StatusBadge status={strategy.status} />
                    </div>

                    {/* Middle: coherence ring + stats */}
                    <div className="mb-4 flex items-center gap-4">
                      <CoherenceRing score={strategy.coherenceScore} />
                      <div className="flex-1 space-y-1.5">
                        {/* Completion bar */}
                        <div>
                          <div className="mb-0.5 flex items-center justify-between text-[10px] text-slate-400">
                            <span>Completion</span>
                            <span className="font-semibold text-slate-300">
                              {strategy.completionPercent}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400"
                              initial={{ width: 0 }}
                              animate={{
                                width: `${strategy.completionPercent}%`,
                              }}
                              transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
                            />
                          </div>
                        </div>
                        {/* Superfans */}
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <Users className="h-3 w-3 text-violet-400" />
                          <span>
                            <span className="font-semibold text-slate-300">
                              {strategy.superfanCount}
                            </span>{' '}
                            superfans
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pillar bars */}
                    <div className="mb-3 flex items-center justify-between">
                      <PillarBars pillars={strategy.pillars} />
                      <div className="flex items-center gap-1 text-[10px] text-slate-500">
                        <Clock className="h-3 w-3" />
                        {formatDate(strategy.updatedAt)}
                      </div>
                    </div>

                    {/* Bottom arrow hint */}
                    <div className="flex items-center justify-end">
                      <ArrowUpRight className="h-4 w-4 text-slate-600 transition-all group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ---------- Right sidebar ---------- */}
          <motion.aside
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Quick Insight Card */}
            <motion.div variants={cardVariants}>
              <div className="glass rounded-2xl p-5 relative overflow-hidden">
                <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl" />
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/5">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-white">
                    Insight du Mois
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  Votre score de coherence a augmente de{' '}
                  <span className="font-semibold text-amber-400">+12 points</span>{' '}
                  ce mois. La progression est portee par les piliers{' '}
                  <span className="font-semibold" style={{ color: PILLARS[0].color }}>
                    Authenticite
                  </span>{' '}
                  et{' '}
                  <span className="font-semibold" style={{ color: PILLARS[3].color }}>
                    Engagement
                  </span>
                  .
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/20">
                    <TrendingUp className="h-3 w-3" />
                    +12 pts
                  </div>
                  <span className="text-[10px] text-slate-500">vs. mois dernier</span>
                </div>
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div variants={cardVariants}>
              <div className="glass rounded-2xl p-5">
                <h3 className="font-display mb-4 text-sm font-semibold text-white">
                  Activite Recente
                </h3>
                <ul className="space-y-3">
                  {RECENT_ACTIVITY.map((activity, idx) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <motion.li
                        key={activity.id}
                        className="group flex items-start gap-3"
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + idx * 0.08 }}
                      >
                        <div
                          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                          style={{
                            backgroundColor: `${activity.color}15`,
                          }}
                        >
                          <ActivityIcon
                            className="h-3.5 w-3.5"
                            style={{ color: activity.color }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs leading-snug text-slate-300">
                            {activity.text}
                          </p>
                          <div className="mt-0.5 flex items-center gap-2">
                            <span
                              className="text-[10px] font-semibold"
                              style={{ color: activity.color }}
                            >
                              {activity.detail}
                            </span>
                            <span className="text-[10px] text-slate-600">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>

            {/* ADVERT Pillar Legend */}
            <motion.div variants={cardVariants}>
              <div className="glass rounded-2xl p-5">
                <h3 className="font-display mb-3 text-sm font-semibold text-white">
                  Piliers ADVERT
                </h3>
                <div className="space-y-2">
                  {PILLARS.map((pillar) => (
                    <div
                      key={pillar.id}
                      className="flex items-center gap-2.5"
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-sm"
                        style={{ backgroundColor: pillar.color }}
                      />
                      <span className="text-xs text-slate-400">
                        <span
                          className="font-bold"
                          style={{ color: pillar.color }}
                        >
                          {pillar.letter}
                        </span>{' '}
                        — {pillar.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
