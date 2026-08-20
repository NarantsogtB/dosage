"use client";

import { ThemeProvider as NextThemes } from "next-themes";

/**
 * Шөнийн ээлжийн горим.
 *
 * `class` стратеги — globals.css-ийн `.dark` блок, `@custom-variant dark`
 * хоёулаа класс дээр суурилдаг. `defaultTheme="system"` учир эмч
 * төхөөрөмжийнхөө тохиргоог өвлөнө; толгойн товч түүнийг дарж болно.
 *
 * `disableTransitionOnChange` — горим солиход бүх өнгө нэг дор
 * шилжвэл нүд өвдөнө. Солилт агшин зуур болно.
 */
export default function ThemeProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
