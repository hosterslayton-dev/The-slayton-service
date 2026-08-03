import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Slayton",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#0e0d0b",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
