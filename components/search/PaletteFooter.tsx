import { Kbd } from "@/components/ui/kbd";

const KEYS = [
  { keys: ["↑", "↓"], label: "сонгох" },
  { keys: ["↵"], label: "нээх" },
  { keys: ["Esc"], label: "хаах" },
] as const;

/** ⌘K palette-ийн доод товчлолын мөр (Figma 129:948). */
export default function PaletteFooter() {
  return (
    <div className="text-muted-foreground bg-muted/40 flex items-center gap-4 border-t px-4 py-2.5 text-xs">
      {KEYS.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          {item.keys.map((key) => (
            <Kbd key={key}>{key}</Kbd>
          ))}
          {item.label}
        </span>
      ))}
      <span className="ml-auto">Латин · кирилл</span>
    </div>
  );
}
