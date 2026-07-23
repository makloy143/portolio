export const siteConfig = {
  name: "Mark Louie Carnaje",
  shortName: "ML Carnaje",
  title: "Mark Louie Carnaje — Full Stack Web Developer",
  description:
    "Full Stack Web Developer and IT Support Specialist with 6+ years of combined experience building React.js and Node.js applications, REST APIs, and production-ready web platforms.",
  url: "https://makloy.dev",
  email: "mcsjmtech@gmail.com",
  github: "https://github.com/makloy143",
  linkedin:
    "https://www.linkedin.com/in/mark-louie-carnaje-983514198/",
  profileImage:
    "https://avatars.githubusercontent.com/u/79638119?v=4",
  resumePath: "/resume.pdf",
  location: "Philippines",
};

export const experienceStats = [
  { value: "6+", label: "Years combined experience" },
  { value: "4+", label: "Years IT support" },
  { value: "2+", label: "Years web development" },
];

export const navItems = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Stack", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const marqueeItems = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "MySQL",
  "REST APIs",
  "JWT Auth",
  "Tailwind CSS",
  "WordPress",
  "Linux",
  "Nginx",
  "Git",
  "Remote",
];

export const skillCategories = [
  {
    id: "a",
    title: "Frontend Development",
    description:
      "Responsive interfaces with React.js, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, and React Router — focused on clean UX, state management, and mobile-first design.",
  },
  {
    id: "b",
    title: "Backend & APIs",
    description:
      "Scalable server-side systems with Node.js, Express.js, PHP, and RESTful APIs — including JWT authentication, CRUD operations, file uploads, and structured error handling.",
  },
  {
    id: "c",
    title: "Database & Infrastructure",
    description:
      "MongoDB, MySQL, and MariaDB for data modeling and queries. Linux server administration, Nginx configuration, VPS deployment, SSL, Git workflows, and production troubleshooting.",
  },
  {
    id: "d",
    title: "IT Support & Collaboration",
    description:
      "Network administration, Active Directory, LDAP, and technical support — plus team collaboration, code reviews, debugging, and working directly with stakeholders to deliver reliable solutions.",
  },
];

export const stackItems = [
  "JavaScript (ES6+)",
  "React.js",
  "React Router",
  "React Hooks",
  "Node.js",
  "Express.js",
  "Next.js",
  "TypeScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Bootstrap",
  "MongoDB",
  "MySQL",
  "MariaDB",
  "PHP",
  "WordPress",
  "JWT Authentication",
  "REST APIs",
  "Git",
  "GitHub",
  "Linux",
  "Nginx",
  "Postman",
  "VS Code",
  "Responsive Design",
  "Web Performance",
];

export type Project = {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  link?: string;
  github?: string;
  category: "application" | "website";
};

