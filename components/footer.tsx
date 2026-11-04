import Link from "next/link";
import { navItems, siteConfig } from "@/lib/data";
import { LocalTime } from "@/components/local-time";
import { SocialLinks } from "@/components/social-links";

export function Footer() {
  return (
    <footer className="border-t bg-surface/50">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground">
                {siteConfig.initials}
              </span>
              <span className="font-semibold tracking-tight">{siteConfig.name}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.role} building React, Node.js, and REST API applications
              for teams everywhere.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.name}
              </a>
            ))}
            <Link href="/resume" className="text-muted-foreground hover:text-foreground">
              Résumé
            </Link>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            Manila, PH · <LocalTime />
          </p>
        </div>
      </div>
    </footer>
  );
}
