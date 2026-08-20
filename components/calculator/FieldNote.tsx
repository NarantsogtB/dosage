import { FieldDescription, FieldError } from "@/components/ui/field";

export type NoteKind = "error" | "description" | "none";

/** Алдаа байвал алдаа, үгүй бол тайлбар, аль нь ч байхгүй бол юу ч биш. */
export const noteKindOf = (
  error: string | undefined,
  description: React.ReactNode,
): NoteKind => {
  if (error) return "error";
  if (description) return "description";
  return "none";
};

/** `invalid` биш үед алдааны текстийг ХАРУУЛАХГҮЙ. */
export const shownError = (
  invalid: boolean | undefined,
  error: string | undefined,
): string | undefined => (invalid ? error : undefined);

interface Props {
  readonly kind: NoteKind;
  readonly id?: string;
  readonly error?: string;
  readonly description?: React.ReactNode;
}

/**
 * Талбайн ДООРХ мөр — алдаа эсвэл тайлбар, хоёулаа биш.
 *
 * Хоёуланг зэрэг харуулбал эмч алийг нь уншихаа мэдэхгүй. Алдаа гарсан
 * үед тайлбар нь ач холбогдлоо алддаг — хэрэглэгчид одоо ганцхан асуулт
 * байна: «юуг нь засах вэ?»
 */
export default function FieldNote({ kind, id, error, description }: Props) {
  if (kind === "error") return <FieldError id={id}>{error}</FieldError>;
  if (kind === "description") {
    return <FieldDescription id={id}>{description}</FieldDescription>;
  }
  return null;
}
