"use client";

import { useMemo, useState } from "react";
import { DRUG_MAP } from "@/lib/drugs";
import { calculateDosage } from "@/lib/calculations";
import PatientInput from "./PatientInput";
import DrugSearch from "./DrugSearch";
import DosageCard from "./DosageCard";
import Disclaimer from "./Disclaimer";

export default function CalculatorPage() {
  const [weightKg, setWeightKg] = useState<number | "">("");
  const [ageYears, setAgeYears] = useState<number | "">("");
  const [ageMonths, setAgeMonths] = useState<number | "">("");
  const [selectedDrugId, setSelectedDrugId] = useState<string | null>(null);

  const totalAgeMo = (Number(ageYears) || 0) * 12 + (Number(ageMonths) || 0);

  const selectedDrug = selectedDrugId ? DRUG_MAP.get(selectedDrugId) ?? null : null;

  const result = useMemo(() => {
    if (!weightKg || !selectedDrug) return null;
    const wt = Number(weightKg);
    if (wt <= 0) return null;
    return calculateDosage(selectedDrug, { weightKg: wt, totalAgeMo });
  }, [weightKg, selectedDrug, totalAgeMo]);

  const canPrint = result !== null && selectedDrug !== null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 print:static">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">Эмийн тун тооцоолуур</h1>
              <p className="text-xs text-slate-500 leading-tight">Жингийн дагуу тун тооцоолох</p>
            </div>
          </div>
          {canPrint && (
            <button
              onClick={() => window.print()}
              className="print:hidden flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Хэвлэх
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
        {/* Disclaimer */}
        <Disclaimer />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-4">
            <PatientInput
              weightKg={weightKg}
              ageYears={ageYears}
              ageMonths={ageMonths}
              onWeightChange={setWeightKg}
              onAgeYearsChange={setAgeYears}
              onAgeMonthsChange={setAgeMonths}
            />
            <DrugSearch
              selectedDrugId={selectedDrugId}
              onDrugSelect={(id) => setSelectedDrugId(id === selectedDrugId ? null : id)}
            />
          </div>

          {/* Right column — result */}
          <div>
            {selectedDrug && result ? (
              <DosageCard
                drug={selectedDrug}
                result={result}
                weightKg={Number(weightKg)}
                totalAgeMo={totalAgeMo}
              />
            ) : selectedDrug && !weightKg ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center text-center min-h-40">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-1">{selectedDrug.name}</p>
                <p className="text-xs text-slate-400">Тун тооцоолохын тулд өвчтөний жинг оруулна уу.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center min-h-64">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-500 mb-1">Тун харагдахгүй байна</p>
                <p className="text-xs text-slate-400">
                  Өвчтөний жин оруулж, эм сонгоно уу.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-center text-slate-400 pt-2 print:hidden">
          Монгол улсад өргөн хэрэглэгддэг 30 эм · Олон улсын нэршил (INN) · Vercel дээр байрлуулсан
        </p>
      </main>
    </div>
  );
}
