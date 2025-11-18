
import React, { useState, useCallback } from 'react';
import Terminal from './components/Terminal';
import BootSequence from './components/BootSequence';
import HudDisplay from './components/HudDisplay';
import PreviewGenerator from './components/PreviewGenerator';

type View = 'hud' | 'booting' | 'terminal';

const App: React.FC = () => {
  const [view, setView] = useState<View>('hud');
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleEnterShell = useCallback(() => {
    setView('booting');
  }, []);

  const handleBootComplete = useCallback(() => {
    setView('terminal');
  }, []);
  
  const handleExitShell = useCallback(() => {
    setView('hud');
  }, []);

  const handleTogglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);

  const renderView = () => {
    switch (view) {
      case 'booting':
        return <BootSequence onComplete={handleBootComplete} />;
      case 'terminal':
        return <Terminal onExit={handleExitShell} onTogglePreview={handleTogglePreview} />;
      case 'hud':
      default:
        return <HudDisplay onEnterShell={handleEnterShell} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-2 sm:p-4">
      <div className="w-full h-full max-w-7xl mx-auto border-2 border-teal-500/30 bg-black/50 shadow-[0_0_20px_rgba(13,179,163,0.5)] rounded-lg">
        {renderView()}
      </div>
      {isPreviewing && <PreviewGenerator onClose={handleTogglePreview} />}
    </div>
  );
};

export default App;
