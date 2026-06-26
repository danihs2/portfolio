import { Card } from "@/components/retroui/Card";
import { hasDatabaseUrl } from "@/lib/server/database";
import { prisma } from "@/lib/server/prisma";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}

export default async function AdminContactsPage() {
  if (!hasDatabaseUrl()) {
    return null;
  }

  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <h1 className="font-display text-3xl uppercase sm:text-4xl">
        Contact Entries
      </h1>

      <div className="grid grid-cols-1 gap-4">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            className="border-4 border-black bg-card shadow-retro-md"
          >
            <Card.Content className="space-y-3">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-1">
                  <p className="font-display text-2xl uppercase">
                    {contact.name}
                  </p>
                  <p className="font-medium">
                    {contact.email} · {contact.country}
                  </p>
                  <p className="text-sm font-black uppercase text-muted-foreground">
                    {formatDate(contact.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-black uppercase">
                  <span className="retro-badge">{contact.phone || "No phone"}</span>
                  <span className="retro-badge">
                    {contact.expectedStartDate || "No start date"}
                  </span>
                  <span className="retro-badge">
                    {contact.expectedEndDate || "No end date"}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-black uppercase text-muted-foreground">
                  Business Inquiry
                </p>
                <p className="font-medium leading-relaxed">
                  {contact.businessInquiry}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-black uppercase text-muted-foreground">
                  Project Details
                </p>
                <p className="font-medium leading-relaxed">
                  {contact.projectDetails}
                </p>
              </div>
            </Card.Content>
          </Card>
        ))}

        {contacts.length === 0 ? (
          <Card className="border-4 border-black bg-card shadow-retro-md">
            <Card.Content>
              <p className="font-medium">No contact submissions have been stored yet.</p>
            </Card.Content>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
