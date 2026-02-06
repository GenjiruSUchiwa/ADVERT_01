import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Sparkles,
  Send,
  ChevronRight,
  ChevronLeft,
  Check,
  MessageSquare,
  Loader2,
  Fingerprint,
  Star,
  Gem,
  Heart,
  Shield,
  BarChart3,
} from 'lucide-react';
import { AI_QUESTIONS, AI_RESPONSES } from '../data/mockData';
import { PILLARS } from '../lib/constants';

// ---------------------------------------------------------------------------
// Icon map – used in the sidebar to render the right icon per pillar
// ---------------------------------------------------------------------------
const PILLAR_ICONS: Record<string, React.ReactNode> = {
  Fingerprint: <Fingerprint className="w-4 h-4" />,
  Star: <Star className="w-4 h-4" />,
  Gem: <Gem className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  BarChart3: <BarChart3 className="w-4 h-4" />,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface ChatMessage {
  id: string;
  role: 'ai' | 'user';
  content: string;
  pillarIndex: number;
  questionIndex?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
let msgIdCounter = 0;
function nextId(): string {
  msgIdCounter += 1;
  return `msg-${msgIdCounter}`;
}

// ---------------------------------------------------------------------------
// StrategyWizard Component
// ---------------------------------------------------------------------------
export default function StrategyWizard() {
  const navigate = useNavigate();

  // -- Brand name -----------------------------------------------------------
  const [brandName, setBrandName] = useState('Ma Marque');

  // -- Pillar progression ---------------------------------------------------
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [pillarCompletions, setPillarCompletions] = useState<number[]>(
    () => PILLARS.map(() => 0),
  );
  const [allComplete, setAllComplete] = useState(false);

  // -- Chat -----------------------------------------------------------------
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // -- Refs -----------------------------------------------------------------
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamAbortRef = useRef(false);

  // -------------------------------------------------------------------------
  // Scroll to bottom whenever messages / streaming text change
  // -------------------------------------------------------------------------
  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, isAiThinking, scrollToBottom]);

  // -------------------------------------------------------------------------
  // Stream AI text one character at a time
  // -------------------------------------------------------------------------
  const streamText = useCallback(
    (text: string): Promise<void> =>
      new Promise((resolve) => {
        streamAbortRef.current = false;
        setIsStreaming(true);
        setStreamingText('');
        let i = 0;

        const tick = () => {
          if (streamAbortRef.current) {
            setIsStreaming(false);
            setStreamingText('');
            resolve();
            return;
          }
          if (i < text.length) {
            setStreamingText(text.slice(0, i + 1));
            i += 1;
            // Base delay 25-35ms, slight randomness for natural feel
            const delay = 25 + Math.random() * 10;
            setTimeout(tick, delay);
          } else {
            setIsStreaming(false);
            setStreamingText('');
            resolve();
          }
        };

        tick();
      }),
    [],
  );

  // -------------------------------------------------------------------------
  // Send the first AI question for the current pillar
  // -------------------------------------------------------------------------
  const sendAiQuestion = useCallback(
    (pillarIdx: number, qIdx: number) => {
      const pillar = PILLARS[pillarIdx];
      const questions = AI_QUESTIONS[pillar.id] ?? [];
      if (qIdx >= questions.length) return;

      const questionText = questions[qIdx];

      // Show thinking indicator first
      setIsAiThinking(true);
      const thinkDelay = 800 + Math.random() * 600;

      setTimeout(async () => {
        setIsAiThinking(false);
        // Stream the question
        await streamText(questionText);
        // After streaming completes, push the message
        const msg: ChatMessage = {
          id: nextId(),
          role: 'ai',
          content: questionText,
          pillarIndex: pillarIdx,
          questionIndex: qIdx,
        };
        setMessages((prev) => [...prev, msg]);
        inputRef.current?.focus();
      }, thinkDelay);
    },
    [streamText],
  );

  // -------------------------------------------------------------------------
  // Initialise: send first question on mount
  // -------------------------------------------------------------------------
  const hasInitRef = useRef(false);
  useEffect(() => {
    if (!hasInitRef.current) {
      hasInitRef.current = true;
      // Small delay so the UI mounts first
      setTimeout(() => sendAiQuestion(0, 0), 500);
    }
  }, [sendAiQuestion]);

  // -------------------------------------------------------------------------
  // Handle user submit
  // -------------------------------------------------------------------------
  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isAiThinking || isStreaming) return;

    // Push user message
    const userMsg: ChatMessage = {
      id: nextId(),
      role: 'user',
      content: text,
      pillarIndex: currentPillarIndex,
      questionIndex: currentQuestionIndex,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    const pillar = PILLARS[currentPillarIndex];
    const questions = AI_QUESTIONS[pillar.id] ?? [];
    const responses = AI_RESPONSES[pillar.id] ?? [];
    const totalQs = questions.length;
    const qIdx = currentQuestionIndex;

    // Update pillar completion
    const newCompletion = Math.round(((qIdx + 1) / totalQs) * 100);
    setPillarCompletions((prev) => {
      const next = [...prev];
      next[currentPillarIndex] = newCompletion;
      return next;
    });

    // Pick AI response (cycle through available responses)
    const responseText =
      responses.length > 0
        ? responses[qIdx % responses.length]
        : "Merci pour votre reponse. C'est une perspective tres interessante qui enrichit votre strategie.";

    // AI thinks, then responds
    setIsAiThinking(true);
    const thinkDelay = 1000 + Math.random() * 1000;

    setTimeout(async () => {
      setIsAiThinking(false);

      // Stream the AI response
      await streamText(responseText);

      const aiMsg: ChatMessage = {
        id: nextId(),
        role: 'ai',
        content: responseText,
        pillarIndex: currentPillarIndex,
        questionIndex: qIdx,
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Determine next step
      const nextQIdx = qIdx + 1;

      if (nextQIdx >= totalQs) {
        // Pillar complete
        setPillarCompletions((prev) => {
          const next = [...prev];
          next[currentPillarIndex] = 100;
          return next;
        });

        if (currentPillarIndex < PILLARS.length - 1) {
          // Celebrate, then move to next pillar
          setShowCelebration(true);
          setTimeout(() => {
            setShowCelebration(false);
            const nextPillar = currentPillarIndex + 1;
            setCurrentPillarIndex(nextPillar);
            setCurrentQuestionIndex(0);
            // Small delay then ask first question of next pillar
            setTimeout(() => sendAiQuestion(nextPillar, 0), 600);
          }, 2500);
        } else {
          // All pillars complete!
          setShowCelebration(true);
          setTimeout(() => {
            setShowCelebration(false);
            setAllComplete(true);
          }, 2500);
        }
      } else {
        // Ask next question
        setCurrentQuestionIndex(nextQIdx);
        setTimeout(() => sendAiQuestion(currentPillarIndex, nextQIdx), 800);
      }
    }, thinkDelay);
  }, [
    inputValue,
    isAiThinking,
    isStreaming,
    currentPillarIndex,
    currentQuestionIndex,
    streamText,
    sendAiQuestion,
  ]);

  // -------------------------------------------------------------------------
  // Key handler
  // -------------------------------------------------------------------------
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // -------------------------------------------------------------------------
  // Derived state
  // -------------------------------------------------------------------------
  const currentPillar = PILLARS[currentPillarIndex];
  const overallProgress = Math.round(
    pillarCompletions.reduce((a, b) => a + b, 0) / PILLARS.length,
  );

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden">
      {/* ================================================================== */}
      {/* LEFT SIDEBAR                                                        */}
      {/* ================================================================== */}
      <aside className="w-80 flex-shrink-0 border-r border-slate-800/60 bg-slate-950/80 backdrop-blur-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800/60">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <span className="text-sm font-semibold tracking-wide text-slate-300 uppercase">
              Strategie ADVERT
            </span>
          </div>

          {/* Brand name input */}
          <div className="relative">
            <label className="block text-xs text-slate-500 mb-1.5 uppercase tracking-wider">
              Nom de la marque
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-slate-900/60 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-colors"
              placeholder="Nom de votre marque"
            />
          </div>

          {/* Overall progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Progression globale</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Pillar list */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {PILLARS.map((pillar, idx) => {
            const isActive = idx === currentPillarIndex;
            const isCompleted = pillarCompletions[idx] === 100;
            const completion = pillarCompletions[idx];

            return (
              <motion.div
                key={pillar.id}
                className={`
                  relative rounded-xl p-3 transition-all duration-300 cursor-default
                  ${isActive
                    ? 'bg-slate-800/60 border border-slate-700/50'
                    : 'hover:bg-slate-900/40'
                  }
                `}
                animate={
                  isActive
                    ? {
                        boxShadow: [
                          `0 0 0px ${pillar.color}00`,
                          `0 0 20px ${pillar.color}25`,
                          `0 0 0px ${pillar.color}00`,
                        ],
                      }
                    : {}
                }
                transition={
                  isActive
                    ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
                    : {}
                }
              >
                <div className="flex items-center gap-3">
                  {/* Letter circle */}
                  <div
                    className={`
                      relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300
                      ${isCompleted
                        ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400'
                        : isActive
                          ? 'border-2 text-white'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-500'
                      }
                    `}
                    style={
                      isActive && !isCompleted
                        ? { borderColor: pillar.color, color: pillar.color }
                        : undefined
                    }
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      pillar.letter
                    )}
                  </div>

                  {/* Name + completion */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-medium truncate ${
                        isActive
                          ? 'text-white'
                          : isCompleted
                            ? 'text-emerald-400'
                            : 'text-slate-400'
                      }`}
                    >
                      {pillar.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: isCompleted
                              ? '#10b981'
                              : pillar.color,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${completion}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 w-8 text-right tabular-nums">
                        {completion}%
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 ${
                      isActive ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {PILLAR_ICONS[pillar.icon]}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800/60">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Retour au dashboard
          </button>
        </div>
      </aside>

      {/* ================================================================== */}
      {/* MAIN CONTENT                                                        */}
      {/* ================================================================== */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* ---------------------------------------------------------------- */}
        {/* Pillar Header                                                     */}
        {/* ---------------------------------------------------------------- */}
        <AnimatePresence mode="wait">
          {!allComplete && (
            <motion.header
              key={currentPillar.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 border-b border-slate-800/60"
            >
              <div className="relative px-8 py-5">
                {/* Animated gradient border at top */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${currentPillar.color}, transparent)`,
                  }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <div className="flex items-center gap-4">
                  {/* Large letter */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black"
                    style={{
                      backgroundColor: `${currentPillar.color}20`,
                      color: currentPillar.color,
                      border: `2px solid ${currentPillar.color}40`,
                    }}
                  >
                    {currentPillar.letter}
                  </div>

                  <div>
                    <h1 className="text-xl font-bold text-white">
                      {currentPillar.fullName}
                    </h1>
                    <p className="text-sm text-slate-400 mt-0.5">
                      {currentPillar.description}
                    </p>
                  </div>

                  {/* Pillar step indicator */}
                  <div className="ml-auto flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            i < currentQuestionIndex
                              ? currentPillar.color
                              : i === currentQuestionIndex && !isAiThinking
                                ? `${currentPillar.color}80`
                                : '#334155',
                        }}
                      />
                    ))}
                    <span className="ml-2 text-xs text-slate-500 tabular-nums">
                      {currentQuestionIndex + 1}/5
                    </span>
                  </div>
                </div>
              </div>
            </motion.header>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------------------- */}
        {/* Chat Area                                                         */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {/* Completion screen */}
          <AnimatePresence>
            {allComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center"
              >
                <motion.div
                  className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-6"
                  animate={{
                    boxShadow: [
                      '0 0 0px rgba(245,158,11,0)',
                      '0 0 60px rgba(245,158,11,0.4)',
                      '0 0 0px rgba(245,158,11,0)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-12 h-12 text-slate-950" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-3">
                  Strategie complete !
                </h2>
                <p className="text-slate-400 max-w-md mb-2">
                  Felicitations ! Les 6 piliers ADVERT de{' '}
                  <span className="text-amber-400 font-semibold">
                    {brandName}
                  </span>{' '}
                  ont ete definis avec succes.
                </p>
                <p className="text-sm text-slate-500 mb-8">
                  Votre strategie est prete a etre exploree et affinee.
                </p>
                <motion.button
                  onClick={() => navigate('/app/strategy/new')}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/25"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Voir ma strategie
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          {!allComplete && (
            <>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 max-w-3xl ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  {msg.role === 'ai' ? (
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-slate-950" />
                    </div>
                  ) : (
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                      {brandName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`
                      rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[85%] backdrop-blur-sm whitespace-pre-wrap
                      ${
                        msg.role === 'ai'
                          ? 'bg-slate-800/70 border-l-2 text-slate-200'
                          : 'bg-amber-900/30 border border-amber-800/30 text-amber-100'
                      }
                    `}
                    style={
                      msg.role === 'ai'
                        ? {
                            borderLeftColor:
                              PILLARS[msg.pillarIndex]?.color ?? '#f59e0b',
                          }
                        : undefined
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Currently streaming text */}
              {isStreaming && streamingText && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 max-w-3xl"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </div>
                  <div
                    className="rounded-2xl px-4 py-3 text-sm leading-relaxed max-w-[85%] bg-slate-800/70 border-l-2 text-slate-200 backdrop-blur-sm whitespace-pre-wrap"
                    style={{ borderLeftColor: currentPillar.color }}
                  >
                    {streamingText}
                    <motion.span
                      className="inline-block w-0.5 h-4 ml-0.5 align-text-bottom"
                      style={{ backgroundColor: currentPillar.color }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Thinking indicator */}
              {isAiThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-3 max-w-3xl"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-slate-950" />
                  </div>
                  <div className="rounded-2xl px-5 py-3.5 bg-slate-800/70 border-l-2 flex items-center gap-1.5"
                    style={{ borderLeftColor: currentPillar.color }}
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-slate-400"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-slate-400"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.15,
                      }}
                    />
                    <motion.span
                      className="w-2 h-2 rounded-full bg-slate-400"
                      animate={{ y: [0, -6, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </>
          )}

          {/* Auto-scroll anchor */}
          <div ref={chatEndRef} />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Celebration Overlay                                                */}
        {/* ---------------------------------------------------------------- */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              {/* Confetti-like particles */}
              {Array.from({ length: 40 }).map((_, i) => {
                const colors = ['#f59e0b', '#8b5cf6', '#10b981', '#ec4899', '#f97316', '#06b6d4'];
                const color = colors[i % colors.length];
                const startX = 50 + (Math.random() - 0.5) * 20;
                const endX = startX + (Math.random() - 0.5) * 80;
                const endY = Math.random() * 100;
                const size = 4 + Math.random() * 8;
                const rotation = Math.random() * 720 - 360;

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-sm"
                    style={{
                      width: size,
                      height: size,
                      backgroundColor: color,
                      left: `${startX}%`,
                      top: '50%',
                    }}
                    initial={{ opacity: 1, scale: 0 }}
                    animate={{
                      opacity: [1, 1, 0],
                      scale: [0, 1, 0.5],
                      left: `${endX}%`,
                      top: `${endY}%`,
                      rotate: rotation,
                    }}
                    transition={{
                      duration: 1.5 + Math.random() * 1,
                      ease: 'easeOut',
                      delay: Math.random() * 0.3,
                    }}
                  />
                );
              })}

              {/* Center celebration text */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 12 }}
                className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-10 py-8 text-center shadow-2xl"
              >
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Check
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: currentPillar.color }}
                  />
                </motion.div>
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ color: currentPillar.color }}
                >
                  Pilier complete !
                </h3>
                <p className="text-slate-400">
                  {currentPillar.name} &#8212; 100% termine
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------------------------------------------------------- */}
        {/* Input Bar                                                         */}
        {/* ---------------------------------------------------------------- */}
        {!allComplete && (
          <div className="flex-shrink-0 border-t border-slate-800/60 px-8 py-4">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <div className="flex items-center gap-2 text-slate-500">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Votre reponse..."
                  disabled={isAiThinking || isStreaming}
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {(isAiThinking || isStreaming) && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <Loader2
                      className="w-4 h-4 animate-spin"
                      style={{ color: currentPillar.color }}
                    />
                  </div>
                )}
              </div>
              <motion.button
                onClick={handleSend}
                disabled={!inputValue.trim() || isAiThinking || isStreaming}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    inputValue.trim() && !isAiThinking && !isStreaming
                      ? currentPillar.color
                      : undefined,
                }}
                whileHover={
                  inputValue.trim() && !isAiThinking && !isStreaming
                    ? { scale: 1.05 }
                    : undefined
                }
                whileTap={
                  inputValue.trim() && !isAiThinking && !isStreaming
                    ? { scale: 0.95 }
                    : undefined
                }
              >
                <Send
                  className={`w-4 h-4 ${
                    inputValue.trim() && !isAiThinking && !isStreaming
                      ? 'text-slate-950'
                      : 'text-slate-600'
                  }`}
                />
              </motion.button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
