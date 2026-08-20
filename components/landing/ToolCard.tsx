import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Tool } from "./tools";

/** Нэг хэрэгслийн карт. Бүхэлдээ холбоос — товч хайх шаардлагагүй. */
export default function ToolCard({ tool }: { readonly tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="border-border bg-card hover:border-primary/40 focus-visible:ring-ring group flex flex-col rounded-xl border p-5 transition-colors focus-visible:ring-[3px] focus-visible:outline-none"
    >
      <Icon className="text-primary size-5" aria-hidden />
      <p className="mt-3 font-semibold tracking-tight">{tool.titleMn}</p>
      <p className="text-muted-foreground mt-1.5 flex-1 text-sm leading-relaxed">
        {tool.bodyMn}
      </p>
      <span className="text-primary mt-4 flex items-center gap-1.5 text-sm font-medium">
        Нээх
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
        />
      </span>
    </Link>
  );
}
