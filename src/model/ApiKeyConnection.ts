import mongoose, { Schema, Document } from "mongoose";
import cryptr from "@/helper/cryptr";

export interface IApiKeyConnection {
  apiKey: string;
  host: string;
  username: string;
  privateKey: string;
}

export interface ApiKeyConnectionDocument extends Document {
  apiKey: string;
  host: string;
  username: string;
  privateKey: string;
}

const ApiKeyConnectionSchema = new Schema<ApiKeyConnectionDocument>(
  {
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
    host: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "",
    },
    privateKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ApiKeyConnection = mongoose.model<ApiKeyConnectionDocument>(
  "ApiKeyConnection",
  ApiKeyConnectionSchema,
);

export const create = async (data: IApiKeyConnection) => {
  const document = new ApiKeyConnection({
    apiKey: data.apiKey,
    host: data.host,
    username: data.username,
    privateKey: cryptr.encrypt(data.privateKey),
  });
  return await document.save();
};

export const get = async (apiKey: string) => {
  const key = await ApiKeyConnection.findOne({ apiKey }).lean();

  const decryptedKey: string = cryptr.decrypt(key.privateKey);

  key.privateKey = decryptedKey;

  if (!key) throw new Error("Unauthorized");

  return key;
};

export const getPrivateKey = async (apiKey: string): Promise<string> => {
  const key = await ApiKeyConnection.findOne(
    { apiKey },
    { privateKey: 1 },
  ).lean();

  const decription = cryptr.decrypt(key.privateKey);

  return decription;
};
