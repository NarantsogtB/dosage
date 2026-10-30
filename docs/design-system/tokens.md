<!-- DESIGN-SYSTEM.md-аас хуваасан. Бусад хэсэг: ./README.md -->
## 2. Token architecture

| Цуглуулга | Горим | Тоо |
|---|---|---|
| Primitives | Value | 50 (бүх scope хаалттай) |
| Color | **Light + Dark** | 32 (бүгд alias, `codeSyntax.WEB` = бодит CSS нэр) |
| Spacing | Value | 14 |
| Radius | Value | 5 |
| Size | Value | 9 (`touch/minimum = 44`) |

Figma нэрсийг бүлэглэсэн боловч CSS хувьсагч хэвээрээ:

```
surface/card → var(--card)          action/primary → var(--primary)
text/muted-foreground → var(--muted-foreground)
signal/warning-text → var(--warning-text)
evidence/a-guideline → var(--evidence-a)
```
