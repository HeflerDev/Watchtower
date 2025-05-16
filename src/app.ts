import moduleAlias from "module-alias";
moduleAlias.addAlias("@", __dirname);
moduleAlias();
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import router from "./router";

dotenv.config();

const app: Express = express();

app.use(router);
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
