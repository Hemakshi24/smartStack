import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SmartStack",
    short_name: "SmartStack",
    description: "Learn Faster. Code Smarter.",
    start_url: "/",
    display: "standalone",
    background_color: "#050814",
    theme_color: "#22d3ee",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
