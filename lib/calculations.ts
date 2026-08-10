import type {
  Drug,
  PerKgDrug,
  DailyTotalDrug,
  FixedDoseDrug,
  Formulation,
  Frequency,
} from "./drugs";

export interface PatientState {
  weightKg: number;
  totalAgeMo: number;
}

export interface FormulationResult {
  formulation: Formulation;
  amountMin: number;
  amountMax: number;
  unit: string;
  displayLabel: string;
}

export interface StandardResult {
  doseMin: number;
  doseMax: number;
  frequencyPerDay: number;
  frequencyLabel: Frequency;
  dailyDoseMin: number;
  dailyDoseMax: number;
  cappedAtMax: boolean;
  formulationResults: FormulationResult[];
  warnings: string[];
  notes?: string;
  durationDays?: number;
}

export type CalculationResult =
  | { type: "standard"; data: StandardResult }
  | { type: "ineligible"; reason: string };

function roundDose(mg: number): number {
  if (mg < 1) return Math.round(mg * 100) / 100;
  if (mg < 10) return Math.round(mg * 10) / 10;
  return Math.round(mg * 10) / 10;
}

function roundVolume(ml: number): number {
  if (ml < 1) return Math.round(ml * 20) / 20;
  return Math.round(ml * 10) / 10;
}

function tabletFraction(count: number): string {
  const whole = Math.floor(count);
  const frac = count - whole;
  let fracStr = "";
  if (frac >= 0.875) {
    return `${whole + 1}`;
  } else if (frac >= 0.625) {
    fracStr = "¾";
  } else if (frac >= 0.375) {
    fracStr = "½";
  } else if (frac >= 0.125) {
    fracStr = "¼";
  }
  if (whole === 0) return fracStr || "¼";
  return fracStr ? `${whole}${fracStr}` : `${whole}`;
}

function calcFormulations(
  doseMinMg: number,
  doseMaxMg: number,
  formulations: Formulation[]
): FormulationResult[] {
  return formulations
    .filter((f) => f.type !== "none")
    .map((f) => {
      if (f.type === "syrup") {
        const mlMin = roundVolume(doseMinMg / f.concentrationMgPerMl);
        const mlMax = roundVolume(doseMaxMg / f.concentrationMgPerMl);
        return {
          formulation: f,
          amountMin: mlMin,
          amountMax: mlMax,
          unit: "ml",
          displayLabel: f.displayLabel,
        };
      } else {
        const countMin = doseMinMg / f.strengthMg;
        const countMax = doseMaxMg / f.strengthMg;
        return {
          formulation: f,
          amountMin: countMin,
          amountMax: countMax,
          unit: "таблет",
          displayLabel: f.displayLabel,
        };
      }
    });
}

function formatTabletAmount(min: number, max: number): string {
  if (Math.abs(min - max) < 0.01) {
    return tabletFraction(min);
  }
  return `${tabletFraction(min)}–${tabletFraction(max)}`;
}

export function formatAmount(result: FormulationResult): string {
  if (result.unit === "ml") {
    const minStr = result.amountMin.toString();
    const maxStr = result.amountMax.toString();
    if (Math.abs(result.amountMin - result.amountMax) < 0.05) {
      return `${minStr} мл`;
    }
    return `${minStr}–${maxStr} мл`;
  } else {
    return `${formatTabletAmount(result.amountMin, result.amountMax)} таблет`;
  }
}

function calcPerKg(drug: PerKgDrug, patient: PatientState): StandardResult {
  const perKgMin = drug.dosePerKgMinMg ?? drug.dosePerKgMg;
  const perKgMax = drug.dosePerKgMaxMg ?? drug.dosePerKgMg;

  const rawMin = roundDose(perKgMin * patient.weightKg);
  const rawMax = roundDose(perKgMax * patient.weightKg);

  const cappedMin = Math.min(rawMin, drug.maxDosePerAdministrationMg);
  const cappedMax = Math.min(rawMax, drug.maxDosePerAdministrationMg);
  const cappedAtMax = rawMax > drug.maxDosePerAdministrationMg;

  const dailyMin = Math.min(
    roundDose(cappedMin * drug.frequencyPerDay),
    drug.maxDailyDoseMg ?? Infinity
  );
  const dailyMax = Math.min(
    roundDose(cappedMax * drug.frequencyPerDay),
    drug.maxDailyDoseMg ?? Infinity
  );

  // Domperidone: extra per-weight daily cap of 0.75 mg/kg/day
  let finalDailyMin = dailyMin;
  let finalDailyMax = dailyMax;
  if (drug.id === "domperidone") {
    const weightCap = roundDose(0.75 * patient.weightKg);
    finalDailyMin = Math.min(dailyMin, weightCap);
    finalDailyMax = Math.min(dailyMax, weightCap);
  }

  const finalDoseMin = roundDose(Math.min(cappedMin, finalDailyMin / drug.frequencyPerDay));
  const finalDoseMax = roundDose(Math.min(cappedMax, finalDailyMax / drug.frequencyPerDay));

  return {
    doseMin: finalDoseMin,
    doseMax: finalDoseMax,
    frequencyPerDay: drug.frequencyPerDay,
    frequencyLabel: drug.frequency,
    dailyDoseMin: roundDose(finalDoseMin * drug.frequencyPerDay),
    dailyDoseMax: roundDose(finalDoseMax * drug.frequencyPerDay),
    cappedAtMax,
    formulationResults: calcFormulations(finalDoseMin, finalDoseMax, drug.formulationOptions),
    warnings: drug.warnings,
    notes: drug.notes,
  };
}

