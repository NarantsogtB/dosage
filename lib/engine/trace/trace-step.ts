/**
 * Тооцооллын нэг алхам.
 * Эмчид "15 мг/кг × 12 кг = 180 мг" гэж харуулах нь black-box
 * калькулятороос эмнэлзүйн хэрэгсэл болгох гол ялгаа.
 */
export interface TraceStep {
  readonly labelMn: string;
  readonly expression: string;
  readonly resultMg: number;
}

export const createTraceStep = (
  labelMn: string,
  expression: string,
  resultMg: number,
): TraceStep => ({ labelMn, expression, resultMg });
