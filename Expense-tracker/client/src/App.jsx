import { useEffect, useState } from "react";
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "./api/expenseApi";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  const loadExpenses = async () => {
    try {
      setExpenses(await getExpenses());
    } catch (err) {
      console.error("Failed to load expenses:", err);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // One handler for both add and update
  const handleSubmit = async (expense) => {
    if (editingExpense) {
      await updateExpense(editingExpense._id, expense);
      setEditingExpense(null);
    } else {
      await createExpense(expense);
    }
    await loadExpenses();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
      // if the deleted expense was being edited, leave edit mode
      if (editingExpense?._id === id) setEditingExpense(null);
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Could not delete the expense");
    }
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h1>Expense Tracker</h1>

      <ExpenseForm
        onSubmit={handleSubmit}
        editingExpense={editingExpense}
        onCancel={() => setEditingExpense(null)}
      />

      <h2>Expenses ({expenses.length})</h2>
      <p>
        <strong>Total: ₹{total}</strong>
      </p>

      <ExpenseList
        expenses={expenses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;