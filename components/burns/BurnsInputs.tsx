"use client";

import type { AgeBand, BodyRegionId, BurnDepth } from "@/lib/domain/body-region";
import type { PatientForm } from "@/components/calculator/patient-form";
import type { SelectionMap } from "./use-burn-selections";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PatientInput from "@/components/calculator/PatientInput";
import BodyMap from "./BodyMap";
import HeightField from "./HeightField";

interface Props {
  readonly form: PatientForm;
  readonly onForm: (form: PatientForm) => void;
  readonly heightCm: string;
  readonly onHeight: (value: string) => void;
  readonly band: AgeBand;
  readonly selections: SelectionMap;
  readonly onToggle: (region: BodyRegionId, depth?: BurnDepth) => void;
  readonly onClear: () => void;
}

/** Зүүн багана: өвчтөн, өндөр, түлэгдсэн бүс. */
export default function BurnsInputs(props: Props) {
  return (
    <div className="space-y-4">
      <PatientInput form={props.form} onChange={props.onForm} />
      <HeightField value={props.heightCm} onChange={props.onHeight} />
      <Card className="pb-4">
        <CardHeader className="flex-row items-center justify-between pb-2">
          <CardTitle className="text-muted-foreground text-xs uppercase tracking-widest">
            Түлэгдсэн бүс
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={props.onClear}>
            Цэвэрлэх
          </Button>
        </CardHeader>
        <CardContent>
          <BodyMap
            band={props.band}
            selections={props.selections}
            onToggle={props.onToggle}
          />
        </CardContent>
      </Card>
    </div>
  );
}
