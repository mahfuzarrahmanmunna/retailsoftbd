import type { MetadataRoute } from "next";
import { industries, site, solutions } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/solutions", "/hardware", "/industries", "/services", "/work", "/about", "/contact", "/privacy-policy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...solutions.map((s) => ({ url: `${site.url}/solutions/${s.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...industries.map((i) => ({ url: `${site.url}/industries/${i.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
