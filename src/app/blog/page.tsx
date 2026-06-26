import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/retroui/Card";
import { hasDatabaseUrl } from "@/lib/server/database";
import { prisma } from "@/lib/server/prisma";
import { siteUrl } from "@/lib/site-config";

const blogOgImageUrl = `${siteUrl}/blog/opengraph-image`;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes, delivery breakdowns, and project writeups by Daniel Hachac Salas.",
  alternates: {
    canonical: "/blog",
  },
  keywords: [
    "Daniel Hachac Salas blog",
    "Daniel Hachac",
    "Daniel Salas",
    "developer blog",
    "engineering notes",
    "project breakdowns",
    "delivery writeups",
  ],
  openGraph: {
    title: "Blog | Daniel Hachac Salas",
    description:
      "Engineering notes, delivery breakdowns, and project writeups.",
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
      "Engineering notes, delivery breakdowns, and project writeups.",
    images: [blogOgImageUrl],
  },
};

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

async function getPublishedPosts() {
  if (!hasDatabaseUrl()) {
    return [];
  }

  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ publishedAt: "desc" }, { updatedAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      updatedAt: true,
    },
  });
}

function formatDate(value: Date | null) {
  if (!value) {
    return "Draft";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(value);
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog",
    url: `${siteUrl}/blog`,
    description:
      "Published engineering notes and project writeups by Daniel Hachac Salas.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        item: {
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt?.toISOString() ?? post.updatedAt.toISOString(),
          author: {
            "@type": "Person",
            name: "Daniel Hachac Salas",
            url: siteUrl,
          },
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
          Notes on engineering delivery, integrations, Linux VPS operations,
          debugging work, and practical product execution.
        </p>
      </section>

      {posts.length > 0 ? (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="border-4 border-black bg-card shadow-retro-md"
            >
              <Card.Content className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="retro-badge text-[10px] sm:text-xs">
                    Published
                  </span>
                  <span className="text-xs font-black uppercase text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <h2 className="font-display text-2xl uppercase">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="font-medium leading-relaxed">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex border-4 border-black bg-primary px-4 py-2 text-sm font-black uppercase text-primary-foreground shadow-retro-sm transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
                >
                  Read Entry
                </Link>
              </Card.Content>
            </Card>
          ))}
        </section>
      ) : (
        <section className="border-4 border-black bg-primary p-6 shadow-retro-lg sm:p-8">
          <h2 className="font-display text-3xl uppercase text-primary-foreground sm:text-4xl">
            No Published Entries Yet
          </h2>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-primary-foreground/90 sm:text-base">
            The admin workflow is already enabled. As soon as a post is created
            and marked as published from the panel, it will appear here.
          </p>
        </section>
      )}
    </div>
  );
}
