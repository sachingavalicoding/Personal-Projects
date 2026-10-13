import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// params example: { category: "Food", search: "lunch", startDate: "2026-10-01" }
export const getExpenses = async (params = {}) => {
    const { data } = await api.get("/expenses", { params });
    return data;
};

export const getSummary = async (params = {}) => {
    const { data } = await api.get("/expenses/summary", { params });
    return data;
};

export const createExpense = async (expense) => {
    const { data } = await api.post("/expenses", expense);
    return data;
};

export const updateExpense = async (id, expense) => {
    const { data } = await api.put(`/expenses/${id}`, expense);
    return data;
};

export const deleteExpense = async (id) => {
    const { data } = await api.delete(`/expenses/${id}`);
    return data;
};