"use client";

import { useMemo, useState } from "react";
import { DRUG_MAP, type Drug } from "@/lib/drugs";
import { calculateDosage, type CalculationResult } from "@/lib/calculations";
import PatientInput from "./PatientInput";
import DrugSearch from "./DrugSearch";
import DosageCard from "./DosageCard";
import Disclaimer from "./Disclaimer";
import PrintTemplate from "./PrintTemplate";

export default function CalculatorPage() {
  const [weightKg, setWeightKg] = useState<number | "">("");
  const [ageYears, setAgeYears] = useState<number | "">("");
  const [ageMonths, setAgeMonths] = useState<number | "">("");
  const [selectedDrugIds, setSelectedDrugIds] = useState<string[]>([]);

  const totalAgeMo = (Number(ageYears) || 0) * 12 + (Number(ageMonths) || 0);

  const toggleDrug = (id: string) => {
    setSelectedDrugIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedDrugs = useMemo(
    () => selectedDrugIds.map(id => DRUG_MAP.get(id)).filter((d): d is Drug => d !== undefined),
    [selectedDrugIds]
  );

  const results = useMemo(() => {
    if (!weightKg || Number(weightKg) <= 0) return new Map<string, CalculationResult>();
    const wt = Number(weightKg);
    const map = new Map<string, CalculationResult>();
    for (const drug of selectedDrugs) {
      map.set(drug.id, calculateDosage(drug, { weightKg: wt, totalAgeMo }));
    }
    return map;
  }, [weightKg, selectedDrugs, totalAgeMo]);

  const canPrint = selectedDrugIds.length > 0 && !!weightKg;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                Эмийн тун тооцоолуур
              </h1>
              <p className="text-xs text-slate-500 leading-tight">
                Эмийн тунг жинд тооцоолох
              </p>
            </div>
          </div>
          {canPrint && (
            <button
              onClick={() => window.print()}
              className="print:hidden flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
        <div className="print:hidden">
          <Disclaimer />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden">
          {/* Left column */}
          <div className="space-y-4 print:hidden">
            <PatientInput
              weightKg={weightKg}
              ageYears={ageYears}
              ageMonths={ageMonths}
              onWeightChange={setWeightKg}
              onAgeYearsChange={setAgeYears}
              onAgeMonthsChange={setAgeMonths}
            />
            <DrugSearch
              selectedDrugIds={selectedDrugIds}
              onDrugSelect={toggleDrug}
            />
          </div>

          {/* Right column — result */}
          <div className="space-y-3">

            {selectedDrugs.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 flex flex-col items-center justify-center text-center min-h-64">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-500 mb-1">
                  Тун харагдахгүй байна
                </p>
                <p className="text-xs text-slate-400">
                  Өвчтөний жин оруулж, эм сонгоно уу.
                </p>
              </div>
            ) : !weightKg ? (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center justify-center text-center min-h-40">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                    />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-slate-700 mb-1">
                  {selectedDrugs.length} эм сонгогдсон
                </p>
                <p className="text-xs text-slate-400">
                  Тун тооцоолохын тулд өвчтөний жинг оруулна уу.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDrugs.map(drug => {
                  const result = results.get(drug.id);
                  if (!result) return null;
                  return (
                    <DosageCard
                      key={drug.id}
                      drug={drug}
                      result={result}
                      weightKg={Number(weightKg)}
                      totalAgeMo={totalAgeMo}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <PrintTemplate
          drugs={selectedDrugs}
          results={results}
          weightKg={Number(weightKg)}
          totalAgeMo={totalAgeMo}
        />

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 print:hidden">
          <p className="text-xs text-slate-400">
            50 эм · Олон улсын нэршил (INN)
          </p>
          <span className="hidden sm:block text-slate-300">·</span>
          <a
            href="https://www.facebook.com/profile.php?id=61592793974106"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Санал хүсэлт · Facebook
          </a>
        </div>
      </main>
    </div>
  );
}
