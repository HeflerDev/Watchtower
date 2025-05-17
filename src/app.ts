import moduleAlias from "module-alias";
moduleAlias.addAlias("@", __dirname);
moduleAlias();
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./router";
import { connectToMongoose } from "./helper/mongoose";

const app: Express = express();

app.use("/api", router);
app.use(express.json());

const PORT = process.env.PORT || 3000;

(async () => {
  await connectToMongoose();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})();
