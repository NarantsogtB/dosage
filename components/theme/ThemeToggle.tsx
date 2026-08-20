"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/**
 * Гэрэл ↔ харанхуй сэлгэгч.
 *
 * Сервер дээр аль горим идэвхтэйг МЭДЭХ БОЛОМЖГҮЙ. Түгээмэл шийдэл нь
 * `useEffect`-ээр mounted тэмдэглэж, түүнээс өмнө юу ч зурахгүй байх —
 * гэхдээ энэ нь нэмэлт render, гялсхийх нөлөө хоёуланг авчирдаг.
 *
 * Энд хоёулаа дүрсийг ЗУРЖ, аль нь харагдахыг CSS шийднэ (`dark:hidden`).
 * `.dark` класс нь `<html>`-д hydration-аас ӨМНӨ next-themes-ийн скриптээр
 * тавигддаг тул зөв дүрс эхний зурагт л зөв гарна. React ямар ч төлөв
 * мэдэхгүй — тиймээс зөрчил гарах зүйл ч байхгүй.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Гэрэлтэй, харанхуй горим солих"
      title="Гэрэлтэй, харанхуй горим солих"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="ml-auto shrink-0"
    >
      <Sun className="hidden size-4.5 dark:block" aria-hidden />
      <Moon className="size-4.5 dark:hidden" aria-hidden />
    </Button>
  );
}
