"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-end pb-16 pt-32">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)] mb-8 font-sans">
            {siteConfig.name} — Full Stack Web Developer & IT Support Specialist
          </p>

          <h1 className="font-serif text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.02] tracking-tight text-[var(--foreground)] max-w-5xl mb-8">
            Building scalable{" "}
            <span className="emphasis">React & Node.js</span> applications.
          </h1>

          <p className="text-lg sm:text-xl text-[var(--muted)] max-w-2xl leading-relaxed mb-12 font-sans">
            6+ years of combined experience in IT support and full-stack web
            development — building ticketing systems, attendance platforms,
            enrollment apps, and business websites with React.js, Node.js,
            Express, MongoDB, MySQL, and RESTful APIs.
          </p>

          <div className="flex flex-wrap items-center gap-8 mb-16 font-sans">
            <a href="#projects" className="editorial-link">
              View work ↓
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link"
            >
              GitHub ↗
            </a>
            <a
              href={siteConfig.resumePath}
              download="Mark-Louie-Carnaje-Resume.pdf"
              className="editorial-link"
            >
              Résumé ↓
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-[0.18em] text-[var(--muted)] font-sans">
            <span>Based in the {siteConfig.location}</span>
            <span className="hidden sm:inline">Scroll</span>
            <span>Available for select work</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
