"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const OPTIONS = [
  { value: "dark", label: "Харанхуй" },
  { value: "light", label: "Цайвар" },
  { value: "system", label: "Систем" },
] as const;

const ITEM = "data-[state=on]:bg-tile data-[state=on]:text-tile-foreground h-11 flex-1 rounded-full!";

const noop = () => () => {};

/** Сервер дээр false, hydration-ы дараа true — `next-themes` клиент дээр утгыг шууд уншдаг тул зөрүү гарахаас сэргийлнэ. */
const useMounted = (): boolean => useSyncExternalStore(noop, () => true, () => false);

/** Өнгө төрөх — V4 анхдагч харанхуй; Систем нь төхөөрөмжийн тохиргоог дагана. */
export default function ThemeSetting() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  return (
    <ToggleGroup
      type="single"
      value={mounted ? (theme ?? "") : ""}
      aria-label="Өнгө төрөх"
      className="bg-card w-full rounded-full p-1"
      onValueChange={(next) => next && setTheme(next)}
    >
      {OPTIONS.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value} className={ITEM}>
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
