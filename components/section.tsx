import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {action}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
