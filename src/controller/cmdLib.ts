import { Response } from "express";
import * as CmdLib from "@/model/CmdLib";

export const post = {
  new: async (req, res: Response) => {
    try {
      const { command, label } = req.body;
      const data = await CmdLib.create(req.id, { command, label });
      return res.status(200).send({ data });
    } catch (e: any) {
      return res.status(400).send({ message: e.message });
    }
  },
};

export const get = {
  all: async (req, res: Response) => {
    try {
      const data = await CmdLib.get(req.id);
      return res.status(200).send({ data });
    } catch (e: any) {
      return res.status(400).send({ message: e.message });
    }
  },
};
