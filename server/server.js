import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";
const app = express();

const PORT = process.env.PORT || 5000;
dotenv.config({
  path: "./config/.env",
});
app.use(cors());
app.use(express.json());

app.use("/posts", postRoutes);
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("mongoose is connected");
});

app.listen(PORT, () => {
  console.log("server is connected");
});