export const projects: Project[] = [
  {
    title: "Support Ticketing System",
    desc: "Full-stack IT support platform where students and employees submit tickets, with role-based authentication and an admin control panel for agents to manage and resolve requests.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/projects/support-ticketing.png",
    link: "https://cociligan.netlify.app/",
    github: "https://github.com/makloy143/ticketing-system",
    category: "application",
  },
  {
    title: "OneSolutions Attendance",
    desc: "Workforce attendance management system with secure login, real-time monitoring, attendance reports, and role-based dashboards for administrators and employees.",
    tech: ["React", "Node.js", "Express", "MySQL", "JWT"],
    image: "/projects/onesolutions-attendance.png",
    github: "https://github.com/makloy143/onesolutions-attendance",
    category: "application",
  },
  {
    title: "IMCC Enrollment System",
    desc: "Student enrollment platform for managing student records, enrollment workflows, and CRUD operations with authentication and structured admin controls.",
    tech: ["React", "Node.js", "Express", "CRUD", "Authentication"],
    image: "/projects/imcc-enrollment-system.png",
    github: "https://github.com/makloy143/imcc-enrollment-system",
    category: "application",
  },
  {
    title: "COC Attendance",
    desc: "College attendance monitoring system with user authentication, attendance tracking, reporting, and admin dashboards for faculty and administrators.",
    tech: ["React", "Node.js", "MySQL", "REST API"],
    image: "/projects/coc-attendance.png",
    github: "https://github.com/makloy143/COCAttendance",
    category: "application",
  },
  {
    title: "Barcode Attendance System",
    desc: "Attendance system with barcode scanning integration, database-backed record keeping, and reporting for organizations tracking employee or student check-ins.",
    tech: ["React", "Node.js", "Barcode Scanner", "MySQL"],
    image: "/projects/barcode-attendance.png",
    github: "https://github.com/makloy143/Barcode-Attendance-System",
    category: "application",
  },
  {
    title: "One Solutions Backend",
    desc: "Express.js REST API backend powering One Solutions applications — structured with routes, controllers, models, middleware, and database integration.",
    tech: ["Node.js", "Express.js", "REST API", "MongoDB"],
    image: "/projects/one-solutions-backend.png",
    github: "https://github.com/makloy143/one-solutions-backend",
    category: "application",
  },
  {
    title: "OneSolutions Time Tracking",
    desc: "Workforce time tracking web application for employee clock-in, scheduling, and hours management across client organizations.",
    tech: ["Next.js", "React", "TypeScript"],
    image: "/projects/one-solutions-time.png",
    link: "https://time.onesolutions.net/",
    category: "application",
  },
  {
    title: "Help-Bankruptcy.com",
    desc: "Bankruptcy attorney website for Timothy J. McGary — Chapter 7, 11, and 13 debt relief services for clients across Northern Virginia and D.C.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/help-bankruptcy.png",
    link: "https://help-bankruptcy.com/",
    category: "website",
  },
  {
    title: "Jeffrey D. McGary, CPA",
    desc: "Professional site for tax preparation, accounting, and financial services serving individuals and businesses in Vienna, VA.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/mcgary-cpa.png",
    link: "https://www.mcgary.biz/",
    category: "website",
  },
  {
    title: "Title One & Escrow",
    desc: "Title company website showcasing escrow services, settlement support, and real estate closing solutions in Vienna, VA.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/title-one.png",
    link: "https://title1inc.com/",
    category: "website",
  },
  {
    title: "One Solutions",
    desc: "IT support and VoIP telecommunications provider site highlighting managed services, uptime guarantees, and business phone solutions.",
    tech: ["WordPress", "Responsive Design", "Web Performance"],
    image: "/projects/one-solutions.png",
    link: "https://onesolutions.net/",
    category: "website",
  },
  {
    title: "Timothy J. McGary, Attorney",
    desc: "Business and bankruptcy law firm website for a top-rated Northern Virginia attorney with 42+ years of experience.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/mcgary-law.png",
    link: "https://www.mcgary.com/",
    category: "website",
  },
  {
    title: "Patel Law VA",
    desc: "Personal injury and criminal defense attorney website for Bhavik D. Patel, serving clients in Fairfax and Northern Virginia.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/patel-law.png",
    link: "https://patellawva.com/",
    category: "website",
  },
];

export const featuredGithubRepos = [
  "ticketing-system",
  "onesolutions-attendance",
  "COCAttendance",
  "one-solutions-backend",
  "imcc-enrollment-system",
  "Barcode-Attendance-System",
];

export const featuredProjectTitles = [
  "Support Ticketing System",
  "OneSolutions Time Tracking",
  "Help-Bankruptcy.com",
] as const;

export function getFeaturedProjects(): Project[] {
  return featuredProjectTitles
    .map((title) => projects.find((p) => p.title === title))
    .filter((p): p is Project => Boolean(p));
}

export function getRemainingProjects(): Project[] {
  const featuredSet = new Set<string>(featuredProjectTitles);
  return projects.filter((p) => !featuredSet.has(p.title));
}

export function getProjectIndex(title: string) {
  return projects.findIndex((p) => p.title === title);
}

export function isValidUrl(url?: string): url is string {
  return Boolean(url && url !== "#");
}

export function formatProjectNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}
