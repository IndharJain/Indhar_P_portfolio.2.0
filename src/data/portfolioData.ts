export const portfolioData = {
    personal: {
        name: "Indhar Premchand",
        role: "Front-End Developer",
        bio: "Crafting scalable, high-performance web ecosystems. Specializing in micro-frontends and enterprise architecture.",
        email: "Indharjain@gmail.com",
        location: "Chennai, India",
        links: {
            github: "https://github.com/indharjain",
            linkedin: "https://linkedin.com/in/indhar-p"
        }
    },
    skills: [
        "HTML5", "CSS3 (SASS)", "JavaScript (ES6+)", "TypeScript", "JSX", "React", "Angular", "Node.js",
        "Next.js", "Micro-Frontends", "RxJS", "D3.js", "Highcharts", "AG Grid", "Tailwind CSS", "Bootstrap",
        "Java", "Python", "C++", "Jest", "Jasmine", "Webpack", "Docker", "AWS", "Azure DevOps",
        "Git", "Jira", "Figma", "Postman", "System Design", "Accessibility", "Responsive Design"
    ],
    projects: [
        {
            title: "AAVA Elderwand",
            desc: "Advanced monorepo/micro-frontend architecture enabling modular, scalable enterprise UI ecosystems. Features backend-driven authentication and shared component libraries.",
            tags: ["Microservices", "Module Federation", "React", "Azure AD", "MCP", "App Insights"],
            year: "2025"
        },
        {
            title: "Digital Ascender AI",
            desc: "AI-driven digital companion for software engineering. Features chatbot interfaces for real-time guidance and a custom VS Code plugin to streamline developer workflows.",
            tags: ["AI/ML", "NLP", "VS Code Plugin", "Chatbots"],
            year: "2025"
        },
        {
            title: "Cloud Cost Studio",
            desc: "Cloud cost governance platform with interactive visualizations. Leveraged D3.js for node tree graphs and Highcharts for usage data to optimize cloud expenses.",
            tags: ["D3.js", "Highcharts", "Angular", "Cloud Ops"],
            year: "2024"
        },
        {
            title: "Jira AI Plugin",
            desc: "Custom Jira plugin that leverages AI to automate user story and bug generation, significantly reducing manual entry time for product owners and QA teams.",
            tags: ["Jira API", "AI/ML", "Plugin Dev", "Productivity"],
            year: "2024"
        },
        {
            title: "A11y DevTools Extension",
            desc: "Google Chrome extension for on-page accessibility scanning. Provides immediate, in-browser improvement suggestions for developers during the coding phase.",
            tags: ["Chrome Ext", "DevTools", "JavaScript", "A11y"],
            year: "2023"
        },
        {
            title: "Intelligent Test Automation",
            desc: "Intelligent Test Automation platform using AI/ML to reduce manual effort. Features robust AG Grid upload systems for managing test scripts.",
            tags: ["AI/ML", "AG Grid", "Automation", "Testing"],
            year: "2023"
        },
        {
            title: "Accessibility Framework",
            desc: "Comprehensive accessibility evaluation framework generating severity-based reports to ensure WCAG compliance across enterprise applications.",
            tags: ["Accessibility", "WCAG", "Reporting", "Compliance"],
            year: "2022"
        }

    ],
    experience: [
        {
            company: "Ascendion",
            role: "Engineer",
            period: "May 2023 — Present",
            details: [
                "Led development of advanced monorepo/micro-frontend architecture enabling modular, scalable, and maintainable enterprise UI ecosystems.",
                "Architected a system for independent team feature development with shared resources and libraries.",
                "Designed backend-driven authentication framework supporting SSOs (Azure AD, Keycloak) with minimal frontend code changes.",
                "Created reusable UI components and utilities for consistent design and faster delivery.",
                "Implemented CI/CD pipelines to automate build, testing, and deployment for multiple micro-frontend modules."
            ]
        },
        {
            company: "Ascendion",
            role: "Senior Associate Engineer",
            period: "May 2023 — Present",
            details: [
                "Developed AI-driven digital engineering companion for planning, design, coding, testing, and delivery.",
                "Built chatbot interfaces for real-time AI guidance and created POCs to enhance features and user experience.",
                "Extended VS Code via a custom plugin to streamline developer workflows.",
                "Created Jira plugin for automated AI-powered user story and bug creation.",
                "Built interactive D3.js node-tree graphs for cloud cost visualization and Angular Highcharts dashboards."
            ]
        },
        {
            company: "Enterprise Minds",
            role: "Junior Software Engineer",
            period: "Feb 2022 — May 2023",
            details: [
                "Built AG Grid-based upload systems to manage and track test scripts.",
                "Developed multi-page routing system for improved navigation.",
                "Designed UI for accessibility scanning and reporting.",
                "Implemented severity-based categorization of accessibility issues.",
                "Built Chrome extension for on-page accessibility scanning."
            ]
        }
    ]
};
