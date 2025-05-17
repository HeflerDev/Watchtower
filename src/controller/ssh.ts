import { Request, Response } from "express";
import { SSHClientHelper } from "@/helper/ssh";
import { get } from "@/model/ApiKeyConnection";

interface ExecRequestBody {
  command: string;
}

export const execCommand = async (req: Request, res: Response) => {
  const { command } = req.body as ExecRequestBody;
  const apiKey = req.headers["x-api-key"];

  const { host, username, privateKey } = await get(apiKey as string);

  const ssh = new SSHClientHelper({
    host,
    username,
    privateKey,
  });

  try {
    await ssh.connect();
    const output = await ssh.execCommand(command);
    ssh.disconnect();

    return res.status(200).json({ output });
  } catch (err: any) {
    ssh.disconnect();
    return res
      .status(500)
      .json({ error: "Error with cmd execution", details: err.message });
  }
};
