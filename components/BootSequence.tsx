
import React, { useState, useEffect } from 'react';

const bootLines = [
  "SYSTEM8 BIOS v8.8.2024",
  "Initializing...",
  "Memory Check: 65536K OK",
  "Detecting Primary Master... SYS8_PORTFOLIO_HD",
  "Detecting Secondary Slave... CD-ROM (Not Found)",
  "Booting from Hard Disk...",
  "Loading S8-DOS...",
  "Starting interactive shell...",
  " ",
  "Welcome to the System 8 Interactive Portfolio.",
  " ",
];

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);

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
    <div className="p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-green-400">
      {lines.map((line, i) => (
        <p key={i} className="text-sm sm:text-base">{line}</p>
      ))}
      {lineIndex < bootLines.length && (
         <div className="inline-block h-4 w-2 bg-green-400 cursor-blink ml-1" />
      )}
    </div>
  );
};

export default BootSequence;
