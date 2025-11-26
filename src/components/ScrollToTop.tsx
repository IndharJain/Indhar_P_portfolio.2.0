import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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

export default ScrollToTop;
