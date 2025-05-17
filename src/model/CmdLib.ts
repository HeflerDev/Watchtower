import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICmdLib {
  apiKeyId?: Types.ObjectId | string;
  command: string;
  label: string;
}

export interface CmdLibDocument extends Document {
  apiKeyId: Types.ObjectId | string;
  command: string;
  label: string;
}

const CmdLibSchema = new Schema<CmdLibDocument>(
  {
    apiKeyId: { type: Schema.Types.ObjectId, required: true },
    command: { type: String, required: true },
    label: { type: String, required: true },
  },
  { timestamps: true },
);

const CmdLib = mongoose.model<CmdLibDocument>("CmdLib", CmdLibSchema);

export const get = async (id: string, label?: string) => {
  const documents = await CmdLib.find({
    apiKeyId: id,
    ...(label ? { label } : {}),
  });

  return documents;
};

export const create = async (id: string, data: ICmdLib) => {
  const document = new CmdLib({
    apiKeyId: id,
    command: data.command,
    label: data.label,
  });

  return await document.save();
};
