import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ExperienceRow = ({ item, index }: { item: typeof portfolioData.experience[0], index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 border-t border-[var(--border-color)] items-baseline hover:bg-[var(--bg-secondary)] transition-colors px-4 -mx-4 rounded-lg"
    >
        <div className="col-span-3 text-[var(--text-secondary)] font-mono text-sm">{item.period}</div>
        <div className="col-span-4 text-xl font-medium text-[var(--text-primary)]">
            {item.company}
            <div className="text-sm text-[var(--text-secondary)] mt-1">{item.role}</div>
        </div>
        <div className="col-span-5 text-[var(--text-secondary)]">
            <ul className="list-disc pl-4 space-y-2">
                {Array.isArray(item.details) ? (
                    item.details.map((detail, i) => (
                        <li key={i} className="text-sm leading-relaxed">{detail}</li>
                    ))
                ) : (
                    <li className="text-sm leading-relaxed">{item.details}</li>
                )}
            </ul>
        </div>
    </motion.div>
);

export default ExperienceRow;
