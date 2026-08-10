export type DrugCategory =
  | "analgesic"
  | "antibiotic"
  | "antihistamine"
  | "corticosteroid"
  | "antiemetic"
  | "gi"
  | "respiratory"
  | "antifungal"
  | "antiviral"
  | "diuretic"
  | "cns"
  | "iron"
  | "antiparasitic"
  | "antitb"
  | "mucolytic"
  | "antihypertensive"
  | "anticonvulsant"
  | "vitamin";

export type Frequency =
  | "once"
  | "bid"
  | "tid"
  | "qid"
  | "q4h"
  | "q6h"
  | "q8h"
  | "q12h"
  | "q4_6h"
  | "q6_8h"
  | "q8_12h"
  | "special";

export type RouteOfAdministration = "oral" | "iv_im" | "oral_iv";

export interface SyrupFormulation {
  type: "syrup";
  concentrationMgPerMl: number;
  displayLabel: string;
}

export interface TabletFormulation {
  type: "tablet";
  strengthMg: number;
  displayLabel: string;
}

export interface NoFormulationHelper {
  type: "none";
}

export type Formulation =
  | SyrupFormulation
  | TabletFormulation
  | NoFormulationHelper;

export interface PerKgDrug {
  kind: "per_kg";
  id: string;
  name: string;
  category: DrugCategory;
  minAgeMo: number;
  dosePerKgMg: number;
  dosePerKgMinMg?: number;
  dosePerKgMaxMg?: number;
  maxDosePerAdministrationMg: number;
  maxDailyDoseMg?: number;
  frequency: Frequency;
  frequencyPerDay: number;
  route: RouteOfAdministration;
  formulationOptions: Formulation[];
  warnings: string[];
  notes?: string;
}

export interface DailyTotalDrug {
  kind: "daily_total";
  id: string;
  name: string;
  category: DrugCategory;
  minAgeMo: number;
  dailyDosePerKgMg: number;
  dailyDosePerKgMinMg?: number;
  dailyDosePerKgMaxMg?: number;
  frequency: Frequency;
  frequencyPerDay: number;
  maxDosePerAdministrationMg: number;
  maxDailyDoseMg?: number;
  route: RouteOfAdministration;
  formulationOptions: Formulation[];
  warnings: string[];
  notes?: string;
}

export interface FixedDoseBracket {
  minWeightKg: number;
  maxWeightKg: number;
  dosePerAdministrationMg: number;
}

export interface FixedDoseDrug {
  kind: "fixed";
  id: string;
  name: string;
  category: DrugCategory;
  minAgeMo: number;
  brackets: FixedDoseBracket[];
  frequency: Frequency;
  frequencyPerDay: number;
  durationDays?: number;
  route: RouteOfAdministration;
  formulationOptions: Formulation[];
  warnings: string[];
  notes?: string;
}

export type Drug = PerKgDrug | DailyTotalDrug | FixedDoseDrug;

export const CATEGORY_LABELS: Record<DrugCategory, string> = {
  analgesic: "Өвдөлт намдаагч",
  antibiotic: "Антибиотик",
  antihistamine: "Антигистамин",
  corticosteroid: "Кортикостероид",
  antiemetic: "Бөөлжилт намдаах",
  gi: "Ходоод гэдэс",
  respiratory: "Амьсгалын зам",
  antifungal: "Мөөгөнцрийн эсрэг",
  antiviral: "Вирусын эсрэг",
  diuretic: "Шээс хөөх",
  cns: "Мэдрэлийн систем",
  iron: "Төмрийн нэмэлт",
  antiparasitic: "Шимэгчийн эсрэг",
  antitb: "Сүрьеэгийн эсрэг",
  mucolytic: "Цэр наниартах",
  antihypertensive: "Цусны даралт",
  anticonvulsant: "Таталтын эсрэг",
  vitamin: "Витамин ба нэмэлт",
};

export const FREQUENCY_LABELS: Record<Frequency, string> = {
  once: "өдөрт 1 удаа",
  bid: "өдөрт 2 удаа (12 цаг тутам)",
  tid: "өдөрт 3 удаа (8 цаг тутам)",
  qid: "өдөрт 4 удаа (6 цаг тутам)",
  q4h: "4 цаг тутам (өдөрт 6 удаа)",
  q6h: "6 цаг тутам (өдөрт 4 удаа)",
  q8h: "8 цаг тутам (өдөрт 3 удаа)",
  q12h: "12 цаг тутам (өдөрт 2 удаа)",
  q4_6h: "4–6 цаг тутам",
  q6_8h: "6–8 цаг тутам",
  q8_12h: "8–12 цаг тутам",
  special: "тусгай хуваарь",
};

export const ROUTE_LABELS: Record<RouteOfAdministration, string> = {
  oral: "Амаар",
  iv_im: "Судсаар / Булчинд (IV/IM)",
  oral_iv: "Амаар эсвэл судсаар",
};

