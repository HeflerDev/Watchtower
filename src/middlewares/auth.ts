import { RequestHandler } from "express";
import { apiKeys } from "@/helper";

export const verify: RequestHandler = async (req, res, next) => {
  const apiKey = req.get("x-api-key");

  const check = await apiKeys(apiKey);

  if (!apiKey || !check.includes(apiKey)) {
    res.status(401).send({ error: "Unauthorized: Invalid API key" });
    return;
  }

  next();
};
