import { useState } from "react";
import type {
  CreateTransactionDTO,
  TransactionType,
  Category,
} from "../types/transaction.types";

interface Props {
  onAdd: (data: CreateTransactionDTO) => void;
}

const categories: Category[] = [
  "salary",
  "food",
  "transport",
  "shopping",
  "bills",
  "health",
  "other",
];

const TransactionForm = ({ onAdd }: Props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<Category>("other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;
    onAdd({ description, amount: Number(amount), type, category });
    setDescription("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3"
    >
      <h2 className="text-lg font-semibold text-gray-700">Add Transaction</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as TransactionType)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
