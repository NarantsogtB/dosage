<!-- ARCHITECTURE.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 6. Одоо ажиллуулах командууд

```bash
bun install        # vitest суулгах
bun run typecheck  # tsc --noEmit
bun run lint       # eslint
bun run test       # vitest run  (эхний удаад snapshot үүснэ)
```

**Чухал:** `bun run test`-ийг эхлээд ажиллуулж, `tests/__snapshots__/`
доор үүсэх файлыг **заавал commit хийнэ**. Энэ файл бол хамгаалалтын тор.
