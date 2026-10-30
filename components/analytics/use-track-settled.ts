"use client";

import { useEffect, useRef } from "react";
import type { AnalyticsEvent } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";

const keyOf = (event: AnalyticsEvent): string => JSON.stringify(event);

/**
 * Оролт ТОГТСОНЫ дараа event-үүдийг илгээнэ.
 *
 * Эмч жинг "1" → "15" гэж бичих үед 1 кг-ын тооцооллыг тоолохгүйн тулд
 * `delayMs` хугацаанд өөрчлөлт гараагүй үед л илгээнэ. Нэг event-ийг
 * (ижил агуулгатай) хуудасны амьдралд НЭГ л удаа илгээнэ.
 */
export const useTrackSettled = (
  events: readonly AnalyticsEvent[],
  delayMs: number,
): void => {
  const sent = useRef(new Set<string>());
  const key = JSON.stringify(events);

  useEffect(() => {
    const pending = (JSON.parse(key) as AnalyticsEvent[]).filter(
      (event) => !sent.current.has(keyOf(event)),
    );
    const flush = () => {
      for (const event of pending) sent.current.add(keyOf(event));
      pending.forEach(track);
    };
    const timer = setTimeout(flush, delayMs);
    return () => clearTimeout(timer);
  }, [key, delayMs]);
};
