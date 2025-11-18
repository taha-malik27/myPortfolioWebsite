// Category color mappings for consistent theming across components
export const categoryColors: { [key: string]: string } = {
    "Languages": "#ffac53",                    // Orange
    "Frameworks": "#5ec4ff",                   // Blue
    "Libraries & Frameworks": "#5ec4ff",       // Blue (alias for actual title)
    "Technologies": "#a855f7",                 // Purple
    "Technologies & Dev Tools": "#a855f7",     // Purple (alias for actual title)
    "AI Tools": "#10b981"                      // Green
};

export const getCategoryColor = (category: string): string => {
    return categoryColors[category] || "#ffac53"; // Default to orange
};

