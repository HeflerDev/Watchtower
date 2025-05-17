import { Request, Response } from "express";
import { generateApiKey } from "@/helper/apiKey";
import * as apiKeyConnection from "@/model/ApiKeyConnection";

export const post = async (req: Request, res: Response) => {
  const { host, username } = req.body;
  const apiKey = generateApiKey();

  const privateKey = req.file.buffer.toString("utf-8");

  const data = await apiKeyConnection.create({
    host,
    username,
    apiKey,
    privateKey,
  });

  return res.status(200).send({ data });
};

export const get = async (req: Request, res: Response) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey || typeof apiKey !== "string") {
      return res.status(401).json({ error: "API key is missing or invalid" });
    }

    const data = await apiKeyConnection.get(apiKey);

    return res.status(200).send({ data });
  } catch (error) {
    return res.status(401).send({ error });
  }
};
