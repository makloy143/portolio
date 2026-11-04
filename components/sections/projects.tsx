"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Lock, LayoutDashboard } from "lucide-react";
import {
  displayUrl,
  featuredProjects,
  filterProjects,
  otherProjects,
  projectFilters,
  siteConfig,
  type Project,
  type ProjectFilter,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const reduce = useReducedMotion();
  const visible = useMemo(() => filterProjects(otherProjects, filter), [filter]);

  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title="Projects that ship and stay running"
      description="Full-stack applications for real teams and production websites for client businesses — each one built, deployed, and maintained end to end."
      action={
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-4")}
        >
          <Github className="size-4" />
          @{siteConfig.githubHandle}
        </a>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
            <ProjectCard project={project} featured />
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <Reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold tracking-tight">More projects</h3>
          <div role="tablist" aria-label="Filter projects" className="inline-flex w-fit rounded-full border bg-muted/60 p-1">
            {projectFilters.map((f) => {
              const count = filterProjects(otherProjects, f.id).length;
              const selected = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setFilter(f.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm transition-all focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    selected
                      ? "bg-card font-medium text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f.label}
                  <span className="ml-1.5 font-mono text-xs text-muted-foreground">{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul layout={!reduce} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </Section>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const primaryHref = project.live ?? project.repo;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[16/10] overflow-hidden border-b bg-muted">
        {project.image ? (
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectCover project={project} />
        )}
        <span className="absolute left-3 top-3 rounded-full border bg-background/85 px-2.5 py-0.5 text-[11px] font-medium text-foreground backdrop-blur">
          {project.category === "application" ? "Web app" : "Client website"}
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col", featured ? "p-6" : "p-5")}>
        <h3 className={cn("font-semibold tracking-tight", featured ? "text-lg" : "text-base")}>
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="relative z-10 mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-4 text-sm">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              {displayUrl(project.live)}
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <Github className="size-3.5" />
              Source
            </a>
          )}
          {project.privateRepo && !project.repo && (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground" title="Source code is private (client / internal project)">
              <Lock className="size-3.5" />
              Private source
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/** Generated cover for projects without a public screenshot (private/internal apps). */
function ProjectCover({ project }: { project: Project }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col justify-end bg-[radial-gradient(circle_at_80%_10%,var(--glow),transparent_60%)] p-5 transition-transform duration-500 group-hover:scale-[1.04]"
    >
      <div className="absolute inset-0 bg-grid opacity-70 [mask-image:none]" />
      <div className="relative mb-auto ml-auto mt-8 w-3/5 rounded-lg border bg-card/80 p-3 shadow-lg backdrop-blur">
        <div className="mb-2 flex gap-1">
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
          <span className="size-1.5 rounded-full bg-muted-foreground/40" />
        </div>
        <div className="space-y-1.5">
          <div className="h-1.5 w-3/4 rounded bg-primary/50" />
          <div className="h-1.5 w-full rounded bg-muted-foreground/20" />
          <div className="h-1.5 w-2/3 rounded bg-muted-foreground/20" />
        </div>
      </div>
      <div className="relative flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <LayoutDashboard className="size-4 text-primary" />
        {project.tech.slice(0, 3).join(" · ")}
      </div>
    </div>
  );
}
