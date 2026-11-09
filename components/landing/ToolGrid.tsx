import ToolCard from "./ToolCard";
import { TOOLS } from "./tools";

/** Ажиллаж буй тооцоолуурууд — mobile жагсаалт (g 10), desktop 4 багана (g 16). */
export default function ToolGrid() {
  return (
    <div className="flex flex-col gap-2.5 lg:grid lg:grid-cols-4 lg:gap-4">
      {TOOLS.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
    </div>
  );
}
