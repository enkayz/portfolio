import React, { Suspense, useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootSequence from './components/BootSequence';
import HudDisplay from './components/HudDisplay';
import DynamicBackground from './components/DynamicBackground';
const PreviewGenerator = React.lazy(() => import('./components/PreviewGenerator'));
const Terminal = React.lazy(() => import('./components/Terminal'));

type ViewState = 'boot' | 'hud' | 'terminal';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('boot');
  const [showPreview, setShowPreview] = useState(false);

  const handleBootComplete = useCallback(() => setView('hud'), []);

  const handleEnterShell = useCallback(() => setView('terminal'), []);

  const handleExitShell = useCallback(() => {
    setShowPreview(false);
    setView('hud');
  }, []);

  const handleTogglePreview = useCallback(() => setShowPreview(true), []);

  const handleClosePreview = useCallback(() => setShowPreview(false), []);

  return (
    <div
      className="min-h-screen bg-[#050505] text-green-400 font-mono relative overflow-hidden"
      style={{
        paddingTop: 'max(env(safe-area-inset-top), 0px)',
        paddingBottom: 'max(env(safe-area-inset-bottom), 0px)',
      }}
    >
      <DynamicBackground />
      <div className="pointer-events-none absolute inset-6 rounded-[32px] border border-emerald-500/30" />
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-8">
        <AnimatePresence mode="wait">
          {view === 'boot' && (
            <motion.div
              key="boot"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <BootSequence onComplete={handleBootComplete} />
            </motion.div>
          )}
          {view === 'hud' && (
            <motion.div
              key="hud"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <HudDisplay onEnterShell={handleEnterShell} />
            </motion.div>
          )}
          {view === 'terminal' && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Suspense fallback={<div className="text-gray-400">Loading shell…</div>}>
                <Terminal onExit={handleExitShell} onTogglePreview={handleTogglePreview} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showPreview && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/80 text-gray-300 flex items-center justify-center">Preparing preview…</div>}>
          <PreviewGenerator onClose={handleClosePreview} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
