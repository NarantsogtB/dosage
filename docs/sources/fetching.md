<!-- SOURCES.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 3b. Эх сурвалж татах бодит бэрхшээл

Гурван эх сурвалжийг туршиж үзсэн үр дүн:

| Эх сурвалж | Формат | Автомат татах |
|---|---|---|
| **WHO (NCBI Bookshelf)** | HTML текст | ✅ Бүрэн боломжтой |
| **RCH Melbourne** | HTML, гэхдээ **тунг flowchart ЗУРАГ дотор** | ⚠️ Зураг харах шаардлагатай |
| **Starship NZ** | Gatsby, client-rendered | ⚠️ Browser хэрэгтэй |
| **WHO Pocket Book Annex 2** | PDF-үүд | ⚠️ PDF унших |
| **ЭМХТ заавар** | скан зураг PDF | ❌ OCR эсвэл гараар |

**Үр дагавар:** WHO-гийн өвчний заавраас (уушгины хатгаа, суулгалт,
нярайн SBI) тунг хурдан гаргана. Бусад эх сурвалжаас гараар унших
шаардлагатай — эм тутамд 10–20 минут.

### Шалгагдсан аргууд (2026-11-04)

| Эх сурвалж | Арга |
|---|---|
| **WHO Model Formulary for Children 2010** | IRIS DSpace API-ийн `TEXT` bundle — PDF-ээс гаргасан бүтэн текст (1.5 МБ). `iris.who.int/server/api/pid/find?id=10665/44309` → item → `bundles` → `TEXT` → `content`. Хуудасны дугаар: монограф бүрийн дараах «N / WHO Model Formulary for Children 2010» хөл |
| **MSF Essential drugs / Clinical guidelines** | Эм/бүлэг бүрийн HTML (`/en/viewport/EssDr/english/...`, `/en/viewport/CG/english/...`) — curl + HTML→текст. «Last updated» хуудсанд |
| **PCH monograph** | `pch.health.wa.gov.au/~/media/.../MedicationMonographs/<Нэр>.pdf`; жагсаалт — `/For-health-professionals/Medication-monographs` |
| **RCH CPG** | `rch.org.au/clinicalguide/guideline_index/<Нэр>/` — ихэнх тун HTML текстэд байна |
| **AEMPS (Испани) SmPC** | `cima.aemps.es/cima/rest/medicamentos?...` → `dochtml/ft/<№>/FT_<№>.html` |
| **CHQ (Queensland)** | ❌ Автомат хандалтыг 403-аар хаадаг — гараар |
| **druginfo.mohs.mn** | ❌ ASP.NET/DevExpress — гараар |
