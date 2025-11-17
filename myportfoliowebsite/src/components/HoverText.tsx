import React from 'react';

interface HoverTextProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
}

const HoverText: React.FC<HoverTextProps> = ({ text, className, style }) => {
    return (
        <span className={className} style={style}>
            {text.split('').map((char, index) => (
                <span key={index}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
};

export default HoverText;

