"use client"

import React, { useState, useEffect } from 'react';
import { Skill } from '@/data/skillsData';

interface SkillHaloProps {
    categoryId: string;
    label: string;
    description?: string;
    skills: Skill[];
    radius?: number;
    rotationSpeed?: number;
    direction?: "clockwise" | "counterclockwise";
    className?: string;
    paused?: boolean;
    titleColor?: string;
}

// Helper function to resolve logo paths
const getLogoPath = (skillName: string): string => {
    // Normalize skill names to match logo file names
    const nameMap: { [key: string]: string } = {
        "Python": "PythonLogo.png",
        "Java": "JavaLogo.png",
        "JavaScript/TypeScript": "TypeScriptLogo.png",
        "SQL": "SQLLogo.png",
        "HTML & CSS": "HTML5Logo.png",
        "React.js": "ReactLogo.jpg",
        "NumPy": "NumpyLogo.png",
        "SciPy": "ScipyLogo.png",
        "PostgreSQL": "PostgreSQLLogo.png",
        "Tailwind CSS": "TailwindLogo.png",
        "Git (GitHub/GitLab)": "GitLogo.png",
        "VS Code": "VSCodeLogo.png",
        "IntelliJ IDEA": "IntelliJLogo.png",
        "Azure Cloud": "AzureLogo.png",
        "Excel": "ExcelLogo.png",
        "ChatGPT & OpenAI API": "ChatGPTLogo.png",
        "Gemini": "GeminiLogo.png",
        "Cursor": "CursorLogo.jpg",
        "Microsoft Copilot": "MicrosoftCopilotLogo.png",
        "GitHub Copilot": "GithubCopilotLogo.png"
    };

    return `/images/skills/${nameMap[skillName] || 'default.png'}`;
};

export const SkillHalo: React.FC<SkillHaloProps> = ({
    categoryId,
    label,
    description,
    skills,
    radius = 120,
    rotationSpeed = 20,
    direction = "clockwise",
    className = "",
    paused = false,
    titleColor = "#ffac53"
}) => {
    const [isVisible, setIsVisible] = useState(false);
    // Initialize with safe default to avoid hydration mismatch
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            if (typeof window === 'undefined') return;
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Set initial value on mount (client-side only)
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Trigger animation on mount or category change (same as SkillSubCard)
    useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, [categoryId]);

    // Mobile scale multiplier - makes everything bigger on mobile
    const mobileScale = isMobile ? 1.3 : 1;

    // Adjust radius to account for container padding (only left/right now)
    // Scale up more on mobile
    const effectiveRadius = radius * 1.1 * mobileScale; // Scale up since we only have horizontal padding
    
    const animationDirection = direction === "clockwise" ? "normal" : "reverse";
    
    // Calculate positions for skills on the circle (15% smaller total, but scaled up on mobile)
    const getSkillPosition = (index: number, total: number) => {
        const angle = (2 * Math.PI * index) / total - Math.PI / 2; // Start at top
        const adjustedRadius = effectiveRadius * 0.95 * 0.9;
        const x = adjustedRadius * Math.cos(angle);
        const y = adjustedRadius * Math.sin(angle);
        return { x, y };
    };
    
    // Responsive logo size based on radius (15% smaller total, but bigger on mobile)
    const logoSize = Math.max(40, Math.min(55, effectiveRadius * 0.4)) * 0.95 * 0.9;
    
    // Responsive center card size - bigger on mobile
    const centerCardMaxWidth = Math.max(100, Math.min(160, effectiveRadius * 1.0)) * 0.95 * 0.9 * 0.9;
    
    // Responsive font size for center title - bigger on mobile
    const titleFontSize = Math.max(0.75, Math.min(1, effectiveRadius * 0.008)) * 0.9;

    return (
        <div 
            className={`skill-halo-container ${className}`}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "300px",
                paddingLeft: "30px",
                paddingRight:"30px",
                paddingTop:"10px",
                boxSizing: "border-box",
                overflow: "hidden",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
            }}
        >
            {/* Rotating ring container */}
            <div
                className="skill-halo-ring"
                key={`ring-${categoryId}`}
                style={{
                    position: "relative",
                    width: `${(effectiveRadius * 2 + 80 * mobileScale) * 0.95 * 0.9}px`,
                    height: `${(effectiveRadius * 2 + 80 * mobileScale) * 0.95 * 0.9}px`,
                    animation: paused ? 'none' : `rotateHalo ${rotationSpeed}s linear infinite ${animationDirection}`,
                    willChange: 'transform'
                }}
            >
                {/* Skill logos positioned on the ring */}
                {skills.map((skill, index) => {
                    const { x, y } = getSkillPosition(index, skills.length);
                    
                    return (
                        <div
                            key={`${categoryId}-${skill.name}-${index}`}
                            className="skill-logo-wrapper"
                            style={{
                                position: "absolute",
                                left: "50%",
                                top: "50%",
                                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`
                            }}
                        >
                            {/* Counter-rotating container to keep logo upright */}
                            <div
                                className="counter-rotate"
                                key={`counter-${categoryId}-${index}`}
                                style={{
                                    animation: paused ? 'none' : `counterRotateHalo ${rotationSpeed}s linear infinite ${animationDirection}`,
                                    willChange: 'transform'
                                }}
                            >
                                <div
                                    style={{
                                        width: `${logoSize}px`,
                                        height: `${logoSize}px`,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        backdropFilter: "blur(10px)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: `${8 * mobileScale}px`,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                        border: `${2 * mobileScale}px solid rgba(255,255,255,0.2)`
                                    }}
                                >
                                    <img
                                        src={getLogoPath(skill.name)}
                                        alt={skill.name}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Center card with label only */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    backdropFilter: "blur(20px)",
                    borderRadius: `${12 * mobileScale}px`,
                    border: `${1 * mobileScale}px solid rgba(255, 255, 255, 0.1)`,
                    padding: `${12 * mobileScale}px ${16 * mobileScale}px`,
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: `${centerCardMaxWidth}px`,
                    zIndex: 0,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
                }}
            >
                <h3
                    style={{
                        margin: 0,
                        color: titleColor,
                        fontSize: `${titleFontSize}rem`,
                        fontWeight: 600,
                        fontFamily: "'Stack Sans Notch', sans-serif"
                    }}
                >
                    {label}
                </h3>
            </div>
        </div>
    );
};

export default SkillHalo;

