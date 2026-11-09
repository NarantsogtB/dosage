import { NotebookPen } from "lucide-react";
import DisclosureRow from "./DisclosureRow";

/** Эмийн нэмэлт тэмдэглэл — дэлгэгдэх мөр. Байхгүй бол харагдахгүй. */
export default function NotesPanel({ notes }: { readonly notes?: string }) {
  if (!notes) return null;
  return (
    <DisclosureRow icon={NotebookPen} label="Тэмдэглэл" summary="1">
      <p className="text-muted-foreground text-sm leading-relaxed">{notes}</p>
    </DisclosureRow>
  );
}
