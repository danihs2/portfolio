import Link from "next/link";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { prisma } from "@/lib/server/prisma";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default async function AdminOverviewPage() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  const [contactCount, postCount, publishedCount, latestContact, latestPost] =
    await Promise.all([
      prisma.contactSubmission.count(),
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
      prisma.contactSubmission.findFirst({ orderBy: { createdAt: "desc" } }),
      prisma.blogPost.findFirst({ orderBy: { updatedAt: "desc" } }),
    ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: "Contact Entries", value: String(contactCount) },
          { label: "Blog Posts", value: String(postCount) },
          { label: "Published Posts", value: String(publishedCount) },
        ].map((item) => (
          <Card
            key={item.label}
            className="border-4 border-black bg-card shadow-retro-md"
          >
            <Card.Content className="space-y-2">
              <p className="text-sm font-black uppercase text-muted-foreground">
                {item.label}
              </p>
              <p className="font-display text-4xl uppercase">{item.value}</p>
            </Card.Content>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="border-4 border-black bg-card shadow-retro-md">
          <Card.Header>
            <Card.Title className="font-display text-2xl uppercase">
              Latest Contact
            </Card.Title>
          </Card.Header>
          <Card.Content className="space-y-3">
            {latestContact ? (
              <>
                <p className="font-medium">
                  {latestContact.name} · {latestContact.email}
                </p>
                <p className="font-medium leading-relaxed">
                  {latestContact.businessInquiry}
                </p>
                <p className="text-sm font-black uppercase text-muted-foreground">
                  {formatDate(latestContact.createdAt)}
                </p>
              </>
            ) : (
              <p className="font-medium">No contact entries yet.</p>
            )}
            <Button
              asChild
              variant="secondary"
              className="border-4 border-black shadow-retro-sm uppercase"
            >
              <Link href="/admin/contacts">Open Contacts</Link>
            </Button>
          </Card.Content>
        </Card>

        <Card className="border-4 border-black bg-card shadow-retro-md">
          <Card.Header>
            <Card.Title className="font-display text-2xl uppercase">
              Latest Blog Update
            </Card.Title>
          </Card.Header>
          <Card.Content className="space-y-3">
            {latestPost ? (
              <>
                <p className="font-medium">
                  {latestPost.title} · {latestPost.status}
                </p>
                <p className="font-medium leading-relaxed">
                  {latestPost.excerpt}
                </p>
                <p className="text-sm font-black uppercase text-muted-foreground">
                  {formatDate(latestPost.updatedAt)}
                </p>
              </>
            ) : (
              <p className="font-medium">No blog posts yet.</p>
            )}
            <Button
              asChild
              variant="secondary"
              className="border-4 border-black shadow-retro-sm uppercase"
            >
              <Link href="/admin/blog">Open Blog</Link>
            </Button>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
