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
    skills?: string[]; // Non-technological skills
    location?: string;
}

// Work experiences - ordered from earliest (top) to latest (bottom)
const workExperiences: WorkExperience[] = [
    {
        id: "exp1",
        company: "American Eagle Outfitters",
        role: "Sales Ambassador",
        date: "May 2023 - Sept 2025",
        logo: "/images/work/AEOLogo.png",
        color: "#ffffff", // White
        whatIDid: "Optimized weekly stock organization and floor sets to improve product visibility and streamline inventory workflows. Assisted roughly 30 to 60 customers per shift, delivered strong customer service, and handled 40 to 80 transactions per shift with consistent accuracy. Maintained professionalism during high tension situations and helped de escalate conflicts to keep store operations smooth.",
        impact: "Improved purchase conversions and reduced inventory processing time by about 10 percent. Supported strong customer satisfaction through high volume service and reliable checkout accuracy.",
        technologies: [],
        skills: ["Customer Service", "Inventory Management", "Conflict Resolution", "Transaction Processing", "Retail Operations"],
        location: "Calgary, AB, Canada (On site)"
    },
    {
        id: "exp2",
        company: "Data Science and Machine Learning Club (DSMLC)",
        role: "Vice President of Outreach (previously Junior VP of Marketing)",
        date: "Nov 2023 - Apr 2025",
        logo: "/images/work/DSMLCLogo.png",
        color: "#facc15", // Yellow
        whatIDid: "Managed club finances, sponsorships, and external partnerships. Built relationships with 30 plus industry professionals and coordinated sponsorship outreach. Organized the club's largest event for student industry networking and showcases. Delivered workshops on SciPy, NumPy, and data visualization. Ran LinkedIn and Instagram campaigns to increase reach and engagement.",
        impact: "Secured about 5,500 dollars in sponsorships. Produced the club's largest event with 150 plus attendees and 20 plus company participants. Strengthened technical skills for 40 plus students through workshops and expanded campus awareness.",
        technologies: ["Python", "SciPy", "NumPy", "Power BI"],
        location: "University of Calgary, Calgary, AB (Hybrid)"
    },
    {
        id: "exp3",
        company: "Mechatronics Integration of Neural Dynamics (MIND)",
        role: "Co Founder and Co President",
        date: "Feb 2024 - December 2025",
        logo: "/images/work/MINDLogo.jpg",
        color: "#38bdf8", // Sky blue
        whatIDid: "Co founded and scaled a university neurotechnology design team by launching core finance and outreach systems. Recruited and structured interdisciplinary R and D teams across engineering and neuro streams. Led development of a BCI controlled RC car using brain signal acquisition and processing, including frequency filtering, independent component analysis, and threshold based classification in Python. Developed MINDStream, an open source EEG dashboard for real time brain signal capture and analysis using PyQt, BrainFlow, and Matplotlib. Implemented GPU accelerated graphics via VisPy with multithreaded data collection, advanced filtering including band pass/stop and ICA for artifact removal, real time visualization of raw signals and frequency spectra, and integrated a small language model with RAG for EXG analysis. Oversaw development of additional projects including MINDScope PCB board and a custom EEG headset.",
        impact: "Secured 8,000+ dollars in funding and grew the organization to 35 plus active members from 140 plus applicants. Delivered a functioning proof of concept BCI vehicle and established a multi project neurotech pipeline for ongoing research and prototyping. MINDStream achieved 2× experiment efficiency and 3× signal clarity improvement, now used by 25 plus researchers and students at MIND who need powerful signal analysis without expensive commercial software.",
        technologies: [
            "Python",
            "Matlab (Introductory)",
            "PyQt",
            "BrainFlow",
            "Matplotlib",
            "VisPy",
            "EEG",
            "Signal Processing",
            "Independent Component Analysis (ICA)",
            "Threshold Classification",
            "GPU Acceleration",
            "Multithreading",
            "RAG",
            "Small Language Models"
        ],
        location: "University of Calgary, Calgary, AB (Hybrid)"
    },
    {
        id: "exp4",
        company: "Ovintiv",
        role: "Software Development Intern",
        date: "May 2025 - Dec 2025",
        logo: "/images/work/OvintivLogo.png",
        color: "#ea580c", // Deep orange
        whatIDid: "Developed and deployed an Emergency Response Plan app using ReactJS, Python, and Flask, with automated CI and CD through Azure DevOps. Built security access provisioning automations by integrating ServiceNow with Python services hosted on Azure App Services, secured via Azure Key Vault and connected to Oracle databases. Improved risk assessment workflows through permission logic, UI enhancements, and standardized deployment versioning. Led cloud migration work from Oracle to Azure SQL, refactoring SQL logic, updating configurations, and coordinating pre deployment testing and VM transitions. Delivered a mobile Emergency Response Plan experience in Microsoft Power Apps with offline access support.",
        impact: "Cut incident reporting time by 35 percent and improved emergency response for 100 plus field employees. Reduced access provisioning time by 40 percent and accelerated software provisioning by about 80 percent for multiple teams. Earned an internship extension from 4 months to 8 months based on performance and project needs.",
        technologies: [
            "ReactJS",
            "Python",
            "Flask",
            "Azure DevOps",
            "ServiceNow",
            "Azure App Services",
            "Azure Key Vault",
            "Oracle",
            "Azure SQL",
            "Angular",
            ".NET",
            "Power Apps",
            "SQL"
        ],
        location: "Calgary, AB, Canada (On site)"
    },
    {
        id: "exp5",
        company: "Ovintiv",
        role: "Software Engineering Intern",
        date: "May 2026 - Aug 2026",
        logo: "/images/work/OvintivLogo.png",
        color: "#ea580c", // Deep orange (same as first Ovintiv)
        whatIDid: "Given full freedom to architect my own software solution end to end, and built a platform that lets engineers create, manage, compare, predict, and forecast projected ultimate well costs across the company. Brought together raw data and machine learning models from across the organization, including regression tested variables, well data, and SMS and material data, to generate month over month ultimate cost predictions for every well as variables change over time. Built with Oracle databases, R and R Shiny, and JavaScript. Designed the application architecture, database schema, authentication, and external integrations myself, along with a custom equation editor that works like a lean version of an Excel formula engine. Detailed projection tooling lets engineers adjust assumptions under different scenarios, and results are exported and saved into other internal applications across the company.",
        impact: "Delivered a fully self architected forecasting platform that became a shared source of projected ultimate cost data for engineering teams, feeding predictions into other internal applications and replacing manual, spreadsheet driven cost projection work with scenario based forecasting. Saves 8 to 11 hours of employee work for every outlook produced on a set of wells. Improved data accuracy and confidence by centralizing everything into a single source of truth that always pulls the latest data, which keeps SMS, engineering and operations, and scheduling teams aligned on the same numbers. Highly flexible projection and comparison tooling also made decision making faster and better informed.",
        technologies: [
            "R",
            "R Shiny",
            "JavaScript",
            "Oracle",
            "SQL",
            "Regression Modeling",
            "Software Architecture",
            "Database Design",
            "Authentication",
            "API Integrations"
        ],
        location: "Calgary, AB, Canada"
    },
    {
        id: "exp7",
        company: "Data Science and Machine Learning Club (DSMLC)",
        role: "Vice President of Internal",
        date: "May 2026 - Present",
        logo: "/images/work/DSMLCLogo.png",
        color: "#facc15", // Yellow (same as first DSMLC)
        whatIDid: "Rejoined the club after a year away on exchange and building MIND, this time leading the internal side of the organization. I oversee the marketing, events, and operations departments, set direction and strategy across them, and decide which projects the club takes on and how they get executed. The first big build under my tenure was an end to end data hub for all of the club's data logistics, covering attendance tracking, engagement and conversion across our different platforms, and the reporting that comes out of it, so decisions get made on real numbers instead of guesses. Right now I am putting together the most packed academic year the club has run.",
        impact: "Gave the club a single place to see how it is actually performing, replacing scattered manual tracking with real attendance and platform conversion data. Currently targeting 15 to 20 events for the year, along with the most industry guests and the most sponsorships the club has ever brought in.",
        technologies: [
            "Data Pipelines",
            "Analytics",
            "Dashboarding"
        ],
        skills: [
            "Leadership",
            "Strategy",
            "Team Management",
            "Event Operations",
            "Marketing",
            "Sponsorship"
        ],
        location: "University of Calgary, Calgary, AB (Hybrid)"
    },
    {
        id: "exp6",
        company: "Deloitte",
        role: "Incoming Audit and Assurance Intern",
        date: "Sept 2026 - Dec 2026",
        logo: "/images/work/DeloitteLogo.png",
        color: "#22c55e", // Deloitte green
        whatIDid: "Will support financial statement audits, internal controls testing, and compliance reviews for clients across multiple industries. Super excited to get a feel of the professional financial services industry!",
        impact: "Incoming role focused on building audit, assurance, and client service experience in a professional services environment.",
        technologies: [],
        skills: [
            "Audit and Assurance",
            "Financial Statement Audits",
            "Internal Controls Testing",
            "Compliance Reviews",
            "Client Service"
        ],
        location: "Calgary, AB, Canada"
    }
];

