import mongoose from "mongoose";

const uri = process.env.MONGO_URI!;
const dbName = process.env.MONGO_DB_NAME!;

export async function connectToMongoose() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log(`[Mongoose] Connected to DB: ${dbName}`);
  } catch (err) {
    console.error("[Mongoose] Error Connecting:", err);
    process.exit(1);
  }
}

export function disconnectMongoose() {
  return mongoose.disconnect();
}
