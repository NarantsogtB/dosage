import { DRUG_BY_ID } from "../data/drugs";

/**
 * Тооцооны түүх (Шат 9e) — ЗӨВХӨН оролт. Тун, мл зэрэг ҮР ДҮН хадгалахгүй:
 * нээхэд одоогийн өгөгдлөөр дахин тооцно (өгөгдөл баталгаажихад хуучин тоо үлдэхгүй).
 * Нэр хадгалахгүй — шошго л («Ор 3»).
 */
export interface HistoryEntry {
  readonly id: string;
  /** Epoch ms — сүүлд тооцсон цаг. */
  readonly at: number;
  readonly label: string;
  readonly weightKg: number;
  readonly ageMonths: number;
  readonly drugId: string;
  readonly indication?: string;
  readonly formulation?: string;
}

export const MAX_ENTRIES = 100;
export const MAX_AGE_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Ижил өвчтөн + эм + заалт + бэлдмэл = нэг мөр. */
export const keyOf = (entry: Omit<HistoryEntry, "id" | "at">): string =>
  [entry.label, entry.weightKg, entry.ageMonths, entry.drugId, entry.indication ?? "", entry.formulation ?? ""].join("|");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

const optionalText = (value: unknown): string | undefined => (typeof value === "string" && value ? value : undefined);

type Raw = Record<string, unknown>;

const SHAPE: readonly ((raw: Raw) => boolean)[] = [
  (raw) => typeof raw.id === "string",
  (raw) => typeof raw.drugId === "string" && DRUG_BY_ID.has(raw.drugId),
  (raw) => isNumber(raw.at),
  (raw) => isNumber(raw.weightKg),
  (raw) => isNumber(raw.ageMonths),
];

const build = (raw: Raw): HistoryEntry => ({
  id: raw.id as string,
  at: raw.at as number,
  weightKg: raw.weightKg as number,
  ageMonths: raw.ageMonths as number,
  drugId: raw.drugId as string,
  label: typeof raw.label === "string" ? raw.label : "",
  indication: optionalText(raw.indication),
  formulation: optionalText(raw.formulation),
});

const toEntry = (value: unknown): HistoryEntry | null =>
  isRecord(value) && SHAPE.every((check) => check(value)) ? build(value) : null;

const isEntry = (entry: HistoryEntry | null): entry is HistoryEntry => entry !== null;

/** Хугацаа дууссаныг хаяж, шинэ нь эхэнд, ≤ `MAX_ENTRIES`. */
export const prune = (entries: readonly HistoryEntry[], now: number): readonly HistoryEntry[] =>
  entries
    .filter((entry) => now - entry.at <= MAX_AGE_DAYS * DAY_MS)
    .sort((a, b) => b.at - a.at)
    .slice(0, MAX_ENTRIES);

const parseJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/** localStorage-ийн түүхий утга. Эвдэрсэн, үл мэдэгдэх эм, хугацаа дууссан мөрийг чимээгүй хаяна. */
export const parseHistory = (raw: string | null, now: number): readonly HistoryEntry[] => {
  const value = raw === null ? null : parseJson(raw);
  return Array.isArray(value) ? prune(value.map(toEntry).filter(isEntry), now) : [];
};

type Incoming = Omit<HistoryEntry, "id" | "at">;

const idOf = (item: Incoming, now: number, index: number): string => `${now.toString(36)}-${index}-${item.drugId}`;

/** Ижил түлхүүртэй мөрийн цагийг шинэчилнэ (шинээр нэмэхгүй); үгүй бол нэмнэ. */
export const recordEntries = (
  list: readonly HistoryEntry[],
  incoming: readonly Incoming[],
  now: number,
): readonly HistoryEntry[] => {
  const keys = new Set(incoming.map(keyOf));
  const kept = list.filter((entry) => !keys.has(keyOf(entry)));
  const fresh = incoming.map((item, index) => ({ ...item, id: idOf(item, now, index), at: now }));
  return prune([...fresh, ...kept], now);
};

// ── Харуулах ───────────────────────────────────────────────────────────────

const startOfDay = (ms: number): number => new Date(ms).setHours(0, 0, 0, 0);

export interface DayGroup {
  readonly label: string;
  readonly entries: readonly HistoryEntry[];
}

const dayLabel = (at: number, now: number): string => {
  const diff = Math.round((startOfDay(now) - startOfDay(at)) / DAY_MS);
  if (diff === 0) return "Өнөөдөр";
  if (diff === 1) return "Өчигдөр";
  const date = new Date(at);
  return `${date.getMonth() + 1} сар ${date.getDate()}`;
};

/** Өдрөөр бүлэглэнэ; бүлэг, мөр хоёул шинэ нь эхэнд (`entries` эрэмбэлэгдсэн гэж үзнэ). */
export const groupByDay = (entries: readonly HistoryEntry[], now: number): readonly DayGroup[] => {
  const groups: DayGroup[] = [];
  entries.forEach((entry) => {
    const label = dayLabel(entry.at, now);
    const last = groups[groups.length - 1];
    if (last?.label === label) groups[groups.length - 1] = { label, entries: [...last.entries, entry] };
    else groups.push({ label, entries: [entry] });
  });
  return groups;
};

const MONTHS_PER_YEAR = 12;

const ageText = (months: number): string => {
  const years = Math.floor(months / MONTHS_PER_YEAR);
  const rest = months % MONTHS_PER_YEAR;
  if (years === 0) return `${rest} сар`;
  return rest === 0 ? `${years} нас` : `${years} нас ${rest} сар`;
};

/** Мөрийн тайлбар: «Ор 3 · 12.5 кг · 8 сар» (шошго байвал). */
export const summaryOf = (entry: HistoryEntry): string =>
  [entry.label, `${entry.weightKg} кг`, ageText(entry.ageMonths)].filter(Boolean).join(" · ");

/** Өвчтөний түлхүүр: шошго, байхгүй бол «12.5 кг · 8 сар». Нэг өвчтөний мөрүүдийг шүүхэд. */
export const patientKeyOf = (entry: HistoryEntry): string =>
  entry.label || `${entry.weightKg} кг · ${ageText(entry.ageMonths)}`;

export interface PatientCount {
  readonly key: string;
  readonly count: number;
}

export const patientsOf = (entries: readonly HistoryEntry[]): readonly PatientCount[] => {
  const counts = new Map<string, number>();
  entries.forEach((entry) => counts.set(patientKeyOf(entry), (counts.get(patientKeyOf(entry)) ?? 0) + 1));
  return [...counts].map(([key, count]) => ({ key, count }));
};

export interface HistoryFilter {
  readonly query: string;
  readonly patientKey?: string;
}

const matchesQuery = (entry: HistoryEntry, query: string): boolean => {
  const drug = DRUG_BY_ID.get(entry.drugId);
  const hay = [drug?.inn, drug?.innMn, entry.label].join(" ").toLowerCase();
  return hay.includes(query.trim().toLowerCase());
};

export const filterEntries = (entries: readonly HistoryEntry[], filter: HistoryFilter): readonly HistoryEntry[] =>
  entries.filter(
    (entry) =>
      (filter.patientKey === undefined || patientKeyOf(entry) === filter.patientKey) && matchesQuery(entry, filter.query),
  );
