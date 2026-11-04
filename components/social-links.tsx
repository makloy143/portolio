import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export const socials = [
  { label: "GitHub", href: siteConfig.github, icon: Github, external: true },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin, external: true },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail, external: false },
] as const;

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ label, href, icon: Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            title={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="grid size-10 place-items-center rounded-full border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}
