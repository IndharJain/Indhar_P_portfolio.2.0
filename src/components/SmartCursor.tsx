import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const SmartCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation for the main cursor
    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if hovering over interactive elements
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.closest('.cursor-interactive')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
            <motion.div
                className="absolute rounded-full border border-white bg-white"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    width: 32,
                    height: 32,
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
                    opacity: isHovering ? 0.5 : 0.3,
                    backgroundColor: isHovering ? 'white' : 'transparent',
                }}
                transition={{
                    scale: { duration: 0.1 },
                    opacity: { duration: 0.2 },
                    backgroundColor: { duration: 0.2 }
                }}
            />
            <motion.div
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: 12, // Center dot relative to 32px circle (16 - 2/2 = 15, slightly off center if not careful, let's use fixed offset)
                    translateY: 12
                }}
            />
        </div>
    );
};

export default SmartCursor;
