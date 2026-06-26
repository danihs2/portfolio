import Link from "next/link";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { deleteBlogPostAction } from "@/lib/server/admin-actions";
import { prisma } from "@/lib/server/prisma";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default async function AdminBlogPage() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-3xl uppercase sm:text-4xl">
          Blog Manager
        </h1>
        <Button
          asChild
          className="border-4 border-black shadow-retro-sm uppercase"
        >
          <Link href="/admin/blog/new">New Post</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="border-4 border-black bg-card shadow-retro-md"
          >
            <Card.Content className="space-y-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="retro-badge text-[10px] sm:text-xs">
                      {post.status}
                    </span>
                    <span className="retro-badge text-[10px] sm:text-xs">
                      {post.slug}
                    </span>
                  </div>
                  <p className="font-display text-2xl uppercase">
                    {post.title}
                  </p>
                  <p className="font-medium leading-relaxed">{post.excerpt}</p>
                  <p className="text-sm font-black uppercase text-muted-foreground">
                    Updated {formatDate(post.updatedAt)}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    asChild
                    variant="secondary"
                    className="border-4 border-black shadow-retro-sm uppercase"
                  >
                    <Link href={`/admin/blog/${post.id}`}>Edit</Link>
                  </Button>
                  <form action={deleteBlogPostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button
                      type="submit"
                      className="w-full border-4 border-black shadow-retro-sm uppercase sm:w-auto"
                    >
                      Delete
                    </Button>
                  </form>
                </div>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}
