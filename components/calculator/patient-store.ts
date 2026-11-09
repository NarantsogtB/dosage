"use client";

import { useCallback, useSyncExternalStore } from "react";
import { EMPTY_FORM, type PatientForm } from "./patient-form";
import {
  NO_PATIENTS,
  activeOf,
  changeActive,
  isEmptyForm,
  parsePatients,
  type PatientChange,
  type PatientsState,
} from "./patients";

const KEY = "dosage.patients.v2";
/** Шат 2a-ийн нэг өвчтөн. Нэг удаа уншаад v2 рүү шилжүүлж устгана. */
const LEGACY_KEY = "dosage.patient.v1";

let cache: PatientsState | undefined;
const listeners = new Set<() => void>();

/*
 * sessionStorage — зөвхөн энэ табд, хаахад арилна. Өвчтөний жин
 * төхөөрөмж дээр үлдэх ёсгүй тул localStorage БИШ. Хандалт бүр
 * try/catch-тэй: private горимд throw хийж болно, тэр үед зөвхөн
 * санах ойд (SPA шилжилтэд) хадгалагдана.
 */

const write = (state: PatientsState): void => {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
    sessionStorage.removeItem(LEGACY_KEY);
  } catch {
    // Хадгалж чадахгүй ч энэ хуудсанд санах ойд үлдэнэ.
  }
};

const read = (): PatientsState => {
  try {
    return parsePatients(sessionStorage.getItem(KEY), sessionStorage.getItem(LEGACY_KEY));
  } catch {
    return NO_PATIENTS;
  }
};

const snapshot = (): PatientsState => (cache ??= read());

/** Одоогийн төлөв (hook-гүй) — үйлдлийн функцүүдэд. */
export const snapshotState = snapshot;
const serverSnapshot = (): PatientsState => NO_PATIENTS;

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Store-ийг солино. Дуудагч ҮРГЭЛЖ хамгийн сүүлийн төлвөөс тооцоолно. */
export const updatePatients = (next: (state: PatientsState) => PatientsState): void => {
  cache = next(snapshot());
  write(cache);
  listeners.forEach((listener) => listener());
};

/** Санамсаргүй богино id — зөвхөн энэ табд өвчтөнүүдийг ялгана. */
export const newPatientId = (): string =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

/** Идэвхтэй өвчтөнийг өөрчилнө; өвчтөнгүй бол шинээр үүсгэнэ. */
export const changeActivePatient = (change: PatientChange): void =>
  updatePatients((state) => changeActive(state, change, newPatientId()));

/**
 * Бүх өвчтөн — `/dose` ↔ `/dose/[slug]` шилжилтэд хадгалагдана.
 * Сервер дээр ҮРГЭЛЖ хоосон (static HTML), hydration-ы дараа
 * `useSyncExternalStore` хадгалсан утгыг уншина — зөрчилгүй.
 */
export const usePatients = (): PatientsState =>
  useSyncExternalStore(subscribe, snapshot, serverSnapshot);

/**
 * ИДЭВХТЭЙ өвчтөний хэлбэр. API нь нэг өвчтөний үеийнхтэй ижил тул
 * `/emergency`, хуваалцах линк өөрчлөгдөөгүй.
 */
export const usePatientForm = () => {
  const state = usePatients();
  const form = activeOf(state)?.form ?? EMPTY_FORM;
  const setForm = useCallback((next: PatientForm) => {
    // Өвчтөнгүй үед хоосон хэлбэр «бичих» нь хоосон өвчтөн үүсгэх ёсгүй.
    if (!activeOf(snapshot()) && isEmptyForm(next)) return;
    changeActivePatient({ form: next });
  }, []);
  return [form, setForm] as const;
};