export const DRUGS: Drug[] = [
  // ── Analgesics ──────────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "paracetamol",
    name: "Paracetamol",
    category: "analgesic",
    minAgeMo: 0,
    dosePerKgMinMg: 10,
    dosePerKgMaxMg: 15,
    dosePerKgMg: 15,
    maxDosePerAdministrationMg: 1000,
    maxDailyDoseMg: 4000,
    frequency: "q4_6h",
    frequencyPerDay: 4,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 24,
        displayLabel: "120mg/5ml уусмал",
      },
      {
        type: "syrup",
        concentrationMgPerMl: 50,
        displayLabel: "250mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 500, displayLabel: "500mg таблет" },
    ],
    warnings: [],
    notes: "Хоолны дараа уух. Нярай (0–3 сар): 10 мг/кг тун ашиглана.",
  },
  {
    kind: "per_kg",
    id: "ibuprofen",
    name: "Ibuprofen",
    category: "analgesic",
    minAgeMo: 3,
    dosePerKgMinMg: 5,
    dosePerKgMaxMg: 10,
    dosePerKgMg: 10,
    maxDosePerAdministrationMg: 400,
    maxDailyDoseMg: 2400,
    frequency: "q6_8h",
    frequencyPerDay: 3,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 20,
        displayLabel: "100mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 200, displayLabel: "200mg таблет" },
      { type: "tablet", strengthMg: 400, displayLabel: "400mg таблет" },
    ],
    warnings: [
      "Бөөрний дутагдал, хэвлийн шархлаа, цусны бүлэгнэлтийн эмгэгтэй өвчтөнд болгоомжтой хэрэглэх.",
      "3 сараас доош нас — хориглоно.",
    ],
    notes:
      "Хооллох үед эсвэл хоолны дараа уух. Хангалттай хэмжээний шингэнээр даруулж ууна.",
  },

  // ── Antibiotics ─────────────────────────────────────────────────────────
  {
    kind: "daily_total",
    id: "amoxicillin",
    name: "Amoxicillin",
    category: "antibiotic",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 40,
    dailyDosePerKgMaxMg: 90,
    dailyDosePerKgMg: 45,
    frequency: "tid",
    frequencyPerDay: 3,
    maxDosePerAdministrationMg: 1000,
    maxDailyDoseMg: 3000,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 25,
        displayLabel: "125mg/5ml уусмал",
      },
      {
        type: "syrup",
        concentrationMgPerMl: 50,
        displayLabel: "250mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 500, displayLabel: "500mg капсул/таблет" },
    ],
    warnings: [],
    notes:
      "Ердийн халдвар: 40–45 мг/кг/өдөр; хүнд (пневмони, дунд чихний үрэвсэл): 80–90 мг/кг/өдөр.",
  },
  {
    kind: "daily_total",
    id: "amoxicillin-clavulanate",
    name: "Amoxicillin-clavulanate",
    category: "antibiotic",
    minAgeMo: 3,
    dailyDosePerKgMinMg: 40,
    dailyDosePerKgMaxMg: 90,
    dailyDosePerKgMg: 45,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 875,
    maxDailyDoseMg: 1750,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 25,
        displayLabel: "125/31.25mg per 5ml уусмал",
      },
      { type: "tablet", strengthMg: 500, displayLabel: "500/125mg таблет" },
      { type: "tablet", strengthMg: 875, displayLabel: "875/125mg таблет" },
    ],
    warnings: ["Тун нь amoxicillin бүрэлдэхүүний хэмжээгээр тооцогдоно."],
    notes: "2 удаа уух горимыг ашиглана (clavulanate-ийн хүлцэл сайн).",
  },
  {
    kind: "per_kg",
    id: "azithromycin",
    name: "Azithromycin",
    category: "antibiotic",
    minAgeMo: 6,
    dosePerKgMg: 10,
    maxDosePerAdministrationMg: 500,
    maxDailyDoseMg: 500,
    frequency: "once",
    frequencyPerDay: 1,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 40,
        displayLabel: "200mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 250, displayLabel: "250mg таблет" },
      { type: "tablet", strengthMg: 500, displayLabel: "500mg таблет" },
    ],
    warnings: [],
    notes:
      "3 хоногийн курс (10мг/кг/өдөр × 3). Хоолноос 1 цагийн өмнө эсвэл 2 цагийн дараа уух.",
  },
  {
    kind: "daily_total",
    id: "clarithromycin",
    name: "Clarithromycin",
    category: "antibiotic",
    minAgeMo: 6,
    dailyDosePerKgMg: 15,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 500,
    maxDailyDoseMg: 1000,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 25,
        displayLabel: "125mg/5ml уусмал",
      },
      {
        type: "syrup",
        concentrationMgPerMl: 50,
        displayLabel: "250mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 250, displayLabel: "250mg таблет" },
      { type: "tablet", strengthMg: 500, displayLabel: "500mg таблет" },
    ],
    warnings: [],
  },
  {
    kind: "daily_total",
    id: "cephalexin",
    name: "Cephalexin",
    category: "antibiotic",
    minAgeMo: 1,
    dailyDosePerKgMinMg: 25,
    dailyDosePerKgMaxMg: 50,
    dailyDosePerKgMg: 25,
    frequency: "qid",
    frequencyPerDay: 4,
    maxDosePerAdministrationMg: 500,
    maxDailyDoseMg: 4000,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 25,
        displayLabel: "125mg/5ml уусмал",
      },
      {
        type: "syrup",
        concentrationMgPerMl: 50,
        displayLabel: "250mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 250, displayLabel: "250mg капсул" },
      { type: "tablet", strengthMg: 500, displayLabel: "500mg капсул" },
    ],
    warnings: [],
    notes: "Хүнд халдварт 50 мг/кг/өдөр хүртэл нэмж болно.",
  },
  {
    kind: "daily_total",
    id: "metronidazole",
    name: "Metronidazole",
    category: "antibiotic",
    minAgeMo: 1,
    dailyDosePerKgMinMg: 30,
    dailyDosePerKgMaxMg: 50,
    dailyDosePerKgMg: 30,
    frequency: "tid",
    frequencyPerDay: 3,
    maxDosePerAdministrationMg: 500,
    maxDailyDoseMg: 1500,
    route: "oral_iv",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 40,
        displayLabel: "200mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 200, displayLabel: "200mg таблет" },
      { type: "tablet", strengthMg: 400, displayLabel: "400mg таблет" },
    ],
    warnings: ["Архи хэрэглэхийг хориглоно (дисульфирам хэлбэрийн урвал)."],
    notes: "Анаэроб халдвар, Giardia, Trichomonas, амёбиазид хэрэглэнэ.",
  },
  {
    kind: "per_kg",
    id: "ciprofloxacin",
    name: "Ciprofloxacin",
    category: "antibiotic",
    minAgeMo: 12,
    dosePerKgMinMg: 10,
    dosePerKgMaxMg: 15,
    dosePerKgMg: 10,
    maxDosePerAdministrationMg: 500,
    maxDailyDoseMg: 1500,
    frequency: "bid",
    frequencyPerDay: 2,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 250, displayLabel: "250mg таблет" },
      { type: "tablet", strengthMg: 500, displayLabel: "500mg таблет" },
    ],
    warnings: [
      "Ясны мөгөөрс гэмтэх эрсдэл байгаа тул хүүхдэд зөвхөн шаардлагатай тохиолдолд хэрэглэнэ.",
      "Хиазмарт: антацид, цайр, төмөр бүхий бэлдмэлтэй зэрэг уухгүй.",
    ],
    notes:
      "ОТТ-ийн халдвар, гастроэнтерит, амьсгалын замын халдварт тохиромжтой.",
  },
  {
    kind: "per_kg",
    id: "gentamicin",
    name: "Gentamicin",
    category: "antibiotic",
    minAgeMo: 0,
    dosePerKgMg: 5,
    maxDosePerAdministrationMg: 160,
    maxDailyDoseMg: 320,
    frequency: "once",
    frequencyPerDay: 1,
    route: "iv_im",
    formulationOptions: [{ type: "none" }],
    warnings: [
      "Чихний мэдрэлийн гэмтэл (ototoxicity) болон бөөрний гэмтлийн (nephrotoxicity) эрсдэлтэй.",
      "Бөөрний үйл ажиллагаа, сонсгол шалгах шаардлагатай.",
      "Урт хугацааны эмчилгээнд цусан дахь түвшин хэмжих шаардлагатай (TDM).",
    ],
    notes:
      "Нярайд (0–1 сар): 2.5–3 мг/кг 12 цаг тутам. Нас гүйцсэнд: өдөрт нэг удаа 5–7 мг/кг.",
  },
  {
    kind: "per_kg",
    id: "ceftriaxone",
    name: "Ceftriaxone",
    category: "antibiotic",
    minAgeMo: 0,
    dosePerKgMinMg: 50,
    dosePerKgMaxMg: 100,
    dosePerKgMg: 50,
    maxDosePerAdministrationMg: 4000,
    maxDailyDoseMg: 4000,
    frequency: "once",
    frequencyPerDay: 1,
    route: "iv_im",
    formulationOptions: [{ type: "none" }],
    warnings: [
      "Нярайд (≤28 хоног) кальцийн уусмалтай хамт хэрэглэж болохгүй — цефтриаксон-кальцийн тунадас.",
      "Гипербилирубинемитэй нярайд болгоомжтой — альбуминаас билирубиныг шахдаг.",
    ],
    notes:
      "Менингитд: 100 мг/кг/өдөр (макс 4г). Ердийн халдварт: 50 мг/кг/өдөр.",
  },

  // ── Antihistamines ───────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "cetirizine",
    name: "Cetirizine",
    category: "antihistamine",
    minAgeMo: 6,
    dosePerKgMg: 0.25,
    maxDosePerAdministrationMg: 10,
    maxDailyDoseMg: 10,
    frequency: "once",
    frequencyPerDay: 1,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 1,
        displayLabel: "5mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
    ],
    warnings: [],
    notes:
      "6–12 сар: 2.5мг өдөрт нэг удаа. 1–6 нас: 2.5мг 2 удаа эсвэл 5мг нэг удаа.",
  },
  {
    kind: "daily_total",
    id: "loratadine",
    name: "Loratadine",
    category: "antihistamine",
    minAgeMo: 24,
    dailyDosePerKgMg: 0.2,
    frequency: "once",
    frequencyPerDay: 1,
    maxDosePerAdministrationMg: 10,
    maxDailyDoseMg: 10,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 1,
        displayLabel: "5mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
    ],
    warnings: [],
    notes: "<30кг: 5мг/өдөр; ≥30кг: 10мг/өдөр.",
  },
  {
    kind: "per_kg",
    id: "diphenhydramine",
    name: "Diphenhydramine",
    category: "antihistamine",
    minAgeMo: 24,
    dosePerKgMg: 1.25,
    maxDosePerAdministrationMg: 50,
    maxDailyDoseMg: 300,
    frequency: "q6h",
    frequencyPerDay: 4,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 2.5,
        displayLabel: "12.5mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 25, displayLabel: "25mg таблет" },
      { type: "tablet", strengthMg: 50, displayLabel: "50mg таблет" },
    ],
    warnings: [
      "Тайвшруулах нөлөөтэй — машин жолоодох үед болгоомжтой хэрэглэх.",
      "2 нас хүрээгүй хүүхдэд хэрэглэж болохгүй.",
    ],
  },

  // ── Corticosteroids ──────────────────────────────────────────────────────
  {
    kind: "daily_total",
    id: "prednisolone",
    name: "Prednisolone",
    category: "corticosteroid",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 1,
    dailyDosePerKgMaxMg: 2,
    dailyDosePerKgMg: 1,
    frequency: "once",
    frequencyPerDay: 1,
    maxDosePerAdministrationMg: 60,
    maxDailyDoseMg: 60,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 1,
        displayLabel: "5mg/5ml уусмал",
      },
      {
        type: "syrup",
        concentrationMgPerMl: 3,
        displayLabel: "15mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 5, displayLabel: "5mg таблет" },
      { type: "tablet", strengthMg: 25, displayLabel: "25mg таблет" },
    ],
    warnings: [
      "Урт хугацаагаар хэрэглэхэд аажим тунг бууруулан зогсооно.",
      "Цусны чихрийн хэмжээ, цусны даралт хянах шаардлагатай.",
    ],
    notes: "Өглөө хоолтой хамт уух. Хурц астма: 1–2 мг/кг/өдөр 3–5 хоног.",
  },
  {
    kind: "per_kg",
    id: "dexamethasone",
    name: "Dexamethasone",
    category: "corticosteroid",
    minAgeMo: 0,
    dosePerKgMinMg: 0.15,
    dosePerKgMaxMg: 0.6,
    dosePerKgMg: 0.15,
    maxDosePerAdministrationMg: 16,
    maxDailyDoseMg: 16,
    frequency: "once",
    frequencyPerDay: 1,
    route: "oral_iv",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 0.4,
        displayLabel: "2mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 0.5, displayLabel: "0.5mg таблет" },
      { type: "tablet", strengthMg: 4, displayLabel: "4mg таблет" },
    ],
    warnings: ["Prednisolone-оос 6–7 дахин хүчтэй — тунд анхаарна."],
    notes:
      "Крупп: 0.15–0.6 мг/кг нэг тун. Тархины хаван: 0.25–0.5 мг/кг/өдөр ÷ 6 цаг тутам.",
  },
  {
    kind: "daily_total",
    id: "methylprednisolone",
    name: "Methylprednisolone",
    category: "corticosteroid",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 1,
    dailyDosePerKgMaxMg: 2,
    dailyDosePerKgMg: 1,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 500,
    maxDailyDoseMg: 1000,
    route: "oral_iv",
    formulationOptions: [
      { type: "tablet", strengthMg: 4, displayLabel: "4mg таблет" },
      { type: "tablet", strengthMg: 16, displayLabel: "16mg таблет" },
    ],
    warnings: [
      "Пульс-эмчилгээнд: 10–30 мг/кг/өдөр IV (макс 1г) — эмнэлгийн тохиргоонд хэрэглэнэ.",
    ],
  },

  // ── Antiemetics ──────────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "ondansetron",
    name: "Ondansetron",
    category: "antiemetic",
    minAgeMo: 6,
    dosePerKgMg: 0.15,
    maxDosePerAdministrationMg: 8,
    maxDailyDoseMg: 24,
    frequency: "q8h",
    frequencyPerDay: 3,
    route: "oral_iv",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 0.8,
        displayLabel: "4mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 4, displayLabel: "4mg таблет" },
      { type: "tablet", strengthMg: 8, displayLabel: "8mg таблет" },
    ],
    warnings: [
      "QT интервал уртасгах эрсдэлтэй — зүрхний эмгэгтэй өвчтөнд болгоомжтой.",
    ],
  },
  {
    kind: "per_kg",
    id: "domperidone",
    name: "Domperidone",
    category: "antiemetic",
    minAgeMo: 1,
    dosePerKgMg: 0.25,
    maxDosePerAdministrationMg: 10,
    maxDailyDoseMg: 30,
    frequency: "tid",
    frequencyPerDay: 3,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 1,
        displayLabel: "5mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
    ],
    warnings: [
      "Өдөрт нийт тун 0.75 мг/кг/өдөр-ийг хэтрүүлэхгүй байх (жингийн дагуу хязгаар).",
      "QT интервал уртасгах эрсдэлтэй. Урт хугацаагаар хэрэглэхгүй.",
    ],
    notes:
      "Хоолны 15–30 минутын өмнө уух. Эмчилгээний курс ≤1 долоо хоног байхыг зөвлөдөг.",
  },
  {
    kind: "per_kg",
    id: "metoclopramide",
    name: "Metoclopramide",
    category: "antiemetic",
    minAgeMo: 12,
    dosePerKgMg: 0.15,
    maxDosePerAdministrationMg: 10,
    maxDailyDoseMg: 30,
    frequency: "tid",
    frequencyPerDay: 3,
    route: "oral_iv",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 1,
        displayLabel: "5mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
    ],
    warnings: [
      "Экстрапирамидын урвал (дистони, акатизи) — хүүхэд, залуу насанд хамгийн их эрсдэлтэй.",
      "5 мг/кг/өдөр-ийг хэтрүүлэхгүй. Богино курсоор (≤5 хоног) хэрэглэх.",
    ],
  },

  // ── GI ───────────────────────────────────────────────────────────────────
  {
    kind: "daily_total",
    id: "omeprazole",
    name: "Omeprazole",
    category: "gi",
    minAgeMo: 12,
    dailyDosePerKgMinMg: 0.7,
    dailyDosePerKgMaxMg: 3.5,
    dailyDosePerKgMg: 1,
    frequency: "once",
    frequencyPerDay: 1,
    maxDosePerAdministrationMg: 40,
    maxDailyDoseMg: 40,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 10, displayLabel: "10mg капсул" },
      { type: "tablet", strengthMg: 20, displayLabel: "20mg капсул" },
      { type: "tablet", strengthMg: 40, displayLabel: "40mg капсул" },
    ],
    warnings: [],
    notes:
      "Хоолны 30–60 минутын өмнө уух. ГЭРББ-д: 0.7–1 мг/кг. Хэрэгцээтэй бол 2 удаа хуваан уух.",
  },

  // ── Respiratory ──────────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "salbutamol",
    name: "Salbutamol",
    category: "respiratory",
    minAgeMo: 24,
    dosePerKgMinMg: 0.1,
    dosePerKgMaxMg: 0.15,
    dosePerKgMg: 0.1,
    maxDosePerAdministrationMg: 4,
    maxDailyDoseMg: 32,
    frequency: "tid",
    frequencyPerDay: 3,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 0.4,
        displayLabel: "2mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 2, displayLabel: "2mg таблет" },
      { type: "tablet", strengthMg: 4, displayLabel: "4mg таблет" },
    ],
    warnings: [
      "Амаар уух хэлбэр — инхалятортай харьцуулахад нөлөөлөл бага, гаж нөлөө их.",
      "Сэтгэл хөдлөл, чичиргэнэ, зүрхний цохилт ихсэх боломжтой.",
    ],
    notes: "Инхалятор (MDI/небулайзер) боломжтой бол тэр нь илүүд үздэг.",
  },

  // ── Antifungal ───────────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "fluconazole",
    name: "Fluconazole",
    category: "antifungal",
    minAgeMo: 6,
    dosePerKgMinMg: 3,
    dosePerKgMaxMg: 12,
    dosePerKgMg: 6,
    maxDosePerAdministrationMg: 400,
    maxDailyDoseMg: 400,
    frequency: "once",
    frequencyPerDay: 1,
    route: "oral_iv",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 10,
        displayLabel: "50mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 50, displayLabel: "50mg таблет" },
      { type: "tablet", strengthMg: 150, displayLabel: "150mg таблет" },
      { type: "tablet", strengthMg: 200, displayLabel: "200mg таблет" },
    ],
    warnings: ["Элэгний гэмтлийн эрсдэл — урт курст элэгний шинжилгээ хянах."],
    notes:
      "Кандидоз: 6 мг/кг. Криптококк менингит: 12 мг/кг. Хэвлийн кандидоз: 6–12 мг/кг.",
  },

  // ── Antiviral ────────────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "aciclovir",
    name: "Aciclovir",
    category: "antiviral",
    minAgeMo: 3,
    dosePerKgMg: 20,
    maxDosePerAdministrationMg: 800,
    maxDailyDoseMg: 4000,
    frequency: "qid",
    frequencyPerDay: 4,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 40,
        displayLabel: "200mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 200, displayLabel: "200mg таблет" },
      { type: "tablet", strengthMg: 400, displayLabel: "400mg таблет" },
    ],
    warnings: ["Ус ихээр уулгах — бөөрний чулуу үүсэх магадлалыг бууруулна."],
    notes:
      "Варицелла (салхин цэцэг): 20 мг/кг 4 удаа × 5 хоног. Герпес симплекс: 5 удаа/өдөр хэрэглэх болно.",
  },

  // ── Diuretic ─────────────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "furosemide",
    name: "Furosemide",
    category: "diuretic",
    minAgeMo: 0,
    dosePerKgMinMg: 1,
    dosePerKgMaxMg: 2,
    dosePerKgMg: 1,
    maxDosePerAdministrationMg: 80,
    maxDailyDoseMg: 600,
    frequency: "bid",
    frequencyPerDay: 2,
    route: "oral_iv",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 8,
        displayLabel: "40mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 20, displayLabel: "20mg таблет" },
      { type: "tablet", strengthMg: 40, displayLabel: "40mg таблет" },
    ],
    warnings: [
      "Цусны кали, натри, шингэний тэнцвэрийг хянах.",
      "Чихрийн шижингийн эм, аминогликозидтай харилцан нөлөөлөл байна.",
    ],
  },

  // ── CNS ──────────────────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "diazepam",
    name: "Diazepam",
    category: "cns",
    minAgeMo: 6,
    dosePerKgMinMg: 0.1,
    dosePerKgMaxMg: 0.3,
    dosePerKgMg: 0.1,
    maxDosePerAdministrationMg: 10,
    maxDailyDoseMg: 30,
    frequency: "tid",
    frequencyPerDay: 3,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 0.4,
        displayLabel: "2mg/5ml уусмал",
      },
      { type: "tablet", strengthMg: 2, displayLabel: "2mg таблет" },
      { type: "tablet", strengthMg: 5, displayLabel: "5mg таблет" },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
    ],
    warnings: [
      "Амьсгал боогдуулах аюул — тун хэтрүүлэхэд амьсгалын дарангуйлал.",
      "Хамааралт байдал (dependence) үүсэх эрсдэлтэй тул урт хугацааны хэрэглэлт хориглоно.",
      "Машин жолоодох, аюултай үйл ажиллагаанаас зайлсхийх.",
    ],
    notes:
      "Таталтын яаралтай тусламж: 0.3–0.5 мг/кг аарцгаар (rectally) эсвэл 0.2–0.3 мг/кг IV.",
  },
  {
    kind: "per_kg",
    id: "tramadol",
    name: "Tramadol",
    category: "cns",
    minAgeMo: 144,
    dosePerKgMinMg: 1,
    dosePerKgMaxMg: 2,
    dosePerKgMg: 1,
    maxDosePerAdministrationMg: 100,
    maxDailyDoseMg: 400,
    frequency: "q4_6h",
    frequencyPerDay: 4,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 50, displayLabel: "50mg таблет" },
      { type: "tablet", strengthMg: 100, displayLabel: "100mg капсул (SR)" },
    ],
    warnings: [
      "12 наснаас доош хүүхдэд ХЭРЭГЛЭХИЙГ ХОРИГЛОНО.",
      "Опиоидын гаж нөлөө: дотор муухайрах, өтгөн хатах, тайвшруулах нөлөө.",
      "Таталт өдөөх боломжтой — таталтын өвчтэй болгоомжтой.",
      "CYP2D6 ultra-metabolizer — хэт хурдан метаболизмтай өвчтөнд аюултай.",
    ],
  },

  // ── Iron ─────────────────────────────────────────────────────────────────
  {
    kind: "daily_total",
    id: "ferrous-sulfate",
    name: "Ferrous sulfate (элементар төмөр)",
    category: "iron",
    minAgeMo: 4,
    dailyDosePerKgMinMg: 3,
    dailyDosePerKgMaxMg: 6,
    dailyDosePerKgMg: 3,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 60,
    maxDailyDoseMg: 120,
    route: "oral",
    formulationOptions: [
      {
        type: "syrup",
        concentrationMgPerMl: 5,
        displayLabel: "25mg/5ml уусмал (элементар)",
      },
      {
        type: "tablet",
        strengthMg: 65,
        displayLabel: "200mg FeSO₄ = 65mg элементар таблет",
      },
    ],
    warnings: [
      "Тун нь ЭЛЕМЕНТАР ТӨМРӨӨР тооцогдоно. Ferrous sulfate 200mg = ~65mg элементар төмөр.",
      "Шүдийг өнгөрүүлж болно — шингэн хэлбэрийг соргоор уулгах.",
      "Антацид, тетрациклин, ципрофлоксациныг хамт хэрэглэхгүй.",
    ],
    notes:
      "Хоолны дундуур уух (гаж нөлөөг бууруулна). С аминдэм хамт уух нь шингэлтийг сайжруулна.",
  },

  // ── Antiparasitics ───────────────────────────────────────────────────────
  {
    kind: "fixed",
    id: "albendazole",
    name: "Albendazole",
    category: "antiparasitic",
    minAgeMo: 24,
    brackets: [
      { minWeightKg: 0, maxWeightKg: 20, dosePerAdministrationMg: 200 },
      { minWeightKg: 20, maxWeightKg: Infinity, dosePerAdministrationMg: 400 },
    ],
    frequency: "once",
    frequencyPerDay: 1,
    durationDays: 1,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 200, displayLabel: "200mg таблет" },
      { type: "tablet", strengthMg: 400, displayLabel: "400mg таблет" },
    ],
    warnings: [],
    notes:
      "Нэг удаагийн тун. Хоолтой хамт эсвэл дараа уух. Эхийн хэвлийд: хэрэглэхгүй.",
  },
  {
    kind: "fixed",
    id: "mebendazole",
    name: "Mebendazole",
    category: "antiparasitic",
    minAgeMo: 24,
    brackets: [
      { minWeightKg: 0, maxWeightKg: Infinity, dosePerAdministrationMg: 100 },
    ],
    frequency: "bid",
    frequencyPerDay: 2,
    durationDays: 3,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 100, displayLabel: "100mg таблет" },
      {
        type: "syrup",
        concentrationMgPerMl: 20,
        displayLabel: "100mg/5ml уусмал",
      },
    ],
    warnings: [],
    notes:
      "Жингээс үл хамаарсан тогтмол тун. 3 хоногийн курс. Enterobius-д: нэг тун 100мг, 2 долоо хоногийн дараа давтана.",
  },

  // ── Antibiotics (additional) ─────────────────────────────────────────────
  {
    kind: "daily_total",
    id: "erythromycin",
    name: "Erythromycin",
    category: "antibiotic",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 30,
    dailyDosePerKgMaxMg: 50,
    dailyDosePerKgMg: 30,
    frequency: "qid",
    frequencyPerDay: 4,
    maxDosePerAdministrationMg: 500,
    maxDailyDoseMg: 2000,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 40, displayLabel: "200mg/5ml уусмал" },
      { type: "tablet", strengthMg: 250, displayLabel: "250mg таблет" },
      { type: "tablet", strengthMg: 500, displayLabel: "500mg таблет" },
    ],
    warnings: ["Ходоодны дотроос тайтгаруулах нөлөөтэй — хоолтой хамт уух."],
    notes: "Azithromycin, clarithromycin-тэй харьцуулахад ходоодны гаж нөлөө их. QT интервал уртасгах эрсдэлтэй.",
  },
  {
    kind: "daily_total",
    id: "doxycycline",
    name: "Doxycycline",
    category: "antibiotic",
    minAgeMo: 96,
    dailyDosePerKgMinMg: 2,
    dailyDosePerKgMaxMg: 4,
    dailyDosePerKgMg: 2,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 100,
    maxDailyDoseMg: 200,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 50, displayLabel: "50mg таблет" },
      { type: "tablet", strengthMg: 100, displayLabel: "100mg таблет" },
    ],
    warnings: [
      "8 наснаас доош хүүхдэд ХОРИГЛОНО — шүдний өнгийн өөрчлөлт, ясны хөгжлийн саатал.",
      "Нарны гэрэлд мэдрэмтгий болдог — гэрлийн хамгаалалт хэрэглэх.",
    ],
    notes: "Хоолтой хамт, их хэмжээний усаар уух. Антацид, цайр, кальцийн эмтэй зэрэг уухгүй.",
  },
  {
    kind: "daily_total",
    id: "nitrofurantoin",
    name: "Nitrofurantoin",
    category: "antibiotic",
    minAgeMo: 3,
    dailyDosePerKgMinMg: 5,
    dailyDosePerKgMaxMg: 7,
    dailyDosePerKgMg: 5,
    frequency: "qid",
    frequencyPerDay: 4,
    maxDosePerAdministrationMg: 100,
    maxDailyDoseMg: 400,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 50, displayLabel: "50mg таблет" },
      { type: "tablet", strengthMg: 100, displayLabel: "100mg таблет" },
    ],
    warnings: [
      "Зөвхөн шээсний замын халдварт хэрэглэнэ — системийн халдварт тохирохгүй.",
      "Бөөрний дутагдалтай өвчтөнд хориглоно (GFR < 45 мл/мин).",
    ],
    notes: "Хоолтой хамт уух. Шээсийг шар-улбар өнгөтэй болгоно — хэвийн үзэгдэл.",
  },

  // ── Anti-TB ───────────────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "isoniazid",
    name: "Isoniazid",
    category: "antitb",
    minAgeMo: 0,
    dosePerKgMg: 10,
    maxDosePerAdministrationMg: 300,
    maxDailyDoseMg: 300,
    frequency: "once",
    frequencyPerDay: 1,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 10, displayLabel: "50mg/5ml уусмал" },
      { type: "tablet", strengthMg: 100, displayLabel: "100mg таблет" },
      { type: "tablet", strengthMg: 300, displayLabel: "300mg таблет" },
    ],
    warnings: [
      "Элэгний гэмтлийн эрсдэл — элэгний шинжилгээг үе үе хянах.",
      "Захын мэдрэлийн үрэвслээс сэргийлэх зорилгоор B6 витамин (пиридоксин) хамт хэрэглэх.",
    ],
    notes: "Rifampicin-тэй хамт хэрэглэх нь стандарт горим. Хоолноос 30–60 минутын өмнө уух.",
  },
  {
    kind: "per_kg",
    id: "rifampicin",
    name: "Rifampicin",
    category: "antitb",
    minAgeMo: 0,
    dosePerKgMinMg: 10,
    dosePerKgMaxMg: 20,
    dosePerKgMg: 15,
    maxDosePerAdministrationMg: 600,
    maxDailyDoseMg: 600,
    frequency: "once",
    frequencyPerDay: 1,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 20, displayLabel: "100mg/5ml уусмал" },
      { type: "tablet", strengthMg: 150, displayLabel: "150mg капсул" },
      { type: "tablet", strengthMg: 300, displayLabel: "300mg капсул" },
      { type: "tablet", strengthMg: 450, displayLabel: "450mg капсул" },
    ],
    warnings: [
      "Шилжилтийн эм — олон тооны эмийн солилцоонд нөлөөлнө (CYP450 индуктор).",
      "Шээс, нулимс, шүлсийг улаан-улбар өнгөтэй болгоно — хэвийн үзэгдэл.",
      "Элэгний гэмтлийн эрсдэлтэй — элэгний шинжилгээ хянах.",
    ],
    notes: "Хоолноос 30 минутын өмнө буюу хоолны 2 цагийн дараа уух. Исониазидтэй хамт уух.",
  },

  // ── Mucolytics ────────────────────────────────────────────────────────────
  {
    kind: "daily_total",
    id: "ambroxol",
    name: "Ambroxol",
    category: "mucolytic",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 1.2,
    dailyDosePerKgMaxMg: 1.6,
    dailyDosePerKgMg: 1.2,
    frequency: "tid",
    frequencyPerDay: 3,
    maxDosePerAdministrationMg: 30,
    maxDailyDoseMg: 90,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 3, displayLabel: "15mg/5ml уусмал" },
      { type: "syrup", concentrationMgPerMl: 6, displayLabel: "30mg/5ml уусмал" },
      { type: "tablet", strengthMg: 30, displayLabel: "30mg таблет" },
    ],
    warnings: [],
    notes: "2 нас хүртэл: 1.2 мг/кг/өдөр 2 удаа. Хоолтой хамт уух. Хангалттай шингэн уулгах.",
  },
  {
    kind: "daily_total",
    id: "acetylcysteine",
    name: "Acetylcysteine",
    category: "mucolytic",
    minAgeMo: 24,
    dailyDosePerKgMinMg: 10,
    dailyDosePerKgMaxMg: 15,
    dailyDosePerKgMg: 10,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 300,
    maxDailyDoseMg: 600,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 100, displayLabel: "100mg гранул/эффервесцент" },
      { type: "tablet", strengthMg: 200, displayLabel: "200mg гранул" },
      { type: "tablet", strengthMg: 600, displayLabel: "600mg эффервесцент таблет" },
    ],
    warnings: [],
    notes: "Усаар уусгаж уух. Бронхоспазм өдөөж болно — астмын өвчтөнд болгоомжтой.",
  },

  // ── Vitamins & Supplements ────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "zinc-sulfate",
    name: "Zinc sulfate (элементар цайр)",
    category: "vitamin",
    minAgeMo: 0,
    dosePerKgMinMg: 1,
    dosePerKgMaxMg: 2,
    dosePerKgMg: 1,
    maxDosePerAdministrationMg: 20,
    maxDailyDoseMg: 20,
    frequency: "once",
    frequencyPerDay: 1,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 2, displayLabel: "10mg/5ml уусмал (элементар)" },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет (элементар)" },
      { type: "tablet", strengthMg: 20, displayLabel: "20mg таблет (элементар)" },
    ],
    warnings: [],
    notes: "Тун нь элементар цайрын хэмжээгээр. Zinc sulfate 220mg = 50mg элементар цайр. ОХТ-ийн суулгалтад WHO горим: <6 сар 10мг/өдөр, >6 сар 20мг/өдөр × 10–14 хоног.",
  },

  // ── GI (additional) ───────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "loperamide",
    name: "Loperamide",
    category: "gi",
    minAgeMo: 24,
    dosePerKgMg: 0.1,
    maxDosePerAdministrationMg: 2,
    maxDailyDoseMg: 8,
    frequency: "tid",
    frequencyPerDay: 3,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 0.2, displayLabel: "1mg/5ml уусмал" },
      { type: "tablet", strengthMg: 2, displayLabel: "2mg капсул/таблет" },
    ],
    warnings: [
      "2 нас хүрээгүй хүүхдэд хориглоно.",
      "Цус буюу хэмхдэс бүхий суулгалтад (халдварт колит) хэрэглэхгүй.",
      "Суулгалтын шалтгааныг эмчлэх — шинж тэмдгийг дарах дангаараа хэрэглэхгүй.",
    ],
  },
  {
    kind: "daily_total",
    id: "famotidine",
    name: "Famotidine",
    category: "gi",
    minAgeMo: 12,
    dailyDosePerKgMinMg: 0.5,
    dailyDosePerKgMaxMg: 1,
    dailyDosePerKgMg: 0.5,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 20,
    maxDailyDoseMg: 40,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
      { type: "tablet", strengthMg: 20, displayLabel: "20mg таблет" },
      { type: "tablet", strengthMg: 40, displayLabel: "40mg таблет" },
    ],
    warnings: [],
    notes: "Хоолны 30–60 минутын өмнө уух. ГЭРББ, шархлааны өвчинд хэрэглэнэ.",
  },

  // ── Anticonvulsants ───────────────────────────────────────────────────────
  {
    kind: "daily_total",
    id: "phenobarbital",
    name: "Phenobarbital",
    category: "anticonvulsant",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 3,
    dailyDosePerKgMaxMg: 5,
    dailyDosePerKgMg: 3,
    frequency: "once",
    frequencyPerDay: 1,
    maxDosePerAdministrationMg: 200,
    maxDailyDoseMg: 200,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 3, displayLabel: "15mg/5ml уусмал" },
      { type: "tablet", strengthMg: 15, displayLabel: "15mg таблет" },
      { type: "tablet", strengthMg: 30, displayLabel: "30mg таблет" },
      { type: "tablet", strengthMg: 60, displayLabel: "60mg таблет" },
    ],
    warnings: [
      "Тайвшруулах нөлөөтэй — хүүхдийн сурлагад нөлөөлнө.",
      "Гэнэтийн зогсоохыг хориглоно — тунг аажим бууруулна.",
      "CYP450 индуктор — бусад эмийн метаболизмд нөлөөлнө.",
    ],
    notes: "Нярайд эхний тун 20 мг/кг IV.",
  },
  {
    kind: "daily_total",
    id: "carbamazepine",
    name: "Carbamazepine",
    category: "anticonvulsant",
    minAgeMo: 24,
    dailyDosePerKgMinMg: 10,
    dailyDosePerKgMaxMg: 20,
    dailyDosePerKgMg: 10,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 500,
    maxDailyDoseMg: 1000,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 20, displayLabel: "100mg/5ml уусмал" },
      { type: "tablet", strengthMg: 200, displayLabel: "200mg таблет" },
      { type: "tablet", strengthMg: 400, displayLabel: "400mg CR таблет" },
    ],
    warnings: [
      "Цусны бүрэлдэхүүнийг хянах — апластик цус багадалт, лейкопени эрсдэл.",
      "Наатрийн хэмжээ буурах боломжтой — ялангуяа ахмад настанд.",
      "HLA-B*1502 генийн шинжилгээ (Азийн угсаатанд) хийсний дараа эхлэх.",
    ],
    notes: "Тунг аажмаар нэмнэ. Хоолтой хамт уух.",
  },
  {
    kind: "daily_total",
    id: "sodium-valproate",
    name: "Sodium valproate",
    category: "anticonvulsant",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 15,
    dailyDosePerKgMaxMg: 40,
    dailyDosePerKgMg: 15,
    frequency: "tid",
    frequencyPerDay: 3,
    maxDosePerAdministrationMg: 1000,
    maxDailyDoseMg: 2500,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 40, displayLabel: "200mg/5ml уусмал" },
      { type: "tablet", strengthMg: 200, displayLabel: "200mg таблет" },
      { type: "tablet", strengthMg: 500, displayLabel: "500mg таблет" },
    ],
    warnings: [
      "2 нас хүртэл ба полифармацид ЭЛЭГНИЙ ХОРДЛОГЫН ЭРСДЭЛ ОНЦ ИХ.",
      "Жирэмсний үед тератоген нөлөөтэй — найдвартай жирэмслэлтээс хамгаалах арга хэрэглэх.",
      "Элэгний шинжилгээ, цусны бүрэлдэхүүн тогтмол хянах.",
    ],
    notes: "Хоолтой хамт уух. Тунг аажим нэмэх. Серум дахь түвшин: 50–100 мкг/мл.",
  },
  {
    kind: "per_kg",
    id: "clonazepam",
    name: "Clonazepam",
    category: "anticonvulsant",
    minAgeMo: 0,
    dosePerKgMinMg: 0.01,
    dosePerKgMaxMg: 0.05,
    dosePerKgMg: 0.01,
    maxDosePerAdministrationMg: 10,
    maxDailyDoseMg: 20,
    frequency: "bid",
    frequencyPerDay: 2,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 0.1, displayLabel: "0.5mg/5ml уусмал" },
      { type: "tablet", strengthMg: 0.5, displayLabel: "0.5mg таблет" },
      { type: "tablet", strengthMg: 2, displayLabel: "2mg таблет" },
    ],
    warnings: [
      "Хамааралт байдал болон тэвчлэг (tolerance) үүсэх эрсдэлтэй.",
      "Гэнэтийн зогсоохыг хориглоно — таталт нэмэгдэх аюул.",
      "Тайвшруулах нөлөөтэй — машин жолоодохгүй.",
    ],
  },

  // ── Antihypertensives ─────────────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "captopril",
    name: "Captopril",
    category: "antihypertensive",
    minAgeMo: 0,
    dosePerKgMinMg: 0.1,
    dosePerKgMaxMg: 0.5,
    dosePerKgMg: 0.3,
    maxDosePerAdministrationMg: 25,
    maxDailyDoseMg: 150,
    frequency: "tid",
    frequencyPerDay: 3,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 6.25, displayLabel: "6.25mg таблет" },
      { type: "tablet", strengthMg: 12.5, displayLabel: "12.5mg таблет" },
      { type: "tablet", strengthMg: 25, displayLabel: "25mg таблет" },
    ],
    warnings: [
      "Цусны калий нэмэгдэх болон бөөрний үйл ажиллагаа хянах.",
      "Хуурай ханиалгыг өдөөж болно — ACE дарангуйлагчийн нийтлэг гаж нөлөө.",
      "Жирэмсэнд хориглоно.",
    ],
    notes: "Хоолноос 1 цагийн өмнө уух. Нярайд эхлэх тун 0.1 мг/кг.",
  },
  {
    kind: "daily_total",
    id: "propranolol",
    name: "Propranolol",
    category: "antihypertensive",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 0.5,
    dailyDosePerKgMaxMg: 1,
    dailyDosePerKgMg: 0.5,
    frequency: "tid",
    frequencyPerDay: 3,
    maxDosePerAdministrationMg: 80,
    maxDailyDoseMg: 160,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 1, displayLabel: "5mg/5ml уусмал" },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
      { type: "tablet", strengthMg: 40, displayLabel: "40mg таблет" },
    ],
    warnings: [
      "Астма, бронхоспазм, хэрэгжилттэй хориглоно.",
      "Гэнэтийн зогсоохыг хориглоно — зүрхний тахикарди нэмэгдэх аюул.",
      "Бага насны хүүхдэд гипогликеми үүсгэж болно.",
    ],
    notes: "Зүрхний сул дорой байдал, цусны даралт, тиротоксикоз, гемангиомад хэрэглэнэ.",
  },
  {
    kind: "per_kg",
    id: "enalapril",
    name: "Enalapril",
    category: "antihypertensive",
    minAgeMo: 1,
    dosePerKgMinMg: 0.08,
    dosePerKgMaxMg: 0.5,
    dosePerKgMg: 0.1,
    maxDosePerAdministrationMg: 40,
    maxDailyDoseMg: 40,
    frequency: "once",
    frequencyPerDay: 1,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 2.5, displayLabel: "2.5mg таблет" },
      { type: "tablet", strengthMg: 5, displayLabel: "5mg таблет" },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
      { type: "tablet", strengthMg: 20, displayLabel: "20mg таблет" },
    ],
    warnings: [
      "Бөөрний үйл ажиллагаа, цусны калий хянах.",
      "Жирэмсэнд хориглоно.",
      "Ангиоэдем — ховор боловч аюултай.",
    ],
    notes: "Эхлэх тун 0.08–0.1 мг/кг. Тунг аажим нэмж болно.",
  },

  // ── Diuretic (additional) ─────────────────────────────────────────────────
  {
    kind: "daily_total",
    id: "spironolactone",
    name: "Spironolactone",
    category: "diuretic",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 1,
    dailyDosePerKgMaxMg: 3,
    dailyDosePerKgMg: 1,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 50,
    maxDailyDoseMg: 100,
    route: "oral",
    formulationOptions: [
      { type: "tablet", strengthMg: 25, displayLabel: "25mg таблет" },
      { type: "tablet", strengthMg: 50, displayLabel: "50mg таблет" },
      { type: "tablet", strengthMg: 100, displayLabel: "100mg таблет" },
    ],
    warnings: [
      "Цусны калий нэмэгдэх (гиперкалиеми) — ACE дарангуйлагч, ARB-тэй хамт болгоомжтой.",
      "Калийн хоол хүнс (банана, улаан лооль) хязгаарлах.",
    ],
    notes: "Фурасемидтэй хамт хэрэглэхэд калийг хэмнэнэ. Хоолтой хамт уух.",
  },

  // ── Corticosteroid (additional) ───────────────────────────────────────────
  {
    kind: "daily_total",
    id: "hydrocortisone",
    name: "Hydrocortisone",
    category: "corticosteroid",
    minAgeMo: 0,
    dailyDosePerKgMinMg: 5,
    dailyDosePerKgMaxMg: 10,
    dailyDosePerKgMg: 5,
    frequency: "bid",
    frequencyPerDay: 2,
    maxDosePerAdministrationMg: 200,
    maxDailyDoseMg: 400,
    route: "oral_iv",
    formulationOptions: [
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
      { type: "tablet", strengthMg: 20, displayLabel: "20mg таблет" },
    ],
    warnings: [
      "Стрессийн үед тунг 2–3 дахин нэмнэ (стрессийн тун).",
      "Урт хугацааны хэрэглэлтийн дараа аажим бууруулна.",
    ],
    notes: "Бөөрний дайврын булчирхайн дутмагшлын орлуулга эмчилгээнд ашиглана. Өглөө 2/3, орой 1/3 хуваарилна.",
  },

  // ── Antihistamine (additional) ────────────────────────────────────────────
  {
    kind: "per_kg",
    id: "promethazine",
    name: "Promethazine",
    category: "antihistamine",
    minAgeMo: 24,
    dosePerKgMinMg: 0.1,
    dosePerKgMaxMg: 0.25,
    dosePerKgMg: 0.1,
    maxDosePerAdministrationMg: 25,
    maxDailyDoseMg: 75,
    frequency: "tid",
    frequencyPerDay: 3,
    route: "oral",
    formulationOptions: [
      { type: "syrup", concentrationMgPerMl: 1, displayLabel: "5mg/5ml уусмал" },
      { type: "tablet", strengthMg: 10, displayLabel: "10mg таблет" },
      { type: "tablet", strengthMg: 25, displayLabel: "25mg таблет" },
    ],
    warnings: [
      "2 нас хүрээгүй хүүхдэд амьсгал дарангуйлах аюултай — ХОРИГЛОНО.",
      "Хүчтэй тайвшруулах нөлөөтэй.",
      "Экстрапирамидын урвал, NMS эрсдэлтэй.",
    ],
  },
];

export const DRUG_MAP = new Map<string, Drug>(DRUGS.map((d) => [d.id, d]));
