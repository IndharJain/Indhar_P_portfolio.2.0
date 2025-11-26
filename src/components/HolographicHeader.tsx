import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Magnetic from './Magnetic';
import ThemeToggle from './ThemeToggle';
import { portfolioData } from '../data/portfolioData';

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
                    <span className="font-bold text-lg tracking-tighter cursor-pointer mix-blend-difference text-[var(--text-primary)]">IP</span>
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

export default HolographicHeader;
