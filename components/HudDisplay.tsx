import React, { useEffect } from 'react';
import {
  PROFILE_SUMMARY,
  SELECTED_WORK,
  SKILLS,
  DELIVERY_METHOD,
  QUALIFICATIONS,
  EXPERIENCE,
  TECHNICAL_REFERENCES,
  CONTACT,
} from '../constants';
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
      if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta') return;
      onEnterShell();
    };
    window.addEventListener('keydown', handleKeyDown, { once: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEnterShell]);

  return (
    <div className="p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-green-400 text-sm sm:text-base flex flex-col relative">
      <div className="flex-grow overflow-y-auto pr-4">
        <header className="text-center mb-7">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">Dylan Boekelman</h1>
          <p className="text-base sm:text-lg text-cyan-400">Systems &amp; Automation Technologist</p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Microsoft 365 · systems integration · automation · technical recovery</p>
        </header>

        <section id="profile">
          <SectionTitle>Profile</SectionTitle>
          <p className="text-gray-300 leading-relaxed">{PROFILE_SUMMARY}</p>
        </section>

        <section id="practice">
          <SectionTitle>Areas of Practice</SectionTitle>
          <div className="grid md:grid-cols-2 gap-x-8">
            {[SKILLS.microsoft, SKILLS.integration].map((group) => (
              <div key={group.label} className="mt-2">
                <p className="font-bold text-yellow-400">{group.label}</p>
                <ul className="list-disc list-outside ml-5 text-gray-300 mt-1 space-y-1">
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {SKILLS.chips.map((chip) => <span key={chip} className="bg-teal-800 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full">{chip}</span>)}
          </div>
        </section>

        <section id="work">
          <SectionTitle>Selected Work</SectionTitle>
          <div className="grid md:grid-cols-2 gap-3">
            {SELECTED_WORK.map((work) => (
              <a key={work.url} href={work.url} target="_blank" rel="noopener noreferrer" className="border border-cyan-500/35 bg-cyan-950/20 rounded-lg p-4 hover:border-cyan-400 transition-colors">
                <h3 className="font-bold text-yellow-400">{work.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mt-2">{work.summary}</p>
                <span className="text-cyan-400 text-xs">Open evidence ↗</span>
              </a>
            ))}
          </div>
        </section>

        <section id="method">
          <SectionTitle>How I Work</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DELIVERY_METHOD.map((step) => (
              <div key={step.label} className="border border-teal-500/30 bg-black/30 rounded-lg p-3">
                <p className="font-bold text-yellow-400">{step.label}</p>
                <p className="text-sm text-gray-300 mt-1">{step.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="experience">
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-4">
            {EXPERIENCE.map((job: Experience) => (
              <div key={`${job.title}-${job.meta}`}>
                <div className="flex justify-between items-baseline flex-wrap gap-2">
                  <h3 className="text-yellow-400 font-bold">{job.title}</h3>
                  <p className="text-xs text-gray-500">{job.meta}</p>
                </div>
                {job.org && <p className="text-sm text-gray-400">{job.org}</p>}
                {job.duties && <ul className="list-disc list-outside ml-5 text-gray-300 mt-1">{job.duties.map((duty) => <li key={duty}>{duty}</li>)}</ul>}
              </div>
            ))}
          </div>
        </section>

        <section id="background">
          <SectionTitle>Background</SectionTitle>
          <div className="space-y-3">
            {QUALIFICATIONS.map((item) => (
              <div key={item.title}><h3 className="text-yellow-400 font-bold">{item.title}</h3><p className="text-gray-300">{item.detail}</p></div>
            ))}
          </div>
        </section>

        <section id="notes">
          <SectionTitle>Articles &amp; Technical Notes</SectionTitle>
          <p className="text-gray-300 leading-relaxed">The main portfolio stays concise. Detailed reasoning, control sets and case analyses are published separately.</p>
          <ul className="list-disc list-outside ml-5 text-gray-300 mt-2 space-y-1">
            {TECHNICAL_REFERENCES.map((reference) => <li key={reference.url}><a href={reference.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{reference.label}</a></li>)}
          </ul>
        </section>

        <section id="contact">
          <SectionTitle>Contact</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
            <p><strong>Email:</strong> <a href={`mailto:${CONTACT.email}`} className="text-cyan-400 hover:underline">{CONTACT.email}</a></p>
            <p><strong>Location:</strong> {CONTACT.location}</p>
            <p><strong>GitHub:</strong> <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">@enkayz</a></p>
            <p><strong>Web:</strong> <a href={CONTACT.web} className="text-cyan-400 hover:underline">system8.com.au</a></p>
          </div>
        </section>

        <section id="share"><SectionTitle>Share</SectionTitle><ShareLinks /></section>
      </div>
      <div className="sticky bottom-0 left-0 right-0 w-full text-center p-2 bg-black/70 border-t-2 border-teal-500/30">
        <span className="text-yellow-400">Press any key for the interactive index</span>
      </div>
    </div>
  );
};

export default HudDisplay;
