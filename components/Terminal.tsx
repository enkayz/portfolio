import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HistoryItem, Experience } from '../types';
import {
  PROFILE_SUMMARY,
  SELECTED_WORK,
  SKILLS,
  DELIVERY_METHOD,
  QUALIFICATIONS,
  EXPERIENCE,
  TECHNICAL_REFERENCES,
  CONTACT,
  ADDITIONAL_INFO,
} from '../constants';
import ShareLinks from './ShareLinks';

interface TerminalProps { onExit: () => void; onTogglePreview: () => void; }
interface BrowserSpeechRecognitionResult { readonly 0: { transcript: string }; readonly isFinal: boolean; }
interface BrowserSpeechRecognitionEvent extends Event { readonly results: ArrayLike<BrowserSpeechRecognitionResult>; }
interface BrowserSpeechRecognition { lang: string; continuous: boolean; interimResults: boolean; onresult: ((event: BrowserSpeechRecognitionEvent) => void) | null; onend: (() => void) | null; onerror: (() => void) | null; start: () => void; stop: () => void; }
type BrowserSpeechRecognitionConstructor = new () => BrowserSpeechRecognition;

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => <h2 className="text-cyan-400 uppercase tracking-widest text-lg my-2 font-bold">{children}</h2>;
const renderHelp = () => <div><p className="text-yellow-400">Available commands:</p><ul className="list-disc list-inside mt-2 space-y-1">
  <li><b className="text-green-400">whoami</b> — profile summary</li><li><b className="text-green-400">work</b> — selected work</li><li><b className="text-green-400">skills</b> — areas of practice</li><li><b className="text-green-400">method</b> — way of working</li><li><b className="text-green-400">experience</b> — experience</li><li><b className="text-green-400">references</b> — articles and documentation</li><li><b className="text-green-400">contact</b> — contact routes</li><li><b className="text-green-400">all</b> — complete index</li><li><b className="text-green-400">share</b> — share links</li><li><b className="text-green-400">listen</b> — voice command</li><li><b className="text-green-400">exit</b> — return to portfolio</li><li><b className="text-green-400">clear</b> — clear screen</li>
