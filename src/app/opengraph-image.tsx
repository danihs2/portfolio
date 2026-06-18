import { buildOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Daniel Salas Portfolio v5 preview";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return buildOgImage({
    eyebrow: "Daniel Salas Portfolio v5",
    title: "Daniel Salas",
    subtitle: "Founder | Full Stack Developer | Let's Connect",
    accent: "primary",
  });
}
