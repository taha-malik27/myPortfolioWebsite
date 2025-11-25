"use client"

import React, { JSX, useState, useEffect } from "react"
import { getCategoryColor } from "@/utils/categoryColors"

interface VennDialComponentProps {
    onSelectionChange?: (selected: string) => void;
    size?: number;
}

const VennDialComponent = ({ onSelectionChange, size = 240 }: VennDialComponentProps): JSX.Element => {
    const [rotation, setRotation] = useState(180); // Start at 180 degrees so first circle is at bottom
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    const options = ["Languages", "Frameworks", "Technologies", "AI Tools"];
    
    // Responsive text size - decreases 15% more as viewport/size shrinks
    const responsiveTextSize = Math.max(10, Math.min(13, size * 0.05));
    
    // Emit initial selection on mount
    useEffect(() => {
        const normalizedRotation = ((rotation % 360) + 360) % 360;
        const selectedIndex = (Math.round((180 - normalizedRotation) / 90) % 4 + 4) % 4;
        onSelectionChange?.(options[selectedIndex]);
    }, []); // Empty dependency array means this only runs once on mount
    
    // Calculate which option is currently at the bottom (selected)
    // Since circles are positioned with angle = (index * 90 + rot - 90)
    // For a circle to be at bottom (90°): index * 90 + rot - 90 = 90
    // Therefore: rot = 180 - index * 90
    // Solving for index: index = (180 - rot) / 90
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const selectedIndex = (Math.round((180 - normalizedRotation) / 90) % 4 + 4) % 4;
    const selectedOption = options[selectedIndex];

    const handleCircleClick = (clickedIndex: number) => {
        // Calculate target rotation to bring clicked circle to bottom
        // For index to be at bottom: rot = 180 - index * 90
        const targetRotation = 180 - clickedIndex * 90;
        
        // Find the shortest path from current rotation to target
        let diff = targetRotation - rotation;
        
        // Normalize the difference to be between -180 and 180
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        
        const newRotation = rotation + diff;
        setRotation(newRotation);
        onSelectionChange?.(options[clickedIndex]);
    };

    // Calculate circle positions for 4-way dial (90 degrees apart)
    const radius = size * 0.30; // Radius of each circle
    const centerX = size / 2;
    const centerY = size / 2;
    const orbitRadius = size * 0.22; // Distance from center (increased for more spacing)

    // Circle positions (starting with one at bottom)
    const getCirclePosition = (index: number, rot: number) => {
        const angle = (index * 90 + rot - 90) * (Math.PI / 180); // -90 to start at bottom
        return {
            cx: centerX + orbitRadius * Math.cos(angle),
            cy: centerY + orbitRadius * Math.sin(angle),
            angle: angle
        };
    };

    // Text position - in the non-intersecting outer part of each circle
    const getTextPosition = (index: number) => {
        // Each circle's angle within the group
        const circleAngle = (index * 90 - 90) * (Math.PI / 180);
        
        // Position text along the ray from center, in the outer non-overlapping region
        const textDistance = orbitRadius + radius * 0.5;
        
        return {
            x: centerX + textDistance * Math.cos(circleAngle),
            y: centerY + textDistance * Math.sin(circleAngle)
        };
    };
    
    // Calculate text rotation - so it's upright when THIS circle is selected (at bottom)
    const getTextRotation = (index: number) => {
        // When group rotates to put circle i at bottom: rotation = 180 - i * 90
        // For text to be upright at that point: text_rotation_in_group = i * 90 - 180
        return index * 90 - 180;
    };

    return (
        <div className="venn-dial-container">
            {/* SVG Venn Diagram */}
            <svg 
                className="venn-dial-svg"
                width={size} 
                height={size + 20}
            >
                {/* Rotating group for circles AND text */}
                <g
                    className="venn-dial-rotating-group"
                    style={{
                        transformOrigin: `${centerX}px ${centerY}px`,
                        transform: `rotate(${rotation}deg)`
                    }}
                >
                    {/* Draw four circles with click handlers */}
                    {options.map((option, index) => {
                        const pos = getCirclePosition(index, 0);
                        const isSelected = index === selectedIndex;
                        const isHovered = hoveredIndex === index;
                        const categoryColor = getCategoryColor(option);
                        
                        return (
                            <g key={option}>
                                {/* Invisible larger circle for easier clicking */}
                                <circle
                                    className="venn-dial-hitbox"
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r={radius + 10}
                                    style={{
                                        cursor: isSelected ? "default" : "pointer"
                                    }}
                                    onMouseEnter={() => !isSelected && setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => !isSelected && handleCircleClick(index)}
                                />
                                
                                {/* Visible circle */}
                                <circle
                                    className="venn-dial-circle"
                                    cx={pos.cx}
                                    cy={pos.cy}
                                    r={radius}
                                    fill={isHovered ? `${categoryColor}1a` : "none"}
                                    stroke={isSelected ? categoryColor : isHovered ? categoryColor : "#ffffff"}
                                    strokeWidth={isSelected ? "3" : isHovered ? "2.5" : "2"}
                                    style={{
                                        opacity: isSelected ? 1 : isHovered ? 0.9 : 0.7
                                    }}
                                />
                            </g>
                        );
                    })}
                    
                    {/* Text labels - baked in non-overlapping areas, upright when selected */}
                    {options.map((option, index) => {
                        const isSelected = index === selectedIndex;
                        const isHovered = hoveredIndex === index;
                        const textPos = getTextPosition(index);
                        const textRotation = getTextRotation(index);
                        const categoryColor = getCategoryColor(option);
                        
                        return (
                            <text
                                className="venn-dial-text"
                                key={`text-${option}`}
                                x={textPos.x}
                                y={textPos.y}
                                fill={isSelected ? categoryColor : isHovered ? categoryColor : "#ffffff"}
                                fontSize={isSelected ? responsiveTextSize + 2 : isHovered ? responsiveTextSize : responsiveTextSize - 1}
                                fontWeight={isSelected ? "bold" : isHovered ? "600" : "normal"}
                                style={{
                                    transform: `rotate(${textRotation}deg)`,
                                    transformOrigin: `${textPos.x}px ${textPos.y}px`
                                }}
                            >
                                {option}
                            </text>
                        );
                    })}
                </g>

                {/* Center indicator (optional - shows center point) */}
                <circle
                    className="venn-dial-center-dot"
                    cx={centerX}
                    cy={centerY}
                    r="3"
                />

                {/* Selection indicator at bottom */}
                <path
                    className="venn-dial-arrow"
                    d={`M ${centerX} ${size - 5} L ${centerX - 6} ${size + 2} L ${centerX + 6} ${size + 2} Z`}
                    fill={getCategoryColor(selectedOption)}
                    style={{
                        transition: "fill 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)"
                    }}
                />
            </svg>
        </div>
    );
};

export default VennDialComponent;