</ul></div>;
const renderWhoami = () => <div><SectionTitle>Profile</SectionTitle><p className="text-gray-300 leading-relaxed">{PROFILE_SUMMARY}</p></div>;
const renderWork = () => <div><SectionTitle>Selected Work</SectionTitle><div className="space-y-3">{SELECTED_WORK.map((work) => <div key={work.url}><a href={work.url} target="_blank" rel="noopener noreferrer" className="text-yellow-400 font-bold hover:underline">{work.title} ↗</a><p className="text-gray-300">{work.summary}</p></div>)}</div></div>;
const renderSkills = () => <div><SectionTitle>Areas of Practice</SectionTitle><div className="grid md:grid-cols-2 gap-6">{[SKILLS.microsoft, SKILLS.integration].map((group) => <div key={group.label}><p className="font-bold text-yellow-400">{group.label}</p><ul className="list-disc list-outside ml-5 text-gray-300">{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div><div className="flex flex-wrap gap-2 mt-4">{SKILLS.chips.map((chip) => <span key={chip} className="bg-teal-800 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full">{chip}</span>)}</div></div>;
const renderMethod = () => <div><SectionTitle>How I Work</SectionTitle><div className="grid sm:grid-cols-2 gap-3">{DELIVERY_METHOD.map((step) => <div key={step.label} className="border border-teal-500/30 rounded p-3"><p className="text-yellow-400 font-bold">{step.label}</p><p className="text-gray-300 text-sm mt-1">{step.detail}</p></div>)}</div></div>;
const renderExperience = () => <div><SectionTitle>Experience</SectionTitle><div className="space-y-4">{EXPERIENCE.map((job: Experience) => <div key={`${job.title}-${job.meta}`}><div className="flex justify-between items-baseline flex-wrap gap-2"><h3 className="text-yellow-400 font-bold">{job.title}</h3><p className="text-sm text-gray-500">{job.meta}</p></div>{job.org && <p className="text-sm text-gray-400">{job.org}</p>}{job.duties && <ul className="list-disc list-outside ml-5 text-gray-300 mt-1">{job.duties.map((duty) => <li key={duty}>{duty}</li>)}</ul>}</div>)}</div></div>;
const renderBackground = () => <div><SectionTitle>Background</SectionTitle>{QUALIFICATIONS.map((item) => <div key={item.title} className="mb-3"><p className="text-yellow-400 font-bold">{item.title}</p><p className="text-gray-300">{item.detail}</p></div>)}<ul className="list-disc list-inside text-gray-300">{ADDITIONAL_INFO.map((item) => <li key={item}>{item}</li>)}</ul></div>;
const renderReferences = () => <div><SectionTitle>Articles &amp; Technical Notes</SectionTitle><p className="text-gray-300">The portfolio is concise; detailed reasoning and implementation references are published separately.</p><ul className="list-disc list-outside ml-5 text-gray-300 mt-2">{TECHNICAL_REFERENCES.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{reference.label}</a></li>)}</ul></div>;
const renderContact = () => <div><SectionTitle>Contact</SectionTitle><div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300"><p><b className="text-yellow-400">Location:</b> {CONTACT.location}</p><p><b className="text-yellow-400">Email:</b> <a href={`mailto:${CONTACT.email}`} className="text-cyan-400 hover:underline">{CONTACT.email}</a></p><p><b className="text-yellow-400">Web:</b> <a href={CONTACT.web} className="text-cyan-400 hover:underline">{CONTACT.web}</a></p><p><b className="text-yellow-400">GitHub:</b> <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@enkayz</a></p></div></div>;
const renderAll = () => <>{renderWhoami()}{renderWork()}{renderSkills()}{renderMethod()}{renderExperience()}{renderBackground()}{renderReferences()}{renderContact()}</>;
const renderShare = () => <div><SectionTitle>Share Portfolio</SectionTitle><ShareLinks /></div>;

const Terminal: React.FC<TerminalProps> = ({ onExit, onTogglePreview }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([{ id: 0, output: <p>System 8 portfolio index. Type <span className="text-yellow-400">help</span> for commands.</p> }]);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const quickCommands = ['help', 'work', 'skills', 'experience', 'references'];
  const triggerHaptics = useCallback(() => { if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(12); }, []);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [history]);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const startVoiceCapture = useCallback(() => { if (!voiceSupported || !recognitionRef.current) return; try { setVoiceTranscript(''); recognitionRef.current.start(); setIsListening(true); } catch (err) { console.error(err); } }, [voiceSupported]);
  const stopVoiceCapture = useCallback(() => { recognitionRef.current?.stop(); setIsListening(false); }, []);

  const handleCommand = useCallback((command: string) => {
    let output: React.ReactNode;
    switch (command.toLowerCase()) {
      case 'help': output = renderHelp(); break;
      case 'whoami': output = renderWhoami(); break;
      case 'work': case 'focus': case 'projects': output = renderWork(); break;
      case 'skills': output = renderSkills(); break;
      case 'method': output = renderMethod(); break;
      case 'experience': output = renderExperience(); break;
      case 'background': case 'credentials': case 'more': output = renderBackground(); break;
      case 'references': output = renderReferences(); break;
      case 'contact': output = renderContact(); break;
      case 'all': output = renderAll(); break;
      case 'share': output = renderShare(); break;
      case 'listen': if (!voiceSupported) { output = <p>Voice commands are unavailable in this browser.</p>; break; } output = <p>Listening for a command.</p>; setTimeout(startVoiceCapture, 250); break;
      case 'preview': output = <p>Opening preview generator…</p>; setHistory((prev) => [...prev, { id: prev.length, command, output }]); setTimeout(onTogglePreview, 300); return;
      case 'exit': output = <p>Returning to the portfolio…</p>; setHistory((prev) => [...prev, { id: prev.length, command, output }]); setTimeout(onExit, 300); return;
      case 'clear': setHistory([]); return;
      default: output = <p>Command not found: {command}. Type help.</p>;
    }
    setHistory((prev) => [...prev, { id: prev.length, command, output }]);
    triggerHaptics();
  }, [onExit, onTogglePreview, startVoiceCapture, triggerHaptics, voiceSupported]);

  useEffect(() => {
    const SpeechRecognitionConstructor = ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) as BrowserSpeechRecognitionConstructor | undefined;
    if (!SpeechRecognitionConstructor) return;
    const recognition = new SpeechRecognitionConstructor(); recognition.lang = 'en-AU'; recognition.continuous = false; recognition.interimResults = true;
    recognition.onresult = (event) => { const transcript = Array.from(event.results).map((result) => result[0].transcript).join(' ').trim(); setVoiceTranscript(transcript); if (event.results[0]?.isFinal) { setIsListening(false); handleCommand(transcript); } };
    recognition.onend = () => setIsListening(false); recognition.onerror = () => setIsListening(false); recognitionRef.current = recognition; setVoiceSupported(true);
    return () => recognitionRef.current?.stop();
  }, [handleCommand]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!input.trim()) return; handleCommand(input.trim()); setInput(''); };
  const handleQuickAction = (command: string) => { if (command === 'listen') { isListening ? stopVoiceCapture() : startVoiceCapture(); return; } handleCommand(command); inputRef.current?.focus(); };

  return <div className="p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-green-400 text-sm sm:text-base flex flex-col" onClick={() => inputRef.current?.focus()}>
    <div ref={scrollRef} className="flex-grow overflow-y-auto pr-2">{history.map((item) => <div key={item.id} className="mb-2">{item.command && <div><span className="text-teal-400">system8@portfolio:~$</span><span className="ml-2 text-white">{item.command}</span></div>}<div className="text-white">{item.output}</div></div>)}</div>
    <div className="flex items-center flex-wrap gap-3 mt-3 text-xs text-gray-300">
      <div className="flex items-center gap-2 bg-teal-900/50 border border-teal-600/40 px-3 py-2 rounded"><span className="h-2 w-2 rounded-full bg-emerald-400" /><div><p className="text-cyan-300 font-semibold uppercase">Portfolio index</p><p className="text-gray-400">Articles, documentation and selected work.</p></div></div>
      <div className="flex items-center gap-2 bg-slate-900/70 border border-cyan-600/40 px-3 py-2 rounded"><span className={`h-2 w-2 rounded-full ${voiceSupported ? (isListening ? 'bg-green-400 animate-ping' : 'bg-cyan-300') : 'bg-gray-500'}`} /><div><p className="text-cyan-300 font-semibold uppercase">Voice command</p><p className="text-gray-400">{voiceSupported ? (isListening ? 'Listening…' : 'Optional') : 'Unavailable'}</p></div><button type="button" onClick={isListening ? stopVoiceCapture : startVoiceCapture} disabled={!voiceSupported} className="ml-2 bg-teal-800 text-white px-3 py-1 rounded disabled:opacity-50">{isListening ? 'Stop' : 'Speak'}</button></div>
      {voiceTranscript && <span className="bg-black/60 border border-emerald-500/30 px-3 py-2 rounded text-white">“{voiceTranscript}”</span>}
    </div>
    <form onSubmit={handleSubmit} className="flex items-center mt-2"><span className="text-teal-400">system8@portfolio:~$</span><input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} className="flex-grow bg-transparent border-none text-white focus:outline-none ml-2" autoComplete="off" autoCapitalize="off" autoCorrect="off" /><span className="inline-block h-4 w-2 bg-green-400 cursor-blink" /></form>
    <div className="md:hidden sticky bottom-0 -mx-4 mt-4 px-4 pb-4 pt-3 bg-black/80 border-t border-emerald-800/40"><div className="flex flex-wrap gap-2">{quickCommands.map((command) => <button key={command} type="button" onClick={() => handleQuickAction(command)} className="px-3 py-2 text-xs rounded-lg bg-emerald-900/80 border border-emerald-700/60 text-white">{command}</button>)}<button type="button" onClick={() => handleQuickAction('clear')} className="px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white">clear</button></div></div>
  </div>;
};

export default Terminal;
