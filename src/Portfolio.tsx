import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValue, useTransform, useMotionValueEvent } from 'framer-motion';

import Lenis from '@studio-freight/lenis';
import { ArrowUpRight, Mail, Github, Linkedin, ChevronDown, Copy, Check, Sun, Moon } from 'lucide-react';

// --- Data ---
const portfolioData = {
  personal: {
    name: "Indhar Jain",
    role: "Front-End Architect",
    bio: "Crafting scalable, high-performance web ecosystems. Specializing in micro-frontends and enterprise architecture.",
    email: "IndharJain@gmail.com",
    location: "Chennai, India",
    links: {
      github: "https://github.com/indharjain",
      linkedin: "https://linkedin.com/in/indhar-p"
    }
  },
  skills: [
    "React", "TypeScript", "Next.js", "Micro-Frontends", "Node.js", "GraphQL",
    "Tailwind CSS", "Framer Motion", "Docker", "AWS", "System Design", "UI/UX"
  ],
  projects: [
    {
      title: "AAVA Elderwand",
      desc: "Enterprise micro-frontend architecture enabling modular UI ecosystems.",
      tags: ["Microservices", "Module Federation", "React"],
      year: "2024"
    },
    {
      title: "Digital Ascender",
      desc: "AI-driven digital companion with real-time guidance interfaces.",
      tags: ["AI/ML", "NLP", "VS Code Plugin"],
      year: "2023"
    },
    {
      title: "Cloud Governance",
      desc: "Interactive visualization platform for cloud cost analytics.",
      tags: ["D3.js", "Highcharts", "Analytics"],
      year: "2023"
    },
    {
      title: "Accessibility Framework",
      desc: "Automated WCAG compliance testing suite with Chrome extension.",
      tags: ["A11y", "Chrome Ext", "Testing"],
      year: "2022"
    }
  ],
  experience: [
    {
      company: "Ascendion",
      role: "Engineer",
      period: "2023 — Present",
      details: "Leading micro-frontend architecture and design systems."
    },
    {
      company: "Ascendion",
      role: "Senior Associate",
      period: "2022 — 2023",
      details: "Developed AI interfaces and data visualization dashboards."
    },
    {
      company: "Enterprise Minds",
      role: "Junior Engineer",
      period: "2022 — 2023",
      details: "Built accessibility tools and component libraries."
    }
  ]
};

// --- Components ---

