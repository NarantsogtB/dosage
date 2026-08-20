interface Props {
  readonly label: string;
  readonly value: string;
  readonly hint?: string;
}

/** Шингэний үр дүнгийн нэг мөр. */
export default function FluidRow({ label, value, hint }: Props) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className="text-muted-foreground text-sm">
        {label}
        {hint ? (
          <span className="block text-xs opacity-70">{hint}</span>
        ) : null}
      </span>
      <span className="num shrink-0 font-semibold">{value}</span>
    </div>
  );
}
