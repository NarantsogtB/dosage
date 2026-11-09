"use client";

import type { ReactNode } from "react";
import type { Drug } from "@/lib/domain/drug";
import { DRUG_BY_ID } from "@/lib/data/drugs";
import { useIsDesktop } from "@/components/use-media-query";
import DeskPage from "@/components/desk/DeskPage";
import CalculatorMobile from "./CalculatorMobile";
import { useCalculatorState } from "./use-calculator-state";

interface Props {
  /** Урьдчилан сонгох эмүүд (эмийн хуудаснаас). */
  readonly initialDrugIds?: readonly string[];
  /** Mobile-д тооцоолуурын дээр — эмийн хуудасны гарчиг. */
  readonly intro?: ReactNode;
  /** Тооцоолуурын доор, footer-ийн өмнө — статик мэдээлэл. */
  readonly children?: ReactNode;
}

/** Эмийн хуудас (`/dose/[slug]`) бол тэр эм; `/dose` бол undefined. */
const detailDrug = (ids?: readonly string[]): Drug | undefined => (ids?.length ? DRUG_BY_ID.get(ids[0]!) : undefined);

/**
 * Тооцоолуурын үндсэн хуудас. Төлөвийг (`useCalculatorState`) НЭГ удаа эзэмшиж,
 * өргөнөөр бие сонгоно: mobile (<1024) — `CalculatorMobile`, desktop — `DeskPage`
 * (`initialDrugIds` байвал эмийн дэлгэрэнгүй, үгүй бол dashboard).
 *
 * Хоёр биеийг НЭГ DOM-д давхар mount хийхгүй (`id="dose-x"` давхардахгүй) —
 * `useIsDesktop` сервер, hydration-д `false` тул статик HTML mobile хэвээр.
 */
export default function CalculatorPage({ initialDrugIds, intro, children }: Props) {
  const calc = useCalculatorState(initialDrugIds);
  const desktop = useIsDesktop();
  if (!desktop) return <CalculatorMobile calc={calc} intro={intro}>{children}</CalculatorMobile>;
  return <DeskPage calc={calc} drug={detailDrug(initialDrugIds)}>{children}</DeskPage>;
}
