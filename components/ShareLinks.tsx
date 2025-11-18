
import React, { useMemo, useState } from 'react';

const ShareLinks: React.FC = () => {
    const [copyText, setCopyText] = useState('Copy Link');
    const [shareError, setShareError] = useState('');
    const shareSupported = useMemo(() => typeof navigator !== 'undefined' && 'share' in navigator, []);

    const handleCopy = () => {
        // Fallback for http contexts
        if (!navigator.clipboard) {
            const textArea = document.createElement("textarea");
            textArea.value = window.location.href;
            textArea.style.position = "fixed"; // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setCopyText('Copied!');
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
                setCopyText('Error!');
            }
            document.body.removeChild(textArea);
            setTimeout(() => setCopyText('Copy Link'), 2000);
            return;
        }

        // Modern clipboard API for https contexts
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopyText('Copied!');
            setTimeout(() => setCopyText('Copy Link'), 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            setCopyText('Error!');
            setTimeout(() => setCopyText('Copy Link'), 2000);
        });
    };
    
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent("Check out this interactive portfolio for a Senior DevOps & Systems Engineer:");

    const handleNativeShare = async () => {
        if (!shareSupported) return;
        setShareError('');
        try {
            await navigator.share({
                title: 'System 8 Interactive Portfolio',
                text: 'Check out this interactive portfolio for a Senior DevOps & Systems Engineer:',
                url: window.location.href,
            });
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                setShareError('Share failed. Try the copy link option.');
            }
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-300">
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Twitter</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">LinkedIn</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Facebook</a>
            <button onClick={handleCopy} className="bg-teal-800 text-teal-200 text-xs font-semibold px-3 py-1 rounded hover:bg-teal-700 transition-colors focus:outline-none">
                {copyText}
            </button>
            {shareSupported && (
                <button
                    onClick={handleNativeShare}
                    className="bg-cyan-900 text-cyan-100 text-xs font-semibold px-3 py-1 rounded hover:bg-cyan-800 transition-colors border border-cyan-500/50"
                >
                    Share from device
                </button>
            )}
            {shareError && <span className="text-xs text-red-300">{shareError}</span>}
        </div>
    );
};

export default ShareLinks;
