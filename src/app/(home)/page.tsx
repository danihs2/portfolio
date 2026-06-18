import type { Metadata } from "next";
import { HomePageClient } from "@/components/portfolio/home-page-client";
import {
  getBlogPosts,
  getGithubOverview,
  getGithubRepos,
  getHackatimeStats,
} from "@/lib/server/portfolio-data";
import {
  donationUrl,
  fiazDevUrl,
  githubUrl,
  hackatimeUrl,
  linkedinUrl,
  linkHubUrl,
  ogImageUrl,
  siteUrl,
  sponsorUrl,
  xUrl,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Daniel Salas",
  },
  description:
    "Daniel Salas portfolio: founder, entrepreneur, full stack developer and open-source contributor.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Daniel Salas portfolio",
    "full stack developer",
    "startup engineer",
    "open source projects",
    "software services",
  ],
  openGraph: {
    title: "Daniel Salas | Founder, Entrepreneur, Full Stack Developer",
    description:
      "Business-first product engineering and open-source execution.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "Daniel Salas Portfolio Home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Salas",
    description:
      "Business-first product engineering and open-source execution.",
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
  const [initialRepos, initialPosts, initialHackatime, initialGitHubOverview] =
    await Promise.all([
      safeFetch([], () => getGithubRepos()),
      safeFetch([], () => getBlogPosts()),
      safeFetch(null, () => getHackatimeStats()),
      safeFetch(null, () => getGithubOverview()),
    ]);

  const homepageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Daniel Salas Portfolio",
    url: siteUrl,
    description: "Founder, entrepreneur, and full stack developer portfolio.",
    mainEntity: {
      "@type": "Person",
      name: "Daniel Salas",
      url: siteUrl,
      sameAs: [
        githubUrl,
        linkedinUrl,
        xUrl,
        hackatimeUrl,
        linkHubUrl,
        fiazDevUrl,
      ],
    },
    significantLink: [linkHubUrl, sponsorUrl, donationUrl, fiazDevUrl],
  };

  const profileStatsJsonLd = initialGitHubOverview
    ? {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Daniel Salas GitHub Portfolio Stats",
        description:
          "Live GitHub repository, stars, forks, and watcher metrics.",
        license: "https://opensource.org/licenses/MIT",
        creator: {
          "@type": "Person",
          name: "Daniel Salas",
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
        initialRepos={initialRepos}
        initialPosts={initialPosts}
        initialHackatime={initialHackatime}
        initialGitHubOverview={initialGitHubOverview}
      />
    </>
  );
}
