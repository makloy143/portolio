import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Database,
  Cpu,
  Globe,
  Layers,
  Menu,
  X,
  Download,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import "./App.css";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = ({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "glass-morphism py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.a
          href="#home"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-gradient"
        >
          MLC.dev
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "text-sm font-medium transition-colors hover:text-indigo-400",
                activeSection === item.href.substring(1)
                  ? "text-indigo-400"
                  : theme === "dark"
                  ? "text-gray-300"
                  : "text-gray-600"
              )}
            >
              {item.name}
            </motion.a>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-indigo-600" />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-indigo-600" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              theme === "dark" ? "text-gray-300" : "text-gray-600",
              "hover:text-indigo-500"
            )}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-morphism mt-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "transition-colors",
                    theme === "dark"
                      ? "text-gray-300 hover:text-indigo-400"
                      : "text-gray-600 hover:text-indigo-500"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-600 rounded-full blur-[128px] opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-600 rounded-full blur-[128px] opacity-20 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full glass-morphism text-indigo-400 text-sm font-medium mb-6 inline-block">
            Available for New Opportunities
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Hi, I'm <span className="text-gradient">Mark Louie</span>
            <br />
            <span className="dark:text-white text-gray-900">
              Full Stack Developer
            </span>
          </h1>
          <p className="dark:text-gray-400 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            I craft high-performance, visually stunning web applications with
            modern technologies. Focused on building scalable solutions that
            solve real-world problems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all hover:scale-105 flex items-center gap-2 group shadow-lg shadow-indigo-500/20"
            >
              View My Work
              <ExternalLink
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 glass-morphism dark:text-white text-gray-900 rounded-xl font-semibold transition-all hover:bg-white/10 flex items-center gap-2"
            >
              Get In Touch
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs uppercase tracking-widest">
          Scroll to explore
        </span>
        <ChevronDown className="animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

