import { describe, expect, it } from "vitest";
import type { PromptState } from "@/lib/pwa/install-prompt";
import { platformOf, shouldPrompt } from "@/lib/pwa/install-prompt";

const IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const ANDROID =
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36";
const MAC =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15";

const READY: PromptState = {
  platform: "ios",
  standalone: false,
  dismissed: false,
  hasCalculated: true,
  androidReady: false,
};

describe("platformOf", () => {
  it.each([
    [IPHONE, "ios"],
    [ANDROID, "android"],
    [MAC, undefined],
  ])("%#", (ua, platform) => {
    expect(platformOf(ua)).toBe(platform);
  });
});

describe("shouldPrompt", () => {
  it("iOS: тооцоолол хийсний дараа заавар харуулна", () => {
    expect(shouldPrompt(READY)).toBe(true);
  });

  it("Android: хөтөч бэлэн болсны дараа л", () => {
    const android = { ...READY, platform: "android" } as const;
    expect(shouldPrompt(android)).toBe(false);
    expect(shouldPrompt({ ...android, androidReady: true })).toBe(true);
  });

  it.each<[string, Partial<PromptState>]>([
    ["тооцоолол хийгээгүй", { hasCalculated: false }],
    ["аль хэдийн суусан", { standalone: true }],
    ["өмнө нь хаасан", { dismissed: true }],
    ["desktop", { platform: undefined }],
  ])("%s → гаргахгүй", (_, patch) => {
    expect(shouldPrompt({ ...READY, ...patch })).toBe(false);
  });
});
