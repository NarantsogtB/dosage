"use client";

import { SearchX } from "lucide-react";
import type { FilterState } from "./active-filters";
import { activeFilters } from "./active-filters";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface Props {
  readonly filters: FilterState;
  readonly onReset: () => void;
}

/**
 * Хайлт хоосон буцсан үед: шалтгааныг нэрлэж, гарах зам өгнө.
 *
 * "Олдсонгүй" гэж хэлэх нь хангалтгүй — ЯАГААД олдоогүйг хэлнэ. Ихэнх
 * тохиолдолд буруутан нь бичсэн үг биш, мартагдсан шүүлтүүр байдаг.
 */
export default function SearchEmpty({ filters, onReset }: Props) {
  const active = activeFilters(filters);
  return (
    <Empty className="gap-4 px-5 py-8 md:p-8">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchX aria-hidden />
        </EmptyMedia>
        <EmptyTitle>Тохирох эм олдсонгүй</EmptyTitle>
        <EmptyDescription>
          Идэвхтэй шүүлтүүр: {active.join(" · ")}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button type="button" variant="outline" size="sm" onClick={onReset}>
          Шүүлтүүр цэвэрлэх
        </Button>
      </EmptyContent>
    </Empty>
  );
}
