import { Card } from "@/components/ui/card";

interface Props {
  readonly title: string;
  readonly hint: string;
}

/** Үр дүн байхгүй үеийн зурвас. */
export default function EmptyState({ title, hint }: Props) {
  return (
    <Card className="min-h-64 items-center justify-center border-dashed p-8 text-center shadow-none">
      <p className="text-sm font-medium">{title}</p>
      <p className="text-muted-foreground text-xs">{hint}</p>
    </Card>
  );
}
