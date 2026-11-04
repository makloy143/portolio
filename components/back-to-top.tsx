"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-6 right-6 z-40 grid size-11 place-items-center rounded-full border bg-card/90 text-foreground shadow-lg backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        visible ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      )}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp className="size-4" />
    </button>
  );
}
