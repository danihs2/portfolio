import { notFound } from "next/navigation";
import { Card } from "@/components/retroui/Card";
import { BlogPostEditor } from "@/components/blog/BlogPostEditor";
import { updateBlogPostAction } from "@/lib/server/admin-actions";
import { hasDatabaseUrl } from "@/lib/server/database";
import { prisma } from "@/lib/server/prisma";

type AdminEditBlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditBlogPostPage({
  params,
}: AdminEditBlogPostPageProps) {
  if (!hasDatabaseUrl()) {
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
      <Card className="block w-full border-4 border-black bg-card shadow-retro-md">
        <Card.Content>
          <BlogPostEditor
            action={updateBlogPostAction}
            submitLabel="Update Post"
            post={post}
          />
        </Card.Content>
      </Card>
    </div>
  );
}
