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

// Real project data - ordered from most recent to oldest
const projects: Project[] = [
    {
        id: "isolve",
        title: "ISolve",
        tagline: "Web Development Sidehustle",
        tags: ["React.js", "Tailwind CSS", "HTML5", "Node.js"],
        color: "#ff6b6b",
        description: "ISolve is a side hustle with my friend Harris where we build custom websites for small businesses. It is not about millions yet, more about learning while picking up real client work. We use React.js and Tailwind CSS for responsive, mobile-first sites that actually convert.\n\nKey results:\n• 50% improvement in client retention through strategic UI design\n• 75% increase in online inquiries\n• 40% reduction in bounce rates\n\nEach project teaches us something new about performance tuning and what actually works in production.",
        githubLink: "https://github.com/taha-malik27/ISolve",
        productLink: "https://isolve.info/",
        period: "May 2025 - Present"
    },
    {
        id: "portfolio",
        title: "Personal Portfolio",
        tagline: "Interactive 3D Portfolio Experience",
        tags: ["Next.js", "Three.js", "React", "TypeScript"],
        color: "#fc8803",
        description: "This portfolio is where I went all in on creating something that stands out. The centerpiece is a fully interactive 3D room you can explore with orbit or first-person controls. Built with React Three Fiber, Three.js, and physics simulation using Rapier. Beyond the 3D experience, I built custom interactive components like the rotating skill halo, Venn diagram selector, and particle backgrounds. Runs on Next.js 16 with TypeScript and Tailwind CSS v4, fully responsive. A playground for 3D graphics programming and modern web dev wrapped in a cyberpunk synthwave aesthetic.",
        githubLink: "https://github.com/taha-malik27/myPortfolioWebsite",
        productLink: typeof window !== 'undefined' ? window.location.origin : 'https://your-portfolio.com',
        period: "Nov 2024 - Present"
    },
    {
        id: "mindstream",
        title: "MINDStream",
        tagline: "Real-Time EEG Dashboard",
        tags: ["Python", "PyQt", "BrainFlow", "Signal Processing"],
        color: "#1887f5",
        description: "MINDStream is an open source EEG dashboard for capturing and analyzing brain signals in real time. Built with PyQt, BrainFlow, and Matplotlib for 25+ researchers and students at MIND who need powerful signal analysis without expensive commercial software.\n\nFeatures & Impact:\n• Real-time visualization (raw signals, frequency spectra, power distributions)\n• Advanced filtering (band pass/stop, ICA for artifact removal)\n• GPU accelerated graphics via VisPy with multithreaded data collection\n• 2× experiment efficiency, 3× signal clarity improvement\n• Full recording and export for ML workflows\n• Small language model with RAG for EXG analysis\n\nCheck out the GUI_Development directory in the repo!",
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
        description: "This project builds an optimal investment portfolio using portfolio theory and the Capital Asset Pricing Model (CAPM). The goal was simple: maximize returns while managing risk effectively.\n\nI analyzed five years of market data and used Excel Solver to construct a 4-asset portfolio that delivered a 23.31% annual return at 18.48% volatility. The portfolio's Sharpe ratio (reward per unit of risk) beat 50 randomly sampled alternatives.\n\nThe real test came when I ran the model forward through 2023-2025. The results were eye-opening:\n• Gold (GLD): +22.8% above expected (positive alpha)\n• International stocks (VEA): -23.5% below expected (negative alpha)\n\nThese gaps revealed how quickly markets shift during political and policy changes. Static models struggle to keep up. The lesson: even solid theory needs periodic rebalancing and updated assumptions to stay relevant.",
        githubLink: "#", // Will be document download link
        period: "Mar 2025 - Apr 2025"
    },
    {
        id: "savorscope",
        title: "SavorScope",
        tagline: "Dietary Nutrition Tracker",
        tags: ["Java", "JavaFX", "OOP"],
        color: "#a855f7",
        description: "SavorScope is a desktop nutrition tracker that helps users log meals, track nutritional values, and calculate health metrics like BMI and daily caloric needs. Built with Java and JavaFX, focusing on clean OOP design and an intuitive interface. Features meal logging, nutritional analysis, and custom reporting to identify eating patterns. One of my earlier projects that taught me desktop app development and user-centered design.",
        githubLink: "https://github.com/taha-malik27/SavorScope",
        period: "Feb 2024 - Apr 2024"
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
                boxSizing: "border-box"
            }}>
                {/* Header - Matches other pages */}
                <h1 style={{margin: 0, marginTop: "2rem", marginBottom: "1rem"}}>
                    <HoverText text="My Projects" className="header-styling" />
                </h1>

                {/* Scrollable Projects Grid */}
                <div style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    maxHeight: "calc(100vh - 10rem)",
                    paddingRight: "0.5rem" // Space for scrollbar
                }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: isOneColumn ? "1fr" : "1fr 1fr",
                        gap: "1.5rem",
                        padding: "0.5rem" // Padding to prevent hover scale cutoff
                    }}>
                        {projects.map((project, index) => {
                            const isLastAndOdd = !isOneColumn && index === projects.length - 1 && projects.length % 2 !== 0;
                            const isSelected = selectedProject.id === project.id;
                            const isHovered = hoveredProject === project.id;
                        
                        return (
                            <div
                                key={project.id}
                                className="project-card"
                                onClick={() => setSelectedProject(project)}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                style={{
                                    gridColumn: isLastAndOdd ? "1 / -1" : "auto",
                                    maxWidth: isLastAndOdd ? "calc(50% - 0.75rem)" : "100%",
                                    marginLeft: isLastAndOdd ? "auto" : "0",
                                    marginRight: isLastAndOdd ? "auto" : "0",
                                    border: `2px solid ${isSelected ? project.color : isHovered ? project.color + '80' : 'rgba(255, 255, 255, 0.1)'}`,
                                    transform: isHovered ? 'translateY(-5px) scale(1.02)' : isSelected ? 'scale(1.0)' : 'scale(1)',
                                    boxShadow: isSelected 
                                        ? `0 8px 24px ${project.color}40, 0 0 0 3px ${project.color}20`
                                        : isHovered 
                                        ? `0 8px 20px rgba(0, 0, 0, 0.4)` 
                                        : '0 2px 8px rgba(0, 0, 0, 0.2)'
                                }}
                            >
                                {/* Animated background gradient on hover */}
                                <div 
                                    className="project-card-gradient"
                                    style={{
                                        background: `linear-gradient(135deg, ${project.color}10, transparent)`,
                                        opacity: isHovered || isSelected ? 1 : 0
                                    }} 
                                />

                                {/* Content */}
                                <div style={{ position: "relative", zIndex: 1 }}>
                                    <h3 
                                        className="project-card-title"
                                        style={{
                                            color: isSelected ? project.color : "#ffffff"
                                        }}
                                    >
                                        {project.title}
                                    </h3>

                                    <p className="project-card-period">
                                        {project.period}
                                    </p>

                                    <p className="project-card-tagline">
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
                                                className="project-tag"
                                                style={{
                                                    backgroundColor: isSelected ? `${project.color}30` : "rgba(255, 255, 255, 0.1)",
                                                    color: isSelected ? project.color : "rgba(255, 255, 255, 0.8)"
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Selected indicator */}
                                {isSelected && (
                                    <div 
                                        className="project-selected-indicator"
                                        style={{
                                            backgroundColor: project.color,
                                            boxShadow: `0 0 12px ${project.color}`
                                        }} 
                                    />
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
                display: "flex",
                flexDirection: "column",
                alignItems: "start", 
                justifyContent: "flex-start", 
                paddingRight: "22%", 
                paddingTop: "2%",
                paddingBottom: "0.5rem",
                paddingLeft: "12%",
                width: "100%",
                maxHeight: "calc(100vh - 3rem)",
                gap: "1.5rem",
                boxSizing: "border-box",
                marginBottom:"0px",
            }}>
                 {/* Top Section - Detailed Description + Links */}
                <div style={{
                    width: "100%",
                    flex: "0 0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}>
                    {/* Title with color */}
                    <h2 
                        className="project-detail-title"
                        style={{
                            color: selectedProject.color,
                            textShadow: `0 0 20px ${selectedProject.color}40`
                        }}
                    >
                        {selectedProject.title}
                    </h2>

                    {/* Period */}
                    <p className="project-detail-period">
                        {selectedProject.period}
                    </p>

                    {/* Description */}
                    <div 
                        className="project-description-box"
                        style={{
                            border: `1px solid ${selectedProject.color}40`
                        }}
                    >
                        <div className="project-description-text">
                            {selectedProject.description}
                        </div>
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
                            className="project-button"
                            style={{
                                flex: selectedProject.productLink ? 1 : "0 0 auto",
                                minWidth: selectedProject.productLink ? "auto" : "200px",
                                backgroundColor: "rgba(255, 255, 255, 0.05)",
                                border: `2px solid ${selectedProject.color}`,
                                color: selectedProject.color
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
                                className="project-button"
                                style={{
                                    flex: 1,
                                    backgroundColor: selectedProject.color,
                                    border: `2px solid ${selectedProject.color}`,
                                    color: "#000000"
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
                <div 
                    className="project-visual-placeholder"
                    style={{
                        border: `1px solid ${selectedProject.color}20`
                    }}
                >
                    Visual content placeholder (images / iframe / video)
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
