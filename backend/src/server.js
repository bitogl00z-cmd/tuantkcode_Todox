import dotenv from "dotenv";
dotenv.config();
import express from "express";
import taskRoute from "./routes/tasksRouters.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

const PORT = process.env.PORT || 5001;
const app = express();
//middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/api/tasks", taskRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu chạy trên cổng ${PORT}`);
  });
});
