"use client";

import PatientMenu from "@/components/home/PatientMenu";
import type { ToolPatient } from "./use-tool-patient";

interface Props {
  readonly tool: ToolPatient;
  readonly extra?: string;
}

/** «Ор 5 · 20 кг · 5 нас ⌄» — 15 Medium muted; дарвал өвчтөн солих/засах (Figma hero). */
export default function PatientLine({ tool, extra }: Props) {
  const { actions, active, index } = tool;
  if (!active) return <p className="text-muted-foreground text-[15px]/[19px] font-medium">Өвчтөн сонгоогүй</p>;
  return (
    <PatientMenu
      state={actions.state}
      patient={active}
      index={index}
      onEdit={actions.onEdit}
      onRemove={actions.onRemove}
      withWeight
      extra={extra}
      className="text-muted-foreground hover:text-foreground h-[19px] gap-1.5 rounded-full px-0 text-[15px]/[19px] font-medium hover:bg-transparent [&_svg]:size-4"
    />
  );
}