/**
 * ============================================================================
 * HOW TO ADD A NEW WORK EXPERIENCE (DESKTOP LAYOUT)
 * ============================================================================
 * 
 * When adding a new work experience to the workExperiences array, you need to
 * update several parts of this component to maintain proper desktop layout:
 * 
 * 1. UPDATE SLOT PATTERN (below):
 *    - Add a new slot number to the pattern array
 *    - Slots 1-5 = left column (rows 0-4)
 *    - Slots 6-10 = right column (rows 0-4)
 *    - Slots 11+ = special slots for experiences beyond 10 (right column, row 5+)
 *    - Pattern alternates left/right: [left, right, left, right, ...]
 *    - Example for 8 experiences: [1, 7, 3, 9, 5, 12, 13, 14] (add slot 14 for 8th)
 * 
 * 2. UPDATE getRowIndex() function:
 *    - Add special case for new slot if it's beyond slot 10
 *    - Formula: slot 11 = row 5, slot 12 = row 5, slot 13 = row 6, etc.
 *    - For slot 11+: return (slot - 11) + 5
 * 
 * 3. UPDATE createTimelineSlots() function:
 *    - Update the condition that adds special slots (currently > 5)
 *    - Add new slot initialization for slots beyond 10
 *    - Example: if (workExperiences.length > 6) { slots.push({ slot: 13, experience: null }); }
 * 
 * 4. UPDATE isRightColumn() function:
 *    - Add new slot numbers to the condition
 *    - Example: || slot === 13
 * 
 * 5. UPDATE gridTemplateRows (2 places):
 *    - Left column grid: line ~661
 *    - Right column grid: line ~870
 *    - Already dynamic: `repeat(${workExperiences.length}, 1fr)` when > 5
 *    - No change needed if already using workExperiences.length
 * 
 * 6. Timeline dot positioning is already dynamic:
 *    - Uses: (rowIndex * (100 / workExperiences.length)) + (100 / workExperiences.length / 2)
 *    - Automatically adjusts for any number of experiences
 * 
 * CURRENT PATTERN FOR 7 EXPERIENCES:
 * Row 0 (top):    Slot 1 (left)  - American Eagle
 * Row 1:          Slot 7 (right) - DSMLC (VP Outreach)
 * Row 2:          Slot 3 (left)  - MIND
 * Row 3:          Slot 9 (right) - Ovintiv SDE
 * Row 4:          Slot 5 (left)  - Ovintiv SWE
 * Row 5:          Slot 12 (right) - DSMLC (VP Internal)
 * Row 6 (bottom): Slot 13 (left) - Deloitte
 * ============================================================================
 */
