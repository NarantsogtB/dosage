"use client";

import { CATEGORY_LABELS, ROUTE_LABELS, FREQUENCY_LABELS, type Drug } from "@/lib/drugs";
import { type CalculationResult, formatAmount, formatDose } from "@/lib/calculations";

interface DosageCardProps {
  drug: Drug;
  result: CalculationResult;
  weightKg: number;
  totalAgeMo: number;
}

function AgeDisplay({ totalAgeMo }: { totalAgeMo: number }) {
  const years = Math.floor(totalAgeMo / 12);
  const months = totalAgeMo % 12;
  if (years === 0) return <>{months} сар</>;
  if (months === 0) return <>{years} нас</>;
  return <>{years} нас {months} сар</>;
}

export default function DosageCard({ drug, result, weightKg, totalAgeMo }: DosageCardProps) {
  if (result.type === "ineligible") {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="shrink-0 mt-0.5">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-red-800 mb-1">Тооцоолол боломжгүй</p>
            <p className="text-sm text-red-700">{result.reason}</p>
          </div>
        </div>
      </div>
    );
  }

  const { data } = result;
  const isRange = Math.abs(data.doseMax - data.doseMin) > 0.05;
  const doseDisplay = isRange
    ? `${formatDose(data.doseMin)}–${formatDose(data.doseMax)} мг`
    : `${formatDose(data.doseMin)} мг`;
  const dailyDisplay = isRange
    ? `${formatDose(data.dailyDoseMin)}–${formatDose(data.dailyDoseMax)} мг`
    : `${formatDose(data.dailyDoseMin)} мг`;

  const isIvIm = drug.route === "iv_im";

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden print:shadow-none print:border-slate-300">
      {/* Drug header */}
      <div className="border-l-4 border-blue-700 bg-gradient-to-r from-blue-50 to-white px-5 py-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{drug.name}</h2>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                {CATEGORY_LABELS[drug.category]}
              </span>
              {isIvIm && (
                <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                  IV/IM
                </span>
              )}
              <span className="text-xs text-slate-500">{ROUTE_LABELS[drug.route]}</span>
            </div>
          </div>
          {/* Patient summary */}
          <div className="text-right text-xs text-slate-500 shrink-0">
            <div className="font-medium text-slate-700">{weightKg} кг</div>
            <div>
              <AgeDisplay totalAgeMo={totalAgeMo} />
            </div>
          </div>
        </div>
      </div>

      {/* Dosage rows */}
      <div className="divide-y divide-slate-100">
        {/* Per dose */}
        <div className="px-5 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Нэг удаагийн тун
          </p>
          <p className="text-2xl font-bold text-slate-900">{doseDisplay}</p>
          {data.cappedAtMax && (
            <p className="text-xs text-amber-700 mt-1 flex items-center gap-1">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Хамгийн их туннд хязгаарлагдсан.
            </p>
          )}
        </div>

        {/* Frequency */}
        <div className="px-5 py-3.5 flex justify-between items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Давтамж
            </p>
            <p className="text-base font-semibold text-slate-800">
              {FREQUENCY_LABELS[data.frequencyLabel]}
            </p>
          </div>
          {data.durationDays && (
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                Курс
              </p>
              <p className="text-base font-semibold text-slate-800">{data.durationDays} хоног</p>
            </div>
          )}
        </div>

        {/* Daily total */}
        <div className="px-5 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Өдрийн нийт тун
          </p>
          <p className="text-base font-semibold text-slate-800">{dailyDisplay}</p>
        </div>
      </div>

      {/* Formulation helper */}
      {data.formulationResults.length > 0 && !isIvIm && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Хэлбэр тус бүрд (нэг удаа)
          </p>
          <div className="space-y-2">
            {data.formulationResults.map((fr, i) => (
              <div key={i} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-slate-600">{fr.displayLabel}</span>
                <span className="font-semibold text-slate-900 text-right">{formatAmount(fr)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {data.warnings.length > 0 && (
        <div className="border-t border-amber-100 bg-amber-50 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Анхааруулга
          </p>
          <ul className="space-y-1.5">
            {data.warnings.map((w, i) => (
              <li key={i} className="text-sm text-amber-800 flex gap-2">
                <span className="shrink-0 mt-0.5 text-amber-500">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Notes */}
      {data.notes && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Тэмдэглэл
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{data.notes}</p>
        </div>
      )}

    </div>
  );
}
