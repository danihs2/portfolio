import { createHash, randomInt, timingSafeEqual } from "node:crypto";

export const PASSWORD_RESET_TTL_MS = 5 * 60 * 1000;
export const PASSWORD_RESET_MAX_ATTEMPTS = 5;
export const PASSWORD_RESET_REQUEST_COOLDOWN_MS = 60 * 1000;

export function createPasswordResetCode() {
  return randomInt(1_000_000).toString().padStart(6, "0");
}

export function hashPasswordResetSecret(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function matchesPasswordResetSecret(
  value: string,
  expectedHash: string,
) {
  const actual = Buffer.from(hashPasswordResetSecret(value), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function isPasswordResetExpired(expiresAt: Date, now = Date.now()) {
  return expiresAt.getTime() <= now;
}
