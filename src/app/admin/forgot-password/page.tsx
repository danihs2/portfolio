import Link from "next/link";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { requestPasswordResetAction } from "@/lib/server/admin-actions";
import { hasDatabaseUrl } from "@/lib/server/database";

export const dynamic = "force-dynamic";

type ForgotPasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const { error } = await searchParams;
  const isDatabaseConfigured = hasDatabaseUrl();

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center">
      <Card className="w-full border-4 border-black bg-card shadow-retro-lg">
        <Card.Header>
          <Card.Title className="font-display text-3xl uppercase">
            Reset password
          </Card.Title>
          <Card.Description className="text-sm font-medium leading-relaxed sm:text-base">
            Enter your full admin email address. If it matches an account, we
            will send a six-digit code valid for 5 minutes.
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          {error ? (
            <div className="border-4 border-black bg-destructive px-4 py-3 text-sm font-black uppercase text-destructive-foreground shadow-retro-sm">
              {error === "email_unavailable"
                ? "The email could not be sent. Check the SMTP configuration and try again."
                : error === "database_unavailable"
                  ? "The database is not available."
                  : error === "expired"
                    ? "Your reset session expired. Request a new code."
                    : "Enter a complete, valid email address."}
            </div>
          ) : null}

          <form action={requestPasswordResetAction} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">Full email</span>
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

            <Button
              type="submit"
              className="w-full border-4 border-black uppercase shadow-retro-sm"
              disabled={!isDatabaseConfigured}
            >
              Send code
            </Button>
          </form>

          <Link
            href="/admin/login"
            className="inline-flex text-sm font-black uppercase underline underline-offset-4"
          >
            Back to login
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
}
