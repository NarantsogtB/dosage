"use client";

import { usePathname, useRouter } from "next/navigation";
import type { DrugCategory } from "@/lib/domain/category";
import { DRUGS } from "@/lib/data/drugs";
import { isVerified } from "@/lib/engine/rule/drug-evidence";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { Kbd } from "@/components/ui/kbd";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { addDrugToActive } from "@/components/calculator/use-selected-drugs";
import { usePatients } from "@/components/calculator/patient-store";
import { activeOf, type StoredPatient } from "@/components/calculator/patients";
import { isActive } from "@/components/nav/active-route";
import RecentDrugs from "@/components/recent/RecentDrugs";
import { toggleFavoriteDrug, useFavoriteIds } from "@/components/recent/favorites-store";
import { useIsDesktop } from "@/components/use-media-query";
import CategoryFilter from "./CategoryFilter";
import ContextLine from "./ContextLine";
import PaletteFooter from "./PaletteFooter";
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

/** Desktop: дэлгэрэнгүй рүү; mobile: `/dose` (аль хэдийн тэнд бол үгүй). */
const destinationOf = (desktop: boolean, onDose: boolean, id: string): string | undefined => {
  if (desktop) return `/dose/${id}`;
  return onDose ? undefined : "/dose";
};

const useRoutedPick = (mode: SearchMode, onClose: () => void) => {
  const router = useRouter();
  const desktop = useIsDesktop();
  const onDose = isActive(usePathname(), "/dose");
  return (id: string) => {
    if (mode === "favorite") return toggleFavoriteDrug(id);
    addDrugToActive(id);
    onClose();
    const to = destinationOf(desktop, onDose, id);
    if (to) router.push(to);
  };
};

interface HeaderProps {
  readonly query: string;
  readonly onQuery: (value: string) => void;
  readonly palette: boolean;
  readonly onClose: () => void;
}

/** Оролт: mobile-д «Болих» товч, desktop palette-д `Esc` товчлол. */
const Header = ({ query, onQuery, palette, onClose }: HeaderProps) => (
  <div className="flex items-center gap-3 p-4">
    <div className="flex-1">
      <SearchField value={query} onChange={onQuery} />
    </div>
    {palette ? (
      <Kbd>Esc</Kbd>
    ) : (
      <Button type="button" variant="ghost" className="text-primary" onClick={onClose}>
        Болих
      </Button>
    )}
  </div>
);

const ResultsLabel = ({ show, count }: { readonly show: boolean; readonly count: number }) =>
  show ? (
    <p className="text-muted-foreground px-4 pb-1 text-xs font-semibold tracking-widest uppercase">
      Эмүүд · <span className="num">{count}</span>
    </p>
  ) : null;

type DrugFilters = ReturnType<typeof useDrugFilters>;
const Categories = ({ filters }: { readonly filters: DrugFilters }) => (
  <CategoryFilter categories={CATEGORIES} selected={filters.category} onSelect={filters.setCategory} />
);

/** Шүүлт. Palette-д (Figma 129:948 цэвэр) зөвхөн ангиллын картаас нээсэн үед ангилал харагдана. */
const Filters = ({ palette, filters }: { readonly palette: boolean; readonly filters: DrugFilters }) => {
  if (palette) return filters.category ? <Categories filters={filters} /> : null;
  return (
    <>
      <div className="px-4 pb-3">
        <VerifiedToggle active={filters.verifiedOnly} count={VERIFIED_COUNT} onToggle={filters.toggleVerified} />
      </div>
      <Categories filters={filters} />
    </>
  );
};

const Body = ({ mode, category, palette, onClose }: Omit<Props, "open"> & { readonly palette: boolean }) => {
  const filters = useDrugFilters(DRUGS, category);
  const pick = useRoutedPick(mode, onClose);
  const active = activeOf(usePatients());
  const favorites = useFavoriteIds();
  const selectedIds = selectionOf(mode, favorites, active);
  return (
    <Command shouldFilter={false} loop label="Эмийн нэр эсвэл өвчнөөр хайх" className="h-full bg-transparent">
      <Header query={filters.query} onQuery={filters.setQuery} palette={palette} onClose={onClose} />
      <ContextLine mode={mode} />
      <Filters palette={palette} filters={filters} />
      <RecentDrugs selectedIds={selectedIds} onToggle={pick} hidden={filters.query !== ""} />
      <ResultsLabel show={palette} count={filters.visible.length} />
      <SearchResults
        drugs={filters.visible}
        selectedIds={selectedIds}
        labels={filters.labels}
        hits={filters.hits}
        onToggle={pick}
        onReset={filters.reset}
        className={palette ? "max-h-72" : "max-h-none flex-1"}
      />
      {palette ? <PaletteFooter /> : null}
    </Command>
  );
};

const classOf = (palette: boolean): string => (palette ? PALETTE : FULL);
const keyOf = (category?: DrugCategory): string => category ?? "all";

const FULL = "h-dvh w-full max-w-none content-stretch gap-0 rounded-none border-0 p-0 sm:h-[85dvh] sm:max-w-lg sm:rounded-lg sm:border";
const PALETTE = "top-[12vh]! translate-y-0! h-auto max-h-[76vh] w-full max-w-xl content-stretch gap-0 overflow-hidden rounded-2xl p-0";

/**
 * Хайлт (V4): mobile — бүтэн дэлгэц (Figma 128:917); desktop — ⌘K palette (Figma 129:948,
 * дээрээс, жижиг, доод товчлолын мөртэй). Мөр дарахад эмийг идэвхтэй өвчтөнд нэмнэ.
 */
export default function SearchOverlay({ open, mode, category, onClose }: Props) {
  const palette = useIsDesktop();
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent showCloseButton={false} className={classOf(palette)}>
        <DialogTitle className="sr-only">Эм хайх</DialogTitle>
        <DialogDescription className="sr-only">Эмийн нэр, ангилал эсвэл өвчнөөр хайна.</DialogDescription>
        {open ? <Body key={keyOf(category)} mode={mode} category={category} palette={palette} onClose={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}
