import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ChevronDown, Mail, Check, Copy, ArrowUpRight } from 'lucide-react';

import { portfolioData } from './data/portfolioData';
import AuroraBackground from './components/AuroraBackground';
import SmartCursor from './components/SmartCursor';
import ScrollToTop from './components/ScrollToTop';
import HolographicHeader from './components/HolographicHeader';
import DecoderText from './components/DecoderText';
import Marquee from './components/Marquee';
import SectionHeading from './components/SectionHeading';
import ProjectCard from './components/ProjectCard';
import ExperienceRow from './components/ExperienceRow';
import Magnetic from './components/Magnetic';
import Footer from './components/Footer';

import SmartScroll from './components/SmartScroll';

export default function Portfolio() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 relative selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      <SmartScroll />
      <SmartCursor />
      <ScrollToTop />
      <HolographicHeader />
      <AuroraBackground />

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
        {/* Hero Background Effect - Radial Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--text-primary)_0%,transparent_50%)] opacity-[0.03] dark:opacity-[0.08]" />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--text-primary)_0%,transparent_40%)] opacity-[0.05] dark:opacity-[0.15] pointer-events-none"
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, var(--text-primary) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 60%, var(--text-primary) 0%, transparent 40%)',
              'radial-gradient(circle at 50% 50%, var(--text-primary) 0%, transparent 40%)',
              'radial-gradient(circle at 30% 40%, var(--text-primary) 0%, transparent 40%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-5xl mx-auto w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] leading-[0.9] font-bold tracking-tighter mb-8 mix-blend-exclusion distortion-target"
          >
            <DecoderText text="INDHAR" />
            <br />
            <span className="text-[var(--text-secondary)] opacity-50"><DecoderText text="PREMCHAND" /></span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col md:flex-row gap-8 md:items-end justify-between max-w-4xl"
          >
            <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-lg leading-relaxed text-balance">
              {portfolioData.personal.bio}
            </p>

            <div className="flex gap-6">
              <a href={portfolioData.personal.links.github} target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors transform hover:scale-110">
                <Github size={28} />
              </a>
              <a href={portfolioData.personal.links.linkedin} target="_blank" rel="noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors transform hover:scale-110">
                <Linkedin size={28} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-6 animate-bounce"
        >
          <ChevronDown className="text-[var(--text-secondary)]" />
        </motion.div>
      </section>

      {/* Marquee Skills */}
      <section className="py-10 border-y border-[var(--border-color)]">
        <Marquee />
      </section>

      {/* Projects */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Projects Background - Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[var(--text-primary)]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Selected Work</SectionHeading>
          <div className="flex flex-col gap-4 relative">
            {portfolioData.projects.map((project, i) => (
              <ProjectCard key={i} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-32 px-6 bg-[var(--bg-secondary)] relative overflow-hidden">
        {/* Experience Background - Animated Grid */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,var(--text-primary)_50%,transparent_100%)] opacity-[0.02] dark:opacity-[0.05]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: '200% 100%' }}
        />
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Experience</SectionHeading>
          <div className="flex flex-col">
            {portfolioData.experience.map((item, i) => (
              <ExperienceRow key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-32 px-6 min-h-[80vh] flex flex-col justify-center relative overflow-hidden">
        {/* Contact Background - Intense Animated Gradients */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, var(--text-secondary) 0%, transparent 50%), radial-gradient(circle at 80% 70%, var(--text-secondary) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, var(--text-secondary) 0%, transparent 50%), radial-gradient(circle at 20% 70%, var(--text-secondary) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, var(--text-secondary) 0%, transparent 50%), radial-gradient(circle at 50% 50%, var(--text-secondary) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 30%, var(--text-secondary) 0%, transparent 50%), radial-gradient(circle at 80% 70%, var(--text-secondary) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: 0.08 }}
        />
        <div className="absolute inset-0 bg-[var(--bg-primary)]/50 backdrop-blur-[100px]" />

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <SectionHeading>Let's Connect</SectionHeading>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[8vw] md:text-[6vw] font-bold tracking-tighter leading-none mb-12">
              LET'S WORK
              <br />
              <span className="text-[var(--text-secondary)]">TOGETHER</span>
            </h2>

            {/* Contact Options Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Email Card */}
              <Magnetic>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group cursor-pointer p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-sm hover:bg-[var(--bg-secondary)] transition-all duration-300"
                  onClick={copyEmail}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-full bg-[var(--bg-secondary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all">
                      <Mail size={20} />
                    </div>
                    <span className="text-sm font-mono tracking-wider text-[var(--text-secondary)] uppercase">Email</span>
                  </div>
                  <p className="text-xl font-medium mb-2">{portfolioData.personal.email}</p>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    {copied ? (
                      <>
                        <Check size={14} className="text-green-500" />
                        <span className="text-green-500">Copied to clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Click to copy</span>
                      </>
                    )}
                  </div>
                </motion.div>
              </Magnetic>

              {/* Resume Download Card */}
              <Magnetic>
                <motion.a
                  href="/Indhar P Front End Developer Resume.pdf"
                  download="Indhar_P_Front-End_Developer_Resume.pdf"
                  whileHover={{ scale: 1.02 }}
                  className="group block p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--text-primary)] text-[var(--bg-primary)] hover:opacity-90 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-full bg-[var(--bg-primary)]/10">
                      <ArrowUpRight size={20} />
                    </div>
                    <span className="text-sm font-mono tracking-wider uppercase">Resume</span>
                  </div>
                  <p className="text-xl font-bold mb-2">Download CV</p>
                  <p className="text-sm opacity-70">View my full experience & skills</p>
                </motion.a>
              </Magnetic>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <Magnetic>
                <motion.a
                  href={portfolioData.personal.links.github}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-sm hover:bg-[var(--bg-secondary)] transition-all group"
                >
                  <Github size={20} />
                  <span className="font-medium">GitHub</span>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              </Magnetic>

              <Magnetic>
                <motion.a
                  href={portfolioData.personal.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)]/50 backdrop-blur-sm hover:bg-[var(--bg-secondary)] transition-all group"
                >
                  <Linkedin size={20} />
                  <span className="font-medium">LinkedIn</span>
                  <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
      <Footer />
    </div>
  );
}