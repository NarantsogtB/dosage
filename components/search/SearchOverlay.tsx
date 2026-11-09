"use client";

import { usePathname, useRouter } from "next/navigation";
import { User } from "lucide-react";
import type { DrugCategory } from "@/lib/domain/category";
import { DRUGS } from "@/lib/data/drugs";
import { isVerified } from "@/lib/engine/rule/drug-evidence";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import AgeDisplay from "@/components/dosage/AgeDisplay";
import { addDrugToActive } from "@/components/calculator/use-selected-drugs";
import { hasWeight, toPatient } from "@/components/calculator/patient-form";
import { usePatients } from "@/components/calculator/patient-store";
import { activeOf, labelOf, type StoredPatient } from "@/components/calculator/patients";
import { isActive } from "@/components/nav/active-route";
import RecentDrugs from "@/components/recent/RecentDrugs";
import { toggleFavoriteDrug, useFavoriteIds } from "@/components/recent/favorites-store";
import CategoryFilter from "./CategoryFilter";
import SearchField from "./SearchField";
import SearchResults from "./SearchResults";
import VerifiedToggle from "./VerifiedToggle";
import type { SearchMode } from "./search-open";
import { useDrugFilters } from "./use-drug-filters";

interface Props {
  readonly open: boolean;
  readonly mode: SearchMode;
  readonly category?: DrugCategory;
  readonly onClose: () => void;
}

const CATEGORIES = [...new Set(DRUGS.map((drug) => drug.category))].sort();
const VERIFIED_COUNT = DRUGS.filter(isVerified).length;

const NO_IDS: readonly string[] = [];

const idsOf = (active?: StoredPatient): readonly string[] => active?.drugIds ?? NO_IDS;

const selectionOf = (mode: SearchMode, favorites: readonly string[], active?: StoredPatient): readonly string[] =>
  mode === "favorite" ? favorites : idsOf(active);

const hasAnyAge = (patient: StoredPatient): boolean => patient.form.years !== "" || patient.form.months !== "";

const PatientText = ({ patient, index }: { readonly patient: StoredPatient; readonly index: number }) => (
  <>
    {labelOf(patient, index)}
    {hasWeight(patient.form) ? <> · <span className="num">{toPatient(patient.form).weightKg}</span> кг</> : null}
    {hasAnyAge(patient) ? <> · <AgeDisplay ageMonths={toPatient(patient.form).ageMonths} /></> : null}
    {" "}— тун шууд гарна
  </>
);

const PLAIN: Record<SearchMode, string> = {
  pick: "Өвчтөн нэмээгүй — тун гарахын тулд жин, нас оруулна",
  favorite: "«Миний эмүүд»-д нэмэх/хасахдаа эмийг дарна",
};

/** Хайлтын дээрх мөр: хэнд тун гарахыг (эсвэл favorite горимын зөвлөмж) харуулна. */
const ContextLine = ({ mode }: { readonly mode: SearchMode }) => {
  const state = usePatients();
  const patient = activeOf(state);
  const index = state.patients.findIndex((item) => item.id === state.activeId);
  return (
    <p className="text-muted-foreground flex items-center gap-2 px-4 pb-3 text-sm">
      <User aria-hidden className="size-4 shrink-0" />
      <span>{mode === "pick" && patient ? <PatientText patient={patient} index={index} /> : PLAIN[mode]}</span>
    </p>
  );
};

const useRoutedPick = (mode: SearchMode, onClose: () => void) => {
  const router = useRouter();
  const onDose = isActive(usePathname(), "/dose");
  return (id: string) => {
    if (mode === "favorite") return toggleFavoriteDrug(id);
    addDrugToActive(id);
    onClose();
    if (!onDose) router.push("/dose");
  };
};

const Body = ({ mode, category, onClose }: Omit<Props, "open">) => {
  const filters = useDrugFilters(DRUGS, category);
  const pick = useRoutedPick(mode, onClose);
  const active = activeOf(usePatients());
  const favorites = useFavoriteIds();
  const selectedIds = selectionOf(mode, favorites, active);
  return (
    <Command shouldFilter={false} loop label="Эмийн нэр эсвэл өвчнөөр хайх" className="h-full bg-transparent">
      <div className="flex items-center gap-3 p-4">
        <div className="flex-1">
          <SearchField value={filters.query} onChange={filters.setQuery} />
        </div>
        <Button type="button" variant="ghost" className="text-primary" onClick={onClose}>
          Болих
        </Button>
      </div>
      <ContextLine mode={mode} />
      <div className="px-4 pb-3">
        <VerifiedToggle active={filters.verifiedOnly} count={VERIFIED_COUNT} onToggle={filters.toggleVerified} />
      </div>
      <CategoryFilter categories={CATEGORIES} selected={filters.category} onSelect={filters.setCategory} />
      <RecentDrugs selectedIds={selectedIds} onToggle={pick} hidden={filters.query !== ""} />
      <SearchResults
        drugs={filters.visible}
        selectedIds={selectedIds}
        labels={filters.labels}
        hits={filters.hits}
        onToggle={pick}
        onReset={filters.reset}
        className="max-h-none flex-1"
      />
    </Command>
  );
};

/**
 * Бүтэн дэлгэцийн хайлт (V4, Figma 128:917). Mobile-д хайлтын ГАНЦ орц;
 * desktop-д хуудас доторх `DrugSearch` хэвээр. Мөр дарахад эмийг идэвхтэй
 * өвчтөнд нэмээд `/dose` руу — тун шууд гарна.
 */
export default function SearchOverlay({ open, mode, category, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="h-dvh w-full max-w-none content-stretch gap-0 rounded-none border-0 p-0 sm:h-[85dvh] sm:max-w-lg sm:rounded-lg sm:border"
      >
        <DialogTitle className="sr-only">Эм хайх</DialogTitle>
        <DialogDescription className="sr-only">Эмийн нэр, ангилал эсвэл өвчнөөр хайна.</DialogDescription>
        {open ? <Body key={category ?? "all"} mode={mode} category={category} onClose={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}
