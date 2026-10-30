"use client";

import { useServiceWorker } from "./use-service-worker";

/** Service worker бүртгэж, шинэ хувилбарыг toast-оор санал болгоно. Юу ч зурахгүй. */
export default function ServiceWorkerUpdate() {
  useServiceWorker();
  return null;
}
