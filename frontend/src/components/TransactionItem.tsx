import type { Transaction } from "../types/transaction.types";

interface Props {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const TransactionItem = ({ transaction, onDelete }: Props) => {
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-800">
          {transaction.description}
        </span>
        <span className="text-xs text-gray-400 capitalize">
          {transaction.category} •{" "}
          {new Date(transaction.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-bold ${isIncome ? "text-green-500" : "text-red-500"}`}
        >
          {isIncome ? "+" : "-"}${transaction.amount.toFixed(2)}
        </span>
        <button
          onClick={() => onDelete(transaction._id)}
          className="text-gray-300 hover:text-red-400 transition text-lg"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
