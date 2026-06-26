import "server-only";

export function hasDatabaseUrl() {
  const databaseUrl = process.env["DATABASE_URL"];
  return typeof databaseUrl === "string" && databaseUrl.trim().length > 0;
}
