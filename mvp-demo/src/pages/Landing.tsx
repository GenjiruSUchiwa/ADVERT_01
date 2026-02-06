import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  BarChart3,
  Shield,
  Target,
  Heart,
  TrendingUp,
  Eye,
  Zap,
  Users,
  Clock,
  ChevronDown,
  Star,
  Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Inline data                                                        */
/* ------------------------------------------------------------------ */

const ADVERT_PILLARS = [
  {
    letter: "A",
    name: "Authenticite",
    tagline: "L'ADN de votre marque",
    description:
      "Definissez l'essence unique de votre marque. Valeurs, mission, ton de voix - tout ce qui la rend irrempla\u00e7able.",
    icon: Heart,
    color: "#f59e0b",
  },
  {
    letter: "D",
    name: "Distinction",
    tagline: "Sortir du lot",
    description:
      "Identifiez ce qui vous differencie. Analysez la concurrence et positionnez-vous de maniere unique sur votre marche.",
    icon: Target,
    color: "#fbbf24",
  },
  {
    letter: "V",
    name: "Valeur",
    tagline: "Creer de l'impact",
    description:
      "Articulez la proposition de valeur qui fait dire a vos clients : 'C'est exactement ce qu'il me faut.'",
    icon: Sparkles,
    color: "#8b5cf6",
  },
  {
    letter: "E",
    name: "Engagement",
    tagline: "Connecter & convertir",
    description:
      "Construisez des strategies d'engagement qui transforment des prospects en clients fideles, puis en ambassadeurs.",
    icon: Users,
    color: "#f59e0b",
  },
  {
    letter: "R",
    name: "Risk",
    tagline: "Anticiper & proteger",
    description:
      "Evaluez les risques reputationnels et strategiques. Preparez des plans de contingence avant qu'il ne soit trop tard.",
    icon: Shield,
    color: "#fbbf24",
  },
  {
    letter: "T",
    name: "Track",
    tagline: "Mesurer & optimiser",
    description:
      "Definissez vos KPIs, mesurez la performance et iterez. Ce qui ne se mesure pas ne s'ameliore pas.",
    icon: TrendingUp,
    color: "#8b5cf6",
  },
];

const STATS = [
  { label: "Superfans", value: 247, icon: Users, suffix: "" },
  { label: "Score Coherence", value: 81, icon: BarChart3, suffix: "" },
  { label: "par strategie", value: 10, icon: Clock, prefix: "<", suffix: " min" },
  { label: "Marge brute", value: 93, icon: TrendingUp, suffix: "%" },
];

