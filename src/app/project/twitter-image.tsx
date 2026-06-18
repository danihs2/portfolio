import { buildTwitterImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Projects by Daniel Salas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildTwitterImage({
    eyebrow: "Projects",
    title: "Daniel Salas",
    subtitle: "Product Engineering Portfolio",
    accent: "primary",
  });
}
