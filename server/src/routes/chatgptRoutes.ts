import express from "express";
import {
  handleChatGPT,
  handleChatGPTProblems,
} from "../controllers/chatgptControllers";

const router = express.Router();

router.post("/solve", handleChatGPT); // POST /api/chat
router.post("/problems", handleChatGPTProblems);

export default router;
