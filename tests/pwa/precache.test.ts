import { describe, expect, it } from "vitest";
import { isPrecached, precacheUrls, urlOf } from "@/lib/pwa/precache";

describe("urlOf", () => {
  it("HTML-ийг Cloudflare-ийн цэвэр URL болгоно", () => {
    expect(urlOf("index.html")).toBe("/");
    expect(urlOf("dose.html")).toBe("/dose");
    expect(urlOf("dose/amoxicillin.html")).toBe("/dose/amoxicillin");
    expect(urlOf("burns/index.html")).toBe("/burns");
  });

  it("бусад файлыг замаар нь, тусгай тэмдэгтийг encode хийнэ", () => {
    expect(urlOf("_next/static/chunks/app.js")).toBe("/_next/static/chunks/app.js");
    expect(urlOf("dose/__next.dose.$d$slug.txt")).toBe("/dose/__next.dose.$d$slug.txt");
    expect(urlOf("a b.txt")).toBe("/a%20b.txt");
  });
});

describe("isPrecached", () => {
  it("хуудас, RSC payload, static asset, дүрсийг оруулна", () => {
    const files = ["dose.html", "dose.txt", "burns/__next._full.txt", "_next/static/css/a.css", "icon-192.png", "manifest.webmanifest"];
    expect(files.filter(isPrecached)).toEqual(files);
  });

  it("мөлхөгч, сошиал, host тохиргоо, SW-ийг хасна", () => {
    const files = ["robots.txt", "sitemap.xml", "opengraph-image.png", "_headers", "sw.js", "brand/logo.svg"];
    expect(files.filter(isPrecached)).toEqual([]);
  });

  it("эмийн хуудсыг урьдчилан кэшлэхгүй — зочилсон үед кэшлэгдэнэ", () => {
    const files = ["dose/amoxicillin.html", "dose/amoxicillin.txt", "dose/amoxicillin/__next._full.txt"];
    expect(files.filter(isPrecached)).toEqual([]);
  });
});

describe("precacheUrls", () => {
  it("эрэмбэлсэн, давхардалгүй, зөвхөн кэшлэх файл", () => {
    expect(precacheUrls(["dose.html", "robots.txt", "index.html", "dose/index.html"])).toEqual(["/", "/dose"]);
  });
});
