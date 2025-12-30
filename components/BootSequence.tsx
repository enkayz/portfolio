
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const bootLines = [
  'SYSTEM8 BIOS v8.8.2024',
  'Initializing neural relay…',
  'Memory Check: 65536K OK',
  'Scanning hologrid… signal locked',
  'Detecting Primary Master... SYS8_PORTFOLIO_HD',
  'Detecting Secondary Slave... CD-ROM (Not Found)',
  'Booting from Solid State Core…',
  'Loading S8-DOS interface',
  'Synchronizing UI shaders…',
  'Starting interactive shell…',
  'Welcome to the System 8 interactive portfolio.',
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const progress = useMemo(() => (lineIndex / bootLines.length) * 100, [lineIndex]);

  useLayoutEffect(() => {
    if (!panelRef.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.to('.boot-scan', {
        xPercent: 120,
        duration: 1.8,
        ease: 'power2.inOut',
        repeat: -1,
      });

      gsap.to('.boot-glow', {
        opacity: 0.9,
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.from('.boot-stamp', {
        opacity: 0,
        y: -18,
        duration: 0.8,
        ease: 'back.out(1.8)',
        delay: 0.2,
      });
    }, panelRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (lineIndex < bootLines.length) {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, bootLines[lineIndex]]);
        setLineIndex(lineIndex + 1);
      }, Math.random() * 150 + 50);
      return () => clearTimeout(timeout);
    } else {
      const finalTimeout = setTimeout(onComplete, 500);
      return () => clearTimeout(finalTimeout);
    }
  }, [lineIndex, onComplete]);

  return (
    <div
      ref={panelRef}
      className="p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-emerald-300"
    >
      <div className="relative overflow-hidden rounded-xl border border-emerald-600/50 bg-black/50 p-4 sm:p-6 shadow-[0_0_40px_rgba(16,185,129,0.18)]">
        <div className="absolute inset-0 opacity-40 boot-glow bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.35),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.25),transparent_35%)]" />
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(16,185,129,0.08)_0%,rgba(59,130,246,0.08)_50%,rgba(16,185,129,0.08)_100%)]" />
        <div className="absolute inset-0 boot-scan bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent blur-sm" />

        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-900/60 border border-emerald-500/50 flex items-center justify-center shadow-inner shadow-emerald-500/40">
              <span className="h-6 w-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-300 shadow-[0_0_20px_rgba(52,211,153,0.6)]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">System 8 // boot</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-emerald-100 boot-stamp">Linking neural console…</h1>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-emerald-200/80">Session checksum</p>
            <p className="font-semibold text-emerald-100">0xA9FF:SYNC-READY</p>
          </div>
        </div>

        <div className="relative mt-6 space-y-1">
          <div className="h-2 w-full rounded-full bg-emerald-900/60 border border-emerald-700/60 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-cyan-300 to-emerald-300"
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeInOut', duration: 0.4 }}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.22em] text-emerald-200">Boot script {lineIndex}/{bootLines.length}</p>
        </div>

        <div className="relative mt-4 sm:mt-6 grid gap-1 text-sm sm:text-base leading-relaxed">
          <AnimatePresence>
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                <p className="text-emerald-100">{line}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {lineIndex < bootLines.length && (
            <div className="flex items-center gap-3 mt-1">
              <span className="mt-1 h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <div className="inline-block h-4 w-2 bg-emerald-300 cursor-blink" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
