import crypto from "crypto";

export const apiKeys: Set<string> = new Set();

export function generateApiKey(): string {
  return crypto.randomBytes(32).toString("hex");
}
