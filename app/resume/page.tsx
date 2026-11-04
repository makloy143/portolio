import type { Metadata } from "next";
import { displayUrl, experience, projects, siteConfig, skillGroups, summary } from "@/lib/data";
import { ResumeToolbar } from "./resume-toolbar";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${siteConfig.name}, ${siteConfig.role}.`,
  alternates: { canonical: "/resume" },
};

const resumeProjects = projects.filter((p) => p.live || p.repo).slice(0, 6);

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-neutral-300 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-700">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const contacts = [
    { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: displayUrl(siteConfig.url), href: siteConfig.url },
    { label: displayUrl(siteConfig.github), href: siteConfig.github },
    { label: displayUrl(siteConfig.linkedin), href: siteConfig.linkedin },
  ];

  return (
    <div className="min-h-screen bg-muted/60 pb-16 print:bg-white print:pb-0">
      <ResumeToolbar />

      <article className="resume-sheet mx-auto mt-8 max-w-[8.5in] bg-white px-8 py-10 text-[13px] leading-relaxed text-neutral-800 shadow-xl ring-1 ring-black/5 sm:px-12 print:mt-0 print:text-[11.5px]">
        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-950">{siteConfig.name}</h1>
          <p className="mt-1 text-base font-medium text-indigo-700">
            {siteConfig.role} · React · Node.js · IT Support
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-neutral-600">
            <li>{siteConfig.location} (Remote)</li>
            {contacts.map((c) => (
              <li key={c.href}>
                <a href={c.href} className="hover:text-indigo-700 hover:underline">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <section className="mb-6">
          <Heading>Summary</Heading>
          <p>{summary}</p>
        </section>

        <section className="mb-6">
          <Heading>Skills</Heading>
          <dl className="grid gap-1.5">
            {skillGroups.map((g) => (
              <div key={g.title} className="grid grid-cols-[9rem_1fr] gap-3">
                <dt className="font-semibold text-neutral-950">{g.title}</dt>
                <dd>{g.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mb-6">
          <Heading>Experience</Heading>
          <div className="space-y-5">
            {experience.map((job) => (
              <div key={job.role} className="break-inside-avoid">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-[14px] font-semibold text-neutral-950">
                    {job.role} <span className="font-normal text-neutral-600">— {job.organization}</span>
                  </h3>
                  <span className="text-[12px] text-neutral-500">{job.period}</span>
                </div>
                <ul className="mt-1.5 list-disc space-y-1 pl-5 marker:text-neutral-400">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Heading>Selected Projects</Heading>
          <div className="space-y-3">
            {resumeProjects.map((p) => {
              const href = p.live ?? p.repo!;
              return (
                <div key={p.slug} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold text-neutral-950">{p.title}</h3>
                    <a href={href} className="text-[12px] text-indigo-700 hover:underline">
                      {displayUrl(href)}
                    </a>
                  </div>
                  <p>
                    {p.description} <span className="text-neutral-500">({p.tech.join(", ")})</span>
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[12px] text-neutral-500">
            More work, including private client and internal applications, at {displayUrl(siteConfig.url)}.
          </p>
        </section>
      </article>
    </div>
  );
}
