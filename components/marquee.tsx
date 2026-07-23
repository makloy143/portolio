import { marqueeItems } from "@/lib/data";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <div className="border-y border-[var(--border)] py-4 overflow-hidden">
      <div className="flex w-max animate-marquee gap-8 px-6">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap font-sans"
          >
            {item}
            <span className="text-[var(--muted-light)]">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
