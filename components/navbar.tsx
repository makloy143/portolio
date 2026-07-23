"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems, siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[var(--background)]/90 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="#home"
            onClick={closeMobileMenu}
            className="font-serif italic text-xl sm:text-2xl text-[var(--foreground)] tracking-tight"
          >
            {siteConfig.shortName}
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-xs uppercase tracking-[0.18em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-sans"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="editorial-link text-xs">
              Say hello
            </a>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[var(--foreground)] font-sans"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            Menu
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[55] bg-[var(--foreground)]/20 backdrop-blur-sm md:hidden"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="fixed top-[4.25rem] left-4 right-4 z-[56] md:hidden bg-[var(--background)] border border-[var(--border)] rounded-sm shadow-lg"
            >
              <nav className="flex flex-col p-2">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="px-4 py-3 text-sm uppercase tracking-[0.14em] text-[var(--muted)] hover:text-[var(--foreground)] transition-colors font-sans"
                  >
                    {item.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className={cn(
                    "px-4 py-3 text-sm uppercase tracking-[0.14em]",
                    "text-[var(--foreground)] border-t border-[var(--border)] mt-1 font-sans"
                  )}
                >
                  Say hello
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
