"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  formatProjectNumber,
  isValidUrl,
  projects,
  siteConfig,
} from "@/lib/data";
import { SectionHeader } from "@/components/section-header";

export function Projects() {
  const applications = projects.filter((p) => p.category === "application");
  const websites = projects.filter((p) => p.category === "website");

  return (
    <section id="projects" className="py-20 md:py-28 divider">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="01"
          label="Selected work"
          title="Things I've"
          emphasis="built"
          count={projects.length}
        />

        <ProjectGroup
          label="Full-stack applications"
          items={applications}
          startIndex={0}
        />

        <ProjectGroup
          label="Business websites"
          items={websites}
          startIndex={applications.length}
          className="mt-16 pt-16 border-t border-[var(--border)]"
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-[var(--border)]"
        >
          <p className="text-sm text-[var(--muted)] font-sans mb-4">
            More projects on GitHub
          </p>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link"
          >
            github.com/makloy143 ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectGroup({
  label,
  items,
  startIndex,
  className,
}: {
  label: string;
  items: typeof projects;
  startIndex: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] font-sans mb-8">
        {label} ({String(items.length).padStart(2, "0")})
      </p>

      <div className="space-y-0">
        {items.map((project, idx) => {
          const globalIndex = startIndex + idx;
          const href = isValidUrl(project.link)
            ? project.link
            : isValidUrl(project.github)
              ? project.github
              : undefined;

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group border-t border-[var(--border)] last:border-b"
            >
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 py-8 md:py-10 items-center"
                >
                  <ProjectRow
                    index={globalIndex}
                    project={project}
                    showArrow
                  />
                </a>
              ) : (
                <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 py-8 md:py-10 items-center">
                  <ProjectRow index={globalIndex} project={project} />
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function ProjectRow({
  index,
  project,
  showArrow = false,
}: {
  index: number;
  project: (typeof projects)[number];
  showArrow?: boolean;
}) {
  const hasLiveLink = isValidUrl(project.link);
  const hasGithub = isValidUrl(project.github);

  return (
    <>
      <span className="font-sans text-sm text-[var(--muted)] tracking-widest">
        {formatProjectNumber(index)}
      </span>

      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <div className="relative w-full md:w-48 h-28 shrink-0 overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        </div>

        <div className="min-w-0">
          <h3 className="font-serif text-2xl sm:text-3xl text-[var(--foreground)] mb-3 group-hover:opacity-70 transition-opacity">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 font-sans max-w-xl">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] font-sans"
              >
                {tech}
              </span>
            ))}
          </div>
          {(hasLiveLink || hasGithub) && (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {hasLiveLink && (
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--foreground)] font-sans">
                  Live ↗
                </span>
              )}
              {hasGithub && (
                <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)] font-sans">
                  GitHub
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {showArrow ? (
        <span className="hidden md:block text-2xl text-[var(--muted)] group-hover:translate-x-1 transition-transform">
          →
        </span>
      ) : (
        <span className="hidden md:block text-xs uppercase tracking-[0.14em] text-[var(--muted-light)] font-sans">
          Soon
        </span>
      )}
    </>
  );
}
