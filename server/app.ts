import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import imageRouter from "./routes/image";
import upload from "./middleware/upload";
import authRouter from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    session({
        name: "cses.sid",
        secret: process.env.MONGODB_URI!,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI!,
            collectionName: "sessions",
        }),

        cookie: {
            httpOnly: true,

            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 1000*60*60*24
        }
    })
);

app.use("/api/auth", authRouter);

app.use("/api/image", upload.single("image"), imageRouter);

app.use("/uploads",express.static("server/uploads"))

export default app;
