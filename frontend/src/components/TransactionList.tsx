import type {
  Transaction,
  TransactionType,
  Category,
} from "../types/transaction.types";
import TransactionItem from "./TransactionItem";

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onFilter: (type: TransactionType | "", category: Category | "") => void;
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

const TransactionList = ({ transactions, onDelete, onFilter }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 flex-wrap">
        <select
          onChange={(e) => onFilter(e.target.value as TransactionType | "", "")}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          onChange={(e) => onFilter("", e.target.value as Category | "")}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {transactions.length === 0 ? (
        <p className="text-center text-gray-400 py-6">No transactions found.</p>
      ) : (
        transactions.map((t) => (
          <TransactionItem key={t._id} transaction={t} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default TransactionList;
