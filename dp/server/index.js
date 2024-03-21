import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import router from "./routers/index.js";
import { errorMiddleware } from "./middlewares/error-middleware.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", router);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log("server is running on PORT = " + process.env.PORT);
})


