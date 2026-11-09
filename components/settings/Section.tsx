import type { ReactNode } from "react";

/** Тохиргооны бүлэг: гарчиг + хуваагдсан мөрүүдтэй карт. */
export default function Section({ title, children }: { readonly title: string; readonly children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="bg-card divide-border/60 divide-y rounded-2xl">{children}</div>
    </section>
  );
}
