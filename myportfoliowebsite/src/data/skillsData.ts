export interface Skill {
    name: string;
    years: number;
    color: string;
    note?: string; // Optional note to display beside the skill name
}

export interface SkillCategory {
    id: string;
    title: string;
    description: string;
    skills: Skill[];
}

export const skillsData: SkillCategory[] = [
    {
        id: "languages",
        title: "Languages",
        description: "Programming languages I use to bring ideas to life, from system-level code to web development.",
        skills: [
            { name: "Python", years: 4, color: "#3776AB" },
            { name: "Java", years: 3, color: "#007396" },
            { name: "JavaScript/TypeScript", years: 2, color: "#F7DF1E" },
            { name: "SQL", years: 2, color: "#CC2927" },
            { name: "HTML & CSS", years: 2, color: "#E34F26" },
            { name: "R", years: 2, color: "#276DC3" },
            { name: "Kotlin", years: 1, color: "#7F52FF" },
            { name: "C", years: 1, color: "#A8B9CC" },
            { name: "ARMv8", years: 1, color: "#00BFD8" }
        ]
    },
    {
        id: "frameworks",
        title: "Libraries & Frameworks",
        description: "Frameworks and libraries that accelerate development and enable powerful functionality.",
        skills: [
            { name: "SciPy", years: 3, color: "#8CAAE6" },
            { name: "NumPy", years: 3, color: "#013243" },
            { name: "VispY", years: 3, color: "#FF6B6B" },
            { name: "Pandas", years: 3, color: "#150458" },
            { name: "Shiny", years: 3, color: "#75AADB" },
            { name: "JavaFX", years: 2.5, color: "#FF8800" },
            { name: "PostgreSQL", years: 2, color: "#336791" },
            { name: "React", years: 2, color: "#61DAFB" },
            { name: "Node.js", years: 2, color: "#339933" },
            { name: "Next.js", years: 2, color: "#000000" },
            { name: "Tailwind CSS", years: 2, color: "#06B6D4" },
            { name: "PyQt", years: 2, color: "#41CD52" },
            { name: "Flask", years: 1, color: "#000000" }
        ]
    },
    {
        id: "technologies",
        title: "Technologies & Dev Tools",
        description: "Tools and platforms that streamline development workflows and enable robust cloud solutions.",
        skills: [
            { name: "Git (GitHub/GitLab)", years: 4, color: "#F05032" },
            { name: "VS Code", years: 4, color: "#007ACC" },
            { name: "PyCharm", years: 4, color: "#21D789" },
            { name: "IntelliJ IDEA", years: 4, color: "#FF6B6B" },
            { name: "RStudio", years: 3, color: "#75AADB" },
            { name: "Excel", years: 3, color: "#217346" },
            { name: "Azure Cloud", years: 1, color: "#0078D4" },
            { name: "Azure DevOps", years: 1, color: "#0078D4" },
            { name: "ServiceNow", years: 1, color: "#62D84E" },
            { name: "Oracle", years: 1, color: "#F80000" },
            { name: "DBeaver", years: 1, color: "#382923" },
            { name: "SSMS", years: 1, color: "#CC2927" },
            { name: "Power BI", years: 1, color: "#F2C811" },
            { name: "Power Apps", years: 1, color: "#742774" },
            { name: "Visual Studio", years: 1, color: "#5C2D91" }
        ]
    },
    {
        id: "aitools",
        title: "AI Tools",
        description: "AI-powered tools that enhance productivity and unlock creative possibilities.",
        skills: [
            { name: "ChatGPT & OpenAI API", years: 3, color: "#10A37F", note: "(Yes, I was there in Nov 2022)" },
            { name: "DALL-E", years: 2, color: "#FF6B6B" },
            { name: "Gemini", years: 1.5, color: "#4285F4" },
            { name: "Cursor", years: 1.5, color: "#000000" },
            { name: "SORA", years: 1.5, color: "#FF3B3B" },
            { name: "Microsoft Copilot", years: 1.5, color: "#00A4EF" },
            { name: "GitHub Copilot", years: 1, color: "#6E40C9" },
            { name: "Perplexity AI", years: 1, color: "#20808D" }
        ]
    }
];

