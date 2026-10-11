import { Card } from "@/components/retroui/Card";
import { BlogPostEditor } from "@/components/blog/BlogPostEditor";
import { createBlogPostAction } from "@/lib/server/admin-actions";

export default function AdminNewBlogPostPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl uppercase sm:text-4xl">
        New Blog Post
      </h1>
      <Card className="block w-full border-4 border-black bg-card shadow-retro-md">
        <Card.Content>
          <BlogPostEditor
            action={createBlogPostAction}
            submitLabel="Save Post"
          />
        </Card.Content>
      </Card>
    </div>
  );
}
