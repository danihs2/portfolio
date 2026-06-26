# Database and Admin Setup

## Required Environment Variables

Set these values in your deployment environment before the application starts:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?schema=public"
ADMIN_SEED_EMAIL="danielhachac@gmail.com"
ADMIN_SEED_PASSWORD="password"
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="smtp-user"
SMTP_PASS="smtp-password"
SMTP_FROM="Portfolio <no-reply@example.com>"
CONTACT_NOTIFICATION_TO="danielhachac@gmail.com"
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
```

## What Runs On Deploy

The production start command now runs:

1. `prisma migrate deploy`
2. `node prisma/seed.ts`
3. `next start`

This means each deploy will:

- apply pending Prisma migrations
- create or update the default admin user
- keep the seeded draft post available for admin verification

The seed is safe to rerun because it uses `upsert` for the admin account.

## Local Setup

Install dependencies and generate Prisma client:

```bash
npm install
```

If you need to regenerate Prisma client manually:

```bash
npm run db:generate
```

## Migration Commands

For production-compatible migration execution:

```bash
npm run db:migrate
```

To run migrations plus seed manually:

```bash
npm run db:deploy
```

## Admin Access

After the first successful deploy:

- Open `/admin/login`
- Sign in with `ADMIN_SEED_EMAIL`
- Use the password from `ADMIN_SEED_PASSWORD`

By default, the expected email is `danielhachac@gmail.com`.

## Contact Form Flow

Each successful public contact submission will:

1. validate the request server-side
2. insert a new row into `ContactSubmission`
3. send an email notification to `CONTACT_NOTIFICATION_TO`

If SMTP is missing or invalid, form submission will fail so the site does not silently drop contact requests.

## Docker Note

The Docker image already starts the app on port `3000` and runs:

1. `prisma migrate deploy`
2. `node prisma/seed.mjs`
3. `next start`

### Build the image

```bash
docker build -t portfolio .
```

### Run the container

Use the same container name and port mapping:

```bash
docker run -d \
  --name portfolio \
  -p 3000:3000 \
  --env-file .env.production \
  portfolio
```

### Update an existing deployment

```bash
docker stop portfolio
docker rm portfolio
docker build -t portfolio .
docker run -d \
  --name portfolio \
  -p 3000:3000 \
  --env-file .env.production \
  portfolio
```

If you deploy outside Docker, reproduce the same migration + seed + start sequence in your process manager or deploy hook.
