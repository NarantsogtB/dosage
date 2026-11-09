"use client";

import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AgeDisplay from "@/components/dosage/AgeDisplay";
import { hasAge, hasWeight, toPatient } from "@/components/calculator/patient-form";
import { updatePatients } from "@/components/calculator/patient-store";
import { labelOf, setActive, type PatientsState, type StoredPatient } from "@/components/calculator/patients";

interface Props {
  readonly state: PatientsState;
  readonly patient: StoredPatient;
  readonly index: number;
  readonly onEdit: (patient: StoredPatient) => void;
  readonly onRemove: (patient: StoredPatient) => void;
  readonly className?: string;
  /** V4 хэрэгслийн hero: «Ор 5 · 20 кг · 5 нас» — жинг нэмж харуулна. */
  readonly withWeight?: boolean;
  /** Төгсгөлд нэмэх хэсэг, жишээ нь «110 см» (түлэгдэлт). */
  readonly extra?: string;
}

const Weight = ({ patient, show }: { readonly patient: StoredPatient; readonly show?: boolean }) =>
  show && hasWeight(patient.form) ? <> · <span className="num">{toPatient(patient.form).weightKg} кг</span></> : null;

const Extra = ({ text }: { readonly text?: string }) => (text ? <> · <span className="num">{text}</span></> : null);

const MenuItem = (props: React.ComponentProps<typeof Button>) => (
  <Button type="button" variant="ghost" className="w-full justify-start" {...props} />
);

/**
 * «Ор 3 · 8 сар ⌄» цэс: өвчтөн солих, засах, устгах. Mobile hero, desktop өвчтөний
 * карт хоёул хэрэглэнэ.
 */
export default function PatientMenu({ state, patient, index, onEdit, onRemove, className, withWeight, extra }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" variant="ghost" className={className ?? "text-muted-foreground rounded-full"}>
          {labelOf(patient, index)}
          <Weight patient={patient} show={withWeight} />
          {hasAge(patient.form) ? <> · <AgeDisplay ageMonths={toPatient(patient.form).ageMonths} /></> : null}
          <Extra text={extra} />
          <ChevronDown aria-hidden />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-1.5">
        {state.patients.map((item, at) => (
          <MenuItem key={item.id} aria-current={item.id === state.activeId} onClick={() => updatePatients((s) => setActive(s, item.id))}>
            {labelOf(item, at)} · <span className="num">{item.form.weight || "—"}</span>
          </MenuItem>
        ))}
        <MenuItem onClick={() => onEdit(patient)}><Pencil aria-hidden /> Засах</MenuItem>
        <MenuItem className="text-destructive" onClick={() => onRemove(patient)}><Trash2 aria-hidden /> Устгах</MenuItem>
      </PopoverContent>
    </Popover>
  );
}
