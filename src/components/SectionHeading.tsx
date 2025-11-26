import React from 'react';
import { motion } from 'framer-motion';

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

export default SectionHeading;
