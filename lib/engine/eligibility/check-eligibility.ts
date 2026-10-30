import type { IneligibleOutcome } from "../../domain/calculation-result";
import type { Patient } from "../../domain/patient";
import { checkAgeRange } from "./check-age-range";
import { checkWeightRange } from "./check-weight-range";

type EligibilityCheck = (patient: Patient) => IneligibleOutcome | null;

/** Шалгалтын жагсаалт. Шинэ шалгалтыг энд нэмнэ. */
const CHECKS: readonly EligibilityCheck[] = [checkWeightRange, checkAgeRange];

/** Эхний амжилтгүй шалгалтыг буцаана. Бүгд өнгөрвөл null. */
export const checkEligibility = (
  patient: Patient,
): IneligibleOutcome | null =>
  CHECKS.map((check) => check(patient)).find((result) => result !== null) ??
  null;
