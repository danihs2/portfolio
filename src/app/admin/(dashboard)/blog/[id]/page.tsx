import { notFound } from "next/navigation";
import { Card } from "@/components/retroui/Card";
import { updateBlogPostAction } from "@/lib/server/admin-actions";
import { prisma } from "@/lib/server/prisma";

type AdminEditBlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditBlogPostPage({
  params,
}: AdminEditBlogPostPageProps) {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl uppercase sm:text-4xl">
        Edit Blog Post
      </h1>
      <Card className="border-4 border-black bg-card shadow-retro-md">
        <Card.Content>
          <form action={updateBlogPostAction} className="space-y-4">
            <input type="hidden" name="id" value={post.id} />

            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">Title</span>
              <input
                type="text"
                name="title"
                defaultValue={post.title}
                className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">Slug</span>
              <input
                type="text"
                name="slug"
                defaultValue={post.slug}
                className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">Excerpt</span>
              <textarea
                name="excerpt"
                rows={3}
                defaultValue={post.excerpt}
                className="w-full border-4 border-black bg-background px-3 py-2 font-medium shadow-retro-sm"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">Content</span>
              <textarea
                name="content"
                rows={14}
                defaultValue={post.content}
                className="w-full border-4 border-black bg-background px-3 py-2 font-medium shadow-retro-sm"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">Status</span>
              <select
                name="status"
                defaultValue={post.status}
                className="h-11 w-full border-4 border-black bg-background px-3 font-black uppercase shadow-retro-sm"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </label>

            <button
              type="submit"
              className="inline-flex items-center justify-center border-4 border-black bg-primary px-4 py-2 text-sm font-black uppercase text-primary-foreground shadow-retro-sm"
            >
              Update Post
            </button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
