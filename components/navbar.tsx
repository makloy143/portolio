"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Menu } from "lucide-react";
import { navItems, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
}

const sectionIds = navItems.map((item) => item.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#home" className="group flex items-center gap-2.5" aria-label={`${siteConfig.name} — home`}>
          <span className="grid size-8 place-items-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground transition-transform group-hover:scale-105">
            {siteConfig.initials}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            {siteConfig.name}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Link
            href="/resume"
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden h-9 rounded-full px-4 sm:inline-flex"
            )}
          >
            <FileText className="size-4" />
            Résumé
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="rounded-full md:hidden"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => {
                      // The open dialog locks scrolling; close first, then jump once the lock is released.
                      event.preventDefault();
                      setOpen(false);
                      setTimeout(() => {
                        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                        history.replaceState(null, "", item.href);
                      }, 250);
                    }}
                    className={cn(
                      "rounded-lg px-3 py-3 text-base transition-colors hover:bg-muted",
                      active === item.href.slice(1) ? "font-medium text-primary" : "text-foreground"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="mt-auto px-4 pb-6">
                <Link
                  href="/resume"
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ size: "lg" }), "h-11 w-full rounded-full")}
                >
                  <FileText className="size-4" />
                  View résumé
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
