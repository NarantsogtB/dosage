"use client";

import { useEffect } from "react";
import type { CalculatorName } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import { isStandalone } from "@/components/pwa/install-env";

/**
 * Тооцоолуур нээгдсэнийг нэг удаа тэмдэглэнэ. `mode` нь нүүр дэлгэцээс
 * (суулгасан апп) нээсэн эсэх — «эргэж ирэлт»-ийн гол хэмжүүр.
 */
export const useTrackOpened = (calculator: CalculatorName): void => {
  useEffect(() => {
    const mode = isStandalone() ? "standalone" : "browser";
    track({ name: "calculator_opened", calculator, mode });
  }, [calculator]);
};
