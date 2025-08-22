import { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Instantiate OpenAI with your API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleChatGPT = async (req: Request, res: Response) => {
  try {
    const { text } = req.body; // text comes from OCR

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [{ role: "user", content: text }],
    });

    // Send AI response back
    res.json(response.choices[0].message);
  } catch (err) {
    console.error("OpenAI request failed:", err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
};
