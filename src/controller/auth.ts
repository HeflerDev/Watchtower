import { Request, Response } from "express";
import { apiKeys, generateApiKey } from "@/helper/apiKey";
import { create } from "@/model/ApiKeyConnection";

export const post = async (req: Request, res: Response) => {
  const { host, username, privateKey } = req.body;
  const apiKey = generateApiKey();

  const data = await create({ host, username, privateKey, apiKey });

  return res.status(200).send({ data });
};

export const get = (_req: Request, res: Response) => {
  return res.status(200).json({ keys: Array.from(apiKeys) });
};
