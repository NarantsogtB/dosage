"use client";

import { useCallback } from "react";
import { toast } from "sonner";

interface Selection {
  readonly selectedIds: readonly string[];
  readonly remove: (id: string) => void;
  readonly clear: () => void;
  readonly restore: (ids: readonly string[]) => void;
}

/**
 * Хасах, цэвэрлэх үйлдэл + «Буцаах» toast — Figma "Undo toast" (V3 · 02).
 *
 * Өмнө нь үр дүнгийн дээр тасархай хүрээтэй `UndoBar` гардаг байв:
 * байнга зай эзэлж, mobile-д тунг доош түлхдэг. Toast нь түр зуур, эрхий
 * хурууны бүсэд гарна. Баталгаажуулах цонх БИШ, буцаах — зөв үйлдлийг
 * удаашруулахгүй, зөвхөн буруугаа засна (HEURISTICS.md §3).
 *
 * Буцаах нь хасахаас ӨМНӨХ жагсаалтыг барьж авсан тул toast-ийн хооронд
 * өөр өөрчлөлт хийсэн ч яг тэр байдал руу буцна.
 */
export const useUndoableRemoval = (selection: Selection) => {
  const { selectedIds, remove, clear, restore } = selection;

  const notify = useCallback(
    (before: readonly string[], count: number) =>
      toast(`${count} эм хасагдлаа`, {
        duration: 6000,
        action: { label: "Буцаах", onClick: () => restore(before) },
      }),
    [restore],
  );

  const onRemove = useCallback(
    (id: string) => {
      remove(id);
      notify(selectedIds, 1);
    },
    [remove, notify, selectedIds],
  );

  const onClear = useCallback(() => {
    clear();
    notify(selectedIds, selectedIds.length);
  }, [clear, notify, selectedIds]);

  return { onRemove, onClear };
};
