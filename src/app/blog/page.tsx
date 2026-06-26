import type { Metadata } from "next";
import { siteUrl } from "@/lib/site-config";

const blogOgImageUrl = `${siteUrl}/blog/opengraph-image`;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog publishing workspace for upcoming engineering and delivery notes.",
  alternates: {
    canonical: "/blog",
  },
  keywords: [
    "developer blog",
    "engineering notes",
    "project breakdowns",
    "delivery writeups",
  ],
  openGraph: {
    title: "Blog | Daniel Hachac Salas",
    description:
      "Coming soon: engineering notes, delivery breakdowns, and project writeups.",
    url: `${siteUrl}/blog`,
    type: "website",
    images: [
      {
        url: blogOgImageUrl,
        width: 1200,
        height: 630,
        alt: "Daniel Hachac Salas Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Daniel Hachac Salas",
    description:
      "Coming soon: engineering notes, delivery breakdowns, and project writeups.",
    images: [blogOgImageUrl],
  },
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function BlogPage() {
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Blog",
    url: `${siteUrl}/blog`,
    description:
      "Coming soon page for upcoming engineering and delivery articles.",
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
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <div className="space-y-6 pb-16">
      <script type="application/ld+json">{serializeJsonLd(blogJsonLd)}</script>
      <script type="application/ld+json">
        {serializeJsonLd(breadcrumbJsonLd)}
      </script>

      <section className="border-4 border-black bg-card p-4 shadow-retro-lg sm:p-6 md:p-8">
        <h1 className="font-pixel text-3xl uppercase sm:text-4xl md:text-5xl">
          Blog
        </h1>
        <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed sm:text-base">
          I am preparing a proper writing workflow from the new admin panel. The
          public blog will open once the first set of production-ready posts is
          published.
        </p>
      </section>

      <section className="border-4 border-black bg-primary p-6 shadow-retro-lg sm:p-8">
        <h2 className="font-display text-3xl uppercase text-primary-foreground sm:text-4xl">
          Coming Soon
        </h2>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-primary-foreground/90 sm:text-base">
          Upcoming entries will cover product delivery, API integrations, Linux
          VPS operations, debugging notes, and project breakdowns from real
          client work.
        </p>
      </section>
    </div>
  );
}
