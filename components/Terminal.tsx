
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

const QUICK_COMMANDS = [
    { label: 'Help', command: 'help' },
    { label: 'Profile', command: 'whoami' },
    { label: 'Skills', command: 'skills' },
    { label: 'Projects', command: 'projects' },
    { label: 'Contact', command: 'contact' },
    { label: 'Preview', command: 'preview' },
];

const useHapticFeedback = () => {
    return useCallback(() => {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(12);
        }
    }, []);
};

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
    const quickCommands = ['help', 'whoami', 'skills', 'projects', 'share', 'preview'];

    const triggerHaptics = useCallback(() => {
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(12);
        }
    }, []);

    const triggerHaptics = useHapticFeedback();

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
            const touchCapable = 'ontouchstart' in window || (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0);
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

    const handleQuickAction = (command: string) => {
        if (command === 'listen') {
            isListening ? stopVoiceCapture() : startVoiceCapture();
            return;
        }
        handleCommand(command);
        inputRef.current?.focus();
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
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
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
                    inputMode="text"
                    enterKeyHint="go"
                />
                 <div className="inline-block h-4 w-2 bg-green-400 cursor-blink" />
            </form>

            <div
                className="md:hidden sticky bottom-0 left-0 right-0 -mx-4 mt-4 px-4 pb-4 pt-3 bg-black/70 backdrop-blur-lg border-t border-emerald-800/40"
                style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
            >
                <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-200">Quick controls</p>
                    <span className="text-[10px] text-gray-400">Tap to run a command</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {quickCommands.map((command) => (
                        <button
                            key={command}
                            type="button"
                            onClick={() => handleQuickAction(command)}
                            className="px-3 py-2 text-xs rounded-lg bg-emerald-900/80 border border-emerald-700/60 text-white active:scale-95 transition-transform"
                        >
                            {command}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={() => handleQuickAction('listen')}
                        disabled={!voiceSupported}
                        className="px-3 py-2 text-xs rounded-lg bg-cyan-900/80 border border-cyan-700/60 text-white active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isListening ? 'Stop mic' : 'Voice' }
                    </button>
                    <button
                        type="button"
                        onClick={() => handleQuickAction('clear')}
                        className="px-3 py-2 text-xs rounded-lg bg-slate-900/80 border border-slate-700/60 text-white active:scale-95 transition-transform"
                    >
                        clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
