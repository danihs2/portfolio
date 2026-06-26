import type { Metadata } from "next";
import { AboutPageClient } from "@/components/pages/about-page-client";
import type { TimelineItem } from "@/components/portfolio/about-timeline";
import { githubUrl, siteUrl } from "@/lib/site-config";

const aboutOgImageUrl = `${siteUrl}/about/opengraph-image`;

export const metadata: Metadata = {
  title: "About",
  description:
    "Professional profile, delivery experience, and technical focus of Daniel Hachac Salas.",
  alternates: {
    canonical: "/about",
  },
  keywords: [
    "Daniel Hachac Salas",
    "Daniel Hachac",
    "Daniel Salas",
    "Hachac Salas",
    "full stack developer",
    "REST API experience",
    "Linux VPS deployment",
  ],
  openGraph: {
    title: "About Daniel Hachac Salas",
    description:
      "Professional profile across application delivery, integrations, and Linux VPS operations.",
    url: `${siteUrl}/about`,
    type: "profile",
    images: [
      {
        url: aboutOgImageUrl,
        width: 1200,
        height: 630,
        alt: "About Daniel Hachac Salas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Daniel Hachac Salas",
    description:
      "Professional profile across application delivery, integrations, and Linux VPS operations.",
    images: [aboutOgImageUrl],
  },
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

const timelineItems: TimelineItem[] = [
  {
    period: "2023 - Present",
    title: "Freelance Full-Stack Developer",
    description:
      "Building full web applications and backend integrations for independent projects and Upwork-style client delivery.",
    highlights: [
      "Develop applications with Next.js, Django, .NET, and Node.js.",
      "Implement business logic, APIs, authentication, and database-backed workflows.",
      "Manage Linux VPS deployments with SSH, SSL, domains, and DNS configuration.",
    ],
  },
  {
    period: "Feb 2024 - May 2025 / Aug 2025 - May 2026",
    title: "Full-Stack Developer · Criteria Inteligencia de Negocios",
    description:
      "Delivered software for business operations, fiscal workflows, and mobile-connected products.",
    highlights: [
      "Developed and maintained REST APIs using PHP and Slim Framework.",
      "Contributed to Flutter applications for fiscal solutions tied to SAT-certified workflows.",
      "Integrated Firebase, Supabase, payment methods, external APIs, and webhooks.",
    ],
  },
  {
    period: "2026",
    title: "Selected Product Work",
    url: githubUrl,
    description:
      "Recent work includes marketplace platforms, reservation systems, POS software, and supplier-facing portals.",
    highlights: [
      "Built SEO-oriented platforms with Next.js and Supabase.",
      "Delivered reservation products with admin workflows and business operations support.",
      "Implemented CI/CD and production improvements for supplier-facing systems.",
    ],
  },
  {
    period: "2020 - 2025",
    title: "B.S. in Computer Science Engineering",
    description:
      "Completed computer science engineering studies while building production-oriented client and personal projects in parallel.",
    highlights: [
      "Balanced academic training with hands-on delivery work.",
      "Built practical depth in application architecture, databases, and deployment.",
    ],
  },
];

export default function AboutPage() {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Daniel Hachac Salas",
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Person",
      name: "Daniel Hachac Salas",
      url: siteUrl,
      jobTitle: "Full-Stack Developer",
    },
  };

  return (
    <>
      <script type="application/ld+json">{serializeJsonLd(aboutJsonLd)}</script>
      <AboutPageClient timelineItems={timelineItems} />
    </>
  );
}
