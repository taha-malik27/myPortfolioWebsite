export interface Skill {
    name: string;
    years: number; // See the note on SKILLS_YEARS_ANCHOR for how this is read
    color: string;
    note?: string; // Optional note to display beside the skill name
    logoSrc?: string; // Path to the skill logo image
    autoAge?: boolean; // Overrides the category setting for this one skill
}

export interface SkillCategory {
    id: string;
    title: string;
    description: string;
    skills: Skill[];
    featuredSkills?: string[]; // Array of 5 skill names to display in halo
    autoAge?: boolean; // Defaults to false - opt a whole category into aging
}

/**
 * Aging is opt-in per category, and only AI Tools uses it today: those are the
 * tools in daily use, so time passing really does mean more experience. Every
 * other category is updated by hand as the skill actually gets used.
 *
 * How to read a `years` value depends on whether its skill ages:
 *   - Aging skill: baseline as of SKILLS_YEARS_ANCHOR, offset added on top.
 *     A skill you want showing 2 years today goes in as 1.5.
 *   - Non-aging skill: the literal number shown on the page.
 *
 * To switch a category on, add `autoAge: true` to it and drop half a year from
 * each of its baselines for every six months since the anchor. `autoAge` on an
 * individual skill overrides its category either way, which is how Kotlin, C,
 * ARMv8, and JavaFX stay pinned no matter what.
 */
export const SKILLS_YEARS_ANCHOR = new Date(2025, 10, 1); // Nov 2025

/**
 * Half a year for each full six months since the anchor, so aging skills climb
 * on their own instead of needing an edit every few months.
 */
export const getSkillYearsOffset = (now: Date = new Date()): number => {
    const monthsElapsed =
        (now.getFullYear() - SKILLS_YEARS_ANCHOR.getFullYear()) * 12 +
        (now.getMonth() - SKILLS_YEARS_ANCHOR.getMonth());

    return Math.max(0, Math.floor(monthsElapsed / 6)) * 0.5;
};

/** Years to show for a skill, honouring the skill and category aging settings. */
export const getDisplayYears = (
    skill: Skill,
    offset: number,
    categoryAutoAge = false
): number => ((skill.autoAge ?? categoryAutoAge) ? skill.years + offset : skill.years);

export const skillsData: SkillCategory[] = [
    {
        id: "languages",
        title: "Languages",
        description: "Programming languages I use to bring ideas to life, from system-level code to web development.",
        featuredSkills: ["Python", "Java", "JavaScript/TypeScript", "SQL", "HTML & CSS"],
        skills: [
            { name: "Python", years: 4.5, color: "#3776AB" },
            { name: "Java", years: 3.5, color: "#007396" },
            { name: "JavaScript/TypeScript", years: 2.5, color: "#F7DF1E" },
            { name: "SQL", years: 2.5, color: "#CC2927" },
            { name: "HTML & CSS", years: 2.5, color: "#E34F26" },
            { name: "R", years: 2.5, color: "#276DC3" },
            { name: "Kotlin", years: 1, color: "#7F52FF", autoAge: false },
            { name: "C", years: 1, color: "#A8B9CC", autoAge: false },
            { name: "ARMv8", years: 1, color: "#00BFD8", autoAge: false }
        ]
    },
    {
        id: "frameworks",
        title: "Libraries & Frameworks",
        description: "Frameworks and libraries that accelerate development and enable powerful functionality.",
        featuredSkills: ["React.js", "NumPy", "SciPy", "PostgreSQL", "Tailwind CSS"],
        skills: [
            { name: "SciPy", years: 2.5, color: "#8CAAE6" },
            { name: "NumPy", years: 2.5, color: "#013243" },
            { name: "VisPy", years: 2.5, color: "#FF6B6B" },
            { name: "Pandas", years: 2.5, color: "#150458" },
            { name: "Shiny", years: 2.5, color: "#75AADB" },
            { name: "PostgreSQL", years: 2.5, color: "#336791" },
            { name: "React.js", years: 2.5, color: "#61DAFB" },
            { name: "Node.js", years: 2.5, color: "#339933" },
            { name: "Next.js", years: 2.5, color: "#000000" },
            { name: "Tailwind CSS", years: 2.5, color: "#06B6D4" },
            { name: "PyQt", years: 2.5, color: "#41CD52" },
            { name: "Flask", years: 1.5, color: "#000000" },
            { name: "JavaFX", years: 1, color: "#FF8800", autoAge: false },
            { name: "Electron", years: 1, color: "#47848F" },
            { name: "FastAPI", years: 1, color: "#009688" }
        ]
    },
    {
        id: "technologies",
        title: "Technologies & Dev Tools",
        description: "Tools and platforms that streamline development workflows and enable robust cloud solutions.",
        featuredSkills: ["Git (GitHub/GitLab)", "VS Code", "IntelliJ IDEA", "Azure Cloud", "Excel"],
        skills: [
            { name: "Git (GitHub/GitLab)", years: 4.5, color: "#F05032" },
            { name: "VS Code", years: 4.5, color: "#007ACC" },
            { name: "PyCharm", years: 4.5, color: "#21D789" },
            { name: "IntelliJ IDEA", years: 4.5, color: "#FF6B6B" },
            { name: "RStudio", years: 3.5, color: "#75AADB" },
            { name: "Excel", years: 3.5, color: "#217346" },
            { name: "Azure Cloud", years: 1.5, color: "#0078D4" },
            { name: "Azure SQL", years: 1.5, color: "#0078D4" },
            { name: "Azure DevOps", years: 1.5, color: "#0078D4" },
            { name: "ServiceNow", years: 1.5, color: "#62D84E" },
            { name: "Oracle", years: 1.5, color: "#F80000" },
            { name: "DBeaver", years: 1.5, color: "#382923" },
            { name: "SSMS", years: 1.5, color: "#CC2927" },
            { name: "Power BI", years: 1.5, color: "#F2C811" },
            { name: "Power Apps", years: 1.5, color: "#742774" },
            { name: "Visual Studio", years: 1.5, color: "#5C2D91" },
            { name: "Vite", years: 1, color: "#646CFF" }
        ]
    },
    {
        id: "aitools",
        title: "AI Tools",
        description: "AI-powered tools that enhance productivity and unlock creative possibilities.",
        featuredSkills: ["ChatGPT & OpenAI API", "Gemini", "Cursor", "Microsoft Copilot", "GitHub Copilot"],
        autoAge: true,
        skills: [
            { name: "ChatGPT & OpenAI API", years: 3, color: "#10A37F", note: "(Yes, I was there in Nov 2022)" },
            { name: "DALL-E", years: 2, color: "#FF6B6B" },
            { name: "Gemini", years: 1.5, color: "#4285F4" },
            { name: "Cursor", years: 1.5, color: "#000000" },
            { name: "SORA", years: 1.5, color: "#FF3B3B" },
            { name: "Microsoft Copilot", years: 1.5, color: "#00A4EF" },
            { name: "Claude Code", years: 1, color: "#D97757" },
            { name: "GitHub Copilot", years: 1, color: "#6E40C9" },
            { name: "Perplexity AI", years: 1, color: "#20808D" }
        ]
    }
];
