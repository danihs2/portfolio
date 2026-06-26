"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  verifyPassword,
} from "@/lib/server/auth";
import { prisma } from "@/lib/server/prisma";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase and hyphenated."),
  excerpt: z.string().min(12, "Excerpt must be at least 12 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

function normalizePostInput(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    status: String(formData.get("status") ?? "DRAFT").trim().toUpperCase(),
  };
}

export async function loginAdminAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    password: String(formData.get("password") ?? ""),
  });

  if (!parsed.success) {
    redirect("/admin/login?error=invalid_credentials");
  }

  const user = await prisma.adminUser.findUnique({
    where: { email: parsed.data.email },
  });

  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    redirect("/admin/login?error=invalid_credentials");
  }

  await createAdminSession(user.id);
  redirect("/admin");
}

export async function logoutAdminAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function createBlogPostAction(formData: FormData) {
  const user = await requireAdmin();
  const parsed = blogPostSchema.safeParse(normalizePostInput(formData));

  if (!parsed.success) {
    redirect("/admin/blog/new?error=invalid_post");
  }

  await prisma.blogPost.create({
    data: {
      ...parsed.data,
      publishedAt:
        parsed.data.status === "PUBLISHED" ? new Date() : null,
      authorId: user.id,
    },
  });

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}

export async function updateBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();
  const parsed = blogPostSchema.safeParse(normalizePostInput(formData));

  if (!id || !parsed.success) {
    redirect(`/admin/blog/${id || ""}?error=invalid_post`);
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });
  if (!existing) {
    redirect("/admin/blog?error=not_found");
  }

  await prisma.blogPost.update({
    where: { id },
    data: {
      ...parsed.data,
      publishedAt:
        parsed.data.status === "PUBLISHED"
          ? existing.publishedAt ?? new Date()
          : null,
    },
  });

  revalidatePath("/admin/blog");
  redirect(`/admin/blog/${id}?saved=1`);
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();

  if (id) {
    await prisma.blogPost.delete({
      where: { id },
    });
  }

  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
