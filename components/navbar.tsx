"use client";

import { Menu } from "lucide-react";
import { navItems, siteConfig } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="#home"
          className="font-serif italic text-xl sm:text-2xl text-foreground tracking-tight"
        >
          {siteConfig.shortName}
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors font-sans"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a href="#contact" className="editorial-link text-xs">
            Say hello
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Open menu"
                  className="text-foreground"
                />
              }
            >
              <Menu className="size-4" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-xs">
              <SheetHeader>
                <SheetTitle className="font-serif italic text-left">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-4 pb-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-2 py-3 text-sm uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground transition-colors font-sans border-b border-border"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="px-2 py-3 text-sm uppercase tracking-[0.14em] text-foreground font-sans"
                >
                  Say hello
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
