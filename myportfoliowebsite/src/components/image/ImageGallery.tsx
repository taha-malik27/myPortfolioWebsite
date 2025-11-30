"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    descriptions?: string[];
    maxWidth?: string;
    minWidth?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
    images,
    descriptions = [],
    maxWidth = "500px", 
    minWidth = "300px" 
}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right'>('right');

    const handlePrevious = () => {
        setDirection('left');
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setDirection('right');
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="image-gallery-container" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: maxWidth,
            minWidth: minWidth,
            gap: "20px",
            position: "relative",
            paddingLeft: "5%"
        }}>
            {/* Image Container */}
            <div style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
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
                                    ? 'translateX(50px)' 
                                    : 'translateX(-50px)',
                            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                            pointerEvents: index === currentImageIndex ? 'auto' : 'none'
                        }}
                    >
                        <Image 
                            src={image} 
                            alt={`Gallery image ${index + 1}`}
                            width={500}
                            height={500}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                width: "auto",
                                height: "auto",
                                objectFit: "contain",
                                borderRadius: "15px"
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Image Description */}
            {descriptions.length > 0 && (
                <div style={{
                    minHeight: "30px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    textAlign: "center",
                    paddingTop: "10px"
                }}>
                    {descriptions.map((description, index) => (
                        <p 
                            key={index}
                            style={{
                                position: index === currentImageIndex ? "relative" : "absolute",
                                opacity: index === currentImageIndex ? 1 : 0,
                                transition: "opacity 0.5s ease-in-out",
                                fontFamily: "Outfit, sans-serif",
                                fontWeight: 400,
                                fontSize: "12px",
                                color: "rgb(230, 230, 230)",
                                margin: 0,
                                pointerEvents: index === currentImageIndex ? 'auto' : 'none'
                            }}
                        >
                            {description}
                        </p>
                    ))}
                </div>
            )}

            {/* Arrow Controls - Fixed below the image */}
            <div style={{
                display: "flex", 
                gap: "30px", 
                alignItems: "center",
                justifyContent: "center",
                width: "100%"
            }}>
                <button
                    onClick={handlePrevious}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "32px",
                        cursor: "pointer",
                        transition: "transform 0.2s ease, color 0.2s ease",
                        padding: "10px",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                        e.currentTarget.style.color = "orange";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.color = "white";
                    }}
                >
                    ←
                </button>

                <span style={{
                    color: "rgb(194, 194, 194)", 
                    fontFamily: "Stack Sans Notch, sans-serif", 
                    fontSize: "14px",
                    minWidth: "50px",
                    textAlign: "center"
                }}>
                    {currentImageIndex + 1} / {images.length}
                </span>

                <button
                    onClick={handleNext}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "white",
                        fontSize: "32px",
                        cursor: "pointer",
                        transition: "transform 0.2s ease, color 0.2s ease",
                        padding: "10px",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                        e.currentTarget.style.color = "orange";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.color = "white";
                    }}
                >
                    →
                </button>
            </div>
        </div>
    );
};

export default ImageGallery;

