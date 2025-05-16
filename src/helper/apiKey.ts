import crypto from "crypto";

const apiKeys: Set<string> = new Set();
apiKeys.add(process.env.MASTER_API_KEY!);

export function generateApiKey(): string {
  return crypto.randomBytes(32).toString("hex");
}
export { apiKeys };
