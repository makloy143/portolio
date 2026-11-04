import { CodeXml, Headset, Server, Database } from "lucide-react";
import { services, siteConfig, summary, type ServiceIcon } from "@/lib/data";
import { Section } from "@/components/section";
import { Reveal } from "@/components/reveal";

const icons: Record<ServiceIcon, typeof CodeXml> = {
  frontend: CodeXml,
  backend: Server,
  infra: Database,
  support: Headset,
};

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Developer with an operations mindset"
      className="border-t bg-surface/50"
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          <p>{summary}</p>
          <p>
            Years of hands-on IT support taught me what breaks in production and
            what real users actually need. I bring that to every project: clean,
            maintainable code, sensible architecture, and software that teams
            can depend on long after launch.
          </p>
          <p>
            Based in the {siteConfig.location} and comfortable collaborating
            async with US-based teams and clients.
          </p>
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            return (
              <Reveal as="li" key={service.title} delay={i * 0.06} className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/30">
                  <span className="mb-4 grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-semibold tracking-tight">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
