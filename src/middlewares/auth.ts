import { Request, Response, NextFunction, RequestHandler } from "express";

export const verify: RequestHandler = (req, res, next) => {
  const apiKey = req.get("x-api-key");

  if (!apiKey || apiKey !== process.env.MASTER_API_KEY) {
    res.status(401).send({ error: "Unauthorized: Invalid API key" });
    return;
  }

  next();
};
