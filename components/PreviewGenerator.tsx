
import React, { useState, useRef } from 'react';

// Forward declaration for html2canvas from CDN
declare const html2canvas: any;

interface PreviewGeneratorProps {
  onClose: () => void;
}

const PreviewGenerator: React.FC<PreviewGeneratorProps> = ({ onClose }) => {
  const [title, setTitle] = useState("Dylan Boekelman – Systems & DevOps Engineer");
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    if (previewRef.current && typeof html2canvas !== 'undefined') {
      setIsGenerating(true);
      html2canvas(previewRef.current, {
        useCORS: true,
        backgroundColor: '#0a0a0a',
        width: 1200,
        height: 630,
        scale: 1,
      }).then((canvas: HTMLCanvasElement) => {
        const link = document.createElement('a');
        link.download = 'system8-preview.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        setIsGenerating(false);
      }).catch((err: any) => {
        console.error("Failed to generate canvas:", err);
        setIsGenerating(false);
      });
    } else {
        console.error("html2canvas is not loaded or preview ref is not available.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-[#1a1a1a] border-2 border-teal-500/30 p-4 sm:p-6 rounded-lg max-w-4xl w-full shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex-shrink-0 mb-4">
            <h2 className="text-xl text-yellow-400 font-bold mb-2">Social Preview Generator</h2>
            <p className="text-gray-400 text-sm mb-4">Customize the title, generate a PNG, and upload it to your server. Then, update the <code>&lt;meta property="og:image"&gt;</code> tag in your HTML.</p>
            <div className="mb-4">
                <label htmlFor="previewTitle" className="block text-cyan-400 mb-1 text-sm">Preview Title</label>
                <input 
                    id="previewTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-black/50 border border-teal-500/50 p-2 rounded text-green-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>
        </div>

        <div className="flex-grow overflow-hidden relative flex items-center justify-center bg-black/50 rounded">
            <div className="w-[1200px] h-[630px] transform scale-[0.2] sm:scale-[0.4] md:scale-[0.6] origin-center" ref={previewRef}>
              <div className="w-full h-full bg-[#0a0a0a] text-green-400 p-12 text-left flex items-center justify-center">
                <div className="border-2 border-teal-500/30 w-full h-full p-12 flex flex-col justify-between">
                    <div>
                        <h1 className="text-6xl font-bold text-yellow-400 leading-tight">{title}</h1>
                        <p className="text-4xl mt-4 text-cyan-400">Dylan Boekelman</p>
                        <p className="text-2xl mt-2 text-gray-300">Systems & DevOps Engineer · Telephony & Audio-Visual Technologist</p>
                    </div>
                    <div className="text-right text-2xl">
                        <p>Explore the interactive shell at:</p>
                        <p className="text-yellow-400 font-bold mt-2">www.system8.com.au</p>
                    </div>
                </div>
              </div>
            </div>
        </div>

        <div className="flex-shrink-0 flex justify-end gap-4 mt-4">
            <button onClick={onClose} className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors">Close</button>
            <button onClick={handleGenerate} disabled={isGenerating} className="bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-500 transition-colors disabled:bg-teal-800 disabled:cursor-not-allowed">
                {isGenerating ? 'Generating...' : 'Generate & Download'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewGenerator;
