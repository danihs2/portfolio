import Link from "next/link";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { verifyPasswordResetCodeAction } from "@/lib/server/admin-actions";

export const dynamic = "force-dynamic";

type VerifyResetCodePageProps = {
  searchParams: Promise<{ email?: string; error?: string; sent?: string }>;
};

export default async function VerifyResetCodePage({
  searchParams,
}: VerifyResetCodePageProps) {
  const { email = "", error, sent } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center">
      <Card className="w-full border-4 border-black bg-card shadow-retro-lg">
        <Card.Header>
          <Card.Title className="font-display text-3xl uppercase">
            Enter your code
          </Card.Title>
          <Card.Description className="text-sm font-medium leading-relaxed sm:text-base">
            Enter the six-digit code sent to your email. It expires in 5
            minutes.
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          {sent ? (
            <div className="border-4 border-black bg-green-300 px-4 py-3 text-sm font-black uppercase text-black shadow-retro-sm">
              If that email belongs to an account, the code is on its way.
            </div>
          ) : null}
          {error ? (
            <div className="border-4 border-black bg-destructive px-4 py-3 text-sm font-black uppercase text-destructive-foreground shadow-retro-sm">
              The code is invalid, expired, or has too many failed attempts.
            </div>
          ) : null}

          <form action={verifyPasswordResetCodeAction} className="space-y-4">
            <input type="hidden" name="email" value={email} />
            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">
                Six-digit code
              </span>
              <input
                type="text"
                name="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                minLength={6}
                maxLength={6}
                className="h-12 w-full border-4 border-black bg-background px-3 text-center font-mono text-2xl font-black tracking-[0.4em] shadow-retro-sm"
                required
              />
            </label>

            <Button
              type="submit"
              className="w-full border-4 border-black uppercase shadow-retro-sm"
            >
              Verify code
            </Button>
          </form>

          <Link
            href="/admin/forgot-password"
            className="inline-flex text-sm font-black uppercase underline underline-offset-4"
          >
            Request another code
          </Link>
        </Card.Content>
      </Card>
    </div>
  );
}
