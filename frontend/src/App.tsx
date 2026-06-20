import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTransactions } from "./hooks/useTransactionHooks";
import SummaryCard from "./components/SummaryCard";
import TransactionForm from "./components/Transactionform";
import TransactionList from "./components/TransactionList";
import ExpenseChart from "./components/ExpenseChart";
import Loader from "./components/Loader";

const App: React.FC = () => {
  const { state, addTransaction, removeTransaction, setFilter } =
    useTransactions();

  const { transactions, summary, loading } = state;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">💰 Expense Tracker</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard
            label="Balance"
            amount={summary.balance}
            color="bg-blue-500"
          />
          <SummaryCard
            label="Income"
            amount={summary.income}
            color="bg-green-500"
          />
          <SummaryCard
            label="Expenses"
            amount={summary.expense}
            color="bg-red-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form + Chart */}
          <div className="flex flex-col gap-4">
            <TransactionForm onAdd={addTransaction} />

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Overview
              </h2>
              <ExpenseChart summary={summary} />
            </div>
          </div>

          {/* Transaction List */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Transactions
            </h2>

            {loading ? (
              <Loader />
            ) : (
              <TransactionList
                transactions={transactions}
                onDelete={removeTransaction}
                onFilter={setFilter}
              />
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default App;
