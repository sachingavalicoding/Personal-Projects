import { Router } from "express";
import { createExpense, getExpenseById, getExpenses, updateExpense, deleteExpense, getSummary } from "../controllers/expenseController.js";

const router = Router();

router.get("/summary", getSummary);
router.route("/").post(createExpense).get(getExpenses);
router.route("/:id").get(getExpenseById).put(updateExpense).delete(deleteExpense);
export default router;