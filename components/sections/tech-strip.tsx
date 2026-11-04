import { techStrip } from "@/lib/data";

export function TechStrip() {
  const items = [...techStrip, ...techStrip];

  return (
    <div className="border-y bg-surface/60 py-5" aria-label="Core technologies">
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee gap-10 pr-10 hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <li
              key={`${item}-${i}`}
              aria-hidden={i >= techStrip.length}
              className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-muted-foreground"
            >
              {item}
              <span className="size-1 rounded-full bg-border" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
