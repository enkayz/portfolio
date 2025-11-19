import React, { Suspense, useCallback, useState } from 'react';
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
      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-8">
        {view === 'boot' && <BootSequence onComplete={handleBootComplete} />}
        {view === 'hud' && <HudDisplay onEnterShell={handleEnterShell} />}
        {view === 'terminal' && (
          <Suspense fallback={<div className="text-gray-400">Loading shell…</div>}>
            <Terminal onExit={handleExitShell} onTogglePreview={handleTogglePreview} />
          </Suspense>
        )}
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
