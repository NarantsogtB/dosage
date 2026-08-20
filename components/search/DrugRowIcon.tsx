import { CheckCircle2, Pill } from "lucide-react";

/** Мөрийн зүүн талын дүрс — сонгосон бол чагт тойрог, эс бөгөөс эмийн шахмал. */
export default function DrugRowIcon({ selected }: { readonly selected: boolean }) {
  if (selected) {
    return <CheckCircle2 className="text-primary size-5 shrink-0" aria-hidden />;
  }
  return <Pill className="text-muted-foreground size-5 shrink-0" aria-hidden />;
}
