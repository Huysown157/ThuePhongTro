import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/connectDB";
import initRoutes from "./src/routes";
dotenv.config();
import cors from "cors";
import handleError from "./src/middlewares/handleError";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);
handleError(app);

connectDB();

const port = process.env.PORT || 8888;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
