"use client";

import { Link2, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { SharedNoticeState } from "./use-share";

interface Props {
  readonly notice: SharedNoticeState | null;
  readonly onDismiss: () => void;
}

const Skipped = ({ items }: { readonly items: readonly string[] }) =>
  items.length === 0 ? null : (
    <div className="mt-2">
      <p className="font-medium">Алгассан ({items.length}):</p>
      <ul className="list-disc pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

/** Хуваалцсан линкээр нээсэн үед — жинг дахин шалгуулна (Шат 5). */
export default function SharedNotice({ notice, onDismiss }: Props) {
  if (!notice) return null;
  return (
    <Alert variant="warning" className="print:hidden">
      <Link2 />
      <AlertTitle>Энэ тооцоог өөр хүн бэлдсэн — жинг шалгана уу</AlertTitle>
      <AlertDescription>
        <p>Жин, нас, эм, заалт, бэлдмэлийг линкээс сэргээлээ. Өөрийн өвчтөнд тохирч байгааг шалгана уу.</p>
        <Skipped items={notice.skipped} />
        <Button type="button" variant="ghost" size="sm" className="mt-2 -ml-2" onClick={onDismiss}>
          <X aria-hidden />
          Ойлголоо
        </Button>
      </AlertDescription>
    </Alert>
  );
}
