import type { MetadataRoute } from "next";
import { cheatSheets, utilityTools } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://smartstack.dev";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/cheatsheets`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    ...cheatSheets.map((sheet) => ({
      url: `${base}/cheatsheets/${sheet.slug}`,
      lastModified: new Date(sheet.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...utilityTools.map((tool) => ({
      url: `${base}/tools#${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
