import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            min: [0, "Amount cannot be negative"],
        },
        category: {
            type: String,
            enum: ["Food", "Travel", "Shopping", "Bills", "Health", "Other"],
            default: "Other",
        },
        date: {
            type: Date,
            default: Date.now,
        },
        note: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;