const About = () => {
  const stats = [
    { label: "Years Experience", value: "3+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Technologies Mastered", value: "15+" },
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="w-full max-w-[400px] aspect-square rounded-3xl overflow-hidden glass-morphism p-2 relative group">
              <div className="absolute inset-0 bg-indigo-500/10 group-hover:bg-transparent transition-colors" />
              <div className="w-full h-full dark:bg-gray-900 bg-gray-100 rounded-2xl flex items-center justify-center">
                <Code2
                  size={80}
                  className="text-indigo-500 md:w-[120px] md:h-[120px]"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 glass-morphism p-4 md:p-6 rounded-2xl hidden sm:block">
              <Terminal className="text-indigo-500 mb-2" size={24} />
              <p className="text-xs md:text-sm font-bold dark:text-white text-gray-900">
                Clean Code Practitioner
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 dark:text-white text-gray-900">
              About <span className="text-indigo-500">Me</span>
            </h2>
            <p className="dark:text-gray-400 text-gray-600 mb-6 leading-relaxed text-lg">
              I am a passionate Full-Stack Developer with a strong foundation in
              modern web technologies. My journey started with a curiosity for
              how things work on the internet, which evolved into a career
              dedicated to creating seamless digital experiences.
            </p>
            <p className="dark:text-gray-400 text-gray-600 mb-8 leading-relaxed">
              I specialize in building responsive front-end interfaces and
              robust back-end systems. I'm always eager to learn new things and
              take on challenging projects that push my limits.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <h3 className="text-3xl font-bold dark:text-white text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="dark:text-gray-500 text-gray-600 text-xs uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
              <Download size={20} />
              Download Resume
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Globe size={24} className="text-blue-500" />,
      skills: [
        "React",
        "Vue.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
      ],
    },
    {
      title: "Backend",
      icon: <Database size={24} className="text-green-500" />,
      skills: [
        "Node.js",
        "Express",
        "Python",
        "Django",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      title: "DevOps & Tools",
      icon: <Cpu size={24} className="text-purple-500" />,
      skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel", "Figma"],
    },
  ];

  return (
    <section id="skills" className="py-32 dark:bg-white/5 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-16 dark:text-white text-gray-900">
          Technical <span className="text-indigo-500">Proficiency</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-morphism p-8 rounded-3xl hover:border-indigo-500/30 transition-all"
            >
              <div className="w-12 h-12 rounded-xl dark:bg-gray-900 bg-white shadow-sm flex items-center justify-center mx-auto mb-6">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-6">
                {cat.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 dark:bg-white/5 bg-gray-100 dark:text-gray-400 text-gray-700 rounded-lg text-sm border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Eco-Friendly Marketplace",
      desc: "A full-scale e-commerce platform built for sustainable shopping with Stripe integration.",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      link: "#",
      github: "#",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Real-time Task Orchestrator",
      desc: "A collaborative project management tool with real-time updates and team chat.",
      tech: ["React", "Socket.io", "Express", "MongoDB"],
      link: "#",
      github: "#",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "AI Content Generator",
      desc: "An innovative application that leverages OpenAI API to generate high-quality copy.",
      tech: ["Python", "Flask", "React", "OpenAI"],
      link: "#",
      github: "#",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section id="projects" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-bold dark:text-white text-gray-900 mb-4">
              Featured <span className="text-indigo-500">Projects</span>
            </h2>
            <p className="dark:text-gray-400 text-gray-600 max-w-xl">
              A selection of my recent works where I solve complex problems and
              build elegant solutions.
            </p>
          </div>
          <a
            href="#"
            className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-2"
          >
            View All Projects <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group glass-morphism rounded-3xl overflow-hidden hover:translate-y-[-8px] transition-all duration-300 border-white/10"
            >
              <div
                className={cn(
                  "h-48 bg-gradient-to-br relative overflow-hidden",
                  project.color
                )}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                <Layers
                  size={80}
                  className="absolute bottom-[-20px] right-[-20px] text-white/10 group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="dark:text-gray-400 text-gray-600 text-sm mb-6 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-widest px-2 py-1 dark:bg-white/5 bg-gray-200 dark:text-gray-400 text-gray-600 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={project.github}
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={project.link}
                    className="text-gray-400 hover:text-indigo-500 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      company: "Tech Innovators Inc.",
      role: "Senior Full Stack Developer",
      period: "2023 - Present",
      desc: "Leading development of scalable SaaS products and mentoring junior developers.",
    },
    {
      company: "Digital Solutions Agency",
      role: "Web Developer",
      period: "2021 - 2023",
      desc: "Created responsive web applications for various clients across different industries.",
    },
    {
      company: "StartUp Hub",
      role: "Junior Developer Intern",
      period: "2020 - 2021",
      desc: "Assisted in building MVP versions of core products using React and Node.js.",
    },
  ];

  return (
    <section id="experience" className="py-32 dark:bg-white/5 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 dark:text-white text-gray-900">
          Work <span className="text-indigo-500">History</span>
        </h2>

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 border-l border-indigo-500/20"
            >
              <div className="absolute left-[-5px] top-0 w-[10px] h-[10px] rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
              <div className="mb-2">
                <span className="text-indigo-400 text-sm font-bold">
                  {exp.period}
                </span>
                <h3 className="text-2xl font-bold dark:text-white text-gray-900 mt-1">
                  {exp.role}
                </h3>
                <h4 className="dark:text-gray-400 text-gray-700 font-medium">
                  {exp.company}
                </h4>
              </div>
              <p className="dark:text-gray-500 text-gray-600 leading-relaxed">
                {exp.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="glass-morphism rounded-[40px] overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-12 bg-indigo-600">
              <h2 className="text-4xl font-bold text-white mb-6">
                Let's build something <br />
                great together.
              </h2>
              <p className="text-indigo-100 mb-12 text-lg">
                I'm currently available for freelance work or full-time roles.
                Feel free to reach out via the form or my social handles.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:mcsjmtech@gmail.com"
                  className="flex items-center gap-4 text-white hover:translate-x-2 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-widest">
                      Email Me
                    </p>
                    <p className="font-semibold">mcsjmtech@gmail.com</p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/mark-louie-carnaje-983514198/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white hover:translate-x-2 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-indigo-200 uppercase tracking-widest">
                      Connect
                    </p>
                    <p className="font-semibold">LinkedIn Profile</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-12 dark:bg-transparent bg-white">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm dark:text-gray-400 text-gray-600 font-medium ml-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full dark:bg-white/5 bg-gray-100 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors dark:text-white text-gray-900"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm dark:text-gray-400 text-gray-600 font-medium ml-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full dark:bg-white/5 bg-gray-100 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors dark:text-white text-gray-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm dark:text-gray-400 text-gray-600 font-medium ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full dark:bg-white/5 bg-gray-100 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors dark:text-white text-gray-900"
                    placeholder="Project Inquiry"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm dark:text-gray-400 text-gray-600 font-medium ml-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full dark:bg-white/5 bg-gray-100 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors dark:text-white text-gray-900 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-black/5 dark:border-white/5 bg-gray-50/30 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="dark:text-gray-500 text-gray-600 text-sm">
          © 2026 Mark Louie Carnaje. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/makloy143"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-500 text-gray-600 hover:text-indigo-500 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/mark-louie-carnaje-983514198/"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-gray-500 text-gray-600 hover:text-indigo-500 transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:mcsjmtech@gmail.com"
            className="dark:text-gray-500 text-gray-600 hover:text-indigo-500 transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
        <p className="dark:text-gray-500 text-gray-600 text-sm flex items-center gap-1">
          Built with <span className="text-red-500">♥</span> using React &
          Tailwind
        </p>
      </div>
    </footer>
  );
};

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.backgroundColor = "#030014";
      root.style.color = "white";
    } else {
      root.classList.remove("dark");
      root.style.backgroundColor = "#ffffff";
      root.style.color = "#111827";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div
      className={cn(
        "min-h-screen transition-colors duration-300 selection:bg-indigo-500/30",
        theme === "dark" ? "bg-[#030014] text-white" : "bg-white text-gray-900"
      )}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
