import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler, routeNotFound } from "./middlewares/erroeMiddlewares.js";
import cors from "cors";
import { getFileStream } from "./controller/s3.js";
const app = express();
dotenv.config();
connectDb();
app.use(express.static("./backend/public"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.json({ msg: "Hello World" });
});
app.get("/image/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(routeNotFound);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App is listning....");
});