const getSlotForIndex = (index: number): number => {
    // Pattern: [left, right, left, right, left, right, ...]
    // Update this array when adding new experiences
    // Add slot numbers that alternate between left (1-5, 13) and right (6-10, 12)
    const pattern = [1, 7, 3, 9, 5, 12, 13];
    return pattern[index % pattern.length];
};

const WorkCard: React.FC<WorkCardProps> = ({ backgroundColor = "transparent" }) => {
    const [selectedExperience, setSelectedExperience] = useState<WorkExperience>(workExperiences[0]);
    const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);
    const [isContentVisible, setIsContentVisible] = useState(true);
    const [displayedExperience, setDisplayedExperience] = useState<WorkExperience>(workExperiences[0]);
    const [viewportWidth, setViewportWidth] = useState<number>(1200);
    const [isSmallViewport, setIsSmallViewport] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Track viewport width for responsive behavior
    useEffect(() => {
        const handleResize = () => {
            if (typeof window === 'undefined') return;
            const width = window.innerWidth;
            setViewportWidth(width);
            // Small viewport mode triggers at 80% of typical desktop width (1536px at 1920px)
            const typicalDesktopWidth = 1920;
            setIsSmallViewport(width < typicalDesktopWidth * 0.8);
            setIsMobile(width <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
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

    /**
     * Creates the timeline slot structure for desktop layout
     * 
     * TO UPDATE when adding experiences beyond 6:
     * 1. Update the condition that checks workExperiences.length
     * 2. Add initialization for new special slots (11+)
     * 
     * Example for 7 experiences:
     *   if (workExperiences.length > 6) {
     *       slots.push({ slot: 13, experience: null });
     *   }
     * 
     * Example for 8 experiences:
     *   if (workExperiences.length > 6) {
     *       slots.push({ slot: 13, experience: null });
     *       if (workExperiences.length > 7) {
     *           slots.push({ slot: 14, experience: null });
     *       }
     *   }
     */
    const createTimelineSlots = () => {
        const slots: Array<{ slot: number; experience: WorkExperience | null }> = [];
        
        // Initialize standard slots 1-10 (left: 1-5, right: 6-10)
        for (let i = 1; i <= 10; i++) {
            slots.push({ slot: i, experience: null });
        }
        
        // Add special slots for experiences beyond 10
        // UPDATE THIS when adding more experiences
        if (workExperiences.length > 5) {
            slots.push({ slot: 12, experience: null }); // 6th experience (right, row 5)
        }
        if (workExperiences.length > 6) {
            slots.push({ slot: 13, experience: null }); // 7th experience (left, row 6)
        }
        // Add more slots here as needed:
        // if (workExperiences.length > 7) {
        //     slots.push({ slot: 14, experience: null }); // 8th experience (right, row 7)
        // }
        
        // Place experiences into slots according to pattern
        workExperiences.forEach((exp, index) => {
            const slot = getSlotForIndex(index);
            const slotIndex = slots.findIndex(s => s.slot === slot);
            if (slotIndex !== -1) {
                slots[slotIndex] = { slot, experience: exp };
            }
        });
        
        return slots;
    };

    const timelineSlots = createTimelineSlots();

    const handleExperienceClick = (experience: WorkExperience) => {
        setSelectedExperience(experience);
    };

    /**
     * Determines if a slot is in the left column
     * Left column slots: 1-5 (rows 0-4), and special slot 13 (row 6)
     */
    const isLeftColumn = (slot: number) => (slot >= 1 && slot <= 5) || slot === 13;
    
    /**
     * Determines if a slot is in the right column
     * Right column slots: 6-10 (rows 0-4), and special slots 11+ (rows 5+)
     * 
     * TO UPDATE: Add new special slot numbers here when adding experiences beyond 10
     * Example for 7 experiences: || slot === 12 || slot === 13
     */
    const isRightColumn = (slot: number) => (slot >= 6 && slot <= 10) || slot === 12;
    
    /**
     * Maps slot numbers to row indices (0-based)
     * 
     * TO UPDATE when adding experiences beyond 10:
     * - For slot 11: return 5
     * - For slot 12: return 5 (already handled)
     * - For slot 13: return 6
     * - For slot 14: return 6
     * - General formula for slots 11+: return Math.floor((slot - 11) / 2) + 5
     *   OR add explicit cases: if (slot === 13) return 6; etc.
     * 
     * Current mapping:
     * - Slots 1-5 (left): rows 0-4
     * - Slots 6-10 (right): rows 0-4
     * - Slot 12 (right): row 5
     * - Slot 13 (left): row 6
     */
    const getRowIndex = (slot: number) => {
        // Left column: slots 1-5 map directly to rows 0-4
        if (slot <= 5) return slot - 1;
        
        // Special cases for slots beyond the standard 1-10 grid
        // ADD MORE SPECIAL CASES HERE when adding more experiences
        if (slot === 12) return 5;
        if (slot === 13) return 6;
        
        // Right column standard slots: 6-10 map to rows 0-4
        return slot - 6;
    };

    // Get color for an experience by its index
    const getExperienceColor = (experienceId: string): string => {
        const experience = workExperiences.find(exp => exp.id === experienceId);
        return experience?.color || "#fc8803"; // Default to orange if not found
    };

    // Convert hex color to rgba
    const hexToRgba = (hex: string, alpha: number): string => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    
    return (
        <div 
            className="fade-in work-card-container" 
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
            <div className={`work-left-section ${isSmallViewport ? 'div-scroll' : ''}`} style={{
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
                <h1 className="work-header" style={{ 
                    margin: 0, 
                    marginTop: "2rem", 
                    marginBottom: "1rem",
                    flexShrink: 0
                }}>
                    {isMobile ? (
                        <>
                            <HoverText text="My Work" className="header-styling" />
                            <br />
                            <HoverText text="Experience" className="header-styling" />
                        </>
                    ) : (
                        <HoverText text="My Work Experience" className="header-styling" />
                    )}
                </h1>

                {/* Detailed Work Experience Card */}
                <div className="work-details-card" style={{
                    flex: "1 1 0",
                    minHeight: "0",
                    width: "100%",
                    marginBottom: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    opacity: isContentVisible ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out"
                }}>
                    <div className="div-scroll" style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderRadius: "12px",
                        padding: isSmallViewport ? `${Math.max(1, Math.min(2, viewportWidth / 600))}rem` : "2rem",
                        border: `1px solid ${selectedExperience.id === hoveredExperience ? displayedExperience.color : "rgba(255, 255, 255, 0.2)"}`,
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
                            color: displayedExperience.color,
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
                                color: displayedExperience.color,
                                marginBottom: "0.75rem",
                                marginTop: 0
                            }}>
                                {displayedExperience.role.includes("Incoming") ? "What I Will Do" : "What I Did"}
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
                                color: displayedExperience.color,
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
                            <div style={{ marginBottom: "1.5rem" }}>
                                <h3 style={{
                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                    fontWeight: 600,
                                    fontSize: isSmallViewport ? `clamp(0.9rem, ${Math.max(0.9, Math.min(1.25, viewportWidth / 110))}rem, 1.25rem)` : "large",
                                    color: displayedExperience.color,
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
                                    {displayedExperience.technologies.map((tech, idx) => {
                                        const experienceColor = displayedExperience.color;
                                        
                                        return (
                                            <span
                                                key={idx}
                                                style={{
                                                    padding: isSmallViewport ? `${Math.max(0.15, viewportWidth / 800)}rem ${Math.max(0.5, viewportWidth / 300)}rem` : "0.25rem 0.75rem",
                                                    backgroundColor: hexToRgba(experienceColor, 0.2),
                                                    border: `1px solid ${hexToRgba(experienceColor, 0.5)}`,
                                                    borderRadius: "6px",
                                                    fontSize: isSmallViewport ? `clamp(0.7rem, ${Math.max(0.7, Math.min(0.875, viewportWidth / 150))}rem, 0.875rem)` : "0.875rem",
                                                    color: experienceColor,
                                                    fontFamily: 'Stack Sans Notch, sans-serif'
                                                }}
                                            >
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {displayedExperience.skills && displayedExperience.skills.length > 0 && (
            <div>
                                <h3 style={{
                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                    fontWeight: 600,
                                    fontSize: isSmallViewport ? `clamp(0.9rem, ${Math.max(0.9, Math.min(1.25, viewportWidth / 110))}rem, 1.25rem)` : "large",
                                    color: displayedExperience.color,
                                    marginBottom: "0.75rem",
                                    marginTop: 0
                                }}>
                                    Skills
                                </h3>
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "0.5rem"
                                }}>
                                    {displayedExperience.skills.map((skill, idx) => {
                                        const experienceColor = displayedExperience.color;
                                        
                                        return (
                                            <span
                                                key={idx}
                                                style={{
                                                    padding: isSmallViewport ? `${Math.max(0.15, viewportWidth / 800)}rem ${Math.max(0.5, viewportWidth / 300)}rem` : "0.25rem 0.75rem",
                                                    backgroundColor: hexToRgba(experienceColor, 0.2),
                                                    border: `1px solid ${hexToRgba(experienceColor, 0.5)}`,
                                                    borderRadius: "6px",
                                                    fontSize: isSmallViewport ? `clamp(0.7rem, ${Math.max(0.7, Math.min(0.875, viewportWidth / 150))}rem, 0.875rem)` : "0.875rem",
                                                    color: experienceColor,
                                                    fontFamily: 'Stack Sans Notch, sans-serif'
                                                }}
                                            >
                                                {skill}
                                            </span>
                                        );
                                    })}
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
            <div className='div-scroll work-timeline-mobile' style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                    height: "100%", 
                    width: "100%",
                    minHeight: "0",
                    position: "relative",
                    padding: "1.6rem 0rem 2rem 1.5rem",
                    alignSelf: "stretch",
                    boxSizing: "border-box",
                    transform: "scale(0.95)",
                    transformOrigin: "center"
                }}>
                    {workExperiences.map((experience, index) => {
                        const isSelected = experience.id === selectedExperience.id;
                        const isHovered = experience.id === hoveredExperience;
                        const experienceColor = getExperienceColor(experience.id);
                        const isLast = index === workExperiences.length - 1;
                        
                        return (
                            <div key={experience.id} className="work-timeline-item-mobile" style={{
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
                                            marginBottom: "0.25rem",
                                            wordWrap: "break-word",
                                            overflowWrap: "break-word"
                                        }}>
                                            {experience.role}
                                        </div>
                                        <div style={{
                                            fontFamily: 'Stack Sans Notch, sans-serif',
                                            fontWeight: 400,
                                            fontSize: "0.75rem",
                                            color: "rgba(255, 255, 255, 0.7)",
                                            wordWrap: "break-word",
                                            overflowWrap: "break-word"
                                        }}>
                                            {experience.company}
                                        </div>
                                        <div style={{
                                            fontFamily: 'Stack Sans Notch, sans-serif',
                                            fontWeight: 400,
                                            fontSize: "0.7rem",
                                            color: "rgba(255, 255, 255, 0.5)",
                                            marginTop: "0.25rem",
                                            wordWrap: "break-word",
                                            overflowWrap: "break-word"
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
                <div className='div-scroll work-timeline-desktop' style={{
                    overflowY: "auto",
                    overflowX: viewportWidth < 600 ? "scroll" : "hidden",
                    height: "90%", 
                    width: "120%",
                    minWidth: "400px",
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(60px, auto) minmax(0, 1fr)",
                    position: "relative",
                    padding: "0.8rem 0.5rem",
                    marginRight:"3rem",
                    alignSelf: "center",
                    transform: "scale(0.95)",
                    transformOrigin: "center",
                    // backgroundColor:"rgba(100,100,100,0.5)" DEBUG
                }}>

                    {/* Left Column - Preview Cards */}
                    {/* 
                        NOTE: gridTemplateRows is already dynamic - automatically adjusts for any number of experiences
                        No changes needed here when adding new experiences
                    */}
                    <div style={{
                        display: "grid",
                        gridTemplateRows: workExperiences.length > 5 ? `repeat(${workExperiences.length}, 1fr)` : "repeat(5, 1fr)",
                        gap: "0.6rem",
                        padding: "0.4rem",
                        position: "relative",
                        zIndex: 2,
                        overflow: "visible",
                        alignContent: workExperiences.length <= 5 ? "space-evenly" : "start",
                        // backgroundColor:"rgba(100,200,100,0.5)" //DEBUG
                    }}>
                        {timelineSlots.filter(s => isLeftColumn(s.slot)).map((slotData, idx) => {
                            const experience = slotData.experience;
                            const rowIndex = getRowIndex(slotData.slot);
                            const isSelected = experience?.id === selectedExperience.id;
                            const isHovered = experience?.id === hoveredExperience;
                            const experienceColor = experience ? getExperienceColor(experience.id) : "#fc8803";
                            
                            return (
                                <div
                                    key={`left-${rowIndex}`}
                                    style={{
                                        // Pinned so a column that skips a row still lines up with the timeline
                                        gridRow: rowIndex + 1,
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
                                                maxWidth: "250px",
                                                height: "auto",
                                                minHeight: "64px",
                                                display: "flex",
                                                alignItems: "flex-start",
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
                                                    wordWrap: "break-word",
                                                    overflowWrap: "break-word"
                                                }}>
                                                    {experience.role}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: "0.75rem",
                                                    color: "rgba(255, 255, 255, 0.7)",
                                                    wordWrap: "break-word",
                                                    overflowWrap: "break-word"
                                                }}>
                                                    {experience.company}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: "0.7rem",
                                                    color: "rgba(255, 255, 255, 0.5)",
                                                    marginTop: "0.25rem",
                                                    wordWrap: "break-word",
                                                    overflowWrap: "break-word"
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
                        
                        /**
                         * Calculate timeline dot position dynamically
                         * 
                         * NOTE: This is already dynamic and works for any number of experiences
                         * No changes needed when adding new experiences
                         * 
                         * Formula:
                         * - rowSpacing = 100% / number of experiences (evenly divides height)
                         * - topPosition = (rowIndex * spacing) + (spacing / 2) to center in row
                         * 
                         * Example for 6 experiences:
                         * - rowSpacing = 100 / 6 = 16.67%
                         * - Row 0: (0 * 16.67) + 8.33 = 8.33%
                         * - Row 5: (5 * 16.67) + 8.33 = 91.67%
                         */
                        const rowSpacing = 100 / workExperiences.length;
                        const topPosition = `${(rowIndex * rowSpacing) + (rowSpacing / 2)}%`;
                        
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
                    {/* 
                        NOTE: gridTemplateRows is already dynamic - automatically adjusts for any number of experiences
                        No changes needed here when adding new experiences
                    */}
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
                            const rowIndex = getRowIndex(slotData.slot);
                            const isSelected = experience?.id === selectedExperience.id;
                            const isHovered = experience?.id === hoveredExperience;
                            const experienceColor = experience ? getExperienceColor(experience.id) : "#fc8803";
                            
                            return (
                                <div
                                    key={`right-${rowIndex}`}
                                    style={{
                                        // Pinned so a column that skips a row still lines up with the timeline
                                        gridRow: rowIndex + 1,
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
                                                maxWidth: "250px",
                                                height: "auto",
                                                minHeight: "64px",
                                                display: "flex",
                                                alignItems: "flex-start",
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
                                                    wordWrap: "break-word",
                                                    overflowWrap: "break-word"
                                                }}>
                                                    {experience.role}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: "0.75rem",
                                                    color: "rgba(255, 255, 255, 0.7)",
                                                    wordWrap: "break-word",
                                                    overflowWrap: "break-word"
                                                }}>
                                                    {experience.company}
                                                </div>
                                                <div style={{
                                                    fontFamily: 'Stack Sans Notch, sans-serif',
                                                    fontWeight: 400,
                                                    fontSize: "0.7rem",
                                                    color: "rgba(255, 255, 255, 0.5)",
                                                    marginTop: "0.25rem",
                                                    wordWrap: "break-word",
                                                    overflowWrap: "break-word"
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
