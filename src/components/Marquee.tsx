import { portfolioData } from '../data/portfolioData';

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

export default Marquee;
