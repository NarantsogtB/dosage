"use client";

import { CommandInput } from "@/components/ui/command";

interface Props {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

/**
 * Эмийн нэрээр хайх талбар. Латин ба кирилл хоёуланг дэмжинэ.
 *
 * `cmdk`-ийн `CommandInput` — ердийн `<input>` БИШ. Ялгаа нь: талбарт
 * фокустай байхад ↑ ↓ товчоор доорх жагсаалтаар явж, Enter-ээр сонгоно.
 * Гараас салалгүй жин → хайлт → сонголт хийх боломж гарна.
 *
 * Талбайн НЭР нь `DrugSearch`-ийн `<Command label=…>`-д байна (cmdk түүнийг
 * `aria-labelledby` болгодог тул энд `aria-label` бичих нь үр дүнгүй).
 *
 * Шүүлтийг cmdk-д ХИЙЛГЭХГҮЙ (`shouldFilter={false}` — DrugSearch-ыг үз):
 * латин/кирилл дүйцүүлэлт, ангилал, баталгаажилт бүгд `filterDrugs`-д
 * байдаг бөгөөд тэр логик тесттэй. cmdk зөвхөн гарын навигацийг хариуцна.
 */
export default function SearchField({ value, onChange }: Props) {
  return (
    <CommandInput
      value={value}
      onValueChange={onChange}
      placeholder="paracetamol / парацетамол"
      wrapperClassName="border-input rounded-md border shadow-xs focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px] transition-[color,box-shadow]"
    />
  );
}
