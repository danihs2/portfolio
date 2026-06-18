import { buildOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "About Daniel Salas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildOgImage({
    eyebrow: "About",
    title: "About Daniel Salas",
    subtitle: "Founder | Full Stack Developer | Open-Sourcerer",
    accent: "accent",
  });
}
