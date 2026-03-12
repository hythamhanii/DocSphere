import dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDatabase from "./config/database.config";

dotenv.config();

const app = express();

app.use(express.json());

// Example route
app.get("/", (req: Request, res: Response) => {
  res.send("Docsphere backend running");
});

const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDatabase();
  console.log(`Server running on port ${PORT}`);
});