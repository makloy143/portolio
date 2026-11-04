/**
 * Single source of truth for the portfolio and the résumé.
 * Everything rendered on `/` and `/resume` (and the generated PDF) comes from here.
 */

export const siteConfig = {
  name: "Mark Louie Carnaje",
  initials: "MC",
  role: "Full Stack Web Developer",
  title: "Mark Louie Carnaje — Full Stack Web Developer",
  description:
    "Full Stack Web Developer and IT Support Specialist with 6+ years of combined experience building React.js and Node.js applications, REST APIs, and production-ready web platforms.",
  url: "https://mlcarnaje.site",
  email: "mcsjmtech@gmail.com",
  github: "https://github.com/makloy143",
  githubHandle: "makloy143",
  linkedin: "https://www.linkedin.com/in/mark-louie-carnaje-983514198/",
  profileImage: "https://avatars.githubusercontent.com/u/79638119?v=4",
  resumePath: "/resume.pdf",
  resumeFileName: "Mark-Louie-Carnaje-Resume.pdf",
  location: "Philippines",
  timeZone: "Asia/Manila",
  availability: "Open to remote full-time & contract roles",
} as const;

export const navItems = [
  { name: "Work", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
] as const;

export const summary =
  "Full Stack Web Developer and IT Support Specialist with 6+ years of combined experience across IT infrastructure, technical support, and full-stack development. I build and deploy scalable web applications with React.js, Node.js, Express.js, MongoDB, MySQL, and RESTful APIs — from authentication and dashboards to Linux/Nginx production servers.";

export type ServiceIcon = "frontend" | "backend" | "infra" | "support";

export const services: {
  icon: ServiceIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: "frontend",
    title: "Frontend Development",
    description:
      "Responsive, accessible interfaces with React, Next.js, TypeScript, and Tailwind CSS — clean UX, solid state management, mobile-first.",
  },
  {
    icon: "backend",
    title: "Backend & APIs",
    description:
      "Node.js and Express REST APIs with JWT authentication, role-based access, CRUD workflows, file uploads, and structured error handling.",
  },
  {
    icon: "infra",
    title: "Database & Deployment",
    description:
      "MongoDB and MySQL data modeling, plus Linux server administration, Nginx, VPS deployment, SSL, and production troubleshooting.",
  },
  {
    icon: "support",
    title: "IT Support & Networks",
    description:
      "Network administration, Active Directory, LDAP, and end-user support — keeping teams productive and systems reliable.",
  },
];

export type ExperienceEntry = {
  role: string;
  organization: string;
  period: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

/**
 * Edit `organization` and `period` with exact employer names and dates.
 * Entries are rendered on the site, the /resume page, and the PDF.
 */
export const experience: ExperienceEntry[] = [
  {
    role: "Full Stack Web Developer",
    organization: "One Solutions & client projects (Remote)",
    period: "2+ years · Present",
    summary:
      "Design, build, and maintain web applications and business websites for US-based clients and internal teams.",
    highlights: [
      "Built full-stack attendance, time-tracking, ticketing, and enrollment systems with React, Node.js, Express, and MySQL/MongoDB.",
      "Implemented JWT authentication, role-based dashboards, reporting, and REST APIs consumed by multiple front-ends.",
      "Delivered and maintain WordPress sites for law, CPA, title/escrow, and IT service firms in Northern Virginia — with a focus on SEO and performance.",
      "Deploy and operate apps on Linux VPS with Nginx, SSL, and Git-based workflows.",
    ],
    tech: ["React", "Next.js", "Node.js", "Express", "MySQL", "MongoDB", "WordPress", "Nginx"],
  },
  {
    role: "IT Support Specialist",
    organization: "Education & enterprise environments",
    period: "4+ years",
    summary:
      "Provided technical support and infrastructure administration for staff, faculty, and students.",
    highlights: [
      "Administered networks, user accounts, Active Directory, and LDAP services.",
      "Troubleshot hardware, software, and connectivity issues and documented recurring fixes.",
      "Identified workflow gaps that led to building internal tools such as ticketing and attendance systems.",
    ],
    tech: ["Active Directory", "LDAP", "Networking", "Linux", "Windows"],
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "React Router", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "PHP", "REST APIs", "JWT Authentication", "WordPress"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "Prisma", "MariaDB"],
  },
  {
    title: "DevOps & Tools",
    items: ["Git", "GitHub", "Linux", "Nginx", "VPS / SSL", "Postman", "VS Code"],
  },
  {
    title: "IT & Infrastructure",
    items: ["Network Administration", "Active Directory", "LDAP", "Technical Support"],
  },
] as const;

export const techStrip = [
  "React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB",
  "MySQL", "PostgreSQL", "Tailwind CSS", "REST APIs", "WordPress", "Linux", "Nginx",
];

export type ProjectCategory = "application" | "website";

export type Project = {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  /** Screenshot in /public/projects. Omit to render a generated cover. */
  image?: string;
  category: ProjectCategory;
  featured?: boolean;
  /** Public live URL. */
  live?: string;
  /** Public source repository. */
  repo?: string;
  /** Source exists but is not public (client / internal work). */
  privateRepo?: boolean;
};

