import Link from "next/link";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { logoutAdminAction } from "@/lib/server/admin-actions";
import { requireAdmin } from "@/lib/server/auth";
import { hasDatabaseUrl } from "@/lib/server/database";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasDatabaseUrl()) {
    return (
      <div className="space-y-6 pb-16">
        <Card className="border-4 border-black bg-card shadow-retro-lg">
          <Card.Content className="space-y-3">
            <p className="font-display text-3xl uppercase">Admin Console</p>
            <p className="font-medium leading-relaxed">
              The admin panel requires `DATABASE_URL` to be configured. Complete
              the database setup first, then reload this route.
            </p>
          </Card.Content>
        </Card>
      </div>
    );
  }

  const user = await requireAdmin();

  return (
    <div className="space-y-6 pb-16">
      <Card className="border-4 border-black bg-card shadow-retro-lg">
        <Card.Content className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="font-display text-3xl uppercase">Admin Console</p>
            <p className="text-sm font-medium leading-relaxed sm:text-base">
              Signed in as {user.email}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              asChild
              variant="secondary"
              className="border-4 border-black shadow-retro-sm uppercase"
            >
              <Link href="/admin">Overview</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-4 border-black shadow-retro-sm uppercase"
            >
              <Link href="/admin/blog">Blog</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-4 border-black shadow-retro-sm uppercase"
            >
              <Link href="/admin/contacts">Contacts</Link>
            </Button>
            <form action={logoutAdminAction}>
              <Button
                type="submit"
                className="w-full border-4 border-black shadow-retro-sm uppercase sm:w-auto"
              >
                Sign Out
              </Button>
            </form>
          </div>
        </Card.Content>
      </Card>

      {children}
    </div>
  );
}
