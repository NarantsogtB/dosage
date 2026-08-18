import { NotebookPen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SectionLabel from "./SectionLabel";

/** Эмийн нэмэлт тэмдэглэл. Байхгүй бол харагдахгүй. */
export default function NotesPanel({ notes }: { readonly notes?: string }) {
  if (!notes) return null;
  return (
    <>
      <Separator />
      <div className="bg-muted/40 px-5 py-3.5">
        <SectionLabel>
          <NotebookPen className="size-3.5" />
          Тэмдэглэл
        </SectionLabel>
        <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
          {notes}
        </p>
      </div>
    </>
  );
}
