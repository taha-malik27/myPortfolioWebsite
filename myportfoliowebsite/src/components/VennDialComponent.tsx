"use client"

import React, { JSX, useState } from "react"

interface VennDialComponentProps {
    onSelectionChange?: (selected: string) => void;
    size?: number;
}

const VennDialComponent = ({ onSelectionChange, size = 240 }: VennDialComponentProps): JSX.Element => {
    const [rotation, setRotation] = useState(180); // Start at 180 degrees so first circle is at bottom
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    
    const options = ["Languages", "Frameworks", "Technologies"];
    
    // Calculate which option is currently at the bottom (selected)
    // Since circles are positioned with angle = (index * 120 + rot - 90)
    // For a circle to be at bottom (90°): index * 120 + rot - 90 = 90
    // Therefore: rot = 180 - index * 120
    // Solving for index: index = (180 - rot) / 120
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const selectedIndex = (Math.round((180 - normalizedRotation) / 120) % 3 + 3) % 3;
    const selectedOption = options[selectedIndex];

    const handleCircleClick = (clickedIndex: number) => {
        // Calculate target rotation to bring clicked circle to bottom
        // For index to be at bottom: rot = 180 - index * 120
        const targetRotation = 180 - clickedIndex * 120;
        
        // Find the shortest path from current rotation to target
        let diff = targetRotation - rotation;
        
        // Normalize the difference to be between -180 and 180
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        
        const newRotation = rotation + diff;
        setRotation(newRotation);
        onSelectionChange?.(options[clickedIndex]);
    };

    // Calculate circle positions for Venn diagram (120 degrees apart)
    const radius = size * 0.30; // Radius of each circle
    const centerX = size / 2;
    const centerY = size / 2;
    const orbitRadius = size * 0.16; // Distance from center

    // Circle positions (starting with one at bottom)
    const getCirclePosition = (index: number, rot: number) => {
        const angle = (index * 120 + rot - 90) * (Math.PI / 180); // -90 to start at bottom
        return {
            cx: centerX + orbitRadius * Math.cos(angle),
            cy: centerY + orbitRadius * Math.sin(angle),
            angle: angle
        };
    };

    // Text position - in the non-intersecting outer part of each circle
    const getTextPosition = (index: number) => {
        // Each circle's angle within the group
        const circleAngle = (index * 120 - 90) * (Math.PI / 180);
        
        // Position text along the ray from center, in the outer non-overlapping region
        // Adjusted to be closer to center (reduced from 0.7 to 0.62 for ~5px closer)
        const textDistance = orbitRadius + radius * 0.5;
        
        return {
            x: centerX + textDistance * Math.cos(circleAngle),
            y: centerY + textDistance * Math.sin(circleAngle)
        };
    };
    
    // Calculate text rotation - so it's upright when THIS circle is selected (at bottom)
    const getTextRotation = (index: number) => {
        // When group rotates to put circle i at bottom: rotation = 180 - i * 120
        // For text to be upright at that point: text_rotation_in_group = i * 120 - 180
        return index * 120 - 180;
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
                    {/* Draw three circles with click handlers */}
                    {options.map((option, index) => {
                        const pos = getCirclePosition(index, 0);
                        const isSelected = index === selectedIndex;
                        const isHovered = hoveredIndex === index;
                        
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
                                    fill={isHovered ? "rgba(0, 255, 255, 0.1)" : "none"}
                                    stroke={isSelected ? "#ffac53" : isHovered ? "#ffac53" : "#ffffff"}
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
                        
                        return (
                            <text
                                className="venn-dial-text"
                                key={`text-${option}`}
                                x={textPos.x}
                                y={textPos.y}
                                fill={isSelected ? "#ffac53" : isHovered ? "#ffac53" : "#ffffff"}
                                fontSize={isSelected ? "15" : isHovered ? "13" : "12"}
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
                />
            </svg>
        </div>
    );
};

export default VennDialComponent;

