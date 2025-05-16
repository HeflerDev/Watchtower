import { Request, Response } from "express";
import { apiKeys, generateApiKey } from "@/helper/apiKey";

export const post = (req: Request, res: Response) => {
  const apiKey = generateApiKey();
  apiKeys.add(apiKey);

  return res.status(201).json({ apiKey });
};

export const get = (_req: Request, res: Response) => {
  return res.status(200).json({ keys: Array.from(apiKeys) });
};
