import Transaction from "../models/transactions";
import { Request, Response } from "express";

const createTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { description, amount, type, category } = req.body;
    if (!description || !amount || !type || !category) {
      throw new Error("fill all the given requiremnets");
    }
    const transaction = await Transaction.create({
      description,
      amount,
      type,
      category,
    });

    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
//  get all with filter

const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, category } = req.query;

    const filter: any = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
// // GET summary using aggregation
const getSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    const income = summary.find((s: any) => s._id === "income")?.total || 0;
    const expense = summary.find((s: any) => s._id === "expense")?.total || 0;

    res.status(200).json({
      income,
      expense,
      balance: income - expense,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      res.status(404).json({ message: "Transaction not found" });
      return;
    }

    res.status(200).json({ message: "Transaction deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export { createTransaction, getTransactions, getSummary, deleteTransaction };
