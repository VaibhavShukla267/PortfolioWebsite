export const profile = {
  name: "Vaibhav Shukla",
  initials: "VS",
  role: "Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "Web Production Engineer",
    "GenAI Automation Specialist",
    "React / Next.js Engineer",
  ],
  email: "shuklavaibhav267@gmail.com",
  phone: "+91 9305718509",
  location: "India",
  linkedin: "https://linkedin.com/in/vaibhav-shukla-5437a7156",
  github: "https://github.com/VaibhavShukla267",
  resumeUrl: "/resume/Vaibhav_Shukla_Resume.pdf",
  summary:
    "Detail-oriented Full Stack Developer and MCA graduate with a strong focus on Web Production, Content Delivery, and GenAI workflows. Experienced in maintaining high-traffic web platforms with a deep understanding of technical SEO, UX design principles, and brand identity standards. Adept at leveraging JavaScript, React, Next.js, and modern AI automation tools to optimize digital content lifecycles and execute go-to-market strategy rollouts.",
  stats: [
    { label: "Years shipping production web", value: 2, suffix: "+" },
    { label: "Secure REST APIs built", value: 10, suffix: "+" },
    { label: "Manual effort reduced", value: 25, suffix: "%" },
    { label: "Page-load speed gained", value: 30, suffix: "%" },
  ],
} as const;

