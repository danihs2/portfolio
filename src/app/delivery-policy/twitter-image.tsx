import { buildTwitterImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Delivery Policy | Daniel Salas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildTwitterImage({
    eyebrow: "Delivery Policy",
    title: "Daniel Salas",
    subtitle: "Delivery Modes And Timelines",
    accent: "primary",
  });
}
