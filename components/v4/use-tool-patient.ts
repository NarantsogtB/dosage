"use client";

import { useMemo } from "react";
import { isReady, toPatient } from "@/components/calculator/patient-form";
import { activeOf } from "@/components/calculator/patients";
import { usePatientActions } from "@/components/home/use-patient-actions";

/**
 * V4 хэрэгслийн дэлгэц (түлэгдэлт, шингэн, яаралтай) — ИДЭВХТЭЙ өвчтөнөөс уншина.
 * Тусдаа маягт байхгүй: жин, насыг Нүүр/өвчтөний цэсээр (`PatientSheet`) засна.
 */
export const useToolPatient = () => {
  const actions = usePatientActions();
  const active = activeOf(actions.state);
  const index = actions.state.patients.findIndex((item) => item.id === actions.state.activeId);
  const form = active?.form;
  const patient = useMemo(() => (form ? toPatient(form) : null), [form]);
  const ready = form ? isReady(form) : false;
  return { actions, active, index, patient, ready };
};

export type ToolPatient = ReturnType<typeof useToolPatient>;
