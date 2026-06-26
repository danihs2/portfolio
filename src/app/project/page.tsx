import type { Metadata } from "next";
import { ProjectPageClient } from "@/components/pages/project-page-client";
import { portfolioProjects } from "@/lib/portfolio-projects";
import { siteUrl } from "@/lib/site-config";

const projectOgImageUrl = `${siteUrl}/project/opengraph-image`;

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected product work across marketplaces, integrations, portals, reservation systems, and VPS-backed software delivery.",
  alternates: {
    canonical: "/project",
  },
  keywords: [
    "Daniel Hachac Salas",
    "Daniel Hachac",
    "Daniel Salas",
    "portfolio projects",
    "full stack delivery",
    "marketplace platform",
    "Linux VPS deployment",
  ],
  openGraph: {
    title: "Projects | Daniel Hachac Salas",
    description:
      "Selected product work across marketplaces, integrations, portals, and operational software.",
    url: `${siteUrl}/project`,
    type: "website",
    images: [
      {
        url: projectOgImageUrl,
        width: 1200,
        height: 630,
        alt: "Daniel Hachac Salas Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Daniel Hachac Salas",
    description:
      "Selected product work across marketplaces, integrations, portals, and operational software.",
    images: [projectOgImageUrl],
  },
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function ProjectPage() {
  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects by Daniel Hachac Salas",
    url: `${siteUrl}/project`,
    description: "Selected shipped projects and product delivery work.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: portfolioProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.description,
          dateCreated: project.period,
          url: project.liveUrl ?? `${siteUrl}/project`,
        },
      })),
    },
  };

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
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/project`,
      },
    ],
  };

  return (
    <div className="space-y-6 pb-16">
      <script type="application/ld+json">
        {serializeJsonLd(projectsJsonLd)}
      </script>
      <script type="application/ld+json">
        {serializeJsonLd(breadcrumbJsonLd)}
      </script>

      <section className="border-4 border-black bg-card p-4 shadow-retro-lg sm:p-6 md:p-8">
        <h1 className="font-pixel text-3xl uppercase sm:text-4xl md:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed sm:text-base">
          Selected work across SEO-driven marketplaces, payment integrations,
          supplier portals, reservation systems, and Linux VPS-backed
          operations.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="font-display text-2xl uppercase sm:text-3xl">
          Delivery Index
        </h2>
        <p className="text-sm font-medium leading-relaxed sm:text-base">
          Browse the current portfolio by category, search for a delivery
          context, and open the live projects that are publicly accessible.
        </p>
      </section>

      <ProjectPageClient />
    </div>
  );
}
