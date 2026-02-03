import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRoutes from "./routes/StudentRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use("/students", studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
