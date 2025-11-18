"use client"

import React, { useState, useEffect } from 'react';
import HoverText from '@/components/HoverText';
import VennDialComponent from '../VennDialComponent';
import { SkillSubCard } from './SkillSubCard';
import { skillsData } from '@/data/skillsData';

interface SkillsCardProps {
    backgroundColor?: string;
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ backgroundColor = "transparent" }) => {
    // State to track which category is selected (default to Languages)
    const [selectedCategory, setSelectedCategory] = useState<string>("Languages");
    
    // State for responsive dial size
    const [dialSize, setDialSize] = useState<number>(300);
    
    // Update dial size based on viewport width
    useEffect(() => {
        const updateDialSize = () => {
            const newSize = Math.max(130, Math.min(300, window.innerWidth * 0.35));
            setDialSize(newSize);
        };
        
        // Set initial size
        updateDialSize();
        
        // Add resize listener
        window.addEventListener('resize', updateDialSize);
        
        // Cleanup
        return () => window.removeEventListener('resize', updateDialSize);
    }, []);

    // Map the selection to the correct category data
    const getCategoryData = () => {
        const categoryMap: { [key: string]: string } = {
            "Languages": "languages",
            "Frameworks": "frameworks",
            "Technologies": "technologies",
            "AI Tools": "aitools"
        };
        
        const categoryId = categoryMap[selectedCategory];
        return skillsData.find(cat => cat.id === categoryId);
    };

    const currentCategory = getCategoryData();

    return (
        <div 
            className="fade-in div-scroll" 
            style={{
                /* Positioning */
                position: "relative",
                zIndex: 1,
                
                /* Layout */
                display: "grid",
                gridTemplateColumns: "50% 1fr",
                justifyContent: "center",
                justifyItems: "center",
                
                /* Sizing */
                height: "calc(100vh - 2rem)",
                
                /* Spacing */
                marginTop: "-0.5%",
                paddingRight: "1rem",
                
                /* Overflow */
                overflowY: "auto",
                overflowX: "hidden",
                
                /* Appearance */
                backgroundColor: backgroundColor
            }}
        >
            {/* Text Content Section */}
            <div style={{
                alignSelf: "center", 
                paddingLeft:"10%",
                paddingRight: "5%",
                width: "100%",
                boxSizing: "border-box"
            }}>
                <h1 style={{margin: 0, marginBottom: "1rem"}}>
                    <HoverText text="My Skills" className="header-styling" />
                </h1>

                <p className='paragraph-styling'>
                    These are the technical skills I have touched throughout my journey, and my relative experience with them.
                </p>

                {/* Dynamic Skill Category Card */}
                {currentCategory && (
                    <SkillSubCard 
                        key={currentCategory.id}
                        category={currentCategory} 
                    />
                )}
            </div>

            {/* Right Section - Visual/Interactive Element */}
            <div style={{
                display: "grid", 
                gridTemplateRows: "40% 60%",
                alignItems: "center", 
                justifyItems: "center",
                alignContent: "center",
                justifyContent: "center", 
                width: "100%",
                height: "100%"
            }}>
                {/* Top Section - Venn Diagram */}
                <div style={{
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    width: "100%",
                    height: "100%"
                }}>
                    <div style={{
                        width: "100%",
                        maxWidth: "300px",
                        minWidth: "150px",
                        aspectRatio: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <VennDialComponent 
                            size={dialSize}
                            onSelectionChange={(selected) => setSelectedCategory(selected)}
                        />
                    </div>
                </div>

                {/* Bottom Section - Placeholder for Future Visual */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    width: "100%",
                    height: "100%"
                }}>
                    <p style={{
                        color: "rgba(255, 255, 255, 0.5)",
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "0.9rem"
                    }}>
                        Visual element / Icon grid / Chart goes here
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SkillsCard;
