import { wrap } from "@/helper";
import express, { IRouter, NextFunction, Request, Response } from "express";
import { verify } from "@/middlewares/auth";
import { get, post } from "@/controller/auth";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router: IRouter = express.Router();

const basePath = "/auth";

router.post(basePath, verify, upload.single("privateKey"), wrap(post));
router.get(basePath, verify, wrap(get.one));
router.get(basePath + "/pvKey", verify, wrap(get.privateKey));

export default router;
