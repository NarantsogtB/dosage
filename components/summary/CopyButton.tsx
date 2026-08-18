"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESET_MS = 1600;

/** Жорын текстийг санах ойд хуулна. */
export default function CopyButton({ text }: { readonly text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), RESET_MS);
    });
  };

  return (
    <Button type="button" variant="ghost" size="sm" onClick={copy}>
      {copied ? <Check className="text-emerald-600" /> : <Copy />}
      {copied ? "Хуулагдлаа" : "Хуулах"}
    </Button>
  );
}
