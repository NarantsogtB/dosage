"use client";

import {
  CATEGORY_LABELS,
  ROUTE_LABELS,
  FREQUENCY_LABELS,
  type Drug,
} from "@/lib/drugs";
import {
  type CalculationResult,
  formatDose,
  formatAmount,
} from "@/lib/calculations";

interface PrintTemplateProps {
  drugs: Drug[];
  results: Map<string, CalculationResult>;
  weightKg: number;
  totalAgeMo: number;
}

function ageLabel(totalAgeMo: number): string {
  if (totalAgeMo === 0) return "";
  const years = Math.floor(totalAgeMo / 12);
  const months = totalAgeMo % 12;
  if (years === 0) return `${months} сар`;
  if (months === 0) return `${years} нас`;
  return `${years} нас ${months} сар`;
}

function scheduleTimes(frequencyPerDay: number): string[] {
  if (frequencyPerDay <= 1) return ["Өглөө"];
  if (frequencyPerDay === 2) return ["Өглөө", "Орой"];
  if (frequencyPerDay === 3) return ["Өглөө", "Өдөр", "Орой"];
  if (frequencyPerDay === 4) return ["Өглөө", "Өдөр", "Орой", "Шөнө"];
  return ["Өглөө", "10:00", "Өдөр", "16:00", "Орой"];
}

function Row({
  label,
  value,
  large,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <tr>
      <td
        style={{
          padding: "2pt 6pt 2pt 0",
          color: "#64748b",
          fontSize: "9pt",
          width: "42%",
          verticalAlign: "top",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "2pt 0",
          fontWeight: large ? 700 : 600,
          fontSize: large ? "12pt" : "10pt",
          color: large ? "#0f172a" : "#1e293b",
        }}
      >
        {value}
      </td>
    </tr>
  );
}

