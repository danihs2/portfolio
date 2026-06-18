import {
  contactMailtoUrl,
  fiazDevUrl,
  githubUrl,
  linkedinUrl,
  siteUrl,
  xUrl,
  youtubeUrl,
} from "@/lib/site-config";

export interface LinkItem {
  href: string;
  name: string;
  description: string;
}

export const links: LinkItem[] = [
  {
    href: githubUrl,
    name: "GitHub",
    description: "Open source projects and contributions",
  },
  {
    href: linkedinUrl,
    name: "LinkedIn",
    description: "Connect with me professionally",
  },
  {
    href:
      process.env.NEXT_PUBLIC_CODING_STATS_PROVIDER === "hackatime"
        ? "https://heatmap.shymike.dev/?id=30609&timezone=UTC"
        : (process.env.NEXT_PUBLIC_WAKATIME_URL ?? siteUrl),
    name:
      process.env.NEXT_PUBLIC_CODING_STATS_PROVIDER === "hackatime"
        ? "Hackatime Activity"
        : "Wakatime Activity",
    description: "Check my coding activity",
  },
  {
    href: siteUrl,
    name: "Portfolio",
    description: "Visit my main website",
  },
  {
    href: xUrl,
    name: "X (Twitter)",
    description: "Follow me for updates",
  },
  {
    href: youtubeUrl,
    name: "YouTube",
    description: "Subscribe to my channel for tech content",
  },
  {
    href: process.env.NEXT_PUBLIC_DRIBBBLE_URL ?? siteUrl,
    name: "Dribbble",
    description: "My design work and shots",
  },
  {
    href: contactMailtoUrl,
    name: "Contact Me",
    description: "Get in touch via email",
  },
  {
    href: "https://orcid.org/0009-0001-5935-7878",
    name: "ORCID",
    description: "My ORCID researcher profile",
  },
  {
    href: "https://dly.to/LQm0vGkFCsi",
    name: "daily.dev Community",
    description: "AI tools, resources, and developer updates",
  },
  {
    href: process.env.NEXT_PUBLIC_DAILY_DEV_URL ?? siteUrl,
    name: "daily.dev Profile",
    description: "My daily.dev developer profile",
  },
  {
    href: fiazDevUrl,
    name: "Business",
    description: "Developer-first next-generation solutions",
  },
];
