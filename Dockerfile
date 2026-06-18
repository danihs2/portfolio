# Build stage
FROM oven/bun:latest AS builder
WORKDIR /app

# Copy dependency manifests first for better caching
COPY package.json bun.lock ./

# Install all dependencies for build
RUN bun install

# Copy the rest of the app files and build
COPY . .
RUN bun run build

# Production stage
FROM oven/bun:latest AS runner
WORKDIR /app

# Copy required files from build stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/bun.lock bun.lock

# Install only production dependencies
RUN bun install --production

ENV NODE_ENV=production
EXPOSE 3000

CMD ["bun", "run", "start", "--", "-p", "3000", "-H", "0.0.0.0"]
