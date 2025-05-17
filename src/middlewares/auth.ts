import { NextFunction, RequestHandler, Request, Response } from "express";
import { get } from "@/model/ApiKeyConnection";

interface RequestWithKey extends Request {
  key?: string;
  id?: string;
}

export const verify: RequestHandler = async (
  req: RequestWithKey,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.get("x-api-key");

  const keyDoc = await get(apiKey);

  if (!apiKey || !keyDoc) {
    res.status(401).send({ error: "Unauthorized: Invalid API key" });
    return;
  }

  req.key = keyDoc.apiKey;
  req.id = keyDoc._id.toString();

  next();
};
