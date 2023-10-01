import express, { Request, Response, NextFunction, Application } from "express";
import { config } from "dotenv";
import cors from "cors";
import createHttpError from "http-errors";
import router from "./routes";
import connectDB from "./database/connection";
import { errorHandler } from "./middlewares";

config();

const PORT: Number = Number(process.env.PORT) || 4000;
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

app.use(errorHandler);

connectDB()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server is up on port ${PORT}!`);
      });
    } catch (error) {
      console.log("Invalid server connection!");
    }
  })
  .catch((error) => {
    console.log("Invalid DB connection!");
  });