function calcDailyTotal(drug: DailyTotalDrug, patient: PatientState): StandardResult {
  const dailyPerKgMin = drug.dailyDosePerKgMinMg ?? drug.dailyDosePerKgMg;
  const dailyPerKgMax = drug.dailyDosePerKgMaxMg ?? drug.dailyDosePerKgMg;

  const rawDailyMin = roundDose(dailyPerKgMin * patient.weightKg);
  const rawDailyMax = roundDose(dailyPerKgMax * patient.weightKg);

  const cappedDailyMin = Math.min(rawDailyMin, drug.maxDailyDoseMg ?? Infinity);
  const cappedDailyMax = Math.min(rawDailyMax, drug.maxDailyDoseMg ?? Infinity);

  const rawDoseMin = roundDose(cappedDailyMin / drug.frequencyPerDay);
  const rawDoseMax = roundDose(cappedDailyMax / drug.frequencyPerDay);

  const doseMin = Math.min(rawDoseMin, drug.maxDosePerAdministrationMg);
  const doseMax = Math.min(rawDoseMax, drug.maxDosePerAdministrationMg);
  const cappedAtMax = rawDoseMax > drug.maxDosePerAdministrationMg;

  return {
    doseMin: roundDose(doseMin),
    doseMax: roundDose(doseMax),
    frequencyPerDay: drug.frequencyPerDay,
    frequencyLabel: drug.frequency,
    dailyDoseMin: roundDose(doseMin * drug.frequencyPerDay),
    dailyDoseMax: roundDose(doseMax * drug.frequencyPerDay),
    cappedAtMax,
    formulationResults: calcFormulations(doseMin, doseMax, drug.formulationOptions),
    warnings: drug.warnings,
    notes: drug.notes,
  };
}

function calcFixed(drug: FixedDoseDrug, patient: PatientState): CalculationResult {
  const bracket = drug.brackets.find(
    (b) => patient.weightKg >= b.minWeightKg && patient.weightKg < b.maxWeightKg
  );
  if (!bracket) {
    return { type: "ineligible", reason: "Жинд тохирох тун олдсонгүй." };
  }

  const dose = bracket.dosePerAdministrationMg;
  return {
    type: "standard",
    data: {
      doseMin: dose,
      doseMax: dose,
      frequencyPerDay: drug.frequencyPerDay,
      frequencyLabel: drug.frequency,
      dailyDoseMin: dose * drug.frequencyPerDay,
      dailyDoseMax: dose * drug.frequencyPerDay,
      cappedAtMax: false,
      formulationResults: calcFormulations(dose, dose, drug.formulationOptions),
      warnings: drug.warnings,
      notes: drug.notes,
      durationDays: drug.durationDays,
    },
  };
}

export function calculateDosage(
  drug: Drug,
  patient: PatientState
): CalculationResult {
  if (patient.weightKg < 1 || patient.weightKg > 200) {
    return {
      type: "ineligible",
      reason: `Жин ${patient.weightKg} кг байна — зөвхөн 1–200 кг-ийн хүрээнд тооцоолно.`,
    };
  }

  if (patient.totalAgeMo < drug.minAgeMo) {
    const minYears = Math.floor(drug.minAgeMo / 12);
    const minMonths = drug.minAgeMo % 12;
    let ageStr: string;
    if (minYears === 0) {
      ageStr = `${drug.minAgeMo} сар`;
    } else if (minMonths === 0) {
      ageStr = `${minYears} нас`;
    } else {
      ageStr = `${minYears} нас ${minMonths} сар`;
    }
    return {
      type: "ineligible",
      reason: `${drug.name} нь ${ageStr}-аас доош насны хүүхдэд хориглоно.`,
    };
  }

  if (drug.kind === "per_kg") {
    return { type: "standard", data: calcPerKg(drug, patient) };
  }
  if (drug.kind === "daily_total") {
    return { type: "standard", data: calcDailyTotal(drug, patient) };
  }
  return calcFixed(drug, patient);
}

export function formatDose(mg: number): string {
  const rounded = Math.round(mg * 10) / 10;
  return rounded % 1 === 0 ? `${rounded}` : `${rounded}`;
}
