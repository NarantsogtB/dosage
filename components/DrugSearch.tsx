"use client";

import { useMemo, useState } from "react";
import { DRUGS, CATEGORY_LABELS, type DrugCategory } from "@/lib/drugs";

interface DrugSelectorProps {
  selectedDrugIds: string[];
  onDrugSelect: (id: string) => void;
}

const ALL_CATEGORIES = "all" as const;
type FilterCategory = DrugCategory | typeof ALL_CATEGORIES;

const CATEGORY_ORDER: DrugCategory[] = [
  "analgesic",
  "antibiotic",
  "antitb",
  "antihistamine",
  "corticosteroid",
  "antiemetic",
  "gi",
  "mucolytic",
  "respiratory",
  "antifungal",
  "antiviral",
  "diuretic",
  "antihypertensive",
  "anticonvulsant",
  "cns",
  "iron",
  "vitamin",
  "antiparasitic",
];

export default function DrugSearch({ selectedDrugIds, onDrugSelect }: DrugSelectorProps) {
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>(ALL_CATEGORIES);
  const [query, setQuery] = useState("");

  const filteredDrugs = useMemo(() => {
    return DRUGS.filter((d) => {
      const matchCat = categoryFilter === ALL_CATEGORIES || d.category === categoryFilter;
      const matchQ = d.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    }).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  }, [categoryFilter, query]);

  const usedCategories = useMemo(() => {
    const cats = new Set(DRUGS.map((d) => d.category));
    return CATEGORY_ORDER.filter((c) => cats.has(c));
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
          Эм сонгох
        </h2>
        <input
          type="search"
          placeholder="Эмийн нэрээр хайх..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-colors"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 px-5 pb-3 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => setCategoryFilter(ALL_CATEGORIES)}
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            categoryFilter === ALL_CATEGORIES
              ? "bg-blue-800 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          Бүгд
        </button>
        {usedCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat === categoryFilter ? ALL_CATEGORIES : cat)}
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              categoryFilter === cat
                ? "bg-blue-800 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Drug list */}
      <div className="border-t border-slate-100 max-h-72 overflow-y-auto">
        {filteredDrugs.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">Хайлт олдсонгүй.</p>
        ) : (
          filteredDrugs.map((drug) => {
            const isSelected = selectedDrugIds.includes(drug.id);
            const isIvIm = drug.route === "iv_im";
            const hasWarnings = drug.warnings.length > 0;
            return (
              <button
                key={drug.id}
                onClick={() => onDrugSelect(drug.id)}
                className={`w-full text-left px-5 py-3 flex items-center justify-between gap-2 transition-colors border-b border-slate-50 last:border-0 ${
                  isSelected
                    ? "bg-blue-50 text-blue-900"
                    : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {isSelected && (
                    <svg className="w-4 h-4 shrink-0 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <span className={`text-sm font-medium truncate ${isSelected ? "text-blue-800" : ""}`}>
                    {drug.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {hasWarnings && (
                    <span className="text-amber-500" title="Анхааруулга байна">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  )}
                  {isIvIm && (
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                      IV/IM
                    </span>
                  )}
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                    {CATEGORY_LABELS[drug.category].split(" ")[0]}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Footer count */}
      <div className="border-t border-slate-100 px-5 py-2">
        <p className="text-xs text-slate-400">{filteredDrugs.length} эм харагдаж байна</p>
      </div>
    </div>
  );
}
