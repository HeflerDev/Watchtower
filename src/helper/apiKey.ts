import crypto from "crypto";
import { get } from "@/model/ApiKeyConnection";

const apiKeys = async (apiKey: string) => {
  const data = await get(apiKey);
  return [data.apiKey, process.env.MASTER_API_KEY];
};

export function generateApiKey(): string {
  return crypto.randomBytes(32).toString("hex");
}
export { apiKeys };
