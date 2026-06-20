export type TransactionType = "income" | "expense";

export type Category =
  | "salary"
  | "food"
  | "transport"
  | "shopping"
  | "bills"
  | "health"
  | "other";

export interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
  createdAt: string;
}

export interface Summary {
  income: number;
  expense: number;
  balance: number;
}

export interface CreateTransactionDTO {
  description: string;
  amount: number;
  type: TransactionType;
  category: Category;
}

// useReducer state shape
export interface TransactionState {
  transactions: Transaction[];
  summary: Summary;
  loading: boolean;
  filter: {
    type: TransactionType | "";
    category: Category | "";
  };
}

export type TransactionAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "SET_SUMMARY"; payload: Summary }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "REMOVE_TRANSACTION"; payload: string }
  | { type: "SET_FILTER"; payload: Partial<TransactionState["filter"]> };
