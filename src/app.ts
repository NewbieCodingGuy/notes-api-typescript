import express, { Request, Response } from "express";
import { router as authRoutes } from "./routes/authRoutes";
import { router as notesRoutes } from "./routes/notesRoutes";

const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api", notesRoutes);

export { app };
