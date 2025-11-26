import { useRef, useState } from 'react';

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const position = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        setPosition(position);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
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

export default SpotlightCard;
