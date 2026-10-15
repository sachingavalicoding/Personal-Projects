import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 50,
    },
    category: {
        type: String,
        required: true,
        default: ""
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    amountType: {
        type: String,
        required: true,
    }
})