
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HistoryItem } from '../types';
import { PROFILE_SUMMARY, SKILLS, EXPERIENCE, PROJECTS, CONTACT, ADDITIONAL_INFO } from '../constants';
import { Experience } from '../types';
import ShareLinks from './ShareLinks';

interface TerminalProps {
    onExit: () => void;
    onTogglePreview: () => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-cyan-400 uppercase tracking-widest text-lg my-2 font-bold">{children}</h2>
);

const renderHelp = () => (
    <div>
        <p className="text-yellow-400">Available commands:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
            <li><span className="text-green-400 font-bold">whoami</span> - Display profile summary.</li>
            <li><span className="text-green-400 font-bold">skills</span> - List core skills and technologies.</li>
            <li><span className="text-green-400 font-bold">experience</span> - Show recent work experience.</li>
            <li><span className="text-green-400 font-bold">projects</span> - Display selected projects.</li>
            <li><span className="text-green-400 font-bold">contact</span> - Show contact information.</li>
            <li><span className="text-green-400 font-bold">more</span> - Additional information.</li>
            <li><span className="text-green-400 font-bold">all</span> - Display all sections.</li>
            <li><span className="text-green-400 font-bold">share</span> - Get links to share this portfolio.</li>
            <li><span className="text-green-400 font-bold">listen</span> - Use voice to issue a command.</li>
            <li><span className="text-green-400 font-bold">preview</span> - Generate a custom social media preview image.</li>
            <li><span className="text-green-400 font-bold">exit</span> - Return to the Heads-Up Display.</li>
            <li><span className="text-green-400 font-bold">clear</span> - Clear the terminal screen.</li>
        </ul>
    </div>
);

const renderWhoami = () => (
    <div>
        <SectionTitle>Profile</SectionTitle>
        <p className="text-gray-300 leading-relaxed">{PROFILE_SUMMARY}</p>
    </div>
);

