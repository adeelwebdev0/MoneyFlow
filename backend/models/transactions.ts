import mongoose, { Schema, Document, Model } from "mongoose";
// these are types for ts of transaction model
export interface ITransaction extends Document {
  description: string;
  amount: number;
  type: "income" | "expense";
  category:
    | "salary"
    | "food"
    | "transport"
    | "shopping"
    | "bills"
    | "health"
    | "other";
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema: Schema<ITransaction> = new Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Type is required"],
    },
    category: {
      type: String,
      enum: [
        "salary",
        "food",
        "transport",
        "shopping",
        "bills",
        "health",
        "other",
      ],
      default: "other",
    },
  },
  { timestamps: true },
);

const Transaction: Model<ITransaction> = mongoose.model<ITransaction>(
  "Transaction",
  transactionSchema,
);

export default Transaction;
