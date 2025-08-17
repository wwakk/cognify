import express from "express";
import { handleChatGPT } from "../controllers/chatgptControllers";

const router = express.Router();

router.post("/", handleChatGPT); // POST /api/chat

export default router;
