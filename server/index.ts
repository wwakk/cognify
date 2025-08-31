import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ocrRoutes from "./src/routes/ocrRoutes";
import chatgptRoutes from "./src/routes/chatgptRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // or your frontend URL
  })
);

app.use(express.json()); // if you want to parse JSON bodies on other routes

app.use("/api/ocr", ocrRoutes);
app.use("/api/openai", chatgptRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
