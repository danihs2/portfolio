import { buildTwitterImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Blog by Daniel Salas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildTwitterImage({
    eyebrow: "Blog",
    title: "Daniel Salas",
    subtitle: "Product Notes | Engineering",
    accent: "secondary",
  });
}
