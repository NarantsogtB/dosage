"use client";

import { Calculator } from "lucide-react";
import PrintButton from "./PrintButton";

interface Props {
  readonly canPrint: boolean;
  readonly onPrint: () => void;
}

/** Дээд талын толгой. Хэвлэх товч нь үр дүнтэй үед л гарна. */
export default function AppHeader({ canPrint, onPrint }: Props) {
  return (
    <header className="bg-card/95 supports-[backdrop-filter]:bg-card/80 sticky top-0 z-10 border-b backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
            <Calculator className="size-4" />
          </span>
          <span>
            <h1 className="text-base font-bold leading-tight">
              Эмийн тун тооцоолуур
            </h1>
            <p className="text-muted-foreground text-xs leading-tight">
              Хүүхдийн жинд суурилсан тунгийн тооцоолол
            </p>
          </span>
        </div>
        <PrintButton visible={canPrint} onPrint={onPrint} />
      </div>
    </header>
  );
}
