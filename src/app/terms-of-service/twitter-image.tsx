import { buildTwitterImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Terms of Service | Daniel Salas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildTwitterImage({
    eyebrow: "Terms Of Service",
    title: "Daniel Salas",
    subtitle: "Legal And Delivery Terms",
    accent: "accent",
  });
}
