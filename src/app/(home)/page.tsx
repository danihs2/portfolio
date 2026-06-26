import type { Metadata } from "next";
import { HomePageClient } from "@/components/portfolio/home-page-client";
import {
  getGithubOverview,
  getHackatimeStats,
} from "@/lib/server/portfolio-data";
import {
  contactMailtoUrl,
  githubUrl,
  hackatimeUrl,
  linkedinUrl,
  ogImageUrl,
  siteUrl,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Daniel Hachac Salas",
  },
  description:
    "Full-stack developer building production-ready applications, integrations, and Linux VPS deployments.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Daniel Hachac Salas",
    "Daniel Hachac",
    "Daniel Salas",
    "Hachac Salas",
    "Daniel Hachac Salas portfolio",
    "full stack developer",
    "VPS deployment engineer",
    "REST API integrations",
    "software delivery",
  ],
  openGraph: {
    title: "Daniel Hachac Salas | Full-Stack Developer",
    description:
      "Production-focused full-stack development, integrations, and Linux VPS delivery.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Daniel Hachac Salas Portfolio Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Hachac Salas",
    description:
      "Production-focused full-stack development, integrations, and Linux VPS delivery.",
    images: [ogImageUrl],
  },
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

async function safeFetch<T>(fallback: T, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function HomePage() {
  const [initialHackatime, initialGitHubOverview] = await Promise.all([
    safeFetch(null, () => getHackatimeStats()),
    safeFetch(null, () => getGithubOverview()),
  ]);

  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Daniel Hachac Salas Portfolio",
    url: siteUrl,
    description:
      "Full-stack developer portfolio focused on shipping production-ready software.",
    mainEntity: {
      "@type": "Person",
      name: "Daniel Hachac Salas",
      url: siteUrl,
      sameAs: [githubUrl, linkedinUrl, hackatimeUrl, contactMailtoUrl],
    },
    significantLink: [githubUrl, linkedinUrl, `${siteUrl}/project`, `${siteUrl}/contact`],
  };

  const profileStatsJsonLd = initialGitHubOverview
    ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Daniel Hachac Salas GitHub Portfolio Stats",
        description:
          "Live GitHub repository, stars, forks, and watcher metrics.",
        license: "https://opensource.org/licenses/MIT",
        creator: {
          "@type": "Person",
          name: "Daniel Hachac Salas",
        },
        distribution: {
          "@type": "DataDownload",
          contentUrl: `${siteUrl}/api/portfolio/github-overview`,
          encodingFormat: "application/json",
        },
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homepageJsonLd) }}
      />
      {profileStatsJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(profileStatsJsonLd),
          }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <HomePageClient
        initialHackatime={initialHackatime}
        initialGitHubOverview={initialGitHubOverview}
      />
    </>
  );
}
