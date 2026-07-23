"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  formatProjectNumber,
  getFeaturedProjects,
  getProjectIndex,
  getRemainingProjects,
  isValidUrl,
  siteConfig,
  type Project,
} from "@/lib/data";
import { SectionHeader } from "@/components/section-header";

export function Projects() {
  const featured = getFeaturedProjects();
  const remaining = getRemainingProjects();
  const remainingApplications = remaining.filter(
    (p) => p.category === "application"
  );
  const websites = remaining.filter((p) => p.category === "website");

  return (
    <section id="projects" className="py-20 md:py-28 divider">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          number="01"
          label="Selected work"
          title="Things I've"
          emphasis="built"
          count={featured.length + remaining.length}
        />

        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-sans mb-8">
          Featured ({String(featured.length).padStart(2, "0")})
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 pb-16 border-b border-border">
          {featured.map((project, idx) => (
            <FeaturedProjectCard
              key={project.title}
              project={project}
              index={getProjectIndex(project.title)}
              delay={idx * 0.08}
            />
          ))}
        </div>

        {remainingApplications.length > 0 && (
          <ProjectGroup
            label="More full-stack applications"
            items={remainingApplications}
          />
        )}

        {websites.length > 0 && (
          <ProjectGroup
            label="Client websites"
            items={websites}
            className="mt-16 pt-16 border-t border-border"
          />
        )}

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-border"
        >
          <p className="text-sm text-muted-foreground font-sans mb-4">
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

function FeaturedProjectCard({
  project,
  index,
  delay,
}: {
  project: Project;
  index: number;
  delay: number;
}) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="group flex flex-col border border-border bg-surface/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface border-b border-border">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="font-sans text-xs text-muted-foreground tracking-widest mb-3">
          {formatProjectNumber(index)}
        </span>

        <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:opacity-70 transition-opacity">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-sans flex-1">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="rounded-none border-border bg-transparent px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] font-normal text-muted-foreground"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <ProjectLinks project={project} />
      </div>
    </motion.article>
  );
}

function ProjectGroup({
  label,
  items,
  className,
}: {
  label: string;
  items: Project[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-sans mb-8">
        {label} ({String(items.length).padStart(2, "0")})
      </p>

      <div className="space-y-0">
        {items.map((project, idx) => (
          <CompactProjectRow
            key={project.title}
            project={project}
            index={getProjectIndex(project.title)}
            delay={idx * 0.04}
          />
        ))}
      </div>
    </div>
  );
}

function CompactProjectRow({
  project,
  index,
  delay,
}: {
  project: Project;
  index: number;
  delay: number;
}) {
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="border-t border-border last:border-b py-6 md:py-7"
    >
      <div className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-8 items-start">
        <span className="font-sans text-sm text-muted-foreground tracking-widest pt-1">
          {formatProjectNumber(index)}
        </span>

        <div className="min-w-0">
          <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3 font-sans max-w-2xl">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tech.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="rounded-none border-border bg-transparent px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] font-normal text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
            {project.tech.length > 4 && (
              <Badge
                variant="outline"
                className="rounded-none border-border bg-transparent px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] font-normal text-muted-foreground"
              >
                +{project.tech.length - 4}
              </Badge>
            )}
          </div>
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveHref = isValidUrl(project.link) ? project.link : null;
  const githubHref = isValidUrl(project.github) ? project.github : null;

  if (!liveHref && !githubHref) {
    return (
      <span className="text-xs uppercase tracking-[0.14em] text-[var(--muted-light)] font-sans">
        Coming soon
      </span>
    );
  }

  if (!mounted) {
    return <div className="h-5" aria-hidden="true" />;
  }

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans">
      {liveHref && (
        <a
          href={liveHref}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link text-xs"
        >
          Live site ↗
        </a>
      )}
      {githubHref && (
        <a
          href={githubHref}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link text-xs"
        >
          GitHub ↗
        </a>
      )}
    </div>
  );
}
