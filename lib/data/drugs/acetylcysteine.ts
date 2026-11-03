import type { Drug } from "../../domain/drug";

/**
 * Acetylcysteine — Ацетилцистеин
 *
 * 🟡 ГАНЦ ЭХ СУРВАЛЖ (known-gap, 2026-11-04) — Испанийн эмийн агентлаг
 * (AEMPS)-ийн баталсан хүүхдийн 20 мг/мл уусмалын SmPC (2020-09 хянасан),
 * салс шингэрүүлэх: 2–7 нас 100 мг × 3, 7-оос дээш 200 мг × 3; <2 насанд
 * ХОРИГЛОСОН (амьсгалын зам бөглөрөх эрсдэл).
 * ⚠️ ТУН ӨӨРЧЛӨГДСӨН (2026-11-04, эмчийн шийдвэр): өмнө нь 10–15 мг/кг/хон
 * × 2 (15 кг → 150–225 мг/хон). Монголд өргөн хэрэглэгддэг тул эмч 2010+
 * эх сурвалж хайлгаж оруулав; зохицуулагчийн шошго (tiers 3c).
 * Хайсан: WHO Formulary 2010 (зөвхөн парацетамолын хордлого), PCH (2026-03:
 * хордлого, небулайзер, DIOS — амаар салс шингэрүүлэх заалтгүй), MSF.
 * Монголын бүртгэлийн заавар (druginfo.mohs.mn) скриптээр уншигдаагүй.
 *
 * ⚠️ AEMPS: 5 хоногт сайжрахгүй бол дахин үнэлэх.
 *
 * Үлдсэн: lastReviewed/reviewedBy (эмчийн хяналт), contraindicationsMn,
 * availableInMn.
 */

export const acetylcysteine: Drug = {
  id: "acetylcysteine",
  inn: "Acetylcysteine",
  innMn: "Ацетилцистеин",
  category: "mucolytic",
  rules: [
    {
      id: "acetylcysteine-2-7y",
      indication: "general",
      route: "oral",
      ageMinMonths: 24,
      ageMaxMonths: 95,
      basis: { kind: "fixed", minMg: 100, maxMg: 100 },
      frequency: "tds",
      caps: [],
      sources: [
        {
          sourceId: "aemps-acetylcysteine-paediatric-smpc",
          locator: "4.2 Posología — Niños (FT 63512, revisión 09/2020)",
          quotedValue: "Niños de 2 a 7 años: La posología habitual recomendada es de 300 mg de acetilcisteína al día por vía oral, en 3 tomas de 100 mg cada 8 horas."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): AEMPS SmPC-ийн насны мужаар. Өмнө нь 10–15 мг/кг/хон × 2, дээд 300/600 мг."
    },
    {
      id: "acetylcysteine-over-7y",
      indication: "general",
      route: "oral",
      ageMinMonths: 96,
      basis: { kind: "fixed", minMg: 200, maxMg: 200 },
      frequency: "tds",
      caps: [],
      sources: [
        {
          sourceId: "aemps-acetylcysteine-paediatric-smpc",
          locator: "4.2 Posología — Niños (FT 63512, revisión 09/2020)",
          quotedValue: "Adolescentes y niños mayores de 7 años: La posología habitual recomendada es de 600 mg de acetilcisteína al día por vía oral, en 3 tomas de 200 mg cada 8 horas."
        }
      ],
      evidenceLevel: "C_international",
      isDefault: true,
      conflictNote: "Эмчийн шийдвэр (2026-11-04): AEMPS SmPC-ийн насны мужаар. Өмнө нь 10–15 мг/кг/хон × 2, дээд 300/600 мг."
    }
  ],
  formulations: [
    {
      kind: "solid",
      id: "100mg-0",
      labelMn: "100mg гранул/эффервесцент",
      mgPerUnit: 100,
      unitMn: "гранул",
      divisible: false
    },
    {
      kind: "solid",
      id: "200mg-1",
      labelMn: "200mg гранул",
      mgPerUnit: 200,
      unitMn: "гранул",
      divisible: false
    },
    {
      kind: "solid",
      id: "600mg-2",
      labelMn: "600mg эффервесцент таблет",
      mgPerUnit: 600,
      unitMn: "таблет",
      divisible: true
    }
  ],
  warnings: [],
  contraindicationsMn: [],
  notesMn: "Усаар уусгаж уух. Бронхоспазм өдөөж болно — астмын өвчтөнд болгоомжтой.",
  sources: [],
  lastReviewed: "1970-01-01",
  status: "active"
};
