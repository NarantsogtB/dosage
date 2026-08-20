"use client";

import { useMemo, useState } from "react";
import { ageBandOf } from "@/lib/calculators/burns/age-band";
import { totalBsaPercent } from "@/lib/calculators/burns/tbsa";
import {
  EMPTY_FORM,
  isReady,
  toPatient,
} from "@/components/calculator/patient-form";
import BurnsDisclaimer from "./BurnsDisclaimer";
import BurnsInputs from "./BurnsInputs";
import BurnsResults from "./BurnsResults";
import { useBurnSelections } from "./use-burn-selections";

const NeedWeight = () => (
  <p className="text-muted-foreground rounded-xl border border-dashed p-8 text-center text-sm">
    Жин оруулбал шингэний тооцоолол гарна.
  </p>
);

/**
 * Түлэгдэлтийн шингэн сэлбэх тооцоолуур.
 *
 * Насны ангилалыг `ageBandOf` буюу Lund-Browder-ийн ЗУРГААН баганаас
 * сонгоно. Естийн дүрмийн хоёр ангилалыг (хүүхэд / насанд хүрэгч)
 * ХЭРЭГЛЭХГҮЙ: тэр нь 14 настайг нярайн харьцаагаар тооцдог байсан.
 */
export default function BurnsPage() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [heightCm, setHeightCm] = useState("");
  const { map, selections, setDepth, clear } = useBurnSelections();

  const patient = useMemo(
    () => ({ ...toPatient(form), heightCm: Number(heightCm) || undefined }),
    [form, heightCm],
  );
  const band = ageBandOf(patient);
  const tbsa = totalBsaPercent(selections, band);

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-6 sm:px-6">
      <BurnsDisclaimer />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
        <BurnsInputs
          form={form}
          onForm={setForm}
          heightCm={heightCm}
          onHeight={setHeightCm}
          band={band}
          selections={map}
          onToggle={setDepth}
          onClear={clear}
        />
        {isReady(form) ? (
          <BurnsResults patient={patient} tbsaPercent={tbsa} band={band} />
        ) : (
          <NeedWeight />
        )}
      </div>
    </main>
  );
}
