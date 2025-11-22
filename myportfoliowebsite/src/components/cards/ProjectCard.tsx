"use client"

import React, { useState, useEffect } from 'react';
import HoverText from '@/components/HoverText';
import ProjectImageGallery from '@/components/image/ProjectImageGallery';

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
        color: "#10B981", // Money green
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
    const [iframeScale, setIframeScale] = useState(1);
    const [isVideoHovered, setIsVideoHovered] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isIframeActive, setIsIframeActive] = useState(false);
    const [lastInteractionTime, setLastInteractionTime] = useState<number | null>(null);
    const [isContentVisible, setIsContentVisible] = useState(true);
    const [displayedProject, setDisplayedProject] = useState<Project>(projects[0]);
    
    // Initialize displayedProject to match selectedProject on mount
    useEffect(() => {
        setDisplayedProject(selectedProject);
    }, []); // Only run on mount
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const videoContainerRef = React.useRef<HTMLDivElement>(null);
    const visualContainerRef = React.useRef<HTMLDivElement>(null);
    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const inactivityTimerRef = React.useRef<NodeJS.Timeout | null>(null);
    
    // Desktop viewport dimensions - standard desktop size for normal zoom
    // Using 1920x1080 which is a common desktop resolution and renders at normal zoom
    const DESKTOP_WIDTH = 1920; // Standard desktop width
    const DESKTOP_HEIGHT = 1080; // 16:9 aspect ratio
    
    // Suppress cross-origin iframe errors (expected when embedding external sites)
    useEffect(() => {
        const handleError = (event: ErrorEvent) => {
            // Suppress cross-origin frame access errors - these are expected when embedding external sites
            if (
                event.message?.includes('Blocked a frame with origin') ||
                event.message?.includes('cross-origin') ||
                event.message?.includes('toJSON') ||
                event.error?.message?.includes('Blocked a frame with origin') ||
                event.error?.message?.includes('cross-origin')
            ) {
                event.preventDefault();
                return false;
            }
        };

        // Also handle unhandled promise rejections that might be related
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
            if (
                event.reason?.message?.includes('Blocked a frame with origin') ||
                event.reason?.message?.includes('cross-origin') ||
                event.reason?.message?.includes('toJSON')
            ) {
                event.preventDefault();
            }
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    // Check viewport width for responsive layout
    useEffect(() => {
        const checkWidth = () => {
            setIsOneColumn(window.innerWidth < 1400);
        };
        
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);
    
    // Calculate iframe scale to fit container - ensures full site visibility
    useEffect(() => {
        const calculateScale = () => {
            if (!visualContainerRef.current) return;
            
            const container = visualContainerRef.current;
            const availableWidth = container.clientWidth;
            const availableHeight = container.clientHeight;
            
            // Skip if container not properly sized yet
            if (availableWidth <= 0 || availableHeight <= 0) return;
            
            // Calculate scale to fit both width and height
            const scaleX = availableWidth / DESKTOP_WIDTH;
            const scaleY = availableHeight / DESKTOP_HEIGHT;
            
            // Use the smaller scale to ensure nothing is cropped
            const scale = Math.min(scaleX, scaleY);
            
            setIframeScale(Math.max(0.1, Math.min(1, scale))); // Clamp between 0.1 and 1
        };
        
        // Small delay to ensure container is rendered
        const timer = setTimeout(calculateScale, 100);
        calculateScale();
        
        // Also recalculate after a short delay to handle any layout shifts
        const delayedTimer = setTimeout(calculateScale, 300);
        
        window.addEventListener('resize', calculateScale);
        return () => {
            clearTimeout(timer);
            clearTimeout(delayedTimer);
            window.removeEventListener('resize', calculateScale);
        };
    }, [selectedProject.id]);
    
    // Check if current project should show iframe
    const shouldShowIframe = (projectId: string) => {
        return projectId === "isolve" || projectId === "portfolio";
    };
    
    // Activate iframe (switch from button to interactive iframe)
    const activateIframe = () => {
        setIsIframeActive(true);
        setLastInteractionTime(Date.now());
    };
    
    // Track interaction on iframe
    const handleIframeInteraction = () => {
        setLastInteractionTime(Date.now());
    };
    
    // Reset iframe to button state after 30 seconds of inactivity
    useEffect(() => {
        if (!isIframeActive) {
            // Clear any existing timer
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
                inactivityTimerRef.current = null;
            }
            return;
        }
        
        const checkInactivity = () => {
            if (lastInteractionTime === null) return;
            
            const timeSinceLastInteraction = Date.now() - lastInteractionTime;
            const INACTIVITY_TIMEOUT = 30000; // 30 seconds
            
            if (timeSinceLastInteraction >= INACTIVITY_TIMEOUT) {
                setIsIframeActive(false);
                setLastInteractionTime(null);
            } else {
                // Check again after the remaining time
                const remainingTime = INACTIVITY_TIMEOUT - timeSinceLastInteraction;
                inactivityTimerRef.current = setTimeout(checkInactivity, remainingTime);
            }
        };
        
        // Initial check
        const timeUntilTimeout = lastInteractionTime 
            ? Math.max(0, 30000 - (Date.now() - lastInteractionTime))
            : 30000;
        
        inactivityTimerRef.current = setTimeout(checkInactivity, timeUntilTimeout);
        
        return () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
                inactivityTimerRef.current = null;
            }
        };
    }, [isIframeActive, lastInteractionTime]);
    
    // Reset iframe state when project changes
    useEffect(() => {
        setIsIframeActive(false);
        setLastInteractionTime(null);
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
            inactivityTimerRef.current = null;
        }
    }, [selectedProject.id]);
    
    // Fade animation when project changes - fade out, then fade in
    useEffect(() => {
        if (selectedProject.id !== displayedProject.id) {
            // Step 1: Fade out current content
            setIsContentVisible(false);
            
            // Step 2: After fade-out completes (250ms), update displayed project
            const updateTimer = setTimeout(() => {
                setDisplayedProject(selectedProject);
                // Step 3: Fade in new content after a brief delay
                setTimeout(() => {
                    setIsContentVisible(true);
                }, 50);
            }, 250); // Match transition duration
            
            return () => clearTimeout(updateTimer);
        }
    }, [selectedProject, displayedProject.id]);
    
    // Check if current project should show video
    const shouldShowVideo = (projectId: string) => {
        return projectId === "mindstream";
    };
    
    // Check if current project should show image gallery
    const shouldShowImageGallery = (projectId: string) => {
        return projectId === "savorscope" || projectId === "capm-portfolio";
    };
    
    // Get images for image gallery based on project
    const getProjectImages = (projectId: string): string[] => {
        if (projectId === "savorscope") {
            return [
                "/images/projects/SavorScopeApp.png",
                "/images/projects/SavorScopeLogo.png"
            ];
        } else if (projectId === "capm-portfolio") {
            return [
                "/images/projects/CAPMGraph1.png",
                "/images/projects/CAPMGraph2.png"
            ];
        }
        return [];
    };
    
    // Get image descriptions for gallery (optional)
    const getProjectImageDescriptions = (projectId: string): string[] => {
        if (projectId === "savorscope") {
            return [
                "SavorScope Application Interface",
                "SavorScope Logo"
            ];
        } else if (projectId === "capm-portfolio") {
            return [
                "CAPM Portfolio Analysis Graph 1",
                "CAPM Portfolio Analysis Graph 2"
            ];
        }
        return [];
    };
    
    // Handle video play/pause
    const toggleVideoPlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsVideoPlaying(true);
            } else {
                videoRef.current.pause();
                setIsVideoPlaying(false);
            }
        }
    };
    
    // Handle fullscreen toggle
    const toggleFullscreen = () => {
        if (!videoContainerRef.current) return;
        
        if (!isFullscreen) {
            // Enter fullscreen
            if (videoContainerRef.current.requestFullscreen) {
                videoContainerRef.current.requestFullscreen();
            } else if ((videoContainerRef.current as any).webkitRequestFullscreen) {
                (videoContainerRef.current as any).webkitRequestFullscreen();
            } else if ((videoContainerRef.current as any).msRequestFullscreen) {
                (videoContainerRef.current as any).msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };
    
    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);
        
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, []);
    
    // Sync video play state with video element
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        
        const handlePlay = () => setIsVideoPlaying(true);
        const handlePause = () => setIsVideoPlaying(false);
        
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        
        return () => {
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
        };
    }, [selectedProject.id]);
    
    // Render video player for MINDStream
    const renderVideo = () => {
        return (
            <div
                ref={videoContainerRef}
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: `1px solid ${displayedProject.color}40`,
                    borderRadius: "12px",
                    overflow: "hidden"
                }}
            >
                <video
                    ref={videoRef}
                    src="/images/projects/MINDStreamDemo.mp4"
                    loop
                    autoPlay
                    muted
                    playsInline
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain"
                    }}
                />
                
                {/* Minimal Controls - Only show on hover */}
                {isVideoHovered && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: "12px",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                            backdropFilter: "blur(10px)",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: "1px solid rgba(255, 255, 255, 0.2)",
                            transition: "opacity 0.3s ease"
                        }}
                    >
                        {/* Play/Pause Button */}
                        <button
                            onClick={toggleVideoPlay}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#ffffff",
                                cursor: "pointer",
                                padding: "4px 8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                transition: "transform 0.2s ease, color 0.2s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.2)";
                                e.currentTarget.style.color = displayedProject.color;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.color = "#ffffff";
                            }}
                        >
                            {isVideoPlaying ? "⏸" : "▶"}
                        </button>
                        
                        {/* Fullscreen Button */}
                        <button
                            onClick={toggleFullscreen}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#ffffff",
                                cursor: "pointer",
                                padding: "4px 8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "18px",
                                transition: "transform 0.2s ease, color 0.2s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.2)";
                                e.currentTarget.style.color = displayedProject.color;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.color = "#ffffff";
                            }}
                        >
                            {isFullscreen ? "⛶" : "⛶"}
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
    // Render iframe for website projects - starts with button overlay, loads iframe on click
    const renderIframe = (url: string) => {
        // Add viewport width parameter if URL doesn't already have parameters
        const separator = url.includes('?') ? '&' : '?';
        const iframeUrl = `${url}${separator}viewport=desktop`;
        
        return (
            <div
                ref={visualContainerRef}
                style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    border: `1px solid ${displayedProject.color}40`,
                    borderRadius: "12px"
                }}
                onMouseMove={isIframeActive ? handleIframeInteraction : undefined}
                onMouseDown={isIframeActive ? handleIframeInteraction : undefined}
                onKeyDown={isIframeActive ? handleIframeInteraction : undefined}
                onTouchStart={isIframeActive ? handleIframeInteraction : undefined}
                onWheel={isIframeActive ? handleIframeInteraction : undefined}
            >
                <div
                    style={{
                        width: `${DESKTOP_WIDTH}px`,
                        height: `${DESKTOP_HEIGHT}px`,
                        transform: `scale(${iframeScale})`,
                        transformOrigin: "center center",
                        transition: "transform 0.3s ease",
                        position: "relative",
                        willChange: "transform"
                    }}
                >
                    {/* Interactive Iframe - only loads when active */}
                    {isIframeActive && (
                        <iframe
                            ref={iframeRef}
                            src={iframeUrl}
                            width={DESKTOP_WIDTH}
                            height={DESKTOP_HEIGHT}
                            style={{
                                width: `${DESKTOP_WIDTH}px`,
                                height: `${DESKTOP_HEIGHT}px`,
                                border: "none",
                                display: "block",
                                pointerEvents: "auto",
                                transform: "scale(1)",
                                transformOrigin: "top left",
                                opacity: 1,
                                transition: "opacity 0.4s ease"
                            }}
                            title={`${displayedProject.title} Preview`}
                            allow="fullscreen"
                            scrolling="auto"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
                            loading="lazy"
                            onError={(e) => {
                                // Suppress iframe errors - cross-origin errors are expected
                                e.preventDefault();
                            }}
                            onLoad={() => {
                                handleIframeInteraction();
                            }}
                        />
                    )}
                </div>
                
                {/* Click to Interact Button Overlay - shown when iframe is inactive */}
                {!isIframeActive && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                            opacity: 1,
                            transition: "opacity 0.4s ease",
                            pointerEvents: "auto",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            backdropFilter: "blur(2px)",
                            borderRadius: "12px"
                        }}
                    >
                        <button
                            onClick={activateIframe}
                            style={{
                                backgroundColor: displayedProject.color,
                                border: `2px solid ${displayedProject.color}`,
                                borderRadius: "12px",
                                padding: "1rem 2rem",
                                color: "#000000",
                                fontSize: "1rem",
                                fontWeight: 600,
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                                boxShadow: `0 4px 12px ${displayedProject.color}40`,
                                transform: "scale(1)"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = `0 6px 20px ${displayedProject.color}60`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = `0 4px 12px ${displayedProject.color}40`;
                            }}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = "scale(0.98)";
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                        >
                            {displayedProject.id === "portfolio" ? "Click for some websiteception!" : "Click to Interact!"}
                        </button>
                    </div>
                )}
            </div>
        );
    };
    
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
            <div 
                key={displayedProject.id}
                style={{
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
                    opacity: isContentVisible ? 1 : 0,
                    transform: isContentVisible ? 'translateY(0)' : 'translateY(-30px)',
                    transition: 'opacity 0.25s ease-out, transform 0.25s ease-out'
                }}
            >
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
                            color: displayedProject.color,
                            textShadow: `0 0 20px ${displayedProject.color}40`
                        }}
                    >
                        {displayedProject.title}
                    </h2>

                    {/* Period */}
                    <p className="project-detail-period">
                        {displayedProject.period}
                    </p>

                    {/* Description */}
                    <div 
                        className="project-description-box"
                        style={{
                            border: `1px solid ${displayedProject.color}40`
                        }}
                    >
                        <div className="project-description-text">
                            {displayedProject.description}
                        </div>
                    </div>

                    {/* Links */}
                    <div style={{
                        display: "flex",
                        gap: "1rem",
                        justifyContent: displayedProject.productLink ? "stretch" : "center"
                    }}>
                        {/* CAPM Download Buttons */}
                        {displayedProject.id === "capm-portfolio" ? (
                            <>
                                {/* Download Excel Sheet button - styled like GitHub */}
                                <button
                                    className="project-button"
                                    style={{
                                        flex: 1,
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                        border: `2px solid ${displayedProject.color}`,
                                        color: displayedProject.color
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = `${displayedProject.color}20`;
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    → Download Excel Sheet
                                </button>

                                {/* Download Report button - styled like Check it Out */}
                                <button
                                    className="project-button"
                                    style={{
                                        flex: 1,
                                        backgroundColor: displayedProject.color,
                                        border: `2px solid ${displayedProject.color}`,
                                        color: "#000000"
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = `0 8px 20px ${displayedProject.color}60`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    → Download Report
                                </button>
                            </>
                        ) : (
                            <>
                                {/* GitHub button - always visible for other projects */}
                                <a
                                    href={displayedProject.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-button"
                                    style={{
                                        flex: displayedProject.productLink ? 1 : "0 0 auto",
                                        minWidth: displayedProject.productLink ? "auto" : "200px",
                                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                                        border: `2px solid ${displayedProject.color}`,
                                        color: displayedProject.color
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = `${displayedProject.color}20`;
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
                                {displayedProject.productLink && (
                                    <a
                                        href={displayedProject.productLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-button"
                                        style={{
                                            flex: 1,
                                            backgroundColor: displayedProject.color,
                                            border: `2px solid ${displayedProject.color}`,
                                            color: "#000000"
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = `0 8px 20px ${displayedProject.color}60`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        → Check it Out
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>

                 {/* Bottom Section - Visual Content */}
                <div 
                    style={{
                        width: "100%",
                        flex: "1 1 auto",
                        minHeight: "200px",
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {shouldShowVideo(displayedProject.id) ? (
                        renderVideo()
                    ) : shouldShowIframe(displayedProject.id) && displayedProject.productLink ? (
                        renderIframe(displayedProject.productLink)
                    ) : shouldShowImageGallery(displayedProject.id) ? (
                        <ProjectImageGallery
                            images={getProjectImages(displayedProject.id)}
                            descriptions={getProjectImageDescriptions(displayedProject.id)}
                            projectColor={displayedProject.color}
                        />
                    ) : (
                        <div style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "rgba(255, 255, 255, 0.4)",
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "0.85rem",
                            fontStyle: "italic"
                        }}>
                            Visual content placeholder (images / iframe / video)
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
