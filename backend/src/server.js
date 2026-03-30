import dotenv from "dotenv";
dotenv.config();
import express from "express";
import taskRoute from "./routes/tasksRouters.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";
const PORT = process.env.PORT || 5001;
const app = express();
const __dirname = path.resolve();
//middlewares
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bắt đầu chạy trên cổng ${PORT}`);
  });
});
