import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import siswaRoute from"./routes/siswa-route.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json())
app.use(siswaRoute);

app.get("/", (_, res) => res.send("Backend is running..."));

const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Backend server is running on http://localhost:${PORT}`)
);