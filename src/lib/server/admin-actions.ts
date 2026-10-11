"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  createAdminSession,
  createPasswordResetGrant,
  destroyAdminSession,
  requireAdmin,
  resetPasswordWithGrant,
  verifyPassword,
} from "@/lib/server/auth";
import { hasDatabaseUrl } from "@/lib/server/database";
import { sendPasswordResetEmail } from "@/lib/server/mailer";
import {
  createPasswordResetCode,
  hashPasswordResetSecret,
  isPasswordResetExpired,
  matchesPasswordResetSecret,
  PASSWORD_RESET_MAX_ATTEMPTS,
  PASSWORD_RESET_REQUEST_COOLDOWN_MS,
  PASSWORD_RESET_TTL_MS,
} from "@/lib/server/password-reset";
import { prisma } from "@/lib/server/prisma";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const resetEmailSchema = z.object({ email: z.email() });
const resetCodeSchema = z.object({
  email: z.email(),
  code: z.string().regex(/^\d{6}$/),
});
const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword);

const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and hyphenated.",
    ),
  excerpt: z.string().min(12, "Excerpt must be at least 12 characters."),
  content: z.string().min(20, "Content must be at least 20 characters."),
  tags: z.array(z.string().min(1)).max(12),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

function normalizePostInput(formData: FormData) {
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) =>
      tag
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]+/g, "")
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, ""),
    )
    .filter(Boolean);

  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    tags: Array.from(new Set(tags)).slice(0, 12),
    status: String(formData.get("status") ?? "DRAFT")
      .trim()
      .toUpperCase(),
  };
}

export async function loginAdminAction(formData: FormData) {
  if (!hasDatabaseUrl()) {
    redirect("/admin/login?error=database_unavailable");
  }

  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? "")
      .trim()
      .toLowerCase(),
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

export async function requestPasswordResetAction(formData: FormData) {
  if (!hasDatabaseUrl()) {
    redirect("/admin/forgot-password?error=database_unavailable");
  }

  const parsed = resetEmailSchema.safeParse({
    email: String(formData.get("email") ?? "")
      .trim()
      .toLowerCase(),
  });
  if (!parsed.success) {
    redirect("/admin/forgot-password?error=invalid_email");
  }

  const email = parsed.data.email;
  const user = await prisma.adminUser.findUnique({ where: { email } });

  if (user) {
    const recentToken = await prisma.passwordResetToken.findFirst({
      where: {
        userId: user.id,
        createdAt: {
          gt: new Date(Date.now() - PASSWORD_RESET_REQUEST_COOLDOWN_MS),
        },
      },
    });

    if (!recentToken) {
      const code = createPasswordResetCode();
      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });
      const token = await prisma.passwordResetToken.create({
        data: {
          tokenHash: hashPasswordResetSecret(code),
          expiresAt: new Date(Date.now() + PASSWORD_RESET_TTL_MS),
          userId: user.id,
        },
      });

      try {
        await sendPasswordResetEmail(email, code);
      } catch (error) {
        console.error("Could not send password reset email", error);
        await prisma.passwordResetToken.delete({ where: { id: token.id } });
        redirect("/admin/forgot-password?error=email_unavailable");
      }
    }
  }

  redirect(
    `/admin/forgot-password/verify?email=${encodeURIComponent(email)}&sent=1`,
  );
}

export async function verifyPasswordResetCodeAction(formData: FormData) {
  if (!hasDatabaseUrl()) {
    redirect("/admin/forgot-password?error=database_unavailable");
  }

  const parsed = resetCodeSchema.safeParse({
    email: String(formData.get("email") ?? "")
      .trim()
      .toLowerCase(),
    code: String(formData.get("code") ?? "").trim(),
  });
  const email = parsed.success ? parsed.data.email : "";
  const verifyUrl = `/admin/forgot-password/verify?email=${encodeURIComponent(email)}&error=invalid_code`;

  if (!parsed.success) {
    redirect(verifyUrl);
  }

  const user = await prisma.adminUser.findUnique({
    where: { email },
    select: { id: true },
  });
  const token = user
    ? await prisma.passwordResetToken.findFirst({
        where: { userId: user.id, verifiedAt: null },
        orderBy: { createdAt: "desc" },
      })
    : null;

  if (
    !token ||
    token.attempts >= PASSWORD_RESET_MAX_ATTEMPTS ||
    isPasswordResetExpired(token.expiresAt) ||
    !matchesPasswordResetSecret(parsed.data.code, token.tokenHash)
  ) {
    if (
      token &&
      token.attempts < PASSWORD_RESET_MAX_ATTEMPTS &&
      !isPasswordResetExpired(token.expiresAt)
    ) {
      await prisma.passwordResetToken.update({
        where: { id: token.id },
        data: { attempts: { increment: 1 } },
      });
    }
    redirect(verifyUrl);
  }

  await createPasswordResetGrant(token.id);
  redirect("/admin/forgot-password/reset");
}

export async function resetPasswordAction(formData: FormData) {
  if (!hasDatabaseUrl()) {
    redirect("/admin/forgot-password?error=database_unavailable");
  }

  const parsed = resetPasswordSchema.safeParse({
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  });

  if (!parsed.success) {
    redirect("/admin/forgot-password/reset?error=invalid_password");
  }

  if (!(await resetPasswordWithGrant(parsed.data.password))) {
    redirect("/admin/forgot-password?error=expired");
  }

  redirect("/admin/login?reset=success");
}

export async function createBlogPostAction(formData: FormData) {
  const user = await requireAdmin();
  const parsed = blogPostSchema.safeParse(normalizePostInput(formData));

  if (!parsed.success) {
    redirect("/admin/blog/new?error=invalid_post");
  }

  const createdPost = await prisma.blogPost.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
      authorId: user.id,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${createdPost.slug}`);
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
          ? (existing.publishedAt ?? new Date())
          : null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
  revalidatePath(`/blog/${parsed.data.slug}`);
  redirect(`/admin/blog/${id}?saved=1`);
}

export async function deleteBlogPostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "").trim();

  if (id) {
    const existing = await prisma.blogPost.findUnique({
      where: { id },
      select: { slug: true },
    });

    await prisma.blogPost.delete({
      where: { id },
    });

    if (existing) {
      revalidatePath(`/blog/${existing.slug}`);
    }
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}
