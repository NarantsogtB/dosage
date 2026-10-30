"use client";

import { useSyncExternalStore } from "react";
import { WifiOff } from "lucide-react";

const subscribe = (onChange: () => void) => {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
};

const isOffline = (): boolean => !navigator.onLine;
/** Сервер дээр ҮРГЭЛЖ online — static HTML-д тэмдэг гарахгүй. */
const serverSnapshot = (): boolean => false;

/**
 * «Офлайн» — тайван тэмдэг, анхааруулга БИШ. Service worker-ийн кэшээр
 * тооцоолуур хэвийн ажиллана; эмч зөвхөн одоо харж буй өгөгдөл сүүлд
 * ачаалсан хувилбар гэдгийг мэдэх ёстой.
 */
export default function OfflineBadge() {
  const offline = useSyncExternalStore(subscribe, isOffline, serverSnapshot);
  if (!offline) return null;
  return (
    <span
      role="status"
      className="bg-muted text-muted-foreground inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2.5 text-xs font-medium"
    >
      <WifiOff aria-hidden className="size-3.5" />
      Офлайн
    </span>
  );
}
