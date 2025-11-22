"use client"

import React, { useState, useEffect } from 'react';
import HoverText from '@/components/HoverText';

interface ProjectCardProps {
    backgroundColor?: string;
}

interface Project {
    id: string;
    title: string;
    tagline: string;
    tags: string[];
    color: string;
    description: string;
    githubLink: string;
    productLink?: string; // Optional - only if project has a live demo
    period: string;
}

// Real project data
const projects: Project[] = [
    {
        id: "isolve",
        title: "ISolve",
        tagline: "Web Development Sidehustle",
        tags: ["React.js", "Tailwind CSS", "HTML5", "Node.js"],
        color: "#ff6b6b",
        description: "I've been working on iSolve as a bit of an ongoing side hustle with Harris, building a bunch of slick, responsive sites that pull in JavaScript/React.js, HTML5 and both regular + Tailwind CSS. We also use other external APIs as well like Web3Forms for more specific tasks as well. Built several responsive websites using ReactJS and Tailwind CSS, improving client retention by 50% through strategic UI design, performance tuning, and mobile-first development. Translated client needs into technical specifications across multiple projects, increasing online inquiries by 75% and reducing bounce rates by 40% through tailored, goal-driven frontend solutions.",
        githubLink: "https://github.com/taha-malik27/ISolve",
        productLink: "https://isolve.info/",
        period: "May 2025 - Present"
    },
    {
        id: "mindstream",
        title: "MINDStream",
        tagline: "Real-Time EEG Dashboard",
        tags: ["Python", "PyQt", "BrainFlow", "Signal Processing"],
        color: "#1887f5",
        description: "Designing a real-time EEG dashboard with PyQT, BrainFlow, Matplotlib, and VisPy, enabling EEG board integration, band filtering, and live signal visualizations, creating an end user friendly interface for 25+ researchers and students. Implementing GPU accelerated graphics, multithreaded data collection, trial timers, and signal processing, increasing experiment efficiency by 2× and boosting signal clarity by 3× through optimized gain, sampling, and noise filtering. Note: Check out the GUI_Development directory in the repository for the latest code!",
        githubLink: "https://github.com/MINDUofC/MINDEEG",
        productLink: "https://drive.google.com/drive/folders/1_QRY28tUKmzTXfE40aNRZEaNSN1qlqPe?usp=sharing",
        period: "Apr 2025 - Sep 2025"
    },
    {
        id: "capm-portfolio",
        title: "CAPM Portfolio Optimizer",
        tagline: "Portfolio Optimization & Forecasting",
        tags: ["Excel", "CAPM", "Financial Modeling", "Sharpe Ratio"],
        color: "#ffbe0b",
        description: "Built and optimized a 4-asset tangent portfolio in Excel, maximizing Sharpe to deliver 23.31% annualized return at 18.48% vol, outperforming 50 sample portfolios. Stress-tested CAPM through political shifts; post-2023 results showed alphas up to +22.8% (GLD) and −23.5% (VEA), leading me to recommend rolling-beta re-optimization. Clear takeaway: blend disciplined modeling with timely updates to keep portfolios risk-aware and realistic.",
        githubLink: "#", // Will be document download link
        period: "Mar 2025 - Apr 2025"
    },
    {
        id: "savorscope",
        title: "SavorScope",
        tagline: "Dietary Nutrition Tracker",
        tags: ["Java", "JavaFX", "OOP"],
        color: "#9b59b6",
        description: "SavorScope Tracker is a comprehensive dietary and activity tracking application designed to help users manage their nutritional intake and track their physical activity levels. The application allows users to log daily meals, track nutritional values, and calculate key health metrics like BMI and daily caloric needs. Built with JavaFX with user-centric features including meal logging, nutritional analysis, and custom reporting.",
        githubLink: "https://github.com/taha-malik27/SavorScope",
        period: "Feb 2024 - Apr 2024"
    },
    {
        id: "portfolio",
        title: "Personal Portfolio",
        tagline: "Interactive 3D Portfolio Experience",
        tags: ["Next.js", "Three.js", "React", "TypeScript"],
        color: "#fc8803",
        description: "A cutting-edge portfolio website featuring a fully interactive 3D room built with React Three Fiber and Three.js. The experience includes dual control modes (orbit and first-person with physics), custom 3D models, postprocessing effects, and dynamic lighting. Beyond the 3D room, the site showcases custom-built interactive components including a rotating skill halo visualization, Venn diagram category selector, particle backgrounds, smooth page transitions, and an image gallery system. Built entirely with Next.js 16, TypeScript, and Tailwind CSS v4, featuring responsive design that adapts seamlessly across all devices. The project demonstrates advanced React patterns, 3D graphics programming, physics simulation with Rapier, and modern web development practices with a cyberpunk-synthwave aesthetic throughout.",
        githubLink: "https://github.com/taha-malik27/myPortfolioWebsite",
        productLink: typeof window !== 'undefined' ? window.location.origin : 'https://your-portfolio.com',
        period: "Nov 2024 - Present"
    }
];

