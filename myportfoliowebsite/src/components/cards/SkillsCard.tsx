"use client"

import React, { useState, useEffect } from 'react';
import HoverText from '@/components/HoverText';
import VennDialComponent from '../skills/VennDialComponent';
import MobileCategoryButtons from '../skills/MobileCategoryButtons';
import { SkillSubCard } from './SkillSubCard';
import { SkillHalo } from '../skills/SkillHalo';
import { skillsData } from '@/data/skillsData';
import { getCategoryColor } from '@/utils/categoryColors';

interface SkillsCardProps {
    backgroundColor?: string;
}

export const SkillsCard: React.FC<SkillsCardProps> = ({ backgroundColor = "transparent" }) => {
    // State to track which category is selected (default to Languages)
    const [selectedCategory, setSelectedCategory] = useState<string>("Languages");
    
    // State for responsive dial size (10% smaller)
    const [dialSize, setDialSize] = useState<number>(270);
    
    // State for responsive halo radius
    const [haloRadius, setHaloRadius] = useState<number>(120);
    
    // Update dial size and halo radius based on viewport width
    useEffect(() => {
        const updateSizes = () => {
            const isMobile = window.innerWidth <= 768;
            
            // Dial size scaled down by 10%
            const newDialSize = Math.max(130, Math.min(300, window.innerWidth * 0.35)) * 0.85;
            setDialSize(newDialSize);
            
            // Halo radius: fixed larger size on mobile, responsive on desktop
            if (isMobile) {
                // Fixed larger radius on mobile (disable viewport-based shrinking)
                setHaloRadius(110);
            } else {
                // Halo radius scales between 100-140px based on viewport (more spacious)
                const newHaloRadius = Math.max(80, Math.min(150, window.innerWidth * 0.1)) * 0.85;
                setHaloRadius(newHaloRadius);
            }
        };
        
        // Set initial sizes
        updateSizes();
        
        // Add resize listener
        window.addEventListener('resize', updateSizes);
        
        // Cleanup
        return () => window.removeEventListener('resize', updateSizes);
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

    // Get featured skills for the current category
    const getFeaturedSkills = () => {
        if (!currentCategory || !currentCategory.featuredSkills) return [];
        
        return currentCategory.featuredSkills
            .map(featuredName => 
                currentCategory.skills.find(skill => skill.name === featuredName)
            )
            .filter(skill => skill !== undefined);
    };

    const featuredSkills = getFeaturedSkills();

    return (
        <div 
            className="fade-in div-scroll skills-card" 
            style={{
                /* Positioning */
                position: "relative",
                zIndex: 1,
                
                /* Layout */
                display: "grid",
                gridTemplateColumns: "45% 1fr",
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
            <div className="skills-text-section" style={{
                alignSelf: "center", 
                paddingLeft:"10%",
                paddingRight: "5%",
                width: "100%",
                boxSizing: "border-box"
            }}>
                <h1 className="skills-header" style={{margin: 0, marginBottom: "1rem"}}>
                    <HoverText text="My Skills" className="header-styling" />
                </h1>

                <p className="skills-excerpt paragraph-styling">
                    These are the technical skills I have touched throughout my journey, and my relative experience with them.
                </p>

                {/* Dynamic Skill Category Card */}
                {currentCategory && (
                    <div className="skills-subcard-wrapper">
                        <SkillSubCard 
                            key={currentCategory.id}
                            category={currentCategory} 
                        />
                    </div>
                )}
            </div>

            {/* Right Section - Visual/Interactive Element */}
            <div className="skills-visual-section" style={{
                display: "grid", 
                gridTemplateRows: "45% 55%",
                alignItems: "center", 
                justifyItems: "center",
                alignContent: "center",
                justifyContent: "center", 
                width: "100%",
                height: "100%",
                marginTop: "-20px",
                // backgroundColor:"black" DEBUG
            }}>
                {/* Top Section - Venn Diagram (Desktop) */}
                <div className="skills-dial-wrapper" style={{
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    width: "100%",
                    height: "100%",
                    marginTop: "-10px",
                    marginBottom: "10px",
                    // backgroundColor:"lime" DEBUG
                }}>
                    <div style={{
                        width: "100%",
                        maxWidth: "300px",
                        minWidth: "150px",
                        aspectRatio: "1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // backgroundColor: "red" DEBUG
                    }}>
                        <VennDialComponent 
                            size={dialSize}
                            onSelectionChange={(selected) => setSelectedCategory(selected)}
                        />
                    </div>
                </div>

                {/* Mobile Category Buttons (Mobile only) */}
                <div className="skills-mobile-buttons-wrapper">
                    <MobileCategoryButtons 
                        onSelectionChange={(selected) => setSelectedCategory(selected)}
                        initialSelection={selectedCategory}
                    />
                </div>

                {/* Bottom Section - Skill Halo */}
                <div className="skills-halo-wrapper" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    paddingTop:"15px",
                    width: "100%",
                    height: "100%",
                    // backgroundColor:"yellow" DEBUG
                }}>
                    {currentCategory && featuredSkills.length > 0 && (
                        <SkillHalo
                            key={currentCategory.id}
                            categoryId={currentCategory.id}
                            label={currentCategory.title}
                            skills={featuredSkills}
                            radius={haloRadius}
                            rotationSpeed={20}
                            direction="clockwise"
                            titleColor={getCategoryColor(currentCategory.title)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillsCard;
