
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HistoryItem } from '../types';
import { PROFILE_SUMMARY, SKILLS, EXPERIENCE, PROJECTS, CONTACT, ADDITIONAL_INFO } from '../constants';
import { Experience } from '../types';
import ShareLinks from './ShareLinks';

interface TerminalProps {
    onExit: () => void;
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

const Terminal: React.FC<TerminalProps> = ({ onExit }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([
        { id: 0, output: <div><p>Welcome to System 8. Type <span className="text-yellow-400">'help'</span> to see available commands.</p></div> }
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);
    
    useEffect(() => {
        inputRef.current?.focus();
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
            case 'exit':
                output = <p>Returning to Heads-Up Display...</p>;
                setHistory(prev => [...prev, { id: prev.length, command, output }]);
                setTimeout(onExit, 500);
                return;
            case 'clear':
                setHistory([]);
                return;
            default:
                output = <p>Command not found: {command}. Type 'help' for a list of commands.</p>;
        }
        setHistory(prev => [...prev, { id: prev.length, command, output }]);
    }, [onExit]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;
        handleCommand(input);
        setInput('');
    };

    return (
        <div
            className="p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-green-400 text-sm sm:text-base flex flex-col"
            onClick={() => inputRef.current?.focus()}
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
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="text-teal-400">system8@portfolio:~$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow bg-transparent border-none text-white focus:outline-none ml-2"
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                />
                 <div className="inline-block h-4 w-2 bg-green-400 cursor-blink" />
            </form>
        </div>
    );
};

export default Terminal;