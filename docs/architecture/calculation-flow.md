<!-- ARCHITECTURE.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 4. Тооцооллын урсгал

```
calculateDosage(drug, patient, options)
  │
  ├─ checkEligibility(patient)          жин хязгаарт байна уу, 18-с доош уу
  │    └─ ineligible → зогсоно
  │       ⚠️ 2026-08-20: дэлхийн 18 насны (216 сар) хязгаар нэмсэн.
  │       dosage.mn ЗӨВХӨН хүүхдийн мг/кг тун тооцоолдог — насанд
  │       хүрэгчид ихэнх эм ФИКС тунтай (жингээс үл хамаарна) тул мг/кг
  │       томьёог үргэлжлүүлж болохгүй (жишээ: captopril).
  │
  ├─ selectRule(drug, patient, code)    нас · жин · заалтаар шүүх
  │    ├─ matchRule → matchAge + matchWeight + matchIndication
  │    └─ preferRule: заалт > isDefault > эхнийх
  │
  └─ computeDose(drug, rule, patient)
       ├─ DOSES_PER_DAY[rule.frequency]
       ├─ evaluateBasis → НЭГ УДААГИЙН тунгийн муж
       └─ buildOutcome
            ├─ applyCaps      бүх хязгаарыг per-dose болгож min авна
            ├─ roundRange     тоймлол
            ├─ scaleRange     өдрийн нийт тун
            ├─ calculateAmounts  мл / шахмал
            └─ buildTrace     эмчид харуулах алхмууд
```

### Trace — яагаад чухал вэ

"180 мг" гэж хэлэхээс илүү:

```
Үндсэн тооцоо:      15 мг/кг × 12 кг      → 180 мг
Нэг удаагийн тун:   180 мг
Өдрийн нийт тун:    180 мг × 4            → 720 мг
```

Эмч өөрөө шалгах боломжтой болно. Энэ бол black-box калькулятор ба
эмнэлзүйн хэрэгслийн ялгаа.
