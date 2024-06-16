import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import cookieParser from "cookie-parser";
import { errMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from './router/userRouter.js';
import appointmentRouter from "./router/appointmentRouter.js"
import fileUpload from 'express-fileupload';


const app = express();
config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true}))


// app.post("/save",sendMessage)
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user",userRouter)
app.use("/api/v1/appointment",appointmentRouter)

dbConnection();


app.use(errMiddleware)
export default app;
