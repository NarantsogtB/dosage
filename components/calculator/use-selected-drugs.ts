"use client";

import { useCallback, useMemo, useState } from "react";
import type { Drug } from "@/lib/domain/drug";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { track } from "@/lib/analytics/track";
import { rememberDrug } from "@/components/recent/recent-store";

const isDrug = (drug?: Drug): drug is Drug => drug !== undefined;

const without = (ids: readonly string[], id: string): readonly string[] =>
  ids.filter((item) => item !== id);

/** Эмч өөрөө НЭМСЭН үед: analytics + «сүүлд хэрэглэсэн». */
const onAdded = (id: string): void => {
  track({ name: "drug_selected", drugId: id });
  rememberDrug(id);
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
 * үйлдлийг засдаг.
 *
 * `initialIds` — эмийн хуудас (`/dose/[slug]`) тухайн эмийг урьдчилан
 * сонгоно. Урьдчилсан сонголт `drug_selected` event үүсгэхгүй,
 * «сүүлд хэрэглэсэн»-д ч нэмэгдэхгүй.
 */
export const useSelectedDrugs = (initialIds: readonly string[] = []) => {
  const [selectedIds, setSelectedIds] = useState<readonly string[]>(initialIds);
  const [undoable, setUndoable] = useState<readonly string[]>([]);

  const toggle = useCallback(
    (id: string) => {
      if (!selectedIds.includes(id)) onAdded(id);
      setUndoable([]);
      setSelectedIds(toggleId(selectedIds, id));
    },
    [selectedIds],
  );

  const remove = useCallback(
    (id: string) => {
      setUndoable(selectedIds);
      setSelectedIds(without(selectedIds, id));
    },
    [selectedIds],
  );

  const clear = useCallback(() => {
    setUndoable(selectedIds);
    setSelectedIds([]);
  }, [selectedIds]);

  const undo = useCallback(() => {
    setSelectedIds(undoable);
    setUndoable([]);
  }, [undoable]);

  const drugs = useMemo(
    () => selectedIds.map((id) => DRUG_BY_ID.get(id)).filter(isDrug),
    [selectedIds],
  );

  return {
    selectedIds,
    drugs,
    toggle,
    remove,
    clear,
    undo,
    undoCount: undoable.length - selectedIds.length,
  };
};
