"use client";

import { useRef, useState } from "react";
import { MarkdownContent } from "@/components/blog/MarkdownContent";

type BlogPostEditorProps = {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  post?: {
    id?: string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    tags?: string[];
    status?: "DRAFT" | "PUBLISHED";
  };
};

type FormatAction =
  | "h2"
  | "h3"
  | "bold"
  | "italic"
  | "link"
  | "bullet"
  | "number"
  | "quote";

function normalizeSelection(
  value: string,
  start: number,
  end: number,
  fallback: string,
) {
  const selected = value.slice(start, end);
  return selected || fallback;
}

export function BlogPostEditor({
  action,
  submitLabel,
  post,
}: BlogPostEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(post?.content ?? "");

  function applyFormat(format: FormatAction) {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    const { selectionStart, selectionEnd, value } = textarea;
    const selected = normalizeSelection(value, selectionStart, selectionEnd, "text");
    let replacement = selected;

    if (format === "h2") replacement = `## ${selected}`;
    if (format === "h3") replacement = `### ${selected}`;
    if (format === "bold") replacement = `**${selected}**`;
    if (format === "italic") replacement = `*${selected}*`;
    if (format === "link") replacement = `[${selected}](https://example.com)`;
    if (format === "bullet") replacement = selected
      .split("\n")
      .map((line) => `- ${line || "Item"}`)
      .join("\n");
    if (format === "number") replacement = selected
      .split("\n")
      .map((line, index) => `${index + 1}. ${line || "Item"}`)
      .join("\n");
    if (format === "quote") replacement = selected
      .split("\n")
      .map((line) => `> ${line || "Quote"}`)
      .join("\n");

    const nextValue =
      value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);
    setContent(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        selectionStart,
        selectionStart + replacement.length,
      );
    });
  }

  const toolbar = [
    { label: "H2", format: "h2" },
    { label: "H3", format: "h3" },
    { label: "B", format: "bold" },
    { label: "I", format: "italic" },
    { label: "Link", format: "link" },
    { label: "List", format: "bullet" },
    { label: "1.", format: "number" },
    { label: "Quote", format: "quote" },
  ] as const;

  return (
    <form action={action} className="space-y-5">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-black uppercase">Title</span>
            <input
              type="text"
              name="title"
              defaultValue={post?.title}
              className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
              required
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-black uppercase">Slug</span>
            <input
              type="text"
              name="slug"
              defaultValue={post?.slug}
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
              defaultValue={post?.excerpt}
              className="w-full border-4 border-black bg-background px-3 py-2 font-medium shadow-retro-sm"
              required
            />
          </label>

          <div className="space-y-2">
            <span className="text-sm font-black uppercase">Content</span>
            <div className="flex flex-wrap gap-2 border-4 border-black bg-muted p-2 shadow-retro-sm">
              {toolbar.map((item) => (
                <button
                  key={item.format}
                  type="button"
                  onClick={() => applyFormat(item.format)}
                  className="border-2 border-black bg-card px-3 py-1 text-xs font-black uppercase shadow-retro-sm transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              name="content"
              rows={22}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="min-h-[520px] w-full border-4 border-black bg-background px-3 py-2 font-mono text-sm leading-relaxed shadow-retro-sm"
              required
            />
          </div>
        </div>

        <aside className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-black uppercase">Status</span>
            <select
              name="status"
              defaultValue={post?.status ?? "DRAFT"}
              className="h-11 w-full border-4 border-black bg-background px-3 font-black uppercase shadow-retro-sm"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-black uppercase">SEO Tags</span>
            <input
              type="text"
              name="tags"
              defaultValue={post?.tags?.join(", ")}
              placeholder="nextjs, docker, postgres"
              className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
            />
          </label>

          <div className="border-4 border-black bg-background p-3 shadow-retro-sm">
            <p className="text-sm font-black uppercase text-muted-foreground">
              Preview
            </p>
            <div className="mt-3 max-h-[520px] overflow-auto">
              <MarkdownContent content={content} />
            </div>
          </div>
        </aside>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center border-4 border-black bg-primary px-4 py-2 text-sm font-black uppercase text-primary-foreground shadow-retro-sm"
      >
        {submitLabel}
      </button>
    </form>
  );
}
