"use client"

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface ProjectImageGalleryProps {
    images: string[];
    descriptions?: string[];
    projectColor: string;
}

const ProjectImageGallery: React.FC<ProjectImageGalleryProps> = ({ 
    images,
    descriptions = [],
    projectColor
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handlePrevious = () => {
        setDirection('left');
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setDirection('right');
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    
    const openFullscreen = () => {
        setIsFullscreen(true);
    };
    
    const closeFullscreen = () => {
        setIsFullscreen(false);
    };
    
    // Handle escape key to close fullscreen
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                closeFullscreen();
            }
        };
        
        if (isFullscreen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isFullscreen]);

    return (
        <>
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            gap: "6px",
            position: "relative",
            padding: "0.5rem",
            boxSizing: "border-box",
            overflow: "hidden",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            border: `1px solid ${projectColor}40`,
            borderRadius: "12px"
        }}>
            {/* Image Container - Flexible sizing to fit available space */}
            <div style={{
                position: "relative",
                width: "100%",
                flex: "1 1 auto",
                minHeight: "150px",
                maxHeight: "calc(100% - 60px)", // Reserve more space for controls and description
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "0.75rem" // Increased padding to prevent edge cropping
            }}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: index === currentImageIndex ? 1 : 0,
                            transform: index === currentImageIndex 
                                ? 'translateX(0)' 
                                : direction === 'right' 
                                    ? 'translateX(30px)' 
                                    : 'translateX(-30px)',
                            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                            pointerEvents: index === currentImageIndex ? 'auto' : 'none',
                            cursor: "pointer"
                        }}
                        onClick={openFullscreen}
                    >
                        <Image 
                            src={image} 
                            alt={`Gallery image ${index + 1}`}
                            width={1200}
                            height={800}
                            style={{
                                maxWidth: "calc(100% - 2rem)",
                                maxHeight: "calc(100% - 2rem)",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                                borderRadius: "12px",
                                transition: "transform 0.2s ease"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.02)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Image Description - Compact */}
            {descriptions.length > 0 && (
                <div style={{
                    minHeight: "16px",
                    maxHeight: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    textAlign: "center",
                    flexShrink: 0
                }}>
                    {descriptions.map((description, index) => (
                        <p 
                            key={index}
                            style={{
                                position: index === currentImageIndex ? "relative" : "absolute",
                                opacity: index === currentImageIndex ? 1 : 0,
                                transition: "opacity 0.5s ease-in-out",
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 400,
                                fontSize: "0.75rem",
                                color: "rgba(255, 255, 255, 0.7)",
                                margin: 0,
                                pointerEvents: index === currentImageIndex ? 'auto' : 'none'
                            }}
                        >
                            {description}
                        </p>
                    ))}
                </div>
            )}

            {/* Arrow Controls - Compact and properly sized */}
            <div style={{
                display: "flex", 
                gap: "16px", 
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "36px",
                flexShrink: 0
            }}>
                <button
                    onClick={handlePrevious}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "24px",
                        cursor: "pointer",
                        transition: "transform 0.2s ease, color 0.2s ease",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                        e.currentTarget.style.color = projectColor;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                    }}
                >
                    ←
                </button>

                <span style={{
                    color: "rgba(255, 255, 255, 0.7)", 
                    fontFamily: "'Stack Sans Notch', sans-serif", 
                    fontSize: "0.85rem",
                    minWidth: "40px",
                    textAlign: "center"
                }}>
                    {currentImageIndex + 1} / {images.length}
                </span>

                <button
                    onClick={handleNext}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "rgba(255, 255, 255, 0.8)",
                        fontSize: "24px",
                        cursor: "pointer",
                        transition: "transform 0.2s ease, color 0.2s ease",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                        e.currentTarget.style.color = projectColor;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
                    }}
                >
                    →
                </button>
            </div>
        </div>
        
        {/* Fullscreen Modal - Rendered via Portal to document.body */}
        {isFullscreen && typeof window !== 'undefined' && createPortal(
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    animation: "fadeIn 0.3s ease-in"
                }}
                onClick={closeFullscreen}
            >
                {/* Close Button */}
                <button
                    className="project-gallery-close-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        closeFullscreen();
                    }}
                    style={{
                        position: "absolute",
                        top: "2rem",
                        right: "2rem",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        border: `2px solid ${projectColor}`,
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        color: projectColor,
                        fontSize: "24px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                        zIndex: 10000,
                        padding: 0,
                        margin: 0,
                        boxSizing: "border-box"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = projectColor;
                        e.currentTarget.style.color = "#000000";
                        e.currentTarget.style.transform = "scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                        e.currentTarget.style.color = projectColor;
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                >
                    ×
                </button>
                
                {/* Fullscreen Image Container - Fixed Layout */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    {/* Description - Fixed at top center */}
                    {descriptions.length > 0 && (
                        <div className="project-gallery-description-fullscreen" style={{
                            position: "absolute",
                            top: "2rem",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 10001,
                            width: "80vw",
                            maxWidth: "80vw",
                            minHeight: "2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            {descriptions.map((description, index) => (
                                <p 
                                    key={index}
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: "100%",
                                        opacity: index === currentImageIndex ? 1 : 0,
                                        transition: "opacity 0.5s ease-in-out",
                                        color: "rgba(255, 255, 255, 0.9)",
                                        fontFamily: "'Outfit', sans-serif",
                                        fontSize: "1rem",
                                        textAlign: "center",
                                        margin: 0,
                                        pointerEvents: index === currentImageIndex ? 'auto' : 'none',
                                        whiteSpace: "normal",
                                        wordWrap: "break-word"
                                    }}
                                >
                                    {description}
                                </p>
                            ))}
                        </div>
                    )}
                    
                    {/* Image Container - Center with fade animation */}
                    <div style={{
                        position: "relative",
                        width: "90vw",
                        height: "85vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {images.map((image, index) => (
                            <Image
                                key={index}
                                src={image}
                                alt={descriptions[index] || `Gallery image ${index + 1}`}
                                width={1920}
                                height={1080}
                                style={{
                                    position: "absolute",
                                    maxWidth: "90vw",
                                    maxHeight: "85vh",
                                    width: "auto",
                                    height: "auto",
                                    objectFit: "contain",
                                    borderRadius: "12px",
                                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                                    opacity: index === currentImageIndex ? 1 : 0,
                                    transform: index === currentImageIndex 
                                        ? 'translateX(0)' 
                                        : direction === 'right' 
                                            ? 'translateX(30px)' 
                                            : 'translateX(-30px)',
                                    transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                                    pointerEvents: index === currentImageIndex ? 'auto' : 'none',
                                    zIndex: index === currentImageIndex ? 1 : 0
                                }}
                            />
                        ))}
                    </div>
                    
                    {/* Navigation - Fixed at bottom center */}
                    {images.length > 1 && (
                        <div style={{
                            position: "absolute",
                            bottom: "2rem",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: "2rem",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10001
                        }}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrevious();
                                }}
                                style={{
                                    background: "rgba(0, 0, 0, 0.6)",
                                    border: `2px solid ${projectColor}`,
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    color: projectColor,
                                    fontSize: "24px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = projectColor;
                                    e.currentTarget.style.color = "#000000";
                                    e.currentTarget.style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                                    e.currentTarget.style.color = projectColor;
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            >
                                ←
                            </button>
                            
                            <span style={{
                                color: "rgba(255, 255, 255, 0.9)",
                                fontFamily: "'Stack Sans Notch', sans-serif",
                                fontSize: "1rem",
                                minWidth: "60px",
                                textAlign: "center"
                            }}>
                                {currentImageIndex + 1} / {images.length}
                            </span>
                            
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNext();
                                }}
                                style={{
                                    background: "rgba(0, 0, 0, 0.6)",
                                    border: `2px solid ${projectColor}`,
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    color: projectColor,
                                    fontSize: "24px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.3s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = projectColor;
                                    e.currentTarget.style.color = "#000000";
                                    e.currentTarget.style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                                    e.currentTarget.style.color = projectColor;
                                    e.currentTarget.style.transform = "scale(1)";
                                }}
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
            </div>,
            document.body
        )}
        </>
    );
};

export default ProjectImageGallery;

