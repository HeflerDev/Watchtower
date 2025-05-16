import { Client, ClientChannel } from "ssh2";

interface SSHConfig {
  host: string;
  port?: number;
  username: string;
  privateKey: string;
}

export class SSHClientHelper {
  private client: Client;
  private config: SSHConfig;
  private isConnected: boolean = false;

  constructor(config: SSHConfig) {
    this.client = new Client();
    this.config = config;
  }

  connect(): Promise<void> {
    if (this.isConnected) return Promise.resolve();

    return new Promise((resolve, reject) => {
      this.client
        .on("ready", () => {
          this.isConnected = true;
          resolve();
        })
        .on("error", (err) => {
          reject(err);
        })
        .connect({
          host: this.config.host,
          port: this.config.port ?? 22,
          username: this.config.username,
          privateKey: this.config.privateKey,
        });
    });
  }

  execCommand(command: string): Promise<string> {
    if (!this.isConnected) {
      return Promise.reject(new Error("SSH client not connected"));
    }

    return new Promise((resolve, reject) => {
      this.client.exec(command, (err, stream: ClientChannel) => {
        if (err) return reject(err);

        let data = "";
        stream
          .on("close", () => resolve(data))
          .on("data", (chunk) => (data += chunk.toString()))
          .stderr.on("data", (chunk) => (data += chunk.toString()));
      });
    });
  }

  disconnect() {
    if (this.isConnected) {
      this.client.end();
      this.isConnected = false;
    }
  }
}
