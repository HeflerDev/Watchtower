import { RequestHandler } from "express";
import { apiKeys } from "@/helper";

export const verify: RequestHandler = (req, res, next) => {
  const apiKey = req.get("x-api-key");

  if (!apiKey || !apiKeys.has(apiKey)) {
    res.status(401).send({ error: "Unauthorized: Invalid API key" });
    return;
  }

  next();
};
