import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
    res.json({
        status: "ok",
        message: "API is worknig fine!"
    })
});


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () =>
            console.log(`Server running on port ${process.env.PORT}`)
        );
    } catch (err) {
        console.error("Failed to start:", err.message);
        process.exit(1);
    }
};

start();