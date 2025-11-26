import React, { useEffect, useRef, useState } from 'react';

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

            const isLight = theme === 'light';

            // Enhanced Light Mode Colors (Soft Blue/Purple/Pink) vs Dark Mode (Deep Blue/Cyan)
            // Light: Hue 200-260 (Blue to Purple), Saturation 60%, Lightness 90%
            // Dark: Hue 200 (Blue), Saturation 60%, Lightness 15%

            const baseHue = isLight ? 220 : 200;
            const saturation = isLight ? 70 : 60;
            const lightness = isLight ? 90 : 15;
            const opacity = isLight ? 0.4 : 0.15; // Higher opacity for light mode to be visible

            // Create flowing gradient background
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            if (isLight) {
                gradient.addColorStop(0, `hsla(210, 80%, 95%, 1)`);
                gradient.addColorStop(0.5, `hsla(260, 60%, 92%, 1)`);
                gradient.addColorStop(1, `hsla(300, 50%, 95%, 1)`);
            } else {
                gradient.addColorStop(0, `hsla(${baseHue}, ${saturation}%, ${lightness}%, 0)`);
                gradient.addColorStop(0.5, `hsla(${baseHue + t * 0.5}, ${saturation}%, ${lightness}%, ${opacity})`);
                gradient.addColorStop(1, `hsla(${baseHue}, ${saturation}%, ${lightness}%, 0)`);
            }

            // Only fill background in light mode to give it a base color, in dark mode it's transparent/overlay
            if (isLight) {
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            } else {
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            // Draw flowing waves
            ctx.lineWidth = isLight ? 2 : 2;
            const waveCount = isLight ? 5 : 5;

            for (let i = 0; i < waveCount; i++) {
                ctx.beginPath();
                const waveOpacity = isLight ? 0.3 : 0.05;

                // Dynamic hue shifting for waves
                const waveHue = isLight ? (baseHue + i * 30 + t * 10) % 360 : baseHue + t + i * 50;
                const waveSat = isLight ? 60 : saturation + 10;
                const waveLight = isLight ? 70 : 50;

                ctx.strokeStyle = `hsla(${waveHue}, ${waveSat}%, ${waveLight}%, ${waveOpacity})`;

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

export default AuroraBackground;
