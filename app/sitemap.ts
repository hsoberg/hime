import type { MetadataRoute } from "next";
import { guideArticles } from "@/app/guider-og-tips/articles";

const BASE_URL = "https://hime.no";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/bestill",
    "/driftsmeldinger",
    "/guider-og-tips",
    "/internett",
    "/kanaler",
    "/kontakt-oss",
    "/kundeservice",
    "/kundeservice/abonnement",
    "/kundeservice/abonnement/flytte",
    "/kundeservice/app",
    "/kundeservice/faktura",
    "/kundeservice/graving",
    "/kundeservice/internett",
    "/kundeservice/tv",
    "/kundeservice/wifi",
    "/tips-og-rad",
    "/tv",
    "/wifi",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const guideEntries: MetadataRoute.Sitemap = guideArticles.map((article) => ({
    url: `${BASE_URL}/guider-og-tips/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticEntries, ...guideEntries];
}