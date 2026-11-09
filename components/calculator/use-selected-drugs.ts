"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import type { Drug } from "@/lib/domain/drug";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { track } from "@/lib/analytics/track";
import { rememberDrug } from "@/components/recent/recent-store";
import { changeActivePatient, newPatientId, snapshotState, updatePatients, usePatients } from "./patient-store";
import { activeOf, changeActive, type PatientsState } from "./patients";

const isDrug = (drug?: Drug): drug is Drug => drug !== undefined;

const without = (ids: readonly string[], id: string): readonly string[] =>
  ids.filter((item) => item !== id);

/** Эмч өөрөө НЭМСЭН үед: analytics + «сүүлд хэрэглэсэн». */
const onAdded = (id: string): void => {
  track({ name: "drug_selected", drugId: id });
  rememberDrug(id);
};

const NONE: readonly string[] = [];

const setIds = (drugIds: readonly string[]): void => changeActivePatient({ drugIds });

const drugIdsOf = (state: PatientsState): readonly string[] => activeOf(state)?.drugIds ?? NONE;

const withDrugs = (state: PatientsState, ids: readonly string[]): PatientsState => {
  const current = drugIdsOf(state);
  const missing = ids.filter((id) => !current.includes(id));
  return missing.length === 0 ? state : changeActive(state, { drugIds: [...current, ...missing] }, newPatientId());
};

/**
 * Идэвхтэй өвчтөнд эм нэмнэ (хайлт, «Миний эмүүд»). Эмч өөрөө нэмсэн тул
 * analytics + «сүүлд хэрэглэсэн». Аль хэдийн байвал юу ч хийхгүй.
 */
export const addDrugToActive = (id: string): void => {
  if (!drugIdsOf(snapshotState()).includes(id)) onAdded(id);
  updatePatients((state) => withDrugs(state, [id]));
};

/**
 * Урьдчилсан эмийг идэвхтэй өвчтөнд НЭГ удаа нэмнэ. Hydration-ы үеэр
 * render-ийн утга хоосон байж болох тул store-ийн сүүлийн төлвөөс нэмнэ.
 */
const usePreselect = (initialIds: readonly string[]) => {
  const done = useRef(false);
  useEffect(() => {
    if (done.current || initialIds.length === 0) return;
    done.current = true;
    updatePatients((state) => withDrugs(state, initialIds));
  }, [initialIds]);
};

const toggleId = (ids: readonly string[], id: string): readonly string[] =>
  ids.includes(id) ? without(ids, id) : [...ids, id];

/**
 * Сонгосон эмийн id-уудыг хадгалж, Drug объект болгон буцаана.
 *
 * БУЦААХ боломжтой. «Цэвэрлэх» нь нэг дарахад бүх сонголтыг устгадаг
 * бөгөөд өмнө нь сэргээх арга байгаагүй — эмч 6 эм сонгосны дараа
 * санамсаргүй дарвал бүгдийг дахин хайх шаардлагатай болдог байв
 * (Nielsen H3: хэрэглэгчийн хяналт, эрх чөлөө).
 *
 * Баталгаажуулах цонх БИШ, буцаах товч сонгосон шалтгаан: баталгаа
 * нь ЗӨВ үйлдэл бүрийг удаашруулдаг, буцаах нь зөвхөн БУРУУ
 * үйлдлийг засдаг. Буцаах toast нь `use-undoable-removal.ts`-д.
 *
 * `initialIds` — эмийн хуудас (`/dose/[slug]`) тухайн эмийг урьдчилан
 * сонгоно. Урьдчилсан сонголт `drug_selected` event үүсгэхгүй,
 * «сүүлд хэрэглэсэн»-д ч нэмэгдэхгүй.
 *
 * Шат 9b: жагсаалт ИДЭВХТЭЙ өвчтөнийх (store), өвчтөн солиход солигдоно.
 */
export const useSelectedDrugs = (initialIds: readonly string[] = NONE) => {
  const selectedIds = drugIdsOf(usePatients());
  usePreselect(initialIds);

  const toggle = useCallback(
    (id: string) => {
      if (!selectedIds.includes(id)) onAdded(id);
      setIds(toggleId(selectedIds, id));
    },
    [selectedIds],
  );

  const remove = useCallback((id: string) => setIds(without(selectedIds, id)), [selectedIds]);

  const clear = useCallback(() => setIds(NONE), []);

  /** Буцаах: хасахаас өмнөх жагсаалтыг сэргээнэ (`useUndoableRemoval`). */
  const restore = useCallback((ids: readonly string[]) => setIds(ids), []);

  const drugs = useMemo(
    () => selectedIds.map((id) => DRUG_BY_ID.get(id)).filter(isDrug),
    [selectedIds],
  );

  return { selectedIds, drugs, toggle, remove, clear, restore };
};
