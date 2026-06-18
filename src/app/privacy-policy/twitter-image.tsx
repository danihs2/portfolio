import { buildTwitterImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Privacy Policy | Daniel Salas";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return buildTwitterImage({
    eyebrow: "Privacy Policy",
    title: "Daniel Salas",
    subtitle: "Data Use And Protection",
    accent: "secondary",
  });
}
