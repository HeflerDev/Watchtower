import { Response } from "express";
import { create } from "@/model/CmdLib";

export const post = {
  new: async (req, res: Response) => {
    try {
      const { command, label } = req.body;
      const data = await create(req.id, { command, label });
      return res.status(200).send({ data });
    } catch (e: any) {
      return res.status(400).send({ message: e.message });
    }
  },
};
