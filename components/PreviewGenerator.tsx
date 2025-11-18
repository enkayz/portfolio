
import React, { useMemo, useRef, useState } from 'react';

interface PreviewGeneratorProps {
  onClose: () => void;
}

const PreviewGenerator: React.FC<PreviewGeneratorProps> = ({ onClose }) => {
  const DEFAULT_TITLE = "Dylan Boekelman – Systems & DevOps Engineer";
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cacheBust, setCacheBust] = useState(Date.now());
  const [loadError, setLoadError] = useState<string | null>(null);
  const previewRef = useRef<HTMLImageElement>(null);

  const previewUrl = useMemo(() => {
    const resolvedTitle = title.trim() || DEFAULT_TITLE;
    const encoded = encodeURIComponent(resolvedTitle);
    return `/.netlify/functions/social-preview?title=${encoded}&cb=${cacheBust}`;
  }, [title, cacheBust]);

  const handleRefresh = () => {
    setIsGenerating(true);
    setLoadError(null);
    setCacheBust(Date.now());
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const response = await fetch(previewUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch preview image');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'system8-social-preview.png';
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Unable to download preview image', error);
      setLoadError('Unable to download preview. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 font-mono">
      <div className="bg-[#0d1014] border-2 border-teal-500/30 p-4 sm:p-6 rounded-lg max-w-5xl w-full shadow-lg flex flex-col max-h-[90vh]">
        <div className="flex-shrink-0 mb-4 space-y-3">
          <h2 className="text-xl text-yellow-400 font-bold">Dynamic Social Preview Generator</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Generate 1200px × 600px Open Graph images directly from the Netlify function.
            Edit the title, refresh the preview, and download the production-ready PNG that will be served to Facebook and other crawlers.
          </p>
          <div className="grid gap-3 sm:grid-cols-3 sm:items-end">
            <div className="sm:col-span-2 space-y-2">
              <label htmlFor="previewTitle" className="block text-cyan-400 text-sm">Preview Title</label>
              <input
                id="previewTitle"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-teal-500/50 p-2 rounded text-green-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter the headline you want rendered"
              />
            </div>
            <button
              onClick={handleRefresh}
              className="h-10 sm:h-auto bg-teal-700 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition-colors"
            >
              Refresh Preview
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-hidden relative flex items-center justify-center bg-black/60 rounded border border-teal-500/20">
          <div className="w-full max-w-4xl aspect-[2/1] flex items-center justify-center p-4">
            <div className="w-[1200px] h-[600px] scale-[0.18] sm:scale-[0.28] md:scale-[0.42] lg:scale-[0.52] xl:scale-[0.62] origin-center shadow-[0_0_30px_rgba(0,255,255,0.25)] ring-1 ring-teal-500/30 rounded" >
              <img
                ref={previewRef}
                src={previewUrl}
                alt="Social preview"
                className="w-full h-full object-cover rounded"
                onLoad={() => setIsGenerating(false)}
                onError={() => {
                  setIsGenerating(false);
                  setLoadError('Failed to load preview. Try refreshing.');
                }}
              />
            </div>
          </div>
          {loadError && (
            <div className="absolute bottom-4 left-4 right-4 bg-red-900/60 border border-red-500/60 text-red-200 text-sm p-3 rounded">
              {loadError}
            </div>
          )}
        </div>

        <div className="flex-shrink-0 flex flex-wrap justify-end gap-3 mt-4">
          <button onClick={onClose} className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors">Close</button>
          <button onClick={handleDownload} disabled={isGenerating} className="bg-teal-600 text-white font-bold py-2 px-4 rounded hover:bg-teal-500 transition-colors disabled:bg-teal-800 disabled:cursor-not-allowed">
            {isGenerating ? 'Working...' : 'Download PNG from Function'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewGenerator;
