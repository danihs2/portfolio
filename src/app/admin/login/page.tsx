import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { loginAdminAction } from "@/lib/server/admin-actions";
import { getCurrentAdminUser } from "@/lib/server/auth";
import { hasDatabaseUrl } from "@/lib/server/database";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    reset?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const isDatabaseConfigured = hasDatabaseUrl();
  const user = await getCurrentAdminUser();
  if (user) {
    redirect("/admin");
  }

  const params = await searchParams;
  const showError = params.error === "invalid_credentials";
  const showDatabaseError = params.error === "database_unavailable";
  const showResetSuccess = params.reset === "success";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center">
      <Card className="w-full border-4 border-black bg-card shadow-retro-lg">
        <Card.Header>
          <Card.Title className="font-display text-3xl uppercase">
            Admin Login
          </Card.Title>
          <Card.Description className="text-sm font-medium leading-relaxed sm:text-base">
            Sign in with the seeded admin account to manage blog drafts and
            contact submissions.
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          {showDatabaseError || !isDatabaseConfigured ? (
            <div className="border-4 border-black bg-destructive px-4 py-3 text-sm font-black uppercase text-destructive-foreground shadow-retro-sm">
              The admin panel requires DATABASE_URL to be available at runtime.
            </div>
          ) : null}

          {showError ? (
            <div className="border-4 border-black bg-destructive px-4 py-3 text-sm font-black uppercase text-destructive-foreground shadow-retro-sm">
              Invalid email or password.
            </div>
          ) : null}

          {showResetSuccess ? (
            <div className="border-4 border-black bg-green-300 px-4 py-3 text-sm font-black uppercase text-black shadow-retro-sm">
              Password updated. You can now sign in.
            </div>
          ) : null}

          <form action={loginAdminAction} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">Email</span>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                autoComplete="email"
                pattern="^[^@ ]+@[^@ ]+[.][^@ ]+$"
                title="Enter your full email address, including the domain."
                className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">Password</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
                required
              />
            </label>

            <Button
              type="submit"
              className="w-full border-4 border-black shadow-retro-sm uppercase"
              disabled={!isDatabaseConfigured}
            >
              Sign In
            </Button>
          </form>

          <Link
            href="/admin/forgot-password"
            className="inline-flex text-sm font-black uppercase underline underline-offset-4"
          >
            Forgot your password?
          </Link>

          <div>
            <Link
              href="/"
              className="inline-flex text-sm font-black uppercase underline underline-offset-4"
            >
              Back to portfolio
            </Link>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
