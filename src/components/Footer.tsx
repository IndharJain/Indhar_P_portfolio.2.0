import { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

const Footer = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <footer className="py-8 px-6 border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[var(--text-secondary)] text-sm uppercase tracking-wider">
                <span>© {new Date().getFullYear()} {portfolioData.personal.name}</span>
                <div className="flex gap-6">
                    <span>{portfolioData.personal.location}</span>
                    <span>
                        Local Time: {time.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
