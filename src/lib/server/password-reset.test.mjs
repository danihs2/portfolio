import assert from "node:assert/strict";
import test from "node:test";
import {
  createPasswordResetCode,
  hashPasswordResetSecret,
  isPasswordResetExpired,
  matchesPasswordResetSecret,
} from "./password-reset.ts";

test("password reset codes are six digits and expire on time", () => {
  const code = createPasswordResetCode();
  const hash = hashPasswordResetSecret(code);

  assert.match(code, /^\d{6}$/);
  assert.equal(matchesPasswordResetSecret(code, hash), true);
  assert.equal(matchesPasswordResetSecret("000000", hash), code === "000000");
  assert.equal(isPasswordResetExpired(new Date(1_000), 999), false);
  assert.equal(isPasswordResetExpired(new Date(1_000), 1_000), true);
});
