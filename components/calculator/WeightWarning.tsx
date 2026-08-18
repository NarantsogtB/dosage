interface Props {
  readonly invalid: boolean;
  readonly min: number;
  readonly max: number;
}

/** Жин хязгаараас гарсан үед л харагдана. */
export default function WeightWarning({ invalid, min, max }: Props) {
  if (!invalid) return null;
  return (
    <p role="alert" className="text-destructive mt-1.5 text-xs">
      {min}–{max} кг хүртэлх утга оруулна уу.
    </p>
  );
}