export const projects: Project[] = [
  {
    slug: "support-ticketing",
    title: "Support Ticketing System",
    description:
      "Full-stack IT support platform where students and employees submit tickets, with role-based authentication and an admin panel for agents to triage and resolve requests.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    image: "/projects/support-ticketing.png",
    category: "application",
    featured: true,
    live: "https://cociligan.netlify.app/",
    privateRepo: true,
  },
  {
    slug: "onesolutions-time",
    title: "OneSolutions Time Tracking",
    description:
      "Workforce time-tracking app for employee clock-in, scheduling, and hours management across client organizations.",
    tech: ["Next.js", "React", "TypeScript"],
    image: "/projects/one-solutions-time.png",
    category: "application",
    featured: true,
    live: "https://time.onesolutions.net/",
    privateRepo: true,
  },
  {
    slug: "help-bankruptcy",
    title: "Help-Bankruptcy.com",
    description:
      "Bankruptcy attorney website for Timothy J. McGary — Chapter 7, 11, and 13 debt-relief services across Northern Virginia and D.C.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/help-bankruptcy.png",
    category: "website",
    featured: true,
    live: "https://help-bankruptcy.com/",
  },
  {
    slug: "coc-attendance",
    title: "COC Attendance",
    description:
      "Admin app for student registration and daily time-in/time-out, with face-recognition and QR kiosk check-in, dashboards, and Excel/PDF attendance reports.",
    tech: ["Next.js", "PostgreSQL", "Prisma", "Face API", "QR"],
    category: "application",
    repo: "https://github.com/makloy143/COCattendance",
  },
  {
    slug: "onesolutions-attendance",
    title: "OneSolutions Attendance",
    description:
      "Workforce attendance management with secure login, real-time monitoring, attendance reports, and role-based dashboards.",
    tech: ["React", "Node.js", "Express", "MySQL", "JWT"],
    category: "application",
    privateRepo: true,
  },
  {
    slug: "imcc-enrollment",
    title: "IMCC Enrollment System",
    description:
      "Student enrollment platform for managing records and enrollment workflows, with authentication and structured admin controls.",
    tech: ["React", "Node.js", "Express", "Auth"],
    category: "application",
    privateRepo: true,
  },
  {
    slug: "barcode-attendance",
    title: "Barcode Attendance System",
    description:
      "Check-in system with barcode scanning, database-backed records, and reporting for employee or student attendance.",
    tech: ["React", "Node.js", "MySQL", "Barcode"],
    category: "application",
    privateRepo: true,
  },
  {
    slug: "one-solutions-backend",
    title: "One Solutions Backend",
    description:
      "Express REST API powering One Solutions apps — routes, controllers, models, middleware, and database integration.",
    tech: ["Node.js", "Express", "REST API", "MongoDB"],
    category: "application",
    privateRepo: true,
  },
  {
    slug: "mcgary-cpa",
    title: "Jeffrey D. McGary, CPA",
    description:
      "Professional site for tax preparation, accounting, and financial services for individuals and businesses in Vienna, VA.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/mcgary-cpa.png",
    category: "website",
    live: "https://www.mcgary.biz/",
  },
  {
    slug: "title-one",
    title: "Title One & Escrow",
    description:
      "Title company website for escrow, settlement support, and real-estate closing services in Vienna, VA.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/title-one.png",
    category: "website",
    live: "https://title1inc.com/",
  },
  {
    slug: "one-solutions",
    title: "One Solutions",
    description:
      "IT support and VoIP provider site highlighting managed services, uptime guarantees, and business phone solutions.",
    tech: ["WordPress", "Responsive Design", "Performance"],
    image: "/projects/one-solutions.png",
    category: "website",
    live: "https://onesolutions.net/",
  },
  {
    slug: "mcgary-law",
    title: "Timothy J. McGary, Attorney",
    description:
      "Business and bankruptcy law firm website for a top-rated Northern Virginia attorney with 42+ years of experience.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/mcgary-law.png",
    category: "website",
    live: "https://www.mcgary.com/",
  },
  {
    slug: "patel-law",
    title: "Patel Law VA",
    description:
      "Personal injury and criminal defense attorney website for Bhavik D. Patel, serving Fairfax and Northern Virginia.",
    tech: ["WordPress", "Responsive Design", "SEO"],
    image: "/projects/patel-law.png",
    category: "website",
    live: "https://patellawva.com/",
  },
];

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "application", label: "Web apps" },
  { id: "website", label: "Client websites" },
] as const;

export type ProjectFilter = (typeof projectFilters)[number]["id"];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export function filterProjects(list: Project[], filter: ProjectFilter) {
  return filter === "all" ? list : list.filter((p) => p.category === filter);
}

export function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export const stats = [
  { value: "6+", label: "Years combined experience" },
  { value: String(projects.length), label: "Projects shipped" },
  { value: "4+", label: "Years in IT support" },
];