export type SkillGroup = {
  title: string;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Web Production & UI",
    blurb: "The interface layer — built to ship and built to last.",
    items: [
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3 / SCSS",
      "React.js",
      "Next.js",
      "Ant Design",
      "Framer Motion",
    ],
  },
  {
    title: "Content & CMS",
    blurb: "Structured content that scales without breaking.",
    items: [
      "Contentful",
      "Metadata Management",
      "Technical SEO Audits",
      "Digital Asset Optimization",
    ],
  },
  {
    title: "GenAI & Automation",
    blurb: "AI as a production tool, not a novelty.",
    items: [
      "Prompt Engineering",
      "GitHub Copilot",
      "LLM Tool Integration",
      "Content Automation",
    ],
  },
  {
    title: "Design & Asset Mgmt",
    blurb: "Where engineering discipline meets visual intent.",
    items: ["Figma", "Visual Brand Identity", "Cross-Browser UI Debugging"],
  },
  {
    title: "Backend & Storage",
    blurb: "Data that moves fast and stays correct.",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "SQL",
      "MongoDB",
      "Query Optimization",
    ],
  },
  {
    title: "Tools & Workflow",
    blurb: "The pipeline behind every deploy.",
    items: [
      "Git / GitHub",
      "Agile / Scrum",
      "CI/CD",
      "Postman",
      "Vercel",
      "Hostinger",
    ],
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "AlphaBits Solutions",
    period: "Apr 2025 — Present",
    points: [
      "Deliver impactful web content and UI modules using React.js and Ant Design, ensuring 100% adherence to defined visual brand standards.",
      "Streamline content updates and migration processes, reducing manual operational effort by 25% through script-based automation and GenAI tools.",
      "Conduct rigorous testing and remediation of digital deliverables to ensure cross-browser compatibility and optimal UX.",
      "Collaborate with global cross-functional teams to fulfill complex content requests within tight GTM deadlines.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "AlphaBits Solutions",
    period: "Sept 2024 — Apr 2025",
    points: [
      "Developed and sustained 10+ secure REST APIs, focusing on clean metadata structures, input validation, and efficient data retrieval.",
      "Built and updated responsive web pages using modern layout templates, ensuring strict alignment with client-specific brand identities.",
      "Optimized digital imagery and media graphics for web performance, improving overall page load speeds by 30%.",
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  tag: string;
  year: string;
  description: string;
  points: string[];
  stack: string[];
  thumbnail:
    | "brain"
    | "wave"
    | "grid"
    | "orbit"
    | "chart"
    | "cards"
    | "clock"
    | "signal"
    | "cart";
  /** Live URL, when the project is actually deployed and browsable. */
  url?: string;
};

export const projects: Project[] = [
  {
    slug: "opsbrain-ai",
    name: "OpsBrain AI",
    tag: "Enterprise Knowledge & AI Ingestion Engine",
    year: "2026",
    description:
      "An automated document ingestion and Knowledge Graph platform that turns unstructured SOPs and technical manuals into structured operational data.",
    points: [
      "Architected an automated document ingestion and Knowledge Graph platform using Next.js, Node.js, and Gemini LLM integrations.",
      "Automated parsing workflows for technical manuals and SOPs, converting unstructured content into structured operational data.",
    ],
    stack: ["Next.js", "Node.js", "Gemini LLM", "Knowledge Graph"],
    thumbnail: "brain",
  },
  {
    slug: "medieval-india",
    name: "Medieval India",
    tag: "Freelance Project — Luxury Brand Website",
    year: "2026",
    description:
      "An editorial-grade marketing site for a monumental tower-clock manufacturer — pairing dark luxury visuals with GPS-precision engineering credibility, from restoration case studies to a full product collection.",
    points: [
      "Designed a dark, gold-accented editorial visual language with serif-italic display type, matching the brand's precision-meets-heritage positioning.",
      "Built masterpiece case-study layouts — including the Lal Chowk, Srinagar restoration — plus a full product collection and proposal/contact flow.",
    ],
    stack: ["Next.js", "React", "Custom Design System"],
    thumbnail: "clock",
    url: "https://medival-clock.vercel.app/",
  },
  {
    slug: "finance-dashboard-ui",
    name: "Finance Dashboard UI",
    tag: "Personal Project — Data Visualization Dashboard",
    year: "2026",
    description:
      "A bespoke, heavily-styled finance dashboard built for a high-end financial user experience — pure vanilla React and CSS instead of a component library, constructing a fully custom glassmorphism design language.",
    points: [
      "Engineered a 6-mode theme engine (Light, Dark, Cyberpunk, Emerald, Midnight, Sunset) with responsive glassmorphism UI reacting to CSS theme variables.",
      "Built role-based access simulation (Admin/Viewer), Recharts data visualizations, and real-time search, sorting, and filtering.",
      "Implemented persistent state via Context API with simulated transaction data configurations stored in localStorage.",
    ],
    stack: ["React", "CSS (Glassmorphism)", "Recharts", "Context API"],
    thumbnail: "chart",
    url: "https://finance-dashboard-eight-woad-73.vercel.app/",
  },
  {
    slug: "vijyapana-vedashray",
    name: "Vijyapana.com & Vedashray.com",
    tag: "Lead Web Developer",
    year: "2025",
    description:
      "End-to-end web production and deployment of high-performing, SEO-optimized digital platforms serving high-traffic audiences.",
    points: [
      "Managed end-to-end web production and deployment of high-performing, SEO-optimized digital platforms using Next.js 14.",
      "Executed bulk content updates and technical SEO audits to sustain long-term site health and search relevance.",
      "Implemented complex UI/UX enhancements utilizing Framer Motion while maintaining cohesive visual brand continuity.",
    ],
    stack: ["Next.js 14", "Framer Motion", "Technical SEO", "CMS"],
    thumbnail: "signal",
  },
  {
    slug: "swiggy-clone",
    name: "Swiggy Clone — Restaurant Listing App",
    tag: "Personal Project — Food Ordering Platform",
    year: "2025",
    description:
      "A Swiggy-inspired food ordering app pulling live data from Swiggy's internal API — restaurant listings, per-restaurant menus, search, filtering, and full cart management.",
    points: [
      "Built custom React hooks (useRestaurantMenu, useRestaurantDetail, useOnlineStatus) for live data fetching and connectivity detection.",
      "Implemented Context API-driven cart management, top-rated filtering, shimmer loading states, and Framer Motion animations.",
    ],
    stack: ["React.js", "Context API", "Framer Motion", "Swiggy API"],
    thumbnail: "cart",
  },
  {
    slug: "indieeyes-bizexplore",
    name: "IndieEyes.com & Biz Explore",
    tag: "Full-Stack Web Applications",
    year: "2024",
    description:
      "Scalable web platforms with structured image upload workflows, admin dashboards, and role-based access control.",
    points: [
      "Built scalable web platforms featuring structured image upload workflows, admin dashboard capabilities, and Role-Based Access Control (RBAC).",
      "Optimized relational/document database query paths, delivering 25% faster backend response speeds.",
    ],
    stack: ["React.js", "Node.js", "MongoDB", "RBAC"],
    thumbnail: "grid",
  },
];

export type EducationItem = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

export const education: EducationItem[] = [
  {
    school: "Kanpur Institute of Technology",
    degree: "Master of Computer Applications (MCA)",
    period: "Graduation Year: 2026",
    detail: "CGPA: 7.8",
  },
  {
    school: "Dr. Virendra Swaroop Institute of Computer Studies",
    degree: "Bachelor of Computer Applications (BCA)",
    period: "Graduation Year: 2024",
    detail: "CGPA: 7.5",
  },
];

export const certifications: string[] = [
  "Enginow — Open Source Hackathon (Certificate of Participation)",
  "AWS — Developing Generative Artificial Intelligence Solutions",
  "AWS — Essentials of Prompt Engineering",
  "Udemy — The Complete ReactJs Course",
  "IBM — Web Development Fundamentals",
  "Infosys — JavaScript Developer Certification",
  "TCS — TCS iON Career Edge - Young Professional",
];

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
