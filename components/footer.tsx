"use client";

import { useEffect, useState } from "react";
import { navItems, siteConfig } from "@/lib/data";

export function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-PH", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Manila",
        }).format(new Date())
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-border py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div>
            <a
              href="#home"
              className="font-serif italic text-2xl text-foreground"
            >
              {siteConfig.shortName}
            </a>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed font-sans">
              Full Stack Web Developer & IT Support Specialist from the{" "}
              {siteConfig.location} — building React.js, Node.js, and REST API
              applications for teams everywhere.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3 font-sans">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
              >
                Email
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border font-sans">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="text-sm text-muted-foreground" suppressHydrationWarning>
            Manila, PH{time ? ` — ${time}` : ""}
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
