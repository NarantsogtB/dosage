"use client";

interface PatientInputProps {
  weightKg: number | "";
  ageYears: number | "";
  ageMonths: number | "";
  onWeightChange: (v: number | "") => void;
  onAgeYearsChange: (v: number | "") => void;
  onAgeMonthsChange: (v: number | "") => void;
}

export default function PatientInput({
  weightKg,
  ageYears,
  ageMonths,
  onWeightChange,
  onAgeYearsChange,
  onAgeMonthsChange,
}: PatientInputProps) {
  const weightInvalid =
    weightKg !== "" && (Number(weightKg) < 1 || Number(weightKg) > 200);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
        Өвчтөний мэдээлэл
      </h2>

      <div className="space-y-4">
        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Жин
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="200"
              step="0.1"
              placeholder="жишээ: 15"
              value={weightKg}
              onChange={(e) => {
                const v = e.target.value;
                onWeightChange(v === "" ? "" : parseFloat(v));
              }}
              className={`w-full rounded-lg border px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                weightInvalid
                  ? "border-red-400 focus:ring-red-300 bg-red-50"
                  : "border-slate-300 focus:ring-blue-300 focus:border-blue-400"
              }`}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 pointer-events-none">
              кг
            </span>
          </div>
          {weightInvalid && (
            <p className="mt-1 text-xs text-red-600">1–200 кг хүртэлх утга оруулна уу.</p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Нас
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="number"
                min="0"
                max="99"
                step="1"
                placeholder="0"
                value={ageYears}
                onChange={(e) => {
                  const v = e.target.value;
                  onAgeYearsChange(v === "" ? "" : parseInt(v));
                }}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 pointer-events-none">
                нас
              </span>
            </div>
            <div className="flex-1 relative">
              <input
                type="number"
                min="0"
                max="11"
                step="1"
                placeholder="0"
                value={ageMonths}
                onChange={(e) => {
                  const v = e.target.value;
                  const n = parseInt(v);
                  onAgeMonthsChange(v === "" ? "" : Math.min(11, Math.max(0, n)));
                }}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 pointer-events-none">
                сар
              </span>
            </div>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Нярайд: нас = 0, сарыг оруулна уу.
          </p>
        </div>
      </div>
    </div>
  );
}
