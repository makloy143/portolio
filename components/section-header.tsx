type SectionHeaderProps = {
  number: string;
  label: string;
  title?: string;
  emphasis?: string;
  count?: number;
};

export function SectionHeader({
  number,
  label,
  title,
  emphasis,
  count,
}: SectionHeaderProps) {
  const hasTitle = Boolean(title || emphasis);

  return (
    <div className="mb-12 md:mb-16">
      <p className="section-number mb-6">
        {number} — {label}
      </p>
      {hasTitle && (
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-foreground">
            {title}
            {emphasis && (
              <>
                {title ? " " : null}
                <span className="emphasis">{emphasis}</span>
              </>
            )}
          </h2>
          {count !== undefined && (
            <span className="text-sm text-muted-foreground font-sans">
              ({String(count).padStart(2, "0")})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
