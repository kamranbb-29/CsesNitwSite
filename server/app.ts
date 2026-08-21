import express from "express";
import cors from "cors";
import imageRouter from "./routes/image";
import upload from "./middleware/upload";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/image", upload.single("image"), imageRouter);

app.use("/uploads",express.static("server/uploads"))

export default app;
