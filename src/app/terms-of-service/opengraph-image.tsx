import { buildOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Terms of Service | Daniel Salas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "Terms Of Service",
    title: "Service Terms",
    subtitle: "Usage Rights And Conditions",
    accent: "accent",
  });
}
