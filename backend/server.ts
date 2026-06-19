import express from "express";
import cors from "cors";
import connectDb from "./configs/db";
import transactionRoutes from "./routes/transactionRoutes";
import errorHandler from "./middlewares/errorHandler";
const PORT = process.env.PORT || 5000;
connectDb();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on this ${PORT}🤝`);
});
