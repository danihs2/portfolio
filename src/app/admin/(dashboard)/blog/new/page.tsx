import { Card } from "@/components/retroui/Card";
import { createBlogPostAction } from "@/lib/server/admin-actions";

export default function AdminNewBlogPostPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl uppercase sm:text-4xl">
        New Blog Post
      </h1>
      <Card className="border-4 border-black bg-card shadow-retro-md">
        <Card.Content>
          <BlogPostForm action={createBlogPostAction} />
        </Card.Content>
      </Card>
    </div>
  );
}

function BlogPostForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-4">
      <label className="block space-y-2">
        <span className="text-sm font-black uppercase">Title</span>
        <input
          type="text"
          name="title"
          className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-black uppercase">Slug</span>
        <input
          type="text"
          name="slug"
          placeholder="my-first-post"
          className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-black uppercase">Excerpt</span>
        <textarea
          name="excerpt"
          rows={3}
          className="w-full border-4 border-black bg-background px-3 py-2 font-medium shadow-retro-sm"
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-black uppercase">Content</span>
        <textarea
          name="content"
          rows={14}
          className="w-full border-4 border-black bg-background px-3 py-2 font-medium shadow-retro-sm"
          required
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-black uppercase">Status</span>
        <select
          name="status"
          defaultValue="DRAFT"
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
        Save Post
      </button>
    </form>
  );
}
