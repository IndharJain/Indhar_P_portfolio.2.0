import { useState } from 'react';

const DecoderText = ({ text, className = "" }: { text: string; className?: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    const scramble = () => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((_, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }
            iterations += 1 / 3;
        }, 30);
    };

    return (
        <span
            className={`decoder-text inline-block cursor-default ${className}`}
            onMouseEnter={scramble}
        >
            {displayText}
        </span>
    );
};

export default DecoderText;
