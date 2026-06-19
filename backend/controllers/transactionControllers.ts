import Transaction from "../models/transactions";
import { Request, Response } from "express";

const createTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { description, amount, type, category } = req.body;

    const transaction = await Transaction.create({
      description,
      amount,
      type,
      category,
    });

    res.status(201).json(transaction);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    res.status(400).json({ message });
  }
};
export { createTransaction };
