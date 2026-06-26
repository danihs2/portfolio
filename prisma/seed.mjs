import { createHash, randomBytes, scryptSync } from "node:crypto";
import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL ?? "danielhachac@gmail.com";
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!password) {
    throw new Error(
      "Missing ADMIN_SEED_PASSWORD. Set it in your environment before running the seed.",
    );
  }

  const passwordHash = hashPassword(password);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
    },
    create: {
      email,
      passwordHash,
    },
  });

  const draftCount = await prisma.blogPost.count();
  if (draftCount === 0) {
    await prisma.blogPost.create({
      data: {
        title: "Portfolio Editorial Pipeline",
        slug: "portfolio-editorial-pipeline",
        excerpt:
          "Initial seeded draft used to verify the admin blog workflow after deployment.",
        content:
          "This draft confirms that Prisma migrations, admin authentication, and blog management are working correctly after deployment.",
        status: "DRAFT",
        authorId: admin.id,
      },
    });
  }

  const fingerprint = createHash("sha256").update(email).digest("hex").slice(0, 12);
  console.log(`Seed completed for admin ${email} (${fingerprint})`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
