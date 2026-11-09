"use client";

import { ThemeProvider as NextThemes } from "next-themes";

/**
 * Шөнийн ээлжийн горим.
 *
 * `class` стратеги — globals.css-ийн `.dark` блок, `@custom-variant dark`
 * хоёулаа класс дээр суурилдаг. V4: `defaultTheme="dark"` (2026-11-04
 * шийдвэр); толгойн товч болон 9d-ийн Тохиргоо (Цайвар/Систем) дарж болно.
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
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemes>
  );
}