const renderSkills = () => (
    <div>
        <SectionTitle>Core Skills</SectionTitle>
        <div className="grid md:grid-cols-2 gap-x-8">
            <div>
                <p className="font-bold text-yellow-400">{SKILLS.devops.label}</p>
                <ul className="list-disc list-inside text-gray-300 mt-1">
                    {SKILLS.devops.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
            <div className="mt-4 md:mt-0">
                <p className="font-bold text-yellow-400">{SKILLS.telephony.label}</p>
                <ul className="list-disc list-inside text-gray-300 mt-1">
                    {SKILLS.telephony.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
            {SKILLS.chips.map((chip, i) => (
                <span key={i} className="bg-teal-800 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full">{chip}</span>
            ))}
        </div>
    </div>
);

const renderExperience = () => (
    <div>
        <SectionTitle>Recent Experience</SectionTitle>
        <div className="space-y-4">
            {EXPERIENCE.map((job: Experience, i: number) => (
                <div key={i}>
                    <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className="text-yellow-400 font-bold">{job.title}</h3>
                        <p className="text-sm text-gray-500">{job.meta}</p>
                    </div>
                    {job.org && <p className="text-sm text-gray-400">{job.org}</p>}
                    {job.duties && (
                        <ul className="list-disc list-inside text-gray-300 mt-1">
                            {job.duties.map((duty, j) => <li key={j}>{duty}</li>)}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    </div>
);

const renderProjects = () => (
    <div>
        <SectionTitle>Selected Projects</SectionTitle>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
            {PROJECTS.map((project, i) => <li key={i}>{project}</li>)}
        </ul>
    </div>
);

const renderMore = () => (
    <div>
        <SectionTitle>Additional Info</SectionTitle>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
            {ADDITIONAL_INFO.map((info, i) => <li key={i}>{info}</li>)}
        </ul>
    </div>
);

const renderContact = () => (
    <div>
        <SectionTitle>Contact</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
            <p><span className="font-bold text-yellow-400">Location:</span> {CONTACT.location}</p>
            <p><span className="font-bold text-yellow-400">Mobile:</span> {CONTACT.mobile}</p>
            <p><span className="font-bold text-yellow-400">Email:</span> <a href={`mailto:${CONTACT.email}`} className="text-cyan-400 hover:underline">{CONTACT.email}</a></p>
            <p><span className="font-bold text-yellow-400">Web:</span> <a href={CONTACT.web} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{CONTACT.web}</a></p>
            <p><span className="font-bold text-yellow-400">GitHub:</span> <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{CONTACT.github}</a></p>
        </div>
    </div>
);

const renderAll = () => (
    <>
        {renderWhoami()}
        {renderSkills()}
        {renderExperience()}
        {renderProjects()}
        {renderMore()}
        {renderContact()}
    </>
);

const renderShare = () => (
    <div>
        <SectionTitle>Share Portfolio</SectionTitle>
        <ShareLinks />
    </div>
);

const Terminal: React.FC<TerminalProps> = ({ onExit, onTogglePreview }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([
        { id: 0, output: <div><p>Welcome to System 8. Type <span className="text-yellow-400">'help'</span> to see available commands.</p></div> }
    ]);
    const [voiceSupported, setVoiceSupported] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [voiceTranscript, setVoiceTranscript] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const quickCommands = [
        { label: 'Help', command: 'help' },
        { label: 'Profile', command: 'whoami' },
        { label: 'Skills', command: 'skills' },
        { label: 'Projects', command: 'projects' },
        { label: 'Contact', command: 'contact' },
        { label: 'Preview', command: 'preview' },
    ];

    const triggerHaptics = useCallback(() => {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(12);
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);
    
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const computeMobile = (matches: boolean) => {
            const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsMobile(touchCapable || matches);
        };

        computeMobile(mediaQuery.matches);
        const handleMediaChange = (event: MediaQueryListEvent) => computeMobile(event.matches);
        mediaQuery.addEventListener('change', handleMediaChange);

        return () => mediaQuery.removeEventListener('change', handleMediaChange);
    }, []);

    const startVoiceCapture = useCallback(() => {
        if (!voiceSupported || !recognitionRef.current) {
            return;
        }
        try {
            setVoiceTranscript('');
            recognitionRef.current.start();
            setIsListening(true);
        } catch (err) {
            console.error(err);
        }
    }, [voiceSupported]);

    const stopVoiceCapture = useCallback(() => {
        recognitionRef.current?.stop();
        setIsListening(false);
    }, []);

    const handleCommand = useCallback((command: string) => {
        let output: React.ReactNode;
        switch (command.toLowerCase()) {
            case 'help':
                output = renderHelp();
                break;
            case 'whoami':
                output = renderWhoami();
                break;
            case 'skills':
                output = renderSkills();
                break;
            case 'experience':
                output = renderExperience();
                break;
            case 'projects':
                output = renderProjects();
                break;
            case 'contact':
                output = renderContact();
                break;
            case 'more':
                output = renderMore();
                break;
            case 'all':
                output = renderAll();
                break;
            case 'share':
                output = renderShare();
                break;
            case 'listen':
                if (!voiceSupported) {
                    output = <p>Voice commands are not supported in this browser.</p>;
                    break;
                }
                output = <p>Listening for your command. Say anything from the help menu.</p>;
                setTimeout(startVoiceCapture, 250);
                break;
            case 'preview':
                output = <p>Opening social preview generator...</p>;
                setHistory(prev => [...prev, { id: prev.length, command, output }]);
                triggerHaptics();
                setTimeout(onTogglePreview, 500);
                return;
            case 'exit':
                output = <p>Returning to Heads-Up Display...</p>;
                setHistory(prev => [...prev, { id: prev.length, command, output }]);
                triggerHaptics();
                setTimeout(onExit, 500);
                return;
            case 'clear':
                setHistory([]);
                return;
            default:
                output = <p>Command not found: {command}. Type 'help' for a list of commands.</p>;
        }
        setHistory(prev => [...prev, { id: prev.length, command, output }]);
        triggerHaptics();
    }, [onExit, onTogglePreview, startVoiceCapture, triggerHaptics, voiceSupported]);

    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setVoiceSupported(false);
            return;
        }

        const recognition: SpeechRecognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join(' ')
                .trim();
            setVoiceTranscript(transcript);
            if (event.results[0]?.isFinal) {
                setIsListening(false);
                handleCommand(transcript);
            }
        };
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);
        recognitionRef.current = recognition;
        setVoiceSupported(true);

        return () => {
            recognitionRef.current?.stop();
        };
    }, [handleCommand]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;
        handleCommand(input);
        setInput('');
    };

    const handleQuickCommand = (command: string) => {
        handleCommand(command);
        setInput('');
        inputRef.current?.focus({ preventScroll: true } as any);
    };

    const handleInputFocus = () => {
        inputRef.current?.focus({ preventScroll: true } as any);
        triggerHaptics();
    };

    return (
        <div
            className="p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-green-400 text-sm sm:text-base flex flex-col pb-28 sm:pb-0"
            onClick={() => inputRef.current?.focus()}
            style={{ paddingBottom: isMobile ? 'calc(7rem + env(safe-area-inset-bottom, 0px))' : undefined }}
        >
            <div ref={scrollRef} className="flex-grow overflow-y-auto pr-2">
                {history.map(item => (
                    <div key={item.id} className="mb-2">
                        {item.command && (
                            <div className="flex items-center">
                                <span className="text-teal-400">system8@portfolio:~$</span>
                                <span className="ml-2 text-white">{item.command}</span>
                            </div>
                        )}
                        <div className="text-white">{item.output}</div>
                    </div>
                ))}
            </div>
            <div className="flex items-center flex-wrap gap-3 mt-3 text-xs text-gray-300">
                <div className="flex items-center gap-2 bg-teal-900/50 border border-teal-600/40 px-3 py-2 rounded">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <div>
                        <p className="text-cyan-300 font-semibold uppercase">Neural Uplink</p>
                        <p className="text-gray-400">Latency stabilized with adaptive beamforming.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-900/70 border border-cyan-600/40 px-3 py-2 rounded">
                    <span className={`h-2 w-2 rounded-full ${voiceSupported ? (isListening ? 'bg-green-400 animate-ping' : 'bg-cyan-300') : 'bg-gray-500'}`} />
                    <div>
                        <p className="text-cyan-300 font-semibold uppercase">Voice Link</p>
                        <p className="text-gray-400">{voiceSupported ? (isListening ? 'Capturing command...' : 'Ready for activation.') : 'Unavailable in this environment.'}</p>
                    </div>
                    <button
                        type="button"
                        onClick={isListening ? stopVoiceCapture : startVoiceCapture}
                        disabled={!voiceSupported}
                        className="ml-2 bg-teal-800 text-white px-3 py-1 rounded border border-teal-500/50 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {isListening ? 'Stop Listening' : 'Voice Command'}
                    </button>
                </div>
                {voiceTranscript && (
                    <div className="flex items-center gap-2 bg-black/60 border border-emerald-500/30 px-3 py-2 rounded text-[11px] tracking-tight" aria-live="polite" role="status">
                        <span className="uppercase text-emerald-300 font-semibold">Captured</span>
                        <span className="text-white">“{voiceTranscript}”</span>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center mt-2 bg-black/60 px-3 py-2 rounded-md border border-teal-700/30">
                <span className="text-teal-400">system8@portfolio:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow bg-transparent border-none text-white focus:outline-none ml-2 text-base sm:text-inherit"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    enterKeyHint="send"
                    inputMode="text"
                />
                 <div className="inline-block h-4 w-2 bg-green-400 cursor-blink" />
            </form>

            {isMobile && (
                <div className="fixed bottom-4 inset-x-3 sm:hidden z-20" role="group" aria-label="Mobile terminal controls">
                    <div className="bg-slate-950/80 border border-teal-700/40 shadow-2xl rounded-xl backdrop-blur p-3 space-y-2">
                        <div className="grid grid-cols-4 gap-2 text-[11px] text-white font-semibold">
                            <button
                                type="button"
                                onClick={handleInputFocus}
                                className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-teal-800/70 border border-teal-500/50 active:scale-[0.98] transition"
                            >
                                <span role="img" aria-hidden="true">⌨️</span>
                                Focus
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickCommand('share')}
                                className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-cyan-800/70 border border-cyan-500/50 active:scale-[0.98] transition"
                            >
                                <span role="img" aria-hidden="true">📤</span>
                                Share
                            </button>
                            <button
                                type="button"
                                onClick={isListening ? stopVoiceCapture : startVoiceCapture}
                                disabled={!voiceSupported}
                                className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg border active:scale-[0.98] transition ${voiceSupported ? 'bg-emerald-800/70 border-emerald-500/50' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                            >
                                <span role="img" aria-hidden="true">🎙️</span>
                                {isListening ? 'Stop' : 'Listen'}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickCommand('exit')}
                                className="flex items-center justify-center gap-1 px-2 py-2 rounded-lg bg-rose-900/70 border border-rose-500/50 active:scale-[0.98] transition"
                            >
                                <span role="img" aria-hidden="true">↩️</span>
                                Exit
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[11px] text-white font-semibold">
                            {quickCommands.map(({ label, command }) => (
                                <button
                                    key={command}
                                    type="button"
                                    onClick={() => handleQuickCommand(command)}
                                    className="px-2 py-2 rounded-lg bg-slate-800/70 border border-teal-600/40 active:scale-[0.98] transition"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        <p className="text-[10px] text-gray-300 text-center" aria-live="polite">
                            {voiceSupported ? (isListening ? 'Listening for your next command…' : 'Tap a quick action or use the keyboard to issue a command.') : 'Voice controls unavailable on this device.'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Terminal;
