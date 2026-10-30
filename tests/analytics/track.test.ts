import { afterEach, describe, expect, it, vi } from "vitest";
import { track } from "@/lib/analytics/track";

const EVENT = { name: "drug_selected", drugId: "amoxicillin" } as const;

const blocked = () => {
  throw new Error("blocked");
};
const silent = () => {};
const trackEvent = () => track(EVENT);

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("track", () => {
  it("production-д sendBeacon-оор /api/e руу JSON илгээнэ", () => {
    vi.stubEnv("NODE_ENV", "production");
    const sendBeacon = vi.fn().mockReturnValue(true);
    vi.stubGlobal("navigator", { sendBeacon });

    track(EVENT);
    expect(sendBeacon).toHaveBeenCalledWith("/api/e", JSON.stringify(EVENT));
  });

  it("sendBeacon байхгүй үед алдаа гаргахгүй", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubGlobal("navigator", {});
    expect(trackEvent).not.toThrow();
  });

  it("sendBeacon throw хийсэн ч алдаа гаргахгүй", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubGlobal("navigator", { sendBeacon: blocked });
    expect(trackEvent).not.toThrow();
  });

  it("хөгжүүлэлтийн үед сүлжээнд явуулахгүй", () => {
    const sendBeacon = vi.fn();
    vi.stubGlobal("navigator", { sendBeacon });
    vi.spyOn(console, "debug").mockImplementation(silent);

    track(EVENT);
    expect(sendBeacon).not.toHaveBeenCalled();
  });
});
