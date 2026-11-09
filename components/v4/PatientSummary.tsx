import { User } from "lucide-react";
import AgeDisplay from "@/components/dosage/AgeDisplay";
import { hasAge, hasWeight, toPatient } from "@/components/calculator/patient-form";
import { labelOf } from "@/components/calculator/patients";
import type { ToolPatient } from "./use-tool-patient";

const Weight = ({ tool }: { readonly tool: ToolPatient }) =>
  tool.active && hasWeight(tool.active.form) ? <> · <span className="num">{toPatient(tool.active.form).weightKg} кг</span></> : null;

const Age = ({ tool }: { readonly tool: ToolPatient }) =>
  tool.active && hasAge(tool.active.form) ? <> · <AgeDisplay ageMonths={toPatient(tool.active.form).ageMonths} /></> : null;

/** Desktop замын мөрийн баруун тал: «👤 Ор 5 · 20 кг · 5 нас» (Figma 163:2510). */
export default function PatientSummary({ tool }: { readonly tool: ToolPatient }) {
  if (!tool.active) return <><User aria-hidden />Өвчтөн сонгоогүй</>;
  return (
    <>
      <User aria-hidden />
      <span>{labelOf(tool.active, tool.index)}<Weight tool={tool} /><Age tool={tool} /></span>
    </>
  );
}
