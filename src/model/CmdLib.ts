import mongoose, { Schema, Document } from "mongoose";

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

const Schema = new Schema<ApiKeyConnectionDocument>(
  {
    { apiKeyId: }
  },
  { timestamps: true },
);

const ApiKeyConnection = mongoose.model<ApiKeyConnectionDocument>(
  "ApiKeyConnection",
  ApiKeyConnectionSchema,
);
