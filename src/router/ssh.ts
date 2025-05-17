import { wrap } from "@/helper";
import express, { IRouter, NextFunction, Request, Response } from "express";
import { verify } from "@/middlewares/auth";
import { execCommand } from "@/controller/ssh";

const router: IRouter = express.Router();

const basePath = "/ssh";

router.post(basePath, verify, wrap(execCommand));

export default router;
