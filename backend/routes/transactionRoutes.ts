import express from "express";

import {
  createTransaction,
  getTransactions,
  getSummary,
  deleteTransaction,
} from "../controllers/transactionControllers";

const router = express.Router();

router.post("/", createTransaction);
router.get("/transactions", getTransactions);
router.get("/summary", getSummary);
router.delete("/:id", deleteTransaction);
export default router;
