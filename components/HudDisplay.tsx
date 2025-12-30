
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const cardVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: 'easeOut' } }),
  };

  return (
    <div className="p-4 h-full min-h-[calc(100vh-2rem)] sm:min-h-[calc(100vh-4rem)] font-mono text-emerald-100 text-sm sm:text-base flex flex-col relative">
      <div className="flex-grow overflow-y-auto pr-4 space-y-6">
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-900/70 via-black/70 to-sky-900/50 p-5 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_10%_20%,rgba(16,185,129,0.4),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.35),transparent_30%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(52,211,153,0.12),transparent),linear-gradient(-115deg,rgba(56,189,248,0.12),transparent)]" />
          <div className="relative grid gap-6 sm:grid-cols-3 items-center">
            <div className="sm:col-span-2 space-y-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-200">System 8 // Interactive dossier</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-emerald-50">Dylan Boekelman</h1>
              <p className="text-base sm:text-lg text-sky-200">Systems & DevOps Engineer · Telephony & Audio-Visual Technologist</p>
            </div>
            <div className="relative flex justify-end">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.03 }}
                onClick={onEnterShell}
                className="group rounded-xl border border-emerald-400/60 bg-emerald-900/50 px-4 py-3 sm:px-5 sm:py-4 text-left shadow-[0_0_25px_rgba(52,211,153,0.25)] transition"
              >
                <p className="text-xs uppercase tracking-[0.18em] text-emerald-100">Launch terminal</p>
                <div className="flex items-center gap-2 text-lg font-semibold text-white">
                  Engage shell
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <p className="text-[11px] text-emerald-200/80">Press any key or tap to connect</p>
                <div className="mt-2 h-[2px] w-full bg-gradient-to-r from-emerald-500 via-sky-400 to-transparent opacity-80" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        <motion.section
          id="profile"
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          custom={0}
          className="relative overflow-hidden rounded-xl border border-emerald-700/40 bg-black/40 p-5"
        >
          <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,rgba(52,211,153,0.06) 0%,rgba(14,165,233,0.08) 100%)]" />
          <div className="relative">
            <SectionTitle>Profile</SectionTitle>
            <p className="text-gray-200 leading-relaxed">{PROFILE_SUMMARY}</p>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          custom={1}
          className="relative overflow-hidden rounded-xl border border-sky-600/30 bg-gradient-to-br from-slate-950/60 via-slate-900/50 to-sky-950/40 p-5"
        >
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(140deg,rgba(56,189,248,0.08),transparent)]" />
          <div className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-gray-200">
            <SectionTitle>Contact</SectionTitle>
            <p><strong className="text-emerald-300">Mobile:</strong> {CONTACT.mobile}</p>
            <p><strong className="text-emerald-300">Email:</strong> <a href={`mailto:${CONTACT.email}`} className="text-sky-300 hover:underline">{CONTACT.email}</a></p>
            <p><strong className="text-emerald-300">Web:</strong> <a href={CONTACT.web} target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:underline">system8.com.au</a></p>
            <p><strong className="text-emerald-300">GitHub:</strong> <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:underline">enkayz</a></p>
            <p><strong className="text-emerald-300">Location:</strong> {CONTACT.location}</p>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          custom={2}
          className="relative overflow-hidden rounded-xl border border-emerald-700/40 bg-black/40 p-5"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(52,211,153,0.3),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(56,189,248,0.3),transparent_30%)]" />
          <div className="relative space-y-4">
            <SectionTitle>Core Skills</SectionTitle>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-bold text-emerald-200">{SKILLS.devops.label}</p>
                <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
                  {SKILLS.devops.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="md:mt-0">
                <p className="font-bold text-emerald-200">{SKILLS.telephony.label}</p>
                <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
                  {SKILLS.telephony.items.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {SKILLS.chips.map((chip, i) => (
                <span key={i} className="bg-emerald-900/60 border border-emerald-500/40 text-emerald-100 text-xs font-semibold px-3 py-1 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.2)]">{chip}</span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="experience"
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          custom={3}
          className="relative overflow-hidden rounded-xl border border-emerald-700/40 bg-slate-950/50 p-5"
        >
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(90deg,rgba(52,211,153,0.15)_0%,rgba(59,130,246,0.1)_50%,rgba(52,211,153,0.15)_100%)]" />
          <div className="relative space-y-4">
            <SectionTitle>Recent Experience</SectionTitle>
            <div className="space-y-4">
              {EXPERIENCE.map((job: Experience, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-3"
                >
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h3 className="text-emerald-200 font-bold">{job.title}</h3>
                    <p className="text-[11px] text-emerald-200/80">{job.meta}</p>
                  </div>
                  {job.org && <p className="text-sm text-gray-300">{job.org}</p>}
                  {job.duties && (
                    <ul className="list-disc list-inside text-gray-200 mt-2 space-y-1">
                      {job.duties.map((duty, j) => <li key={j}>{duty}</li>)}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          custom={4}
          className="relative overflow-hidden rounded-xl border border-emerald-700/40 bg-black/45 p-5"
        >
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_0%,rgba(56,189,248,0.4),transparent_35%)]" />
          <div className="relative">
            <SectionTitle>Selected Projects</SectionTitle>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              {PROJECTS.map((project, i) => <li key={i}>{project}</li>)}
            </ul>
          </div>
        </motion.section>

        <motion.section
          id="share"
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          custom={5}
          className="relative overflow-hidden rounded-xl border border-emerald-700/40 bg-emerald-950/40 p-5"
        >
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(115deg,rgba(52,211,153,0.25),transparent)]" />
          <div className="relative">
            <SectionTitle>Share</SectionTitle>
            <ShareLinks />
          </div>
        </motion.section>

        <motion.section
          id="more"
          variants={cardVariant}
          initial="hidden"
          animate="visible"
          custom={6}
          className="relative overflow-hidden rounded-xl border border-emerald-700/40 bg-black/50 p-5"
        >
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_30%,rgba(52,211,153,0.2),transparent_35%)]" />
          <div className="relative">
            <SectionTitle>Additional Info</SectionTitle>
            <ul className="list-disc list-inside text-gray-200 space-y-2">
              {ADDITIONAL_INFO.map((info, i) => <li key={i}>{info}</li>)}
            </ul>
          </div>
        </motion.section>
      </div>
      <div className="sticky bottom-0 left-0 right-0 w-full text-center p-3 bg-black/70 backdrop-blur-md border-t border-emerald-500/40">
        <span className="text-emerald-200 animate-pulse">Press any key to enter interactive shell…</span>
      </div>
    </div>
  );
};

export default HudDisplay;
