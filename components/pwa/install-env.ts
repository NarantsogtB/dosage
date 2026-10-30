"use client";

import type { InstallPlatform } from "@/lib/analytics/events";
import { platformOf } from "@/lib/pwa/install-prompt";

export interface InstallEnv {
  readonly platform?: InstallPlatform;
  readonly standalone: boolean;
  readonly dismissed: boolean;
}

const KEY = "dosage.install-prompt.v1";

/** Статик HTML (сервер) дээр сануулга ХЭЗЭЭ Ч гарахгүй. */
export const SERVER_ENV: InstallEnv = { standalone: false, dismissed: true };

let env: InstallEnv | undefined;
const listeners = new Set<() => void>();

/** Нүүр дэлгэцээс (суулгасан PWA) нээгдсэн эсэх. */
export const isStandalone = (): boolean =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as { standalone?: boolean }).standalone === true;

/** localStorage ажиллахгүй бол «хараагүй» — тухайн хуудсанд нэг удаа л гарна. */
const readDismissed = (): boolean => {
  try {
    return localStorage.getItem(KEY) !== null;
  } catch {
    return false;
  }
};

export const getEnv = (): InstallEnv =>
  (env ??= {
    platform: platformOf(navigator.userAgent),
    standalone: isStandalone(),
    dismissed: readDismissed(),
  });

export const subscribeEnv = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** «Суулгах» эсвэл «Хаах» — дахин хэзээ ч гаргахгүй. */
export const markDismissed = (): void => {
  env = { ...getEnv(), dismissed: true };
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    // Энэ хуудсанд санах ойд л үлдэнэ.
  }
  listeners.forEach((listener) => listener());
};
