import { buildTwitterImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "About Daniel Salas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildTwitterImage({
    eyebrow: "About",
    title: "Daniel Salas",
    subtitle: "Journey | Work | Open-Sourcerer",
    accent: "accent",
  });
}