export default function PrintTemplate({
  drugs,
  results,
  weightKg,
  totalAgeMo,
}: PrintTemplateProps) {
  const d = new Date();
  const date = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
  const age = ageLabel(totalAgeMo);

  return (
    <div className="hidden print-only p-5">
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "10pt",
          color: "#0f172a",
          lineHeight: 1.45,
        }}
      >
        {/* ── Page header ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingBottom: "8pt",
            marginBottom: "10pt",
            borderBottom: "2pt solid #1e40af",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8pt" }}>
            <div
              style={{
                width: "26pt",
                height: "26pt",
                background: "#1e40af",
                borderRadius: "5pt",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "13pt",
                  letterSpacing: "-0.01em",
                }}
              >
                ЭМИЙН ТУНГИЙН ЗААВАР
              </div>
              <div style={{ fontSize: "8pt", color: "#94a3b8" }}>
                dosage.vercel.app
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: "9pt",
              color: "#64748b",
              paddingTop: "2pt",
            }}
          >
            Огноо: {date}
          </div>
        </div>

        {/* ── Patient info bar ── */}
        <div
          style={{
            display: "flex",
            gap: "24pt",
            background: "#f8fafc",
            border: "1pt solid #e2e8f0",
            borderRadius: "4pt",
            padding: "6pt 10pt",
            marginBottom: "14pt",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "8pt",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Жин:{" "}
            </span>
            <span style={{ fontWeight: 700 }}>{weightKg} кг</span>
          </div>
          {age && (
            <div>
              <span
                style={{
                  fontSize: "8pt",
                  color: "#94a3b8",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Нас:{" "}
              </span>
              <span style={{ fontWeight: 700 }}>{age}</span>
            </div>
          )}
        </div>

        {/* ── Drug sections ── */}
        {drugs.map((drug, index) => {
          const result = results.get(drug.id);
          const isIvIm = drug.route === "iv_im";

          return (
            <div
              key={drug.id}
              style={{
                marginBottom: "12pt",
                breakInside: "avoid",
                pageBreakInside: "avoid",
                border: "1pt solid #e2e8f0",
                borderRadius: "4pt",
                overflow: "hidden",
              }}
            >
              {/* Drug name bar */}
              <div
                style={{
                  background: "#eff6ff",
                  borderLeft: "4pt solid #1d4ed8",
                  padding: "6pt 10pt",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8pt",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6pt" }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "10pt",
                      color: "#93c5fd",
                      minWidth: "14pt",
                    }}
                  >
                    {index + 1}.
                  </span>
                  <span style={{ fontWeight: 700, fontSize: "12pt" }}>
                    {drug.name}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "4pt", flexShrink: 0 }}>
                  <span
                    style={{
                      background: "#dbeafe",
                      color: "#1e40af",
                      padding: "1pt 7pt",
                      borderRadius: "20pt",
                      fontSize: "8pt",
                      fontWeight: 600,
                    }}
                  >
                    {CATEGORY_LABELS[drug.category]}
                  </span>
                  {isIvIm && (
                    <span
                      style={{
                        background: "#f3e8ff",
                        color: "#6d28d9",
                        padding: "1pt 7pt",
                        borderRadius: "20pt",
                        fontSize: "8pt",
                        fontWeight: 600,
                      }}
                    >
                      IV/IM
                    </span>
                  )}
                  <span
                    style={{
                      background: "#f1f5f9",
                      color: "#64748b",
                      padding: "1pt 7pt",
                      borderRadius: "20pt",
                      fontSize: "8pt",
                    }}
                  >
                    {ROUTE_LABELS[drug.route]}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: "8pt 10pt" }}>
                {!result || result.type === "ineligible" ? (
                  <div
                    style={{
                      background: "#fef2f2",
                      border: "1pt solid #fecaca",
                      borderRadius: "3pt",
                      padding: "6pt 10pt",
                      color: "#991b1b",
                      fontSize: "9pt",
                    }}
                  >
                    ✕&nbsp;{result ? result.reason : "Тооцоолол боломжгүй"}
                  </div>
                ) : (
                  <>
                    {/* Dose rows */}
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "8pt",
                      }}
                    >
                      <tbody>
                        <Row
                          label="Нэг удаагийн тун"
                          large
                          value={(() => {
                            const { doseMin, doseMax } = result.data;
                            const range = Math.abs(doseMax - doseMin) > 0.05;
                            return range
                              ? `${formatDose(doseMin)}–${formatDose(doseMax)} мг`
                              : `${formatDose(doseMin)} мг`;
                          })()}
                        />
                        <Row
                          label="Давтамж"
                          value={FREQUENCY_LABELS[result.data.frequencyLabel]}
                        />
                        <Row
                          label="Өдрийн нийт тун"
                          value={(() => {
                            const { dailyDoseMin, dailyDoseMax } = result.data;
                            const range =
                              Math.abs(dailyDoseMax - dailyDoseMin) > 0.05;
                            return range
                              ? `${formatDose(dailyDoseMin)}–${formatDose(dailyDoseMax)} мг`
                              : `${formatDose(dailyDoseMin)} мг`;
                          })()}
                        />
                        {result.data.durationDays && (
                          <Row
                            label="Курс"
                            value={`${result.data.durationDays} хоног`}
                          />
                        )}
                        {result.data.cappedAtMax && (
                          <tr>
                            <td
                              colSpan={2}
                              style={{
                                padding: "2pt 0",
                                color: "#b45309",
                                fontSize: "8pt",
                              }}
                            >
                              ⚠ Хамгийн их туннд хязгаарлагдсан
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* Formulations */}
                    {result.data.formulationResults.length > 0 && !isIvIm && (
                      <div
                        style={{
                          background: "#f8fafc",
                          borderRadius: "3pt",
                          padding: "5pt 8pt",
                          marginBottom: "8pt",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "8pt",
                            color: "#64748b",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            marginBottom: "4pt",
                          }}
                        >
                          Хэлбэр тус бүрд (нэг удаа)
                        </div>
                        {result.data.formulationResults.map((fr, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "9pt",
                              marginBottom: "2pt",
                            }}
                          >
                            <span style={{ color: "#475569" }}>
                              {fr.displayLabel}
                            </span>
                            <span style={{ fontWeight: 700 }}>
                              {formatAmount(fr)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Schedule */}
                    <div
                      style={{
                        marginBottom:
                          result.data.warnings.length > 0 || result.data.notes
                            ? "8pt"
                            : 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "8pt",
                          color: "#64748b",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginRight: "8pt",
                        }}
                      >
                        Хуваарь:
                      </span>
                      {scheduleTimes(result.data.frequencyPerDay).map((t) => (
                        <span
                          key={t}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3pt",
                            marginRight: "12pt",
                            fontSize: "9pt",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "9pt",
                              height: "9pt",
                              border: "1pt solid #94a3b8",
                              borderRadius: "2pt",
                              flexShrink: 0,
                            }}
                          />
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Warnings */}
                    {result.data.warnings.length > 0 && (
                      <div
                        style={{
                          background: "#fffbeb",
                          border: "1pt solid #fde68a",
                          borderRadius: "3pt",
                          padding: "5pt 8pt",
                          marginBottom: result.data.notes ? "6pt" : 0,
                        }}
                      >
                        <div
                          style={{
                            fontSize: "8pt",
                            color: "#92400e",
                            fontWeight: 700,
                            marginBottom: "3pt",
                          }}
                        >
                          ⚠ АНХААРУУЛГА
                        </div>
                        {result.data.warnings.map((w, i) => (
                          <div
                            key={i}
                            style={{
                              fontSize: "9pt",
                              color: "#78350f",
                              marginBottom: "2pt",
                            }}
                          >
                            • {w}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Notes */}
                    {result.data.notes && (
                      <div
                        style={{
                          fontSize: "9pt",
                          color: "#475569",
                          fontStyle: "italic",
                        }}
                      >
                        {result.data.notes}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}

        {/* ── Signature ── */}
        <div
          style={{
            marginTop: "14pt",
            paddingTop: "10pt",
            borderTop: "1pt solid #cbd5e1",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24pt",
              marginBottom: "10pt",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "9pt",
                  color: "#64748b",
                  marginBottom: "4pt",
                }}
              >
                Эмчийн гарын үсэг
              </div>
              <div
                style={{ borderBottom: "1pt solid #94a3b8", height: "22pt" }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: "9pt",
                  color: "#64748b",
                  marginBottom: "4pt",
                }}
              >
                Огноо / Тамга
              </div>
              <div
                style={{ borderBottom: "1pt solid #94a3b8", height: "22pt" }}
              />
            </div>
          </div>
          <div style={{ fontSize: "8pt", color: "#94a3b8", lineHeight: 1.5 }}>
            Энэхүү тооцоолуур нь туслах хэрэгсэл бөгөөд мэргэжлийн эмчийн
            шийдвэрийг орлохгүй. Эмийн тунг хэрэглэхдээ эмчтэй зөвлөлдөнө үү.
          </div>
        </div>
      </div>
    </div>
  );
}
