import { serializeJsonLd } from "@/lib/seo/json-ld";

/** Structured data-г статик HTML-д шигтгэнэ. Агуулгыг `lib/seo/json-ld.ts` үүсгэнэ. */
export default function JsonLd({ data }: { readonly data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
