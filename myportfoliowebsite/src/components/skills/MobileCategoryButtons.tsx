"use client"

import React, { JSX, useState } from "react"
import { getCategoryColor } from "@/utils/categoryColors"

interface MobileCategoryButtonsProps {
    onSelectionChange?: (selected: string) => void;
    initialSelection?: string;
}

// Helper function to convert hex to RGB for rgba
function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '255, 255, 255';
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
}

const MobileCategoryButtons = ({ 
    onSelectionChange, 
    initialSelection = "Languages" 
}: MobileCategoryButtonsProps): JSX.Element => {
    const [selectedCategory, setSelectedCategory] = useState<string>(initialSelection);
    
    const categories = ["Languages", "Frameworks", "Technologies", "AI Tools"];
    
    const handleButtonClick = (category: string) => {
        setSelectedCategory(category);
        onSelectionChange?.(category);
    };

    return (
        <div className="mobile-category-buttons">
            {categories.map((category, index) => {
                const isSelected = selectedCategory === category;
                const categoryColor = getCategoryColor(category);
                const rgbColor = hexToRgb(categoryColor);
                
                return (
                    <button
                        key={category}
                        className={`mobile-category-button ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleButtonClick(category)}
                        style={{
                            backgroundColor: isSelected ? `rgba(${rgbColor}, 0.3)` : `rgba(${rgbColor}, 0.15)`,
                            borderColor: categoryColor,
                            borderWidth: isSelected ? '3px' : '2px',
                            color: categoryColor,
                            boxShadow: isSelected ? `0 0 25px ${categoryColor}60, 0 0 15px ${categoryColor}40` : 'none',
                        }}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
};

export default MobileCategoryButtons;

