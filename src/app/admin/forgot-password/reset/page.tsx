import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { resetPasswordAction } from "@/lib/server/admin-actions";

export const dynamic = "force-dynamic";

type ResetPasswordPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl items-center">
      <Card className="w-full border-4 border-black bg-card shadow-retro-lg">
        <Card.Header>
          <Card.Title className="font-display text-3xl uppercase">
            Choose a new password
          </Card.Title>
          <Card.Description className="text-sm font-medium leading-relaxed sm:text-base">
            Use at least 8 characters and enter the same password twice.
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-4">
          {error ? (
            <div className="border-4 border-black bg-destructive px-4 py-3 text-sm font-black uppercase text-destructive-foreground shadow-retro-sm">
              Passwords must match and contain at least 8 characters.
            </div>
          ) : null}

          <form action={resetPasswordAction} className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">New password</span>
              <input
                type="password"
                name="password"
                minLength={8}
                autoComplete="new-password"
                className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
                required
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-black uppercase">
                Confirm new password
              </span>
              <input
                type="password"
                name="confirmPassword"
                minLength={8}
                autoComplete="new-password"
                className="h-11 w-full border-4 border-black bg-background px-3 font-medium shadow-retro-sm"
                required
              />
            </label>

            <Button
              type="submit"
              className="w-full border-4 border-black uppercase shadow-retro-sm"
            >
              Update password
            </Button>
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
