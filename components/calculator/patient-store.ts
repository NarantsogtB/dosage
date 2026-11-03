"use client";

import { useCallback, useSyncExternalStore } from "react";
import { EMPTY_FORM, parsePatientForm, type PatientForm } from "./patient-form";

const KEY = "dosage.patient.v1";

let cache: PatientForm | undefined;
const listeners = new Set<() => void>();

/*
 * sessionStorage — зөвхөн энэ табд, хаахад арилна. Өвчтөний жин
 * төхөөрөмж дээр үлдэх ёсгүй тул localStorage БИШ. Хандалт бүр
 * try/catch-тэй: private горимд throw хийж болно, тэр үед зөвхөн
 * санах ойд (SPA шилжилтэд) хадгалагдана.
 */

const read = (): PatientForm => {
  try {
    return parsePatientForm(sessionStorage.getItem(KEY));
  } catch {
    return EMPTY_FORM;
  }
};

const write = (form: PatientForm): void => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(form));
  } catch {
    // Хадгалж чадахгүй ч энэ хуудсанд санах ойд үлдэнэ.
  }
};

const snapshot = (): PatientForm => (cache ??= read());
const serverSnapshot = (): PatientForm => EMPTY_FORM;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/**
 * Өвчтөний хэлбэр — `/dose` ↔ `/dose/[slug]` шилжилтэд хадгалагдана.
 *
 * Өмнө нь `useState` байсан тул эмийн хуудас руу орох бүрд жин, нас
 * арилдаг байв. Сервер дээр ҮРГЭЛЖ хоосон (static HTML), hydration-ы
 * дараа `useSyncExternalStore` хадгалсан утгыг уншина — зөрчилгүй.
 */
export const usePatientForm = () => {
  const form = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const setForm = useCallback((next: PatientForm) => {
    cache = next;
    write(next);
    listeners.forEach((listener) => listener());
  }, []);
  return [form, setForm] as const;
};
