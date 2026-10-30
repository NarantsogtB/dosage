"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { InstallOutcome, InstallPlatform } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import { shouldPrompt } from "@/lib/pwa/install-prompt";
import { getEnv, markDismissed, SERVER_ENV, subscribeEnv } from "./install-env";

/** Chrome/Android-ийн `beforeinstallprompt` — TS-ийн dom lib-д байхгүй. */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/** Хөтөч суулгах боломжтойг зарласан үед event-ийг хадгална. */
const useDeferredInstall = () => {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  useEffect(() => {
    const capture = (event: Event) => {
      event.preventDefault(); // Chrome-ийн өөрийн мини баннерыг хаана — бид өөрсдөө асууна.
      setDeferred(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", capture);
    return () => window.removeEventListener("beforeinstallprompt", capture);
  }, []);
  return deferred;
};

/** Нэг удаа үнэн болвол үнэн хэвээр — үр дүн арилсан ч сануулга алга болохгүй. */
const useLatch = (value: boolean): boolean => {
  const [latched, setLatched] = useState(value);
  // Render үеийн setState: React энэ гаралтыг хаяж, шинэ утгаар шууд дахин render хийнэ.
  if (value && !latched) setLatched(true);
  return latched;
};

const finish = (platform: InstallPlatform, outcome: InstallOutcome) => {
  track({ name: "install_prompt_result", platform, outcome });
  markDismissed();
};

const androidOutcome = async (event: BeforeInstallPromptEvent) => {
  await event.prompt();
  const { outcome } = await event.userChoice;
  return outcome === "accepted" ? "accepted" : "dismissed";
};

/**
 * «Нүүр дэлгэцэд нэмэх» сануулгын төлөв. Дүрэм нь `lib/pwa/install-prompt.ts`.
 */
export const useInstallPrompt = (hasCalculated: boolean) => {
  const env = useSyncExternalStore(subscribeEnv, getEnv, () => SERVER_ENV);
  const deferred = useDeferredInstall();
  const calculated = useLatch(hasCalculated);
  const visible = shouldPrompt({
    ...env,
    hasCalculated: calculated,
    androidReady: deferred !== null,
  });
  const platform = visible ? env.platform : undefined;

  useEffect(() => {
    if (platform) track({ name: "install_prompt_shown", platform });
  }, [platform]);

  return {
    platform,
    install: async () => {
      if (deferred) finish("android", await androidOutcome(deferred));
    },
    acknowledge: () => finish("ios", "acknowledged"),
    close: () => platform && finish(platform, "dismissed"),
  };
};
