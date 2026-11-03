# lib/engine — тунгийн тооцооллын engine

Цэвэр функц. I/O, React, `lib/data` импорт БАЙХГҮЙ (эм аргументаар орж ирнэ).
Нийтийн API: `index.ts`. Орц: `calculate-dosage.ts`.

## Урсгал

```
calculateDosage(drug, patient, options)
  checkEligibility   eligibility/  жин хязгаар, нас < 216 сар (18 нас)
  selectRule         rule/         нас · жин · заалт; prefer: заалт > isDefault > эхнийх
  computeDose        compute-dose.ts
    evaluateBasis    basis/        dispatch хүснэгт → НЭГ УДААГИЙН тунгийн муж
    buildOutcome     build-outcome.ts
      applyCaps      caps/         бүх cap-ийг per-dose болгож min
      round/scale    math/         тоймлол, өдрийн нийт
      amounts        formulation/  мл / шахмал; бэлдмэлийн хүчийг дүрмийн нэгж рүү (units/)
      buildTrace     trace/        эмчид харагдах алхмууд
```

## Дүрэм

- Эмийн `id`-гаар салаалахгүй. Шинэ төрлийн тун → `lib/domain`-д төрөл +
  `basis/` эсвэл `caps/`-д нэг файл + dispatch хүснэгтэд нэг мөр + `trace/`
  тайлбар. `switch` бичихгүй (complexity 3).
- Тоо бүр trace-д харагдах ёстой — black box болгохгүй.
- Нэгж (S4): тоо бүр дүрмийн `doseUnit`-ээр; хөрвүүлэлт зөвхөн `units/convert-unit.ts`
  (г↔мг↔мкг). Нийцэхгүй бэлдмэлийг алгасна, нэгж хольж тооцоолохгүй.
- Тест: `tests/engine/`. Туслах: `tests/fixtures/make-drug.ts`, `patients.ts`.
