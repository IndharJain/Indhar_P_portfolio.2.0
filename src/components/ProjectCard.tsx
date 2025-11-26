import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import TiltCard from './TiltCard';
import SpotlightCard from './SpotlightCard';

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

export default ProjectCard;
