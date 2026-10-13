function ExpenseList({ expenses, onEdit, onDelete }) {
    if (expenses.length === 0) {
        return <p>No expenses yet. Add your first one above.</p>;
    }

    return (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Note</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((e) => (
                    <tr key={e._id}>
                        <td>{new Date(e.date).toLocaleDateString()}</td>
                        <td>{e.title}</td>
                        <td>{e.category}</td>
                        <td>₹{e.amount}</td>
                        <td>{e.note || "-"}</td>
                        <td>
                            <button onClick={() => onEdit(e)}>Edit</button>{" "}
                            <button onClick={() => onDelete(e._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ExpenseList;