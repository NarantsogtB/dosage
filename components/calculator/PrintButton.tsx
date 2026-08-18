"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  readonly visible: boolean;
  readonly onPrint: () => void;
}

/** Хэвлэх товч. Хэвлэх зүйл байхгүй үед харагдахгүй. */
export default function PrintButton({ visible, onPrint }: Props) {
  if (!visible) return null;
  return (
    <Button type="button" variant="outline" size="sm" onClick={onPrint}>
      <Printer />
      Хэвлэх
    </Button>
  );
}
