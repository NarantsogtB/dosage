import type { AnalyticsEvent } from "../../lib/analytics/events";
import { parseEvent, toBlobs } from "../../lib/analytics/events";

/**
 * POST /api/e — analytics event хүлээн авч Analytics Engine-д бичнэ.
 *
 * Cloudflare Pages Function. Next-ийн статик экспорт (`out/`) үүнийг
 * огт хардаггүй; `wrangler pages deploy` root-ийн `functions/`-г
 * автоматаар bundle хийж, зөвхөн `/api/*`-д ажиллуулна — статик
 * хуудсууд Function дуудахгүй.
 *
 * IP, User-Agent, cookie ХАДГАЛАХГҮЙ. Зөвхөн улсын код (Cloudflare-ийн
 * `request.cf.country`).
 *
 * `@cloudflare/workers-types` нэмэхгүйн тулд хэрэгтэй хэсгийг л
 * доор локал байдлаар тодорхойлов.
 */

interface DataPoint {
  readonly indexes: string[];
  readonly blobs: string[];
  readonly doubles: number[];
}

interface Env {
  /** `wrangler.jsonc`-ийн `analytics_engine_datasets` binding. */
  readonly EVENTS?: { writeDataPoint(point: DataPoint): void };
}

type CfRequest = Request & { readonly cf?: { readonly country?: string } };

interface Context {
  readonly request: CfRequest;
  readonly env: Env;
}

const MAX_BODY_BYTES = 1024;

const empty = (status: number) => new Response(null, { status });

const parseJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const readEvent = async (request: Request): Promise<AnalyticsEvent | null> => {
  const text = await request.text();
  return text.length > MAX_BODY_BYTES ? null : parseEvent(parseJson(text));
};

const countryOf = (request: CfRequest): string => request.cf?.country ?? "";

const write = (env: Env, event: AnalyticsEvent, country: string): void =>
  env.EVENTS?.writeDataPoint({
    indexes: [event.name],
    blobs: toBlobs(event, country),
    doubles: [1],
  });

export const onRequestPost = async ({
  request,
  env,
}: Context): Promise<Response> => {
  const event = await readEvent(request);
  if (!event) return empty(400);
  write(env, event, countryOf(request));
  return empty(204);
};
