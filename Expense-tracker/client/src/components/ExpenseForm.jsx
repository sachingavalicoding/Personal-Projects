import { useEffect, useState } from "react";

const CATEGORIES = ["Food", "Travel", "Shopping", "Bills", "Health", "Other"];

// today's date in YYYY-MM-DD (local time), the format <input type="date"> needs
const today = () => new Date().toLocaleDateString("en-CA");

const emptyForm = {
    title: "",
    amount: "",
    category: "Food",
    date: today(),
    note: "",
};

function ExpenseForm({ onSubmit, editingExpense, onCancel }) {
    const [form, setForm] = useState(emptyForm);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const isEditing = Boolean(editingExpense);

    // When the expense being edited changes, fill the form (or reset it)
    useEffect(() => {
        if (editingExpense) {
            setForm({
                title: editingExpense.title,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: new Date(editingExpense.date).toLocaleDateString("en-CA"),
                note: editingExpense.note || "",
            });
        } else {
            setForm({ ...emptyForm, date: today() });
        }
        setError("");
    }, [editingExpense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSaving(true);

        try {
            await onSubmit({ ...form, amount: Number(form.amount) });
            if (!isEditing) setForm({ ...emptyForm, date: today() });
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? "Edit Expense" : "Add Expense"}</h2>

            <input
                name="title"
                placeholder="Title (e.g. Lunch)"
                value={form.title}
                onChange={handleChange}
                required
            />

            <input
                name="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
                required
            />

            <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>

            <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
            />

            <input
                name="note"
                placeholder="Note (optional)"
                value={form.note}
                onChange={handleChange}
            />

            <button type="submit" disabled={saving}>
                {saving ? "Saving..." : isEditing ? "Update Expense" : "Add Expense"}
            </button>

            {isEditing && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}

export default ExpenseForm;