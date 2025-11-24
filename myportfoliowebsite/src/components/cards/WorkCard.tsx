"use client"

import React, { useState, useEffect } from 'react';
import HoverText from '@/components/HoverText';

interface WorkCardProps {
    backgroundColor?: string;
}

interface WorkExperience {
    id: string;
    company: string;
    role: string;
    date: string;
    logo?: string; // Path to logo image
    color: string; // Color for this experience
    // Placeholder fields for detailed content
    whatIDid: string;
    impact: string;
    technologies?: string[];
    location?: string;
}

// Placeholder work experiences - ordered from earliest (top) to latest (bottom)
const workExperiences: WorkExperience[] = [
    {
        id: "exp1",
        company: "Company One",
        role: "Role One",
        date: "Jan 2020 - Dec 2020",
        color: "#fc8803", // Orange
        whatIDid: "Placeholder: What I did at Company One...",
        impact: "Placeholder: Impact at Company One...",
        technologies: ["Tech1", "Tech2"],
        location: "Location One"
    },
    {
        id: "exp2",
        company: "Company Two",
        role: "Role Two",
        date: "Jan 2021 - Dec 2021",
        color: "#1887f5", // Blue
        whatIDid: "Placeholder: What I did at Company Two...",
        impact: "Placeholder: Impact at Company Two...",
        technologies: ["Tech3", "Tech4"],
        location: "Location Two"
    },
    {
        id: "exp3",
        company: "Company Three",
        role: "Role Three",
        date: "Jan 2022 - Dec 2022",
        color: "#10B981", // Green
        whatIDid: "Placeholder: What I did at Company Three...",
        impact: "Placeholder: Impact at Company Three...",
        technologies: ["Tech5", "Tech6"],
        location: "Location Three"
    },
    {
        id: "exp4",
        company: "Company Four",
        role: "Role Four",
        date: "Jan 2023 - Dec 2023",
        color: "#a855f7", // Purple
        whatIDid: "Placeholder: What I did at Company Four...",
        impact: "Placeholder: Impact at Company Four...",
        technologies: ["Tech7", "Tech8"],
        location: "Location Four"
    },
    {
        id: "exp5",
        company: "Company Five",
        role: "Role Five",
        date: "Jan 2024 - Present",
        color: "#ff6b6b", // Red
        whatIDid: "Placeholder: What I did at Company Five...",
        impact: "Placeholder: Impact at Company Five...",
        technologies: ["Tech9", "Tech10"],
        location: "Location Five"
    }
];

// Slot placement pattern: 1, 7, 3, 9, 5 (then repeats)
// Slots 1-5 are left column, slots 6-10 are right column
const getSlotForIndex = (index: number): number => {
    const pattern = [1, 7, 3, 9, 5];
    return pattern[index % pattern.length];
};

