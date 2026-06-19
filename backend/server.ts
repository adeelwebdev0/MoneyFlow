import express, { application } from "express";
import cors from "cors";
import connectDb from "./configs/db";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 5000;
await connectDb();

const app = express();
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on this ${PORT}🤝`);
});
