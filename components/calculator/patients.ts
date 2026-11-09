import { EMPTY_FORM, formFromRecord, parsePatientForm, type PatientForm } from "./patient-form";

/**
 * Олон өвчтөн (Шат 9b) — цэвэр функцууд, React-гүй.
 *
 * Эмч ээлжинд хэд хэдэн хүүхэд үздэг. Өвчтөн бүр өөрийн жин, нас,
 * эмийн жагсаалттай. НЭР хадгалахгүй — зөвхөн «Ор 3» гэх мэт шошго.
 */

export const MAX_PATIENTS = 6;
const MAX_LABEL = 24;

export interface StoredPatient {
  readonly id: string;
  /** «Ор 3» гэх мэт. Заавал биш, хоосон байж болно. */
  readonly label: string;
  readonly form: PatientForm;
  readonly drugIds: readonly string[];
}

export interface PatientsState {
  readonly patients: readonly StoredPatient[];
  readonly activeId: string | null;
}

export const NO_PATIENTS: PatientsState = { patients: [], activeId: null };

export const cleanLabel = (label: string): string => label.trim().slice(0, MAX_LABEL);

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const textOf = (value: unknown): string => (typeof value === "string" ? value : "");

const stringsOf = (value: unknown): readonly string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const recordOrNull = (value: unknown): Record<string, unknown> | null =>
  isRecord(value) ? value : null;

const toStored = (value: unknown): StoredPatient | null => {
  if (!isRecord(value) || typeof value.id !== "string") return null;
  return {
    id: value.id,
    label: cleanLabel(textOf(value.label)),
    form: formFromRecord(recordOrNull(value.form)),
    drugIds: stringsOf(value.drugIds),
  };
};

const isStored = (patient: StoredPatient | null): patient is StoredPatient => patient !== null;

const hasId = (patients: readonly StoredPatient[], id: unknown): id is string =>
  patients.some((patient) => patient.id === id);

const idAt = (patients: readonly StoredPatient[], index: number): string | null =>
  patients[index]?.id ?? null;

const activeIdOf = (patients: readonly StoredPatient[], wanted: unknown): string | null =>
  hasId(patients, wanted) ? wanted : idAt(patients, 0);

const fromRecord = (value: Record<string, unknown>): PatientsState => {
  const list = Array.isArray(value.patients) ? value.patients : [];
  const patients = list.map(toStored).filter(isStored).slice(0, MAX_PATIENTS);
  return { patients, activeId: activeIdOf(patients, value.activeId) };
};

export const isEmptyForm = (form: PatientForm): boolean =>
  form.weight === "" && form.years === "" && form.months === "";

/** Шат 2a-ийн нэг өвчтөний хэлбэр (`dosage.patient.v1`) → нэг өвчтөн. */
const migrateV1 = (raw: string | null): PatientsState => {
  const form = parsePatientForm(raw);
  if (isEmptyForm(form)) return NO_PATIENTS;
  return { patients: [{ id: "p1", label: "", form, drugIds: [] }], activeId: "p1" };
};

const parseJson = (raw: string | null): unknown => {
  try {
    return JSON.parse(raw ?? "null");
  } catch {
    return null;
  }
};

/**
 * Хадгалсан утгаас сэргээнэ. v2 байхгүй бол хуучин v1-ийг шилжүүлнэ.
 * Эвдэрсэн утга → хоосон: буруу жин сэргээхээс хоосон нь аюулгүй.
 */
export const parsePatients = (rawV2: string | null, rawV1: string | null): PatientsState => {
  const value = parseJson(rawV2);
  return isRecord(value) ? fromRecord(value) : migrateV1(rawV1);
};

export const activeOf = (state: PatientsState): StoredPatient | undefined =>
  state.patients.find((patient) => patient.id === state.activeId);

export const newPatient = (id: string, form: PatientForm = EMPTY_FORM): StoredPatient => ({
  id,
  label: "",
  form,
  drugIds: [],
});

/** Нэмж, идэвхтэй болгоно. 6 хүрсэн бол null. */
export const addPatient = (state: PatientsState, patient: StoredPatient): PatientsState | null =>
  state.patients.length >= MAX_PATIENTS
    ? null
    : { patients: [...state.patients, patient], activeId: patient.id };

export type PatientChange = Partial<Omit<StoredPatient, "id">>;

export const updatePatient = (
  state: PatientsState,
  id: string,
  change: PatientChange,
): PatientsState => ({
  ...state,
  patients: state.patients.map((patient) => (patient.id === id ? { ...patient, ...change } : patient)),
});

/** Идэвхтэйг устгавал дараагийнх (эсвэл өмнөх) нь идэвхтэй болно. */
export const removePatient = (state: PatientsState, id: string): PatientsState => {
  const index = state.patients.findIndex((patient) => patient.id === id);
  const patients = state.patients.filter((patient) => patient.id !== id);
  const neighbour = idAt(patients, Math.min(index, patients.length - 1));
  return { patients, activeId: state.activeId === id ? neighbour : state.activeId };
};

export const setActive = (state: PatientsState, id: string): PatientsState =>
  hasId(state.patients, id) ? { ...state, activeId: id } : state;

/**
 * Идэвхтэй өвчтөнийг өөрчилнө. Өвчтөнгүй үед шинээр үүсгэнэ — эмч жин
 * оруулахаас өмнө эм сонгож болдог (одоогийн урсгал).
 */
export const changeActive = (
  state: PatientsState,
  change: PatientChange,
  newId: string,
): PatientsState => {
  const active = activeOf(state);
  if (active) return updatePatient(state, active.id, change);
  return addPatient(state, { ...newPatient(newId), ...change }) ?? state;
};
