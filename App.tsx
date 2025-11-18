import React, { useCallback, useState } from 'react';
import BootSequence from './components/BootSequence';
import HudDisplay from './components/HudDisplay';
import PreviewGenerator from './components/PreviewGenerator';
import Terminal from './components/Terminal';
import DynamicBackground from './components/DynamicBackground';

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
          <Terminal onExit={handleExitShell} onTogglePreview={handleTogglePreview} />
        )}
      </div>

      {showPreview && <PreviewGenerator onClose={handleClosePreview} />}
    </div>
  );
};

export default App;
