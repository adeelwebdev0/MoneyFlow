import { useReducer, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { transactionService } from "../services/transactionService";
import type {
  TransactionState,
  TransactionAction,
  CreateTransactionDTO,
  TransactionType,
  Category,
} from "../types/transaction.types";

const initialState: TransactionState = {
  transactions: [],
  summary: { income: 0, expense: 0, balance: 0 },
  loading: true,
  filter: { type: "", category: "" },
};

const reducer = (
  state: TransactionState,
  action: TransactionAction,
): TransactionState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload };
    case "SET_SUMMARY":
      return { ...state, summary: action.payload };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case "REMOVE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (t) => t._id !== action.payload,
        ),
      };
    case "SET_FILTER":
      return { ...state, filter: { ...state.filter, ...action.payload } };
    default:
      return state;
  }
};

export const useTransactions = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAll = useCallback(async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const [transactions, summary] = await Promise.all([
        transactionService.getAll(
          state.filter.type || undefined,
          state.filter.category || undefined,
        ),
        transactionService.getSummary(),
      ]);
      dispatch({ type: "SET_TRANSACTIONS", payload: transactions });
      dispatch({ type: "SET_SUMMARY", payload: summary });
    } catch {
      toast.error("Failed to load transactions");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [state.filter]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const addTransaction = async (data: CreateTransactionDTO) => {
    try {
      const newTransaction = await transactionService.create(data);
      dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
      await fetchAll(); // refresh summary
      toast.success("Transaction added!");
    } catch {
      toast.error("Failed to add transaction");
    }
  };

  const removeTransaction = async (id: string) => {
    try {
      await transactionService.delete(id);
      dispatch({ type: "REMOVE_TRANSACTION", payload: id });
      await fetchAll(); // refresh summary
      toast.success("Transaction deleted!");
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  const setFilter = (type: TransactionType | "", category: Category | "") => {
    dispatch({ type: "SET_FILTER", payload: { type, category } });
  };

  return { state, addTransaction, removeTransaction, setFilter };
};
