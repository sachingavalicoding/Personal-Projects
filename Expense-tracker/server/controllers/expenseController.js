import mongoose from "mongoose";
import Expense from "../models/Expense.js";

// CREATE: POST /api/expenses
export const createExpense = async (req, res) => {
    try {
        const expense = await Expense.create(req.body);
        res.status(201).json(expense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// READ ALL: GET /api/expenses
export const getExpenses = async (req, res) => {
    try {
        const { category, startDate, endDate, search } = req.query;
        if (category) filter.category = category;
        const filter = buildDateFilter(startDate, endDate);
        if (search) {
            // escape special regex characters so user input can't break the query
            const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            filter.title = { $regex: safeSearch, $options: "i" };
        }
        const expenses = await Expense.find(filter).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ ONE: GET /api/expenses/:id
export const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid expense id" });
        }

        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.json(expense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE: PUT /api/expenses/:id
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid expense id" });
        }

        const expense = await Expense.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.json(expense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE: DELETE /api/expenses/:id
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid expense id" });
        }

        const expense = await Expense.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.json({ message: "Expense deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// filters 
// Builds a MongoDB date filter from startDate / endDate query params
const buildDateFilter = (startDate, endDate) => {
    const range = {};

    if (startDate) {
        const start = new Date(startDate);
        if (isNaN(start)) {
            const err = new Error("Invalid startDate");
            err.status = 400;
            throw err;
        }
        range.$gte = start;
    }

    if (endDate) {
        const end = new Date(endDate);
        if (isNaN(end)) {
            const err = new Error("Invalid endDate");
            err.status = 400;
            throw err;
        }
        end.setHours(23, 59, 59, 999); // include the whole end day
        range.$lte = end;
    }

    return Object.keys(range).length ? { date: range } : {};
};

// SUMMARY: GET /api/expenses/summary?startDate=...&endDate=...
export const getSummary = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const match = buildDateFilter(startDate, endDate);

        const result = await Expense.aggregate([
            { $match: match },
            {
                $group: {
                    _id: "$category",
                    total: { $sum: "$amount" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { total: -1 } },
        ]);

        const byCategory = result.map(({ _id, total, count }) => ({
            category: _id,
            total,
            count,
        }));

        const totalSpent = byCategory.reduce((sum, c) => sum + c.total, 0);
        const totalCount = byCategory.reduce((sum, c) => sum + c.count, 0);

        res.json({ totalSpent, totalCount, byCategory });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};