const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Detect current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme as 'light' | 'dark');

    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(newTheme as 'light' | 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let t = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Theme-aware colors
      const isLight = theme === 'light';
      const baseHue = isLight ? 30 : 200; // Warm for light, cool for dark
      const saturation = isLight ? 25 : 60;
      const lightness = isLight ? 75 : 15;
      const opacity = isLight ? 0.08 : 0.15;

      // Create flowing gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, `hsla(${baseHue}, ${saturation}%, ${lightness}%, 0)`);
      gradient.addColorStop(0.5, `hsla(${baseHue + t * 0.5}, ${saturation}%, ${lightness}%, ${opacity})`);
      gradient.addColorStop(1, `hsla(${baseHue}, ${saturation}%, ${lightness}%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw flowing waves
      ctx.lineWidth = isLight ? 1 : 2;
      for (let i = 0; i < (isLight ? 3 : 5); i++) {
        ctx.beginPath();
        const waveOpacity = isLight ? 0.02 : 0.05;
        ctx.strokeStyle = `hsla(${baseHue + t + i * 50}, ${saturation + 10}%, ${isLight ? 60 : 50}%, ${waveOpacity})`;
        for (let x = 0; x < width; x += 5) {
          const y = height / 2 +
            Math.sin(x * 0.005 + t * 0.02 + i) * 100 +
            Math.sin(x * 0.01 + t * 0.01) * 50;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += 0.5;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const SmartCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [mode, setMode] = useState<'default' | 'lens'>('default');

  // Optimize transformations by creating them once
  const lensX = useTransform(cursorX, x => x - 128);
  const lensY = useTransform(cursorY, y => y - 128);

  // Syntax Trail State
  const [trail, setTrail] = useState<{ x: number, y: number, char: string, id: number }[]>([]);
  const syntaxChars = ['{', '}', '<', '>', '/', ';', '*', '&&', '||', '=>', '[]'];

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add syntax trail
      if (mode === 'default' && Math.random() > 0.85) { // Reduce frequency slightly
        setTrail(prev => {
          const newTrail = [...prev, {
            x: e.clientX,
            y: e.clientY,
            char: syntaxChars[Math.floor(Math.random() * syntaxChars.length)],
            id: Date.now()
          }];
          return newTrail.slice(-10); // Keep only last 10
        });
      }
    };

    const checkTarget = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.distortion-target')) {
        setMode('lens');
        setTrail([]);
      } else {
        setMode('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkTarget);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkTarget);
    };
  }, [cursorX, cursorY, mode]);

  return (
    <>
      {/* Liquid Lens (Active only on 'lens' mode) */}
      {mode === 'lens' && (
        <>
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter id="liquidFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" result="warp" />
              <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="30" in="SourceGraphic" in2="warp" />
            </filter>
          </svg>
          <motion.div
            className="liquid-lens fixed top-0 left-0 w-64 h-64 rounded-full pointer-events-none z-[9999]"
            style={{
              x: lensX,
              y: lensY,
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            }}
          />
        </>
      )}

      {/* Syntax Trail (Active only on 'default' mode) */}
      {mode === 'default' && (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          {trail.map((point) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8 }}
              className="absolute text-[var(--text-secondary)] font-mono text-xs font-bold"
              style={{
                left: point.x,
                top: point.y,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {point.char}
            </motion.div>
          ))}
          {/* Terminal Block Cursor */}
          <motion.div
            className="absolute w-3 h-5 bg-[var(--text-primary)] animate-pulse"
            style={{
              x: cursorX,
              y: cursorY,
              translateX: "4px", // Offset slightly
              translateY: "4px"
            }}
          />
        </div>
      )}
    </>
  );
};

const ScrollToTop = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    setVisible(latest > 400);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0
      }}
      transition={{ duration: 0.3 }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] shadow-lg hover:scale-110 transition-transform"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      aria-label="Scroll to top"
    >
      <ChevronDown size={24} className="rotate-180" />
    </motion.button>
  );
};


const DecoderText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  const scramble = () => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <span
      className={`decoder-text inline-block cursor-default ${className}`}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  );
};

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Magnetic>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-3 rounded-full hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-primary)]"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </Magnetic>
  );
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setPosition(position);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card relative overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-8 transition-colors duration-300 ${className}`}
      style={{
        // @ts-ignore
        "--mouse-x": `${position.x}px`,
        "--mouse-y": `${position.y}px`,
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const Marquee = () => {
  return (
    <div className="relative flex w-full overflow-hidden py-10 bg-[var(--bg-secondary)]">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[var(--bg-secondary)] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[var(--bg-secondary)] to-transparent" />

      <div className="flex animate-marquee whitespace-nowrap pause-on-hover">
        {[...portfolioData.skills, ...portfolioData.skills, ...portfolioData.skills].map((skill, i) => (
          <div key={i} className="mx-8 flex items-center gap-2 text-[var(--text-secondary)] font-medium text-lg">
            <span className="w-2 h-2 rounded-full bg-[var(--text-secondary)] opacity-40" />
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-widest mb-12"
  >
    {children}
  </motion.h2>
);

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200);
    y.set(yPct * 200);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative transition-all duration-200 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ProjectCard = ({ project, index }: { project: typeof portfolioData.projects[0], index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });
  const yProgress = useTransform(scrollYProgress, [0, 1], [300, 0]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: opacityProgress,
        y: yProgress,
        scale: scaleProgress,
      }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
    >
      <TiltCard className="mb-8 perspective-1000">
        <SpotlightCard className="group h-full">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4 transform transition-transform group-hover:translate-z-10">
            <h3 className="text-2xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-primary)] transition-colors">
              {project.title}
            </h3>
            <span className="text-[var(--text-secondary)] font-mono text-sm">{project.year}</span>
          </div>

          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6 max-w-2xl transform transition-transform group-hover:translate-z-10">
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2 justify-between items-end transform transition-transform group-hover:translate-z-10">
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full border border-[var(--border-color)] text-xs text-[var(--text-secondary)] uppercase tracking-wider bg-[var(--bg-secondary)]">
                  {tag}
                </span>
              ))}
            </div>

            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              <ArrowUpRight className="w-6 h-6 text-[var(--text-primary)]" />
            </motion.div>
          </div>
        </SpotlightCard>
      </TiltCard>
    </motion.div>
  );
};

const ExperienceRow = ({ item, index }: { item: typeof portfolioData.experience[0], index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-[var(--border-color)] items-baseline hover:bg-[var(--bg-secondary)] transition-colors px-4 -mx-4 rounded-lg"
  >
    <div className="col-span-3 text-[var(--text-secondary)] font-mono text-sm">{item.period}</div>
    <div className="col-span-4 text-xl font-medium text-[var(--text-primary)]">{item.company}</div>
    <div className="col-span-5 text-[var(--text-secondary)]">{item.role}</div>
  </motion.div>
);

// Dynamic status messages
const statusMessages = {
  welcome: [
    "WELCOME, EXPLORER",
    "HELLO, VISITOR",
    "GREETINGS, TRAVELER",
    "WELCOME ABOARD",
    "NICE TO SEE YOU",
    "READY TO EXPLORE?"
  ],
  return: [
    "BACK SO SOON?",
    "WELCOME BACK",
    "MISSED SOMETHING?",
    "RETURN DETECTED",
    "GOOD TO SEE YOU AGAIN",
    "READY FOR MORE?"
  ]
};

const HolographicHeader = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState("");
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const lastScrollY = useRef(0);

  // Set random welcome message on mount
  useEffect(() => {
    const randomWelcome = statusMessages.welcome[Math.floor(Math.random() * statusMessages.welcome.length)];
    setMessage(randomWelcome);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const direction = latest > lastScrollY.current ? "down" : "up";

    // Track if user has scrolled down significantly
    if (latest > 200) {
      setHasScrolledDown(true);
    }

    // Show return message when scrolling back to top
    if (hasScrolledDown && latest < 50 && direction === "up") {
      const randomReturn = statusMessages.return[Math.floor(Math.random() * statusMessages.return.length)];
      setMessage(randomReturn);
      setHasScrolledDown(false); // Reset so next scroll down/up cycle works
    }

    if (latest < 50) {
      setVisible(true);
    } else {
      setVisible(direction === "up");
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-6 px-6 py-3 rounded-2xl bg-[var(--bg-primary)]/10 backdrop-blur-xl border border-[var(--text-primary)]/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]">

        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[var(--text-secondary)] uppercase">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <motion.span
            key={message}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.span>
        </div>

        <div className="w-px h-4 bg-[var(--text-primary)]/20" />

        {/* Logo */}
        <Magnetic>
          <span className="font-bold text-lg tracking-tighter cursor-pointer mix-blend-difference text-[var(--text-primary)]">IJ</span>
        </Magnetic>

        <div className="w-px h-4 bg-[var(--text-primary)]/20" />

        {/* Controls */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Magnetic>
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="px-4 py-1.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold tracking-wide hover:opacity-80 transition-opacity"
            >
              CONNECT
            </a>
          </Magnetic>
        </div>
      </div>
    </motion.nav>
  );
};

// --- Main ---

export default function Portfolio() {


  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.5, // Much slower, heavier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.7, // Reduce scroll speed
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500 relative selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      <SmartCursor />
      <AuroraBackground />
      <ScrollToTop />

      <HolographicHeader />

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
            <span className="text-[var(--text-secondary)] opacity-50"><DecoderText text="JAIN" /></span>
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
              <ProjectCard key={i} project={project} index={i} />
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
                  href="/Indhar_P_Front-End_Developer_Resume.pdf"
                  download="Indhar_Jain_Resume.pdf"
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
      <footer className="py-8 px-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[var(--text-secondary)] text-sm uppercase tracking-wider">
          <span>© 2024 Indhar Jain</span>
          <div className="flex gap-6">
            <span>Chennai, India</span>
            <span>Local Time: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}