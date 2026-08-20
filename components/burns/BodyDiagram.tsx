"use client";

import type { KeyboardEvent } from "react";
import type { AgeBand, BodyRegionId, BurnDepth } from "@/lib/domain/body-region";
import { LUND_BROWDER } from "@/lib/data/burns/lund-browder";
import { DEPTH_LABELS, REGION_LABELS } from "@/lib/data/burns/region-labels";
import { cn } from "@/lib/utils";
import type { SelectionMap } from "./use-burn-selections";
import {
  BACK_PART_REGION,
  BODY_PARTS,
  FRONT_PART_REGION,
  type BodyPartKey,
  type PartShape,
} from "./body-parts";
import { nextDepth } from "./next-depth";
import { regionColors } from "./region-style";

interface Props {
  readonly view: "front" | "back";
  readonly band: AgeBand;
  readonly selections: SelectionMap;
  readonly onToggle: (region: BodyRegionId, depth?: BurnDepth) => void;
}

const depthText = (depth?: BurnDepth): string =>
  depth ? DEPTH_LABELS[depth] : "Сонгоогүй";

const labelFor = (region: BodyRegionId, depth: BurnDepth | undefined, percent: number): string =>
  `${REGION_LABELS[region]} — ${depthText(depth)} · ${percent}%`;

/** Хувь нь НАСНЫ АНГИЛАЛААС хамаарна — 14 настайн толгой 11%, 19% БИШ. */
const percentOf = (region: BodyRegionId, band: AgeBand): number =>
  LUND_BROWDER[region][band];

const SHAPE_CLASSNAME = cn(
  "cursor-pointer outline-none transition-colors",
  "focus-visible:stroke-[var(--ring)] focus-visible:stroke-[3px]",
);

const DECORATIVE_PROPS = {
  "aria-hidden": true as const,
  className: "fill-[var(--muted)] opacity-70 stroke-[var(--border)]",
  strokeWidth: 1.5,
};

function DecorativeShape({ shape }: { readonly shape: PartShape }) {
  if (shape.kind === "ellipse") {
    return (
      <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...DECORATIVE_PROPS} />
    );
  }
  return (
    <rect
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      rx={shape.rx}
      {...DECORATIVE_PROPS}
    />
  );
}

const onShapeKeyDown =
  (onActivate: () => void) => (event: KeyboardEvent<SVGElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onActivate();
  };

interface InteractiveProps {
  readonly shape: PartShape;
  readonly region: BodyRegionId;
  readonly band: AgeBand;
  readonly depth?: BurnDepth;
  readonly onActivate: () => void;
}

function InteractiveShape(props: InteractiveProps) {
  const { shape, region, band, depth, onActivate } = props;
  const percent = percentOf(region, band);
  const colors = regionColors(depth);
  const shared = {
    role: "button" as const,
    tabIndex: 0,
    "aria-pressed": depth !== undefined,
    "aria-label": labelFor(region, depth, percent),
    style: { fill: colors.fill, stroke: colors.stroke },
    strokeWidth: 2,
    className: SHAPE_CLASSNAME,
    onClick: onActivate,
    onKeyDown: onShapeKeyDown(onActivate),
  };
  if (shape.kind === "ellipse") {
    return <ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...shared} />;
  }
  return (
    <rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx={shape.rx} {...shared} />
  );
}

function RegionShape({
  shape,
  band,
  selections,
  onToggle,
  partMap,
}: {
  readonly shape: PartShape;
  readonly band: AgeBand;
  readonly selections: SelectionMap;
  readonly onToggle: Props["onToggle"];
  readonly partMap: Partial<Record<BodyPartKey, BodyRegionId>>;
}) {
  const region = partMap[shape.part];
  if (!region) return <DecorativeShape shape={shape} />;
  const depth = selections.get(region);
  return (
    <InteractiveShape
      shape={shape}
      region={region}
      band={band}
      depth={depth}
      onActivate={() => onToggle(region, nextDepth(depth))}
    />
  );
}

const partMapFor = (view: Props["view"]) =>
  view === "front" ? FRONT_PART_REGION : BACK_PART_REGION;

/**
 * Lund-Browder-ийн диаграм — нэг тал (урд эсвэл ар).
 *
 * Тухайн талаас ТЭМДЭГЛЭДЭГГҮЙ мөчид (жишээ: урд талд хөл) саарал,
 * товшигдохгүй дүрс зурна — бие бүтэн харагдана, гэхдээ буруу газар
 * товшиж болохгүй.
 */
export default function BodyDiagram({ view, band, selections, onToggle }: Props) {
  const partMap = partMapFor(view);
  return (
    <svg
      viewBox="0 0 220 460"
      role="group"
      aria-label={view === "front" ? "Биеийн урд тал" : "Биеийн ар тал"}
      className="mx-auto h-auto w-full max-w-[200px]"
    >
      {BODY_PARTS.map((shape) => (
        <RegionShape
          key={shape.part}
          shape={shape}
          band={band}
          selections={selections}
          onToggle={onToggle}
          partMap={partMap}
        />
      ))}
    </svg>
  );
}
