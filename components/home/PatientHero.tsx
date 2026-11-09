"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, History, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import AgeDisplay from "@/components/dosage/AgeDisplay";
import { hasAge, hasWeight, toPatient } from "@/components/calculator/patient-form";
import { updatePatients } from "@/components/calculator/patient-store";
import {
  MAX_PATIENTS,
  labelOf,
  setActive,
  type PatientsState,
  type StoredPatient,
} from "@/components/calculator/patients";
import { requestSearchFocus } from "@/components/search/search-focus";
import { cn } from "@/lib/utils";

interface Props {
  readonly state: PatientsState;
  readonly onAdd: () => void;
  readonly onEdit: (patient: StoredPatient) => void;
  readonly onRemove: (patient: StoredPatient) => void;
}

const pageOf = (el: HTMLElement): number => (el.clientWidth ? Math.round(el.scrollLeft / el.clientWidth) : 0);

const needsScroll = (el: HTMLElement, index: number): boolean => index >= 0 && pageOf(el) !== index;

const syncScroll = (el: HTMLElement | null, index: number): void => {
  if (el && needsScroll(el, index)) el.scrollTo({ left: index * el.clientWidth, behavior: "instant" });
};

const switchTo = (id: string | undefined, state: PatientsState): void => {
  if (id && id !== state.activeId) updatePatients((current) => setActive(current, id));
};

/** Гүйлгэж солих карусель ↔ идэвхтэй өвчтөн. Программаар солихдоо `instant` — тэмцэлдэхгүй. */
const useCarousel = (state: PatientsState) => {
  const ref = useRef<HTMLDivElement>(null);
  const index = state.patients.findIndex((patient) => patient.id === state.activeId);

  useEffect(() => syncScroll(ref.current, index), [index, state.patients.length]);

  const onScroll = useCallback(() => {
    if (ref.current) switchTo(state.patients[pageOf(ref.current)]?.id, state);
  }, [state]);

  return { ref, onScroll };
};

const MenuItem = (props: React.ComponentProps<typeof Button>) => (
  <Button type="button" variant="ghost" className="w-full justify-start" {...props} />
);

const Menu = ({ state, patient, index, onEdit, onRemove }: Omit<Props, "onAdd"> & { patient: StoredPatient; index: number }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button type="button" variant="ghost" className="text-muted-foreground rounded-full">
        {labelOf(patient, index)}
        {hasAge(patient.form) ? <> · <AgeDisplay ageMonths={toPatient(patient.form).ageMonths} /></> : null}
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

const Weight = ({ patient }: { readonly patient: StoredPatient }) => (
  <p className="num text-6xl font-bold">
    {hasWeight(patient.form) ? toPatient(patient.form).weightKg : "—"}
    <span className="text-muted-foreground ml-2 text-xl font-semibold">кг</span>
  </p>
);

const Dots = ({ state }: { readonly state: PatientsState }) => (
  <p className="text-muted-foreground flex items-center justify-center gap-2 text-xs">
    <span aria-hidden className="flex gap-1">
      {state.patients.map((item) => (
        <span key={item.id} className={cn("h-1.5 rounded-full", item.id === state.activeId ? "bg-primary w-5" : "bg-muted-foreground/40 w-1.5")} />
      ))}
    </span>
    {state.patients.length > 1 ? <span><span className="num">{state.patients.length}</span> өвчтөн · гүйлгэж солино</span> : null}
  </p>
);

const Empty = ({ onAdd }: { readonly onAdd: () => void }) => (
  <div className="space-y-3 py-6 text-center">
    <p className="text-muted-foreground">Өвчтөн нэмээгүй байна</p>
    <Button type="button" size="lg" className="h-12 rounded-full px-6" onClick={onAdd}>
      <Plus aria-hidden /> Жин оруулах
    </Button>
    <p className="text-muted-foreground text-xs">Жин, насаа оруулмагц бүх эмийн тун шууд гарна</p>
  </div>
);

/** Нүүрний hero — өвчтөний карт, гүйлгэж солино (Figma 120:62, 131:1359). */
export default function PatientHero({ state, onAdd, ...menu }: Props) {
  const { ref, onScroll } = useCarousel(state);
  return (
    <section aria-label="Өвчтөн" className="from-tile/30 -mx-4 bg-linear-to-b to-transparent px-4 pt-3 pb-2 sm:-mx-6 sm:px-6">
      <div className="flex justify-end gap-2">
        <Button asChild variant="secondary" size="icon">
          <Link href="/history" aria-label="Түүх">
            <History aria-hidden />
          </Link>
        </Button>
        <Button type="button" variant="secondary" size="icon" aria-label="Эм хайх" onClick={requestSearchFocus}>
          <Search aria-hidden />
        </Button>
        <Button type="button" variant="secondary" size="icon" aria-label="Өвчтөн нэмэх" disabled={state.patients.length >= MAX_PATIENTS} onClick={onAdd}>
          <Plus aria-hidden />
        </Button>
      </div>
      {state.patients.length === 0 ? (
        <Empty onAdd={onAdd} />
      ) : (
        <div ref={ref} onScroll={onScroll} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]">
          {state.patients.map((patient, index) => (
            <div key={patient.id} className="flex min-w-full snap-center flex-col items-center gap-1">
              <Menu state={state} patient={patient} index={index} {...menu} />
              <Weight patient={patient} />
            </div>
          ))}
        </div>
      )}
      {state.patients.length > 0 ? <Dots state={state} /> : null}
    </section>
  );
}
