import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownContent } from "@/components/blog/MarkdownContent";
import { hasDatabaseUrl } from "@/lib/server/database";
import { prisma } from "@/lib/server/prisma";
import { siteUrl } from "@/lib/site-config";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPublishedPost(slug: string) {
  if (!hasDatabaseUrl()) {
    return null;
  }

  return prisma.blogPost.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          email: true,
        },
      },
    },
  });
}

function formatDate(value: Date | null) {
  if (!value) {
    return "Unpublished";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(value);
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    return {
      title: "Blog Entry",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    keywords: post.tags,
    datePublished: post.publishedAt?.toISOString() ?? post.updatedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: "Daniel Hachac Salas",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <article className="space-y-6 pb-16">
      <script type="application/ld+json">
        {serializeJsonLd(articleJsonLd)}
      </script>

      <section className="border-4 border-black bg-card p-4 shadow-retro-lg sm:p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="retro-badge text-[10px] sm:text-xs">Published</span>
          <span className="text-xs font-black uppercase text-muted-foreground">
            {formatDate(post.publishedAt)}
          </span>
        </div>
        <h1 className="mt-4 font-pixel text-3xl uppercase sm:text-4xl md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed sm:text-base">
          {post.excerpt}
        </p>
        {post.tags.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="retro-badge text-[10px] sm:text-xs">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </section>

      <section className="border-4 border-black bg-card p-4 shadow-retro-lg sm:p-6 md:p-8">
        <MarkdownContent content={post.content} />
      </section>
    </article>
  );
}
