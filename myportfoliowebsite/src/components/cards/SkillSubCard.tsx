"use client"

import React from 'react';
import { SkillCategory } from '@/data/skillsData';
import { getCategoryColor } from '@/utils/categoryColors';

interface SkillSubCardProps {
    category: SkillCategory;
}

export const SkillSubCard: React.FC<SkillSubCardProps> = ({ category }) => {
    const [isVisible, setIsVisible] = React.useState(false);

    // Trigger animation on mount or category change
    React.useEffect(() => {
        setIsVisible(false);
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, [category.id]);

    // Find max years for scaling the bars
    const maxYears = Math.max(...category.skills.map(skill => skill.years));
    
    // Get the appropriate color for this category
    const titleColor = getCategoryColor(category.title);

    return (
        <div 
            className="skill-subcard-scroll"
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                padding: "1.5rem",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                marginBottom: "1rem",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                maxHeight: "65vh",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box"
            }}
        >
            <h2 style={{ 
                margin: 0, 
                marginBottom: "0.75rem",
                color: titleColor,
                fontSize: "1.75rem",
                fontWeight: "600",
                fontFamily: "'Stack Sans Notch', sans-serif",
                wordBreak: "break-word"
            }}>
                {category.title}
            </h2>
            
            <p style={{ 
                margin: 0,
                marginBottom: "1.5rem",
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "0.95rem",
                lineHeight: "1.5",
                fontFamily: "'Outfit', sans-serif",
                wordBreak: "break-word"
            }}>
                {category.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {category.skills.map((skill, index) => {
                    const percentage = (skill.years / maxYears) * 100;
                    
                    return (
                        <div key={index} style={{ position: "relative" }}>
                            {/* Skill name and years */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "0.5rem",
                                gap: "0.5rem",
                                flexWrap: "wrap"
                            }}>
                                <span style={{
                                    color: "white",
                                    fontSize: "0.95rem",
                                    fontWeight: "500",
                                    fontFamily: "'Stack Sans Notch', sans-serif",
                                    wordBreak: "break-word",
                                    flex: "1 1 auto",
                                    minWidth: "0"
                                }}>
                                    {skill.name}
                                    {skill.note && (
                                        <span style={{
                                            marginLeft: "0.5rem",
                                            fontSize: "0.8rem",
                                            fontStyle: "italic",
                                            color: "rgba(255, 255, 255, 0.5)",
                                            fontFamily: "'Outfit', sans-serif",
                                            fontWeight: "400"
                                        }}>
                                            {skill.note}
                                        </span>
                                    )}
                                </span>
                                <span style={{
                                    color: "rgba(255, 255, 255, 0.6)",
                                    fontSize: "0.85rem",
                                    fontWeight: "400",
                                    fontFamily: "'Outfit', sans-serif",
                                    whiteSpace: "nowrap",
                                    flex: "0 0 auto"
                                }}>
                                    {skill.years} {skill.years === 1 ? 'year' : 'years'}
                                </span>
                            </div>

                            {/* Progress bar background */}
                            <div style={{
                                width: "100%",
                                height: "6px",
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                                borderRadius: "3px",
                                overflow: "hidden",
                                position: "relative"
                            }}>
                                {/* Progress bar fill */}
                                <div style={{
                                    width: `${percentage}%`,
                                    height: "100%",
                                    backgroundColor: skill.color,
                                    borderRadius: "3px",
                                    transition: "width 0.8s ease-out",
                                    boxShadow: `0 0 6px ${skill.color}30`
                                }} />
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