const TESTIMONIALS = [
  {
    name: "Aminata Diallo",
    role: "Directrice Creative, Baobab Agency",
    location: "Dakar",
    quote:
      "ADVERT a transforme notre fa\u00e7on de creer des strategies. En 8 minutes, on produit ce qui prenait 3 jours. Nos clients sont bluffes.",
    rating: 5,
  },
  {
    name: "Kwame Asante",
    role: "CEO, GoldCoast Digital",
    location: "Accra",
    quote:
      "Le framework ADVERT nous a permis de systematiser notre approche. Notre score de coherence est passe de 45 a 87 en 2 mois.",
    rating: 5,
  },
  {
    name: "Fatou Mbaye",
    role: "Brand Strategist, Teranga Brands",
    location: "Abidjan",
    quote:
      "Chaque pilier pousse a une reflexion profonde. Le resultat ? Des marques africaines qui rivalisent avec les meilleures mondiales.",
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */

function useAnimatedCounter(target: number, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Floating particles background                                      */
/* ------------------------------------------------------------------ */

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large ambient orbs */}
      {[
        { size: 600, x: "10%", y: "-10%", color: "rgba(245,158,11,0.07)", delay: 0, dur: 20 },
        { size: 500, x: "70%", y: "20%", color: "rgba(139,92,246,0.06)", delay: 2, dur: 25 },
        { size: 400, x: "30%", y: "60%", color: "rgba(251,191,36,0.05)", delay: 4, dur: 22 },
        { size: 350, x: "80%", y: "70%", color: "rgba(245,158,11,0.04)", delay: 1, dur: 18 },
        { size: 300, x: "-5%", y: "40%", color: "rgba(139,92,246,0.05)", delay: 3, dur: 24 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Small sparkle particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 3 === 0
                ? "rgba(251,191,36,0.6)"
                : i % 3 === 1
                  ? "rgba(139,92,246,0.5)"
                  : "rgba(255,255,255,0.3)",
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -40 - Math.random() * 60],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            delay: Math.random() * 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ADVERT letter blocks                                               */
/* ------------------------------------------------------------------ */

function AdvertLetters() {
  const letters = ["A", "D", "V", "E", "R", "T"];
  const colors = ["#f59e0b", "#fbbf24", "#8b5cf6", "#f59e0b", "#fbbf24", "#8b5cf6"];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
      {letters.map((letter, i) => (
        <motion.div
          key={letter}
          className="animate-pulse-glow relative flex items-center justify-center rounded-xl sm:rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors[i]}22, ${colors[i]}08)`,
            border: `1px solid ${colors[i]}33`,
            width: "clamp(44px, 10vw, 72px)",
            height: "clamp(52px, 12vw, 84px)",
          }}
          initial={{ opacity: 0, y: 40, rotateY: -90 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.8 + i * 0.12,
            type: "spring",
            stiffness: 120,
          }}
          whileHover={{
            scale: 1.15,
            boxShadow: `0 0 30px ${colors[i]}40`,
            transition: { duration: 0.2 },
          }}
        >
          {/* Glow backdrop */}
          <motion.div
            className="absolute inset-0 rounded-xl sm:rounded-2xl"
            style={{ background: `radial-gradient(circle, ${colors[i]}15, transparent)` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            className="font-display relative z-10 text-2xl font-black sm:text-3xl md:text-4xl"
            style={{ color: colors[i] }}
          >
            {letter}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stat card with animated counter                                    */
/* ------------------------------------------------------------------ */

function StatCard({
  stat,
  index,
}: {
  stat: (typeof STATS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useAnimatedCounter(stat.value, 2000, inView);
  const Icon = stat.icon;

  return (
    <motion.div
      ref={ref}
      className="glass animate-pulse-glow group relative overflow-hidden rounded-2xl p-6 text-center sm:p-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-violet-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <Icon className="mx-auto mb-3 h-7 w-7 text-amber-400 sm:h-8 sm:w-8" />
      <div className="font-display text-3xl font-black text-white sm:text-4xl">
        {stat.prefix ?? ""}
        {count}
        {stat.suffix ?? ""}
      </div>
      <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pillar card                                                        */
/* ------------------------------------------------------------------ */

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof ADVERT_PILLARS)[number];
  index: number;
}) {
  const Icon = pillar.icon;

  return (
    <motion.div
      className="glass group relative overflow-hidden rounded-2xl p-6 sm:p-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        y: -6,
        boxShadow: `0 20px 60px ${pillar.color}15`,
        transition: { duration: 0.3 },
      }}
    >
      {/* Shimmer on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {/* Letter badge */}
      <div className="mb-4 flex items-center gap-3">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-xl font-display text-xl font-black"
          style={{
            background: `linear-gradient(135deg, ${pillar.color}25, ${pillar.color}10)`,
            border: `1px solid ${pillar.color}40`,
            color: pillar.color,
          }}
          whileHover={{ rotate: [0, -5, 5, 0], transition: { duration: 0.4 } }}
        >
          {pillar.letter}
        </motion.div>
        <div>
          <h3 className="font-display text-lg font-bold text-white">{pillar.name}</h3>
          <p className="text-xs text-slate-400">{pillar.tagline}</p>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-slate-500">
        <Icon className="h-4 w-4" style={{ color: pillar.color }} />
        <div className="h-px flex-1" style={{ background: `${pillar.color}20` }} />
      </div>

      <p className="text-sm leading-relaxed text-slate-300">{pillar.description}</p>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${pillar.color}, transparent)` }}
        initial={{ width: "0%" }}
        whileInView={{ width: "60%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonial card                                                   */
/* ------------------------------------------------------------------ */

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  index: number;
}) {
  return (
    <motion.div
      className="glass relative overflow-hidden rounded-2xl p-6 sm:p-8"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 50px rgba(245,158,11,0.08)",
        transition: { duration: 0.3 },
      }}
    >
      {/* Decorative quote */}
      <Quote className="absolute right-4 top-4 h-8 w-8 text-amber-500/10" />

      {/* Stars */}
      <div className="mb-4 flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="mb-6 text-sm leading-relaxed text-slate-300 italic">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500/20 to-violet-500/20 font-display text-sm font-bold text-amber-400">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{testimonial.name}</div>
          <div className="text-xs text-slate-400">
            {testimonial.role} &middot; {testimonial.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Landing page                                                  */
/* ------------------------------------------------------------------ */

export default function Landing() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.96]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      {/* ---- Animated gradient background ---- */}
      <div className="animate-gradient pointer-events-none fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-100" />
      <FloatingOrbs />

      {/* ================================================================ */}
      {/*  HERO SECTION                                                     */}
      {/* ================================================================ */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center"
      >
        {/* Top badge */}
        <motion.div
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span className="text-slate-300">
            La methodologie <span className="font-semibold text-amber-400">ADVERT</span> pour
            les agences africaines
          </span>
        </motion.div>

        {/* ADVERT Letter blocks */}
        <div className="mb-8">
          <AdvertLetters />
        </div>

        {/* Main headline */}
        <motion.h1
          className="font-display mx-auto max-w-4xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="animate-gradient inline-block bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
            Creez des Strategies
          </span>
          <br />
          <span className="text-white">de Marque qui Creent</span>
          <br />
          <motion.span
            className="animate-gradient relative inline-block bg-gradient-to-r from-violet-400 via-amber-400 to-violet-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{ backgroundSize: "200% 200%" }}
          >
            des Superfans
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Generez une strategie de marque complete en{" "}
          <span className="font-semibold text-amber-400">moins de 10 minutes</span> grace a
          l'IA et notre framework exclusif en 6 piliers.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button
            onClick={() => navigate("/app/wizard")}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 font-display text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 sm:text-base"
            whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(245,158,11,0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Creer ma premiere strategie
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            onClick={() => navigate("/app/dashboard")}
            className="glass group flex items-center gap-2 rounded-xl px-8 py-4 font-display text-sm font-semibold text-slate-300 transition-colors hover:text-white sm:text-base"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Eye className="h-4 w-4 text-violet-400" />
            Voir le dashboard
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-6 w-6 text-slate-500" />
        </motion.div>
      </motion.section>

      {/* ================================================================ */}
      {/*  PILLARS SECTION                                                  */}
      {/* ================================================================ */}
      <section className="relative z-10 px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-400"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="h-3.5 w-3.5" />
              Le Framework
            </motion.div>
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
              6 Piliers.{" "}
              <span className="animate-gradient bg-gradient-to-r from-amber-400 to-violet-400 bg-clip-text text-transparent">
                Une Strategie Complete.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Chaque pilier de la methodologie ADVERT couvre un aspect essentiel de votre
              strategie de marque. Ensemble, ils forment un systeme coherent et actionnable.
            </p>
          </motion.div>

          {/* Pillar cards grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ADVERT_PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.letter} pillar={pillar} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  STATS SECTION                                                    */}
      {/* ================================================================ */}
      <section className="relative z-10 px-4 py-24 sm:py-32">
        {/* Divider glow */}
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <div className="mx-auto max-w-5xl">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              Des resultats{" "}
              <span className="animate-gradient bg-gradient-to-r from-amber-400 to-violet-400 bg-clip-text text-transparent">
                mesurables
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Les agences qui utilisent ADVERT constatent des ameliorations concretes.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  TESTIMONIALS SECTION                                             */}
      {/* ================================================================ */}
      <section className="relative z-10 px-4 py-24 sm:py-32">
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

        <div className="mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl">
              Ce qu'en disent{" "}
              <span className="animate-gradient bg-gradient-to-r from-violet-400 to-amber-400 bg-clip-text text-transparent">
                nos agences
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  FINAL CTA SECTION                                                */}
      {/* ================================================================ */}
      <section className="relative z-10 px-4 py-24 sm:py-32">
        <motion.div
          className="glass animate-pulse-glow mx-auto max-w-3xl overflow-hidden rounded-3xl p-8 text-center sm:p-12 md:p-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Background accents */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-amber-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-violet-500/10 blur-[80px]" />

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="mx-auto mb-4 h-8 w-8 text-amber-400" />
            <h2 className="font-display text-3xl font-black text-white sm:text-4xl md:text-5xl">
              Pret a creer votre
              <br />
              <span className="animate-gradient bg-gradient-to-r from-amber-400 via-amber-300 to-violet-400 bg-clip-text text-transparent">
                premiere strategie ?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              Rejoignez les agences africaines qui transforment leur approche du branding.
              Gratuit. Sans engagement. En moins de 10 minutes.
            </p>

            <motion.button
              onClick={() => navigate("/app/wizard")}
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-10 py-4 font-display text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 sm:text-base"
              whileHover={{ scale: 1.04, boxShadow: "0 20px 50px rgba(245,158,11,0.35)" }}
              whileTap={{ scale: 0.98 }}
            >
              Commencer maintenant
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
}
