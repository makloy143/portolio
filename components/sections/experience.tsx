import { Briefcase } from "lucide-react";
import { experience } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been working"
      className="border-t"
    >
      <ol className="relative space-y-10 border-l pl-8 md:ml-4">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.role} delay={i * 0.08} className="relative">
              <span className="absolute -left-[49px] top-0 grid size-8 place-items-center rounded-full border bg-card text-primary">
                <Briefcase className="size-4" />
              </span>
              <div className="rounded-2xl border bg-card p-6 md:p-8">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{job.role}</h3>
                    <p className="text-sm text-muted-foreground">{job.organization}</p>
                  </div>
                  <span className="mt-2 w-fit rounded-full bg-accent px-3 py-1 font-mono text-xs text-accent-foreground sm:mt-0">
                    {job.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{job.summary}</p>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {job.tech.map((t) => (
                    <li key={t} className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
