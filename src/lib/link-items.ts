import {
  contactMailtoUrl,
  githubUrl,
  linkedinUrl,
  siteUrl,
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
    description: "Production code, experiments, and open-source work",
  },
  {
    href: linkedinUrl,
    name: "LinkedIn",
    description: "Professional profile and current experience",
  },
  {
    href: siteUrl,
    name: "Portfolio",
    description: "Main portfolio and project showcase",
  },
  {
    href: contactMailtoUrl,
    name: "Email",
    description: "Direct email for project and collaboration inquiries",
  },
  {
    href: "/contact",
    name: "Contact Me",
    description: "Project inquiry form and direct contact page",
  },
];
