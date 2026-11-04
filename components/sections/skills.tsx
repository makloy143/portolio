import { skillGroups } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools I use every day"
      description="A pragmatic stack for building, shipping, and supporting production web software."
      className="border-t bg-surface/50"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.05} className="h-full">
            <div className="h-full rounded-2xl border bg-card p-6">
              <h3 className="mb-4 flex items-center justify-between font-semibold tracking-tight">
                {group.title}
                <span className="font-mono text-xs font-normal text-muted-foreground">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border bg-background px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
