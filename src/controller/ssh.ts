import { Request, Response } from "express";
import { SSHClientHelper } from "@/helper/ssh";

interface ExecRequestBody {
  host: string;
  username: string;
  privateKey: string;
  command: string;
}

export const execCommand = async (req: Request, res: Response) => {
  const { host, username, privateKey, command } = req.body as ExecRequestBody;

  if (!host || !username || !privateKey || !command) {
    return res.status(400).json({ error: "Faltando dados obrigatórios" });
  }

  const ssh = new SSHClientHelper({ host, username, privateKey });

  try {
    await ssh.connect();
    const output = await ssh.execCommand(command);
    ssh.disconnect();

    res.status(200).json({ output });
  } catch (err: any) {
    ssh.disconnect();
    res
      .status(500)
      .json({ error: "Erro ao executar comando", details: err.message });
  }
};
