"use client";

import { Share, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useInstallPrompt } from "./use-install-prompt";

const AndroidBody = ({ onInstall }: { readonly onInstall: () => void }) => (
  <>
    <p className="text-muted-foreground text-sm">
      Нүүр дэлгэцээс шууд, хаягийн мөргүй нээгдэнэ.
    </p>
    <Button type="button" size="sm" className="mt-3" onClick={onInstall}>
      Суулгах
    </Button>
  </>
);

const IosBody = ({ onDone }: { readonly onDone: () => void }) => (
  <>
    <p className="text-muted-foreground text-sm leading-relaxed">
      Хөтчийн <Share aria-label="Хуваалцах" className="inline size-4 align-text-bottom" />{" "}
      товч → <span className="text-foreground font-medium">«Add to Home Screen»</span>{" "}
      (Нүүр дэлгэцэд нэмэх).
    </p>
    <Button type="button" size="sm" variant="secondary" className="mt-3" onClick={onDone}>
      Ойлголоо
    </Button>
  </>
);

/**
 * «Нүүр дэлгэцэд нэмэх» сануулга. Нэг удаа, хаах боломжтой, анхны
 * амжилттай тооцооллын дараа.
 *
 * V3.1: дэлгэцийн доод талд `fixed` байхаа больж, үр дүнгийн урсгалд
 * орсон — mobile-д доод навигац, action bar хоёртой давхцаж, тунг
 * дардаг байв.
 */
export default function InstallPrompt({ hasCalculated }: { readonly hasCalculated: boolean }) {
  const prompt = useInstallPrompt(hasCalculated);
  if (!prompt.platform) return null;

  return (
    <aside aria-live="polite" className="print:hidden">
      <Card className="relative gap-0 p-4 pr-12 shadow-none">
        <p className="text-sm font-semibold">dosage.mn-ийг утсандаа нэмэх үү?</p>
        {prompt.platform === "android" ? (
          <AndroidBody onInstall={prompt.install} />
        ) : (
          <IosBody onDone={prompt.acknowledge} />
        )}
        <Button
          type="button"
          size="icon-xs"
          variant="ghost"
          aria-label="Хаах"
          className="absolute top-2 right-2"
          onClick={prompt.close}
        >
          <X />
        </Button>
      </Card>
    </aside>
  );
}
