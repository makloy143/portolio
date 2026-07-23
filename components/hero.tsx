"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { HeroSpotlight } from "@/components/hero-spotlight";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-end pb-16 pt-36 sm:pt-32 overflow-hidden"
    >
      <HeroSpotlight />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground mb-8 font-sans">
            {siteConfig.name} — Full Stack Web Developer & IT Support Specialist
          </p>

          <h1 className="font-serif text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.02] tracking-tight text-foreground max-w-5xl mb-8">
            Building scalable{" "}
            <span className="emphasis">React & Node.js</span> applications.
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 font-sans">
            6+ years of combined experience in IT support and full-stack web
            development — building ticketing systems, attendance platforms,
            enrollment apps, and business websites with React.js, Node.js,
            Express, MongoDB, MySQL, and RESTful APIs.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 font-sans">
            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "rounded-none h-11 px-6 text-xs uppercase tracking-[0.14em]"
              )}
            >
              Get in touch
            </a>
            <a
              href="#projects"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-none h-11 px-6 text-xs uppercase tracking-[0.14em] bg-transparent"
              )}
            >
              View work ↓
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-8 mb-16 font-sans">
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

          <div className="flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-[0.18em] text-muted-foreground font-sans">
            <span>Based in the {siteConfig.location}</span>
            <span className="hidden sm:inline">Scroll</span>
            <span>Available for select work</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
