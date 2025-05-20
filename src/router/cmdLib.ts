import { wrap } from "@/helper";
import express, { IRouter, NextFunction, Request, Response } from "express";
import { verify } from "@/middlewares/auth";
import { get, post } from "@/controller/cmdLib";

const router: IRouter = express.Router();

const basePath = "/cmdlib";

router.post(basePath, verify, wrap(post.new));
router.get(basePath, verify, wrap(get.all));

export default router;
