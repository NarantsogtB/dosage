"use client";

import { useEffect } from "react";
import { toast } from "sonner";

const isProduction = (): boolean => process.env.NODE_ENV === "production";

/**
 * Шинэ SW хүлээлтэд орсон үед асууна. Автоматаар идэвхжүүлэхгүй:
 * эмийн өгөгдөл өөрчлөгдсөн байж болох тул эмч мэдэж байж шинэчлэх ёстой,
 * гэхдээ toast хаагдахгүй (`Infinity`) — хуучин тунгаар удаан үлдэхгүй.
 */
const offerUpdate = (worker: ServiceWorker): void => {
  toast("Шинэ хувилбар бэлэн", {
    description: "Эмийн өгөгдөл шинэчлэгдсэн байж болно.",
    duration: Number.POSITIVE_INFINITY,
    action: { label: "Шинэчлэх", onClick: () => worker.postMessage("SKIP_WAITING") },
  });
};

/** Суулгаж дууссан бөгөөд өмнө нь хуудсыг өөр SW удирдаж байсан = шинэчлэл. */
const watchInstalling = (registration: ServiceWorkerRegistration): void => {
  const worker = registration.installing;
  worker?.addEventListener("statechange", () => {
    if (worker.state === "installed" && navigator.serviceWorker.controller) offerUpdate(worker);
  });
};

const onRegistered = (registration: ServiceWorkerRegistration): void => {
  if (registration.waiting && navigator.serviceWorker.controller) offerUpdate(registration.waiting);
  registration.addEventListener("updatefound", () => watchInstalling(registration));
};

/**
 * Шинэ SW удирдлага авмагц НЭГ удаа дахин ачаална.
 *
 * Зөвхөн өмнө нь ӨӨР SW удирдаж байсан үед (= «Шинэчлэх» дарсан). Анхны
 * зочлолт дээр `clients.claim()` мөн `controllerchange` өгдөг — тэр үед
 * дахин ачаалбал эмчийн бичиж буй жин арилна.
 */
const reloadOnce = (): void => {
  let reloaded = !navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloaded) return;
    reloaded = true;
    window.location.reload();
  });
};

/**
 * `/sw.js`-ийг бүртгэнэ — зөвхөн production (dev-д кэш хөгжүүлэлтэд саад).
 * Бүртгэл амжилтгүй бол чимээгүй: offline нь нэмэлт боломж, тооцоолуур
 * түүнгүйгээр ч бүрэн ажиллана.
 */
export const useServiceWorker = (): void => {
  useEffect(() => {
    if (!isProduction() || !("serviceWorker" in navigator)) return;
    reloadOnce();
    navigator.serviceWorker.register("/sw.js").then(onRegistered).catch(() => undefined);
  }, []);
};
