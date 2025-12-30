
import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
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
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const shellRef = useRef<HTMLDivElement>(null);
    const quickCommands = ['help', 'whoami', 'skills', 'projects', 'share', 'preview'];

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

    useLayoutEffect(() => {
        if (!shellRef.current) return undefined;
        const ctx = gsap.context(() => {
            gsap.to('.scan-line', {
                yPercent: 120,
                repeat: -1,
                duration: 3.2,
                ease: 'none',
            });

            gsap.to('.pulse-glow', {
                opacity: 0.85,
                repeat: -1,
                yoyo: true,
                duration: 2,
                ease: 'sine.inOut',
            });
        }, shellRef);

        return () => ctx.revert();
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
            ref={shellRef}
            className="relative p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-emerald-100 text-sm sm:text-base flex flex-col"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.3),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.35),transparent_30%)]" />
            <div className="absolute inset-0 scan-line bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent" />
            <div className="absolute inset-0 pulse-glow" />

            <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative mb-4 rounded-xl border border-emerald-600/50 bg-black/60 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-[0_0_40px_rgba(16,185,129,0.18)]"
            >
                <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-emerald-200">Neon Terminal</p>
                    <p className="text-lg font-semibold text-white">system8@portfolio:~$ shell engaged</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-emerald-200">
                    <div className="flex items-center gap-2 bg-emerald-900/50 border border-emerald-500/40 rounded-lg px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Link stable</span>
                    </div>
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={onExit}
                        className="rounded-lg border border-emerald-500/40 bg-emerald-900/40 px-3 py-2 text-emerald-100 hover:bg-emerald-800/60 transition"
                        type="button"
                    >
                        Exit HUD
                    </motion.button>
                </div>
            </motion.div>

            <div ref={scrollRef} className="relative flex-grow overflow-y-auto pr-2 space-y-2">
                <AnimatePresence>
                    {history.map(item => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            className="rounded-lg border border-emerald-500/20 bg-black/50 p-2"
                        >
                            {item.command && (
                                <div className="flex items-center text-emerald-200 mb-1">
                                    <span className="text-emerald-400">system8@portfolio:~$</span>
                                    <span className="ml-2 text-white">{item.command}</span>
                                </div>
                            )}
                            <div className="text-white leading-relaxed">{item.output}</div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="relative flex flex-col gap-3 mt-3 text-xs text-gray-300">
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 bg-emerald-900/50 border border-emerald-600/40 px-3 py-2 rounded">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                            <p className="text-emerald-200 font-semibold uppercase tracking-[0.08em]">Neural Uplink</p>
                            <p className="text-gray-400">Latency stabilized with adaptive beamforming.</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/70 border border-cyan-600/40 px-3 py-2 rounded">
                        <span className={`h-2 w-2 rounded-full ${voiceSupported ? (isListening ? 'bg-green-400 animate-ping' : 'bg-cyan-300') : 'bg-gray-500'}`} />
                        <div>
                            <p className="text-cyan-300 font-semibold uppercase tracking-[0.08em]">Voice Link</p>
                            <p className="text-gray-400">{voiceSupported ? (isListening ? 'Capturing command...' : 'Ready for activation.') : 'Unavailable in this environment.'}</p>
                        </div>
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            onClick={isListening ? stopVoiceCapture : startVoiceCapture}
                            disabled={!voiceSupported}
                            className="ml-2 bg-emerald-800 text-white px-3 py-1 rounded border border-emerald-500/50 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            {isListening ? 'Stop Listening' : 'Voice Command'}
                        </motion.button>
                    </div>
                    {voiceTranscript && (
                        <div className="flex items-center gap-2 bg-black/60 border border-emerald-500/30 px-3 py-2 rounded text-[11px] tracking-tight">
                            <span className="uppercase text-emerald-300 font-semibold">Captured</span>
                            <span className="text-white">“{voiceTranscript}”</span>
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="relative flex items-center rounded-lg border border-emerald-600/40 bg-black/60 px-3 py-2">
                    <span className="text-emerald-300">system8@portfolio:~$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow bg-transparent border-none text-white focus:outline-none ml-2"
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
                        inputMode="text"
                        enterKeyHint="go"
                    />
                    <div className="inline-block h-4 w-2 bg-emerald-300 cursor-blink" />
                </form>

                <div
                    className="sticky md:static bottom-0 left-0 right-0 -mx-4 md:mx-0 px-4 md:px-0 pb-4 md:pb-0 pt-3 bg-black/70 md:bg-transparent backdrop-blur-lg md:backdrop-blur-none border-t border-emerald-800/40 md:border-0"
                    style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)' }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] uppercase tracking-[0.12em] text-emerald-200">Quick controls</p>
                        <span className="text-[10px] text-gray-400">Tap to run a command</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {quickCommands.map((command) => (
                            <motion.button
                                key={command}
                                type="button"
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleQuickAction(command)}
                                className="px-3 py-2 text-xs rounded-lg bg-emerald-900/80 border border-emerald-700/60 text-white active:scale-95 transition-transform shadow-[0_0_12px_rgba(52,211,153,0.15)]"
                            >
                                {command}
                            </motion.button>
                        ))}
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickAction('listen')}
                            disabled={!voiceSupported}
                            className="px-3 py-2 text-xs rounded-lg bg-cyan-900/80 border border-cyan-700/60 text-white active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isListening ? 'Stop mic' : 'Voice' }
                        </motion.button>
                        <motion.button
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickAction('clear')}
                            className="px-3 py-2 text-xs rounded-lg bg-slate-900/80 border border-slate-700/60 text-white active:scale-95 transition-transform"
                        >
                            clear
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terminal;
