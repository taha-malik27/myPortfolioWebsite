"use client"

import React, { useState } from 'react';
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
    productLink: string;
}

// Placeholder project data
const projects: Project[] = [
    {
        id: "project-1",
        title: "Project One",
        tagline: "A brief tagline about this project",
        tags: ["React", "TypeScript", "Next.js"],
        color: "#ff6b6b",
        description: "Detailed description of Project One will go here. This is where you'll explain what the project does, the technologies used, and the problems it solves.",
        githubLink: "https://github.com/username/project-one",
        productLink: "https://project-one.com"
    },
    {
        id: "project-2",
        title: "Project Two",
        tagline: "Another interesting project description",
        tags: ["Python", "Flask", "PostgreSQL"],
        color: "#4ecdc4",
        description: "Detailed description of Project Two will go here. This is where you'll explain what the project does, the technologies used, and the problems it solves.",
        githubLink: "https://github.com/username/project-two",
        productLink: "https://project-two.com"
    },
    {
        id: "project-3",
        title: "Project Three",
        tagline: "Building something amazing",
        tags: ["Node.js", "Express", "MongoDB"],
        color: "#ffbe0b",
        description: "Detailed description of Project Three will go here. This is where you'll explain what the project does, the technologies used, and the problems it solves.",
        githubLink: "https://github.com/username/project-three",
        productLink: "https://project-three.com"
    },
    {
        id: "project-4",
        title: "Project Four",
        tagline: "Innovative solutions for modern problems",
        tags: ["Vue.js", "Tailwind", "Firebase"],
        color: "#9b59b6",
        description: "Detailed description of Project Four will go here. This is where you'll explain what the project does, the technologies used, and the problems it solves.",
        githubLink: "https://github.com/username/project-four",
        productLink: "https://project-four.com"
    }
];

const ProjectCard: React.FC<ProjectCardProps> = ({ backgroundColor = "transparent" }) => {
    const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);
    
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
            {/* Left Section - Project Cards Grid */}
            <div style={{
                alignSelf: "center", 
                paddingLeft:"10%",
                paddingRight: "5%",
                width: "100%",
                boxSizing: "border-box",
                maxHeight: "calc(100vh - 4rem)",
                overflowY: "auto",
                overflowX: "hidden"
            }}>
                <h1 style={{margin: 0, marginBottom: "2rem"}}>
                    <HoverText text="My Projects" className="header-styling" />
                </h1>

                {/* Projects Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5rem",
                    paddingBottom: "2rem"
                }}>
                    {projects.map((project) => {
                        const isSelected = selectedProject.id === project.id;
                        const isHovered = hoveredProject === project.id;
                        
                        return (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                style={{
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
                                                    fontSize: "0.75rem",
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

            {/* Right Section - Project Details */}
            <div style={{
                display: "grid", 
                gridTemplateRows: "60% 40%",
                alignItems: "start", 
                justifyContent: "center", 
                paddingRight: "10%", 
                paddingTop: "5%", 
                paddingLeft: "12%",
                width: "100%",
                height: "100%",
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
                        gap: "1rem"
                    }}>
                        <a
                            href={selectedProject.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                flex: 1,
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
                            → Live Demo
                        </a>
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
