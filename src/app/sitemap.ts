import type { MetadataRoute } from "next";
import { primaryNav } from "@/config/navigation";
import { services } from "@/config/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const implementedRoutes = primaryNav.filter((item) => item.implemented);

  const topLevel: MetadataRoute.Sitemap = implementedRoutes.map((item) => ({
    url: absoluteUrl(item.href),
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));

  const serviceDetail: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...topLevel, ...serviceDetail];
}