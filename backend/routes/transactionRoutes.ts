import express from "express";

import { createTransaction } from "../controllers/transactionControllers";

const router = express.Router();

router.post("/", createTransaction);
export default router;