const ProjectCard: React.FC<ProjectCardProps> = ({ backgroundColor = "transparent" }) => {
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    const [isOneColumn, setIsOneColumn] = useState(false);
    
    // Check viewport width for responsive layout
    useEffect(() => {
        const checkWidth = () => {
            setIsOneColumn(window.innerWidth < 1400);
        };
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);
    
    return (
        <div 
            className="fade-in div-scroll" 
            style={{
                /* Positioning */
                position: "relative",
                zIndex: 1,
                
                /* Layout */
                display: "grid",
                gridTemplateColumns: "48% 4% 48%",
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
            {/* Left Section - Project Cards Grid */}
            <div style={{
                alignSelf: "center", 
                paddingLeft:"10%",
                paddingRight: "5%",
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                maxHeight: "calc(100vh - 2rem)"
            }}>
                {/* Header - Outside scrollable area */}
                <h1 style={{margin: 0, marginBottom: "1.5rem"}}>
                    <HoverText text="My Projects" className="header-styling" />
                </h1>

                {/* Scrollable Projects Grid */}
                <div style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    paddingBottom: "1rem",
                    flex: 1
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: isOneColumn ? "1fr" : "1fr 1fr",
                        gap: "1.5rem"
                    }}>
                        {projects.map((project, index) => {
                            const isLastAndOdd = !isOneColumn && index === projects.length - 1 && projects.length % 2 !== 0;
                            const isSelected = selectedProject.id === project.id;
                            const isHovered = hoveredProject === project.id;
                        
                        return (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                style={{
                                    gridColumn: isLastAndOdd ? "1 / -1" : "auto",
                                    maxWidth: isLastAndOdd ? "calc(50% - 0.75rem)" : "100%",
                                    marginLeft: isLastAndOdd ? "auto" : "0",
                                    marginRight: isLastAndOdd ? "auto" : "0",
                                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                                    border: `2px solid ${isSelected ? project.color : isHovered ? project.color + '80' : 'rgba(255, 255, 255, 0.1)'}`,
                                    borderRadius: "12px",
                                    padding: "1.5rem",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    transform: isHovered ? 'translateY(-5px) scale(1.02)' : isSelected ? 'scale(1.0)' : 'scale(1)',
                                    boxShadow: isSelected 
                                        ? `0 8px 24px ${project.color}40, 0 0 0 3px ${project.color}20`
                                        : isHovered 
                                        ? `0 8px 20px rgba(0, 0, 0, 0.4)` 
                                        : '0 2px 8px rgba(0, 0, 0, 0.2)',
                                    position: "relative",
                                    overflow: "hidden"
                                }}
                            >
                                {/* Animated background gradient on hover */}
                                <div style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: `linear-gradient(135deg, ${project.color}10, transparent)`,
                                    opacity: isHovered || isSelected ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                    pointerEvents: "none"
                                }} />

                                {/* Content */}
                                <div style={{ position: "relative", zIndex: 1 }}>
                                    <h3 style={{
                                        margin: 0,
                                        marginBottom: "0.5rem",
                                        color: isSelected ? project.color : "#ffffff",
                                        fontSize: "1.25rem",
                                        fontWeight: 600,
                                        fontFamily: "'Stack Sans Notch', sans-serif",
                                        transition: "color 0.3s ease"
                                    }}>
                                        {project.title}
                                    </h3>

                                    <p style={{
                                        margin: 0,
                                        marginBottom: "0.5rem",
                                        color: "rgba(255, 255, 255, 0.5)",
                                        fontSize: "0.75rem",
                                        fontFamily: "'Outfit', sans-serif",
                                        fontStyle: "italic"
                                    }}>
                                        {project.period}
                                    </p>

                                    <p style={{
                                        margin: 0,
                                        marginBottom: "1rem",
                                        color: "rgba(255, 255, 255, 0.7)",
                                        fontSize: "0.85rem",
                                        lineHeight: "1.4",
                                        fontFamily: "'Outfit', sans-serif"
                                    }}>
                                        {project.tagline}
                                    </p>

                                    {/* Tags */}
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "0.5rem"
                                    }}>
                                        {project.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    backgroundColor: isSelected ? `${project.color}30` : "rgba(255, 255, 255, 0.1)",
                                                    color: isSelected ? project.color : "rgba(255, 255, 255, 0.8)",
                                                    padding: "0.25rem 0.75rem",
                                                    borderRadius: "12px",
                                                    fontSize: "0.7rem",
                                                    fontFamily: "'Outfit', sans-serif",
                                                    fontWeight: 500,
                                                    transition: "all 0.3s ease"
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Selected indicator */}
                                {isSelected && (
                                    <div style={{
                                        position: "absolute",
                                        top: "1rem",
                                        right: "1rem",
                                        width: "12px",
                                        height: "12px",
                                        borderRadius: "50%",
                                        backgroundColor: project.color,
                                        boxShadow: `0 0 12px ${project.color}`,
                                        animation: "pulse 2s infinite"
                                    }} />
                                )}
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>

            <div></div>

            {/* Right Section - Project Details */}
            <div style={{
                display: "grid", 
                gridTemplateRows: "60% 40%",
                alignItems: "start", 
                justifyContent: "center", 
                paddingRight: "22%", 
                paddingTop: "5%", 
                paddingLeft: "12%",
                width: "100%",
                height: "80%", // Reduced from 100% to 80%
                gap: "2rem"
            }}>
                {/* Top Section - Detailed Description + Links */}
                <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem"
                }}>
                    {/* Title with color */}
                    <h2 style={{
                        margin: 0,
                        color: selectedProject.color,
                        fontSize: "2rem",
                        fontWeight: 700,
                        fontFamily: "'Stack Sans Notch', sans-serif",
                        textShadow: `0 0 20px ${selectedProject.color}40`
                    }}>
                        {selectedProject.title}
                    </h2>

                    {/* Period */}
                    <p style={{
                        margin: 0,
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "0.9rem",
                        fontFamily: "'Outfit', sans-serif",
                        fontStyle: "italic"
                    }}>
                        {selectedProject.period}
                    </p>

                    {/* Description */}
                    <div style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        border: `1px solid ${selectedProject.color}40`,
                        flex: 1,
                        overflowY: "auto"
                    }}>
                        <p style={{
                            margin: 0,
                            color: "rgba(255, 255, 255, 0.9)",
                            fontSize: "0.95rem",
                            lineHeight: "1.6",
                            fontFamily: "'Outfit', sans-serif"
                        }}>
                            {selectedProject.description}
                        </p>
                    </div>

                    {/* Links */}
                    <div style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: selectedProject.productLink ? "stretch" : "center"
                    }}>
                        {/* GitHub button - always visible */}
                        <a
                            href={selectedProject.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                flex: selectedProject.productLink ? 1 : "0 0 auto",
                                minWidth: selectedProject.productLink ? "auto" : "200px",
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                border: `2px solid ${selectedProject.color}`,
                                borderRadius: "8px",
                                padding: "0.75rem 1.5rem",
                                color: selectedProject.color,
                                fontSize: "0.9rem",
                                fontWeight: 600,
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                textAlign: "center",
                                textDecoration: "none",
                                transition: "all 0.3s ease",
                                cursor: "pointer"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = `${selectedProject.color}20`;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            → GitHub
                        </a>

                        {/* Check it out button - conditional */}
                        {selectedProject.productLink && (
                            <a
                                href={selectedProject.productLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    flex: 1,
                                    backgroundColor: selectedProject.color,
                                    border: `2px solid ${selectedProject.color}`,
                                    borderRadius: "8px",
                                    padding: "0.75rem 1.5rem",
                                    color: "#000000",
                                    fontSize: "0.9rem",
                                    fontWeight: 600,
                                    fontFamily: "'Stack Sans Notch', sans-serif",
                                    textAlign: "center",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = `0 8px 20px ${selectedProject.color}60`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                → Check it Out
                            </a>
                        )}
                    </div>
                </div>

                {/* Bottom Section - Visual Content Placeholder */}
                <div style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: `1px solid ${selectedProject.color}20`,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255, 255, 255, 0.4)",
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "0.9rem",
                    fontStyle: "italic"
                }}>
                    Visual content placeholder (images / iframe / video)
                </div>
            </div>

            {/* CSS for pulse animation */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scale(1.2);
                    }
                }
            `}</style>
        </div>
    );
};

export default ProjectCard;