const WorkCard: React.FC<WorkCardProps> = ({ backgroundColor = "transparent" }) => {
    const [selectedExperience, setSelectedExperience] = useState<WorkExperience>(workExperiences[0]);
    const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);
    const [isContentVisible, setIsContentVisible] = useState(true);
    const [displayedExperience, setDisplayedExperience] = useState<WorkExperience>(workExperiences[0]);
    const [viewportWidth, setViewportWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [isSmallViewport, setIsSmallViewport] = useState<boolean>(false);

    // Track viewport width for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setViewportWidth(width);
            // Small viewport mode triggers at ~70% of typical desktop width (around 1200px)
            setIsSmallViewport(width < 1200);
        };

        if (typeof window !== 'undefined') {
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    // Fade animation when experience changes
    useEffect(() => {
        if (selectedExperience.id !== displayedExperience.id) {
            setIsContentVisible(false);
            const updateTimer = setTimeout(() => {
                setDisplayedExperience(selectedExperience);
                setTimeout(() => {
                    setIsContentVisible(true);
                }, 50);
            }, 250);
            return () => clearTimeout(updateTimer);
        }
    }, [selectedExperience, displayedExperience.id]);

    // Create grid slots (10 total: 1-5 left, 6-10 right)
    const createTimelineSlots = () => {
        const slots: Array<{ slot: number; experience: WorkExperience | null }> = [];
        
        // Initialize all 10 slots as empty
        for (let i = 1; i <= 10; i++) {
            slots.push({ slot: i, experience: null });
        }
        
        // Place experiences according to pattern
        workExperiences.forEach((exp, index) => {
            const slot = getSlotForIndex(index);
            slots[slot - 1] = { slot, experience: exp };
        });
        
        return slots;
    };

    const timelineSlots = createTimelineSlots();

    const handleExperienceClick = (experience: WorkExperience) => {
        setSelectedExperience(experience);
    };

    const isLeftColumn = (slot: number) => slot >= 1 && slot <= 5;
    const isRightColumn = (slot: number) => slot >= 6 && slot <= 10;
    const getRowIndex = (slot: number) => {
        if (slot <= 5) return slot - 1;
        return slot - 6;
    };

    // Get color for an experience by its index
    const getExperienceColor = (experienceId: string): string => {
        const experience = workExperiences.find(exp => exp.id === experienceId);
        return experience?.color || "#fc8803"; // Default to orange if not found
    };

    
    return (
        <div 
            className="fade-in" 
            style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: "48% 1fr 48%",
                gridTemplateRows: isSmallViewport ? "1fr" : "1fr",
                gap: isSmallViewport ? "1rem" : "0",
                justifyContent: "center",
                justifyItems: "center",
                height: "calc(100vh - 2rem)",
                marginTop: "-0.5%",
                paddingRight: "1rem",
                overflow: "hidden",
                backgroundColor: backgroundColor
            }}
        >
            {/* Left Section - Work Experience Details */}
            <div className={isSmallViewport ? 'div-scroll' : ''} style={{
                // alignSelf: "center", 
                paddingLeft: "10%",
                paddingRight:"5%" ,
                width: "100%",
                boxSizing: "border-box",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflowY: isSmallViewport ? "auto" : "hidden",
                overflowX: "hidden",
                minHeight: "0",
                maxHeight: "100%"
            }}>
                {/* Header - Matches other pages */}
                <h1 style={{ 
                    margin: 0, 
                    marginTop: "2rem", 
                    marginBottom: "1rem",
                    flexShrink: 0
                }}>
                    <HoverText text="My Work Experience" className="header-styling" />
                </h1>

                {/* Detailed Work Experience Card */}
                <div style={{
                    flex: "1 1 0",
                    minHeight: "0",
                    width: "100%",
                    marginBottom: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    opacity: isContentVisible ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out"
                }}>
                    <div style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderRadius: "12px",
                        padding: isSmallViewport ? `${Math.max(1, Math.min(2, viewportWidth / 600))}rem` : "2rem",
                        border: `1px solid ${selectedExperience.id === hoveredExperience ? "#fc8803" : "rgba(255, 255, 255, 0.2)"}`,
                        transition: "border-color 0.3s ease",
                        height: "100%",
                        overflowY: "auto",
                        overflowX: "auto",
                        minHeight: "0"
                    }}>
                        {/* Role and Company */}
                        <h2 style={{
                            fontFamily: 'Stack Sans Notch, sans-serif',
                            fontWeight: 600,
                            fontSize: isSmallViewport ? `clamp(1.25rem, ${Math.max(1.25, Math.min(2, viewportWidth / 80))}rem, 2rem)` : "xx-large",
                            color: "#fc8803",
                            marginTop: 0,
                            marginBottom: "0.5rem"
                        }}>
                            {displayedExperience.role}
                        </h2>
                        <h3 style={{
                            fontFamily: 'Stack Sans Notch, sans-serif',
                            fontWeight: 400,
                            fontSize: isSmallViewport ? `clamp(1rem, ${Math.max(1, Math.min(1.5, viewportWidth / 100))}rem, 1.5rem)` : "x-large",
                            color: "white",
                            marginTop: 0,
                            marginBottom: "1rem"
                        }}>
                            {displayedExperience.company}
                        </h3>
                        
                        {/* Date and Location */}
                        <div style={{
                            display: "flex",
                            gap: "1rem",
                            marginBottom: "1.5rem",
                            flexWrap: "wrap"
                        }}>
                            <span className="paragraph-styling" style={{ 
                                color: "rgba(255, 255, 255, 0.8)",
                                fontSize: isSmallViewport ? `clamp(0.75rem, ${Math.max(0.75, Math.min(1, viewportWidth / 120))}rem, 1rem)` : undefined
                            }}>
                                📅 {displayedExperience.date}
                            </span>
                            {displayedExperience.location && (
                                <span className="paragraph-styling" style={{ 
                                    color: "rgba(255, 255, 255, 0.8)",
                                    fontSize: isSmallViewport ? `clamp(0.75rem, ${Math.max(0.75, Math.min(1, viewportWidth / 120))}rem, 1rem)` : undefined
                                }}>
                                    📍 {displayedExperience.location}
                                </span>
                            )}
                    </div>

                        {/* What I Did Section */}
                        <div style={{ marginBottom: "1.5rem" }}>
                            <h3 style={{
                                fontFamily: 'Stack Sans Notch, sans-serif',
                                fontWeight: 600,
                                fontSize: isSmallViewport ? `clamp(0.9rem, ${Math.max(0.9, Math.min(1.25, viewportWidth / 110))}rem, 1.25rem)` : "large",
                                color: "#fc8803",
                                marginBottom: "0.75rem",
                                marginTop: 0
                            }}>
                                What I Did
                            </h3>
                            <p className="paragraph-styling" style={{ 
                                margin: 0, 
                                whiteSpace: "pre-line",
                                fontSize: isSmallViewport ? `clamp(0.8rem, ${Math.max(0.8, Math.min(1, viewportWidth / 130))}rem, 1rem)` : undefined
                            }}>
                                {displayedExperience.whatIDid}
                            </p>
                        </div>

                        {/* Impact Section */}
                        <div style={{ marginBottom: "1.5rem" }}>
                            <h3 style={{
                                fontFamily: "Stack Sans Notch, sans-serif",
                                fontWeight: 600,
                                fontSize: isSmallViewport ? `clamp(0.9rem, ${Math.max(0.9, Math.min(1.25, viewportWidth / 110))}rem, 1.25rem)` : "large",
                                color: "#fc8803",
                                marginBottom: "0.75rem",
                                marginTop: 0
                            }}>
                                Impact
                            </h3>
                            <p className="paragraph-styling" style={{ 
                                margin: 0, 
                                whiteSpace: "pre-line",
                                fontSize: isSmallViewport ? `clamp(0.8rem, ${Math.max(0.8, Math.min(1, viewportWidth / 130))}rem, 1rem)` : undefined
                            }}>
                                {displayedExperience.impact}
                            </p>
            </div>

                        {/* Technologies */}
                        {displayedExperience.technologies && displayedExperience.technologies.length > 0 && (
            <div>
                                <h3 style={{
                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                    fontWeight: 600,
                                    fontSize: isSmallViewport ? `clamp(0.9rem, ${Math.max(0.9, Math.min(1.25, viewportWidth / 110))}rem, 1.25rem)` : "large",
                                    color: "#fc8803",
                                    marginBottom: "0.75rem",
                                    marginTop: 0
                                }}>
                                    Technologies
                                </h3>
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.5rem"
                                }}>
                                    {displayedExperience.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                padding: isSmallViewport ? `${Math.max(0.15, viewportWidth / 800)}rem ${Math.max(0.5, viewportWidth / 300)}rem` : "0.25rem 0.75rem",
                                                backgroundColor: "rgba(252, 136, 3, 0.2)",
                                                border: "1px solid rgba(252, 136, 3, 0.5)",
                                                borderRadius: "6px",
                                                fontSize: isSmallViewport ? `clamp(0.7rem, ${Math.max(0.7, Math.min(0.875, viewportWidth / 150))}rem, 0.875rem)` : "0.875rem",
                                                color: "#fc8803",
                                                fontFamily: 'Stack Sans Notch, sans-serif'
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            <div></div>

            {/* Right Section - Visual Vertical Timeline */}
            {isSmallViewport ? (
                // Small Viewport Version: Vertical Stack with Timeline Connections
            <div className='div-scroll' style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "100%", 
                    width: "100%",
                    minHeight: "0",
                    position: "relative",
                    padding: "1.6rem 0rem 2rem 1.5rem",
                    alignSelf: "stretch",
                    boxSizing: "border-box"
                }}>
                    {workExperiences.map((experience, index) => {
                        const isSelected = experience.id === selectedExperience.id;
                        const isHovered = experience.id === hoveredExperience;
                        const experienceColor = getExperienceColor(experience.id);
                        const isLast = index === workExperiences.length - 1;
                        
                        return (
                            <div key={experience.id} style={{
                                position: "relative",
                                marginBottom: isLast ? "0" : "1.6rem",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "90%"
                            }}>
                                {/* Connection Point */}
                                <div style={{
                                    position: "relative",
                                    width: isSelected ? "20px" : isHovered ? "18px" : "16px",
                                    height: isSelected ? "20px" : isHovered ? "18px" : "16px",
                                    backgroundColor: experienceColor,
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    transition: "all 0.3s ease",
                                    zIndex: 3,
                                    cursor: "pointer",
                                    marginBottom: "8px",
                                    boxShadow: isSelected 
                                        ? `0 0 15px ${experienceColor}, 0 0 25px ${experienceColor}` 
                                        : isHovered 
                                            ? `0 0 10px ${experienceColor}, 0 0 20px ${experienceColor}` 
                                            : `0 0 8px ${experienceColor}, 0 0 15px ${experienceColor}`
                                }}
                                onClick={() => handleExperienceClick(experience)}
                                onMouseEnter={() => setHoveredExperience(experience.id)}
                                onMouseLeave={() => setHoveredExperience(null)}
                                />
                                
                                {/* Experience Card */}
                                <div
                                    onClick={() => handleExperienceClick(experience)}
                                    onMouseEnter={() => setHoveredExperience(experience.id)}
                                    onMouseLeave={() => setHoveredExperience(null)}
                                    style={{
                                        backgroundColor: isSelected 
                                            ? `${experienceColor}30` 
                                            : isHovered 
                                                ? `${experienceColor}20` 
                                                : "rgba(0, 0, 0, 0.3)",
                                        border: `1px solid ${
                                            isSelected 
                                                ? experienceColor 
                                                : isHovered 
                                                    ? `${experienceColor}99` 
                                                    : "rgba(255, 255, 255, 0.2)"
                                        }`,
                                        borderRadius: "12px",
                                        padding: "0.8rem",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        transform: isHovered ? "scale(1.02)" : "scale(1)",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.8rem",
                                        overflow: "visible",
                                        width: "85%",
                                        minHeight: "80px",
                                        position: "relative",
                                        zIndex: 2
                                    }}
                                >
                                    {/* Logo placeholder */}
                                    <div style={{
                                        width: "50px",
                                        height: "50px",
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        borderRadius: "8px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    }}>
                                        {experience.logo ? (
                                            <img 
                                                src={experience.logo} 
                                                alt={experience.company}
                                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                            />
                                        ) : (
                                            <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.75rem" }}>
                                                Logo
                                            </span>
                                        )}
                </div>

                                    {/* Title and Date */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontFamily: 'Stack Sans Notch, sans-serif',
                                            fontWeight: 600,
                                            fontSize: "0.9rem",
                                            color: "white",
                                            marginBottom: "0.25rem"
                                        }}>
                                            {experience.role}
                                        </div>
                                        <div style={{
                                            fontFamily: 'Stack Sans Notch, sans-serif',
                                            fontWeight: 400,
                                            fontSize: "0.75rem",
                                            color: "rgba(255, 255, 255, 0.7)"
                                        }}>
                                            {experience.company}
                                        </div>
                                        <div style={{
                                            fontFamily: 'Stack Sans Notch, sans-serif',
                                            fontWeight: 400,
                                            fontSize: "0.7rem",
                                            color: "rgba(255, 255, 255, 0.5)",
                                            marginTop: "0.25rem"
                                        }}>
                                            {experience.date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                // Desktop Version: Three Column Timeline
                <div className='div-scroll' style={{
                    overflowY: "auto",
                    overflowX: viewportWidth < 600 ? "scroll" : "hidden",
                    height: "90%", 
                    width: "100%",
                    minWidth: "400px",
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(60px, auto) minmax(0, 1fr)",
                    position: "relative",
                    padding: "0.8rem 0.5rem",
                    marginRight:"5rem",
                    alignSelf: "center",
                    // backgroundColor:"rgba(100,100,100,0.5)" DEBUG
                }}>

                    {/* Left Column - Preview Cards */}
                    <div style={{
                        display: "grid",
                        gridTemplateRows: workExperiences.length > 5 ? `repeat(${workExperiences.length}, 1fr)` : "repeat(5, 1fr)",
                        gap: "0.6rem",
                        padding: "0.4rem",
                        position: "relative",
                        zIndex: 2,
                        overflow: "visible",
                        alignContent: workExperiences.length <= 5 ? "space-evenly" : "start",
                        // backgroundColor:"rgba(100,200,100,0.5)" DEBUG
                    }}>
                        {timelineSlots.filter(s => isLeftColumn(s.slot)).map((slotData, idx) => {
                            const experience = slotData.experience;
                            const rowIndex = idx;
                            const isSelected = experience?.id === selectedExperience.id;
                            const isHovered = experience?.id === hoveredExperience;
                            const experienceColor = experience ? getExperienceColor(experience.id) : "#fc8803";
                            
                            return (
                                <div
                                    key={`left-${rowIndex}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                        position: "relative",
                                        overflow: "visible",
                                        padding: "0.5rem"
                                    }}
                                >
                                    {experience ? (
                                        <div
                                            onClick={() => handleExperienceClick(experience)}
                                            onMouseEnter={() => setHoveredExperience(experience.id)}
                                            onMouseLeave={() => setHoveredExperience(null)}
                                            style={{
                                                backgroundColor: isSelected 
                                                    ? `${experienceColor}30` 
                                                    : isHovered 
                                                        ? `${experienceColor}20` 
                                                        : "rgba(0, 0, 0, 0.3)",
                                                border: `1px solid ${
                                                    isSelected 
                                                        ? experienceColor 
                                                        : isHovered 
                                                            ? `${experienceColor}99` 
                                                            : "rgba(255, 255, 255, 0.2)"
                                                }`,
                                                borderRadius: "12px",
                                                padding: "0.8rem",
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                transform: isHovered ? "scale(1.05)" : "scale(1)",
                                                width: "100%",
                                                maxWidth: "280px",
                                                minHeight: "64px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.8rem",
                                                overflow: "visible"
                                            }}
                                        >
                                            {/* Logo placeholder */}
                                            <div style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                borderRadius: "8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0
                                            }}>
                                                {experience.logo ? (
                                                    <img 
                                                        src={experience.logo} 
                                                        alt={experience.company}
                                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                    />
                                                ) : (
                                                    <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.75rem" }}>
                                                        Logo
                                                    </span>
                                                )}
                        </div>
                    
                                            {/* Title and Date */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 600,
                                                    fontSize: "0.9rem",
                                                    color: "white",
                                                    marginBottom: "0.25rem",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                }}>
                                                    {experience.role}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: "0.75rem",
                                                    color: "rgba(255, 255, 255, 0.7)",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                }}>
                                                    {experience.company}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: "0.7rem",
                                                    color: "rgba(255, 255, 255, 0.5)",
                                                    marginTop: "0.25rem"
                                                }}>
                                                    {experience.date}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ width: "100%" }}></div>
                                    )}
                                </div>
                            );
                        })}
                </div>

                    {/* Middle Column - Timeline Line with Connection Points */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: workExperiences.length <= 5 ? "center" : "flex-start",
                        position: "relative",
                        padding: workExperiences.length <= 5 ? "0.8rem 0" : "0.4rem 0",
                        zIndex: 1,
                        minWidth: "60px",
                        flexShrink: 0,
                        // backgroundColor:"rgba(200,100,100,0.5)" DEBUG
                    }}>
                        {/* Vertical Timeline Line */}
                        <div className='vertical-line' style={{
                            position: "absolute",
                            top: 0,
                            bottom: 0,
                            left: "50%",
                            width: "4px",
                            backgroundColor: "white",
                            borderRadius: "2px",
                            transform: "translateX(-50%)",
                            zIndex: 1
                        }}></div>
                        
                    {/* Connection Points on Timeline */}
                    {timelineSlots.map((slotData) => {
                        if (!slotData.experience) return null;
                        
                        const rowIndex = getRowIndex(slotData.slot);
                        const isSelected = slotData.experience.id === selectedExperience.id;
                        const isHovered = slotData.experience.id === hoveredExperience;
                        const experienceColor = getExperienceColor(slotData.experience.id);
                        
                        // Calculate position (each row is 20% of height, centered in row)
                        const topPosition = `${(rowIndex * 20) + 10}%`;
                        
                        return (
                            <div
                                key={`point-${slotData.slot}`}
                                style={{
                                    position: "absolute",
                                    top: topPosition,
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: isSelected ? "20px" : isHovered ? "18px" : "16px",
                                    height: isSelected ? "20px" : isHovered ? "18px" : "16px",
                                    backgroundColor: experienceColor,
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    transition: "all 0.3s ease",
                                    zIndex: 3,
                                    cursor: "pointer",
                                    boxShadow: isSelected 
                                        ? `0 0 15px ${experienceColor}, 0 0 25px ${experienceColor}` 
                                        : isHovered 
                                            ? `0 0 10px ${experienceColor}, 0 0 20px ${experienceColor}` 
                                            : `0 0 8px ${experienceColor}, 0 0 15px ${experienceColor}`
                                }}
                                onClick={() => handleExperienceClick(slotData.experience!)}
                                onMouseEnter={() => setHoveredExperience(slotData.experience!.id)}
                                onMouseLeave={() => setHoveredExperience(null)}
                            />
                        );
                    })}
                </div>

                    {/* Right Column - Preview Cards */}
                    <div style={{
                        display: "grid",
                        gridTemplateRows: workExperiences.length > 5 ? `repeat(${workExperiences.length}, 1fr)` : "repeat(5, 1fr)",
                        gap: "0.6rem",
                        padding: "0.4rem",
                        position: "relative",
                        zIndex: 2,
                        overflow: "visible",
                        alignContent: workExperiences.length <= 5 ? "space-evenly" : "start",
                        // backgroundColor:"rgba(100,100,200,0.5)" DEBUG
                    }}>
                        {timelineSlots.filter(s => isRightColumn(s.slot)).map((slotData, idx) => {
                            const experience = slotData.experience;
                            const rowIndex = idx;
                            const isSelected = experience?.id === selectedExperience.id;
                            const isHovered = experience?.id === hoveredExperience;
                            const experienceColor = experience ? getExperienceColor(experience.id) : "#fc8803";
                            
                            return (
                                <div
                                    key={`right-${rowIndex}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        position: "relative",
                                        overflow: "visible",
                                        padding: "0.5rem"
                                    }}
                                >
                                    {experience ? (
                                        <div
                                            onClick={() => handleExperienceClick(experience)}
                                            onMouseEnter={() => setHoveredExperience(experience.id)}
                                            onMouseLeave={() => setHoveredExperience(null)}
                                            style={{
                                                backgroundColor: isSelected 
                                                    ? `${experienceColor}30` 
                                                    : isHovered 
                                                        ? `${experienceColor}20` 
                                                        : "rgba(0, 0, 0, 0.3)",
                                                border: `1px solid ${
                                                    isSelected 
                                                        ? experienceColor 
                                                        : isHovered 
                                                            ? `${experienceColor}99` 
                                                            : "rgba(255, 255, 255, 0.2)"
                                                }`,
                                                borderRadius: "12px",
                                                padding: "0.8rem",
                                                cursor: "pointer",
                                                transition: "all 0.3s ease",
                                                transform: isHovered ? "scale(1.05)" : "scale(1)",
                                                width: "100%",
                                                maxWidth: "280px",
                                                minHeight: "64px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "0.8rem",
                                                overflow: "visible"
                                            }}
                                        >
                                            {/* Logo placeholder */}
                                            <div style={{
                                                width: "50px",
                                                height: "50px",
                                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                                borderRadius: "8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0
                                            }}>
                                                {experience.logo ? (
                                                    <img 
                                                        src={experience.logo} 
                                                        alt={experience.company}
                                                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                                    />
                                                ) : (
                                                    <span style={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.75rem" }}>
                                                        Logo
                                                    </span>
                                                )}
            </div>

                                            {/* Title and Date */}
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 600,
                                                    fontSize: "0.9rem",
                                                    color: "white",
                                                    marginBottom: "0.25rem",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                }}>
                                                    {experience.role}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: "0.75rem",
                                                    color: "rgba(255, 255, 255, 0.7)",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                }}>
                                                    {experience.company}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: "0.7rem",
                                                    color: "rgba(255, 255, 255, 0.5)",
                                                    marginTop: "0.25rem"
                                                }}>
                                                    {experience.date}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{ width: "100%" }}></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}


export default WorkCard;
