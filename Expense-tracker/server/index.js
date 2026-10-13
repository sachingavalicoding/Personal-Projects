import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Expense Tracker API is running");
});

// Connect to MongoDB, then start the server
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () =>
        console.log(`Server running on port ${process.env.PORT}`)
    );
} catch (err) {
    console.error("MongoDB connection error:", err);
}