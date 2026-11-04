"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/data";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: siteConfig.timeZone,
});

/** Current time in the owner's time zone; renders nothing until mounted to avoid hydration mismatch. */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {time ?? "—"}
    </time>
  );
}
