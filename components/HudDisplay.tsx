
import React, { useEffect } from 'react';
import { PROFILE_SUMMARY, SKILLS, EXPERIENCE, PROJECTS, CONTACT, ADDITIONAL_INFO } from '../constants';
import { Experience } from '../types';
import ShareLinks from './ShareLinks';

interface HudDisplayProps {
  onEnterShell: () => void;
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-cyan-400 uppercase tracking-widest text-lg my-4 font-bold border-b-2 border-teal-500/30 pb-1">{children}</h2>
);

const HudDisplay: React.FC<HudDisplayProps> = ({ onEnterShell }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') {
        return;
      }
      onEnterShell();
    };

    window.addEventListener('keydown', handleKeyDown, { once: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnterShell]);

  return (
    <div className="p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-green-400 text-sm sm:text-base flex flex-col relative">
      <div className="flex-grow overflow-y-auto pr-4">
        <header className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">Dylan Boekelman</h1>
            <p className="text-base sm:text-lg text-cyan-400">Systems & DevOps Engineer · Telephony & Audio-Visual Technologist</p>
        </header>

        <section id="profile">
          <SectionTitle>Profile</SectionTitle>
          <p className="text-gray-300 leading-relaxed">{PROFILE_SUMMARY}</p>
        </section>

        <section id="contact">
          <SectionTitle>Contact</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 text-gray-300">
              <p><strong>Mobile:</strong> {CONTACT.mobile}</p>
              <p><strong>Email:</strong> <a href={`mailto:${CONTACT.email}`} className="text-cyan-400 hover:underline">{CONTACT.email}</a></p>
              <p><strong>Web:</strong> <a href={CONTACT.web} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">system8.com.au</a></p>
              <p><strong>GitHub:</strong> <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">enkayz</a></p>
              <p><strong>Location:</strong> {CONTACT.location}</p>
          </div>
        </section>

        <section id="skills">
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
        </section>
        
        <section id="experience">
          <SectionTitle>Recent Experience</SectionTitle>
          <div className="space-y-4">
            {EXPERIENCE.map((job: Experience, i: number) => (
                <div key={i}>
                    <div className="flex justify-between items-baseline flex-wrap">
                        <h3 className="text-yellow-400 font-bold">{job.title}</h3>
                        <p className="text-xs text-gray-500">{job.meta}</p>
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
        </section>

        <section id="projects">
          <SectionTitle>Selected Projects</SectionTitle>
           <ul className="list-disc list-inside text-gray-300 space-y-2">
            {PROJECTS.map((project, i) => <li key={i}>{project}</li>)}
        </ul>
        </section>

        <section id="share">
            <SectionTitle>Share</SectionTitle>
            <ShareLinks />
        </section>

      </div>
      <div className="sticky bottom-0 left-0 right-0 w-full text-center p-2 bg-black/50 border-t-2 border-teal-500/30">
        <span className="text-yellow-400 animate-pulse">Press any key to enter interactive shell...</span>
      </div>
    </div>
  );
};

export default HudDisplay;
