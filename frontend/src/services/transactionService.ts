import axios from "axios";
import type {
  Transaction,
  Summary,
  CreateTransactionDTO,
} from "../types/transaction.types";
const BASE_URL = "/api/transaction";
export const transactionService = {
  getAll: async (type?: string, category?: string): Promise<Transaction[]> => {
    const params = new URLSearchParams();
    if (type) params.append("type", type);
    if (category) params.append("category", category);
    const res = await axios.get<Transaction[]>(`${BASE_URL}?${params}`);
    return res.data;
  },

  getSummary: async (): Promise<Summary> => {
    const res = await axios.get<Summary>(`${BASE_URL}/summary`);
    return res.data;
  },
  create: async (data: CreateTransactionDTO): Promise<Transaction> => {
    const res = await axios.post<Transaction>(BASE_URL, data);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
