import ToolCard from "./ToolCard";
import { TOOLS } from "./tools";

/** Ажиллаж байгаа тооцоолуурууд. */
export default function ToolGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {TOOLS.map((tool) => (
        <ToolCard key={tool.href} tool={tool} />
      ))}
    </div>
  );
}
