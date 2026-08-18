"use client";

import { Button } from "@/components/ui/button";

interface Props {
  readonly label: string;
  readonly active: boolean;
  readonly onClick: () => void;
}

/** Ангиллын шүүлтүүрийн товч. */
export default function CategoryPill({ label, active, onClick }: Props) {
  return (
    <Button
      type="button"
      size="pill"
      variant={active ? "default" : "secondary"}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
