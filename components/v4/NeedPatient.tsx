"use client";

import { Button } from "@/components/ui/button";
import type { ToolPatient } from "./use-tool-patient";

const open = (tool: ToolPatient) => () => {
  if (tool.active) tool.actions.onEdit(tool.active);
  else tool.actions.onAdd();
};

/** Жин/нас дутуу үед: тайлбар + өвчтөний маягт нээх товч (тусдаа маягтгүй — 9b-ийн `PatientSheet`). */
export default function NeedPatient({ tool, text }: { readonly tool: ToolPatient; readonly text: string }) {
  return (
    <div className="bg-card flex flex-col items-center gap-3 rounded-3xl px-[18px] py-6 text-center">
      <p className="text-muted-foreground text-sm/[18px]">{text}</p>
      <Button type="button" className="min-h-11 rounded-full px-5" onClick={open(tool)}>
        {tool.active ? "Жин, нас оруулах" : "Өвчтөн нэмэх"}
      </Button>
    </div>
  );
}
