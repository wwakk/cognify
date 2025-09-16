import { Request, Response } from "express";
import { pool } from "../config/db"; // assuming you have a Postgres pool in db.ts

// Store a new upload
export const storeUpload = async (req: Request, res: Response) => {
  try {
    const { userId, file_name, file_url, aiResponse } = req.body;

    if (!userId || !file_name || !file_url || !aiResponse) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
      INSERT INTO user_submissions (user_id, file_name, file_url, ai_response)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const result = await pool.query(query, [
      userId,
      file_name,
      file_url,
      aiResponse,
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error storing upload:", error);
    res.status(500).json({ error: "Failed to store upload" });
  }
};

// Get uploads for a user
export const getUserUploads = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ error: "Missing userId" });
    }

    const query = `
      SELECT id, file_name, file_url, ai_response, created_at
      FROM user_submissions
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query, [userId]);

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching uploads:", error);
    res.status(500).json({ error: "Failed to fetch uploads" });
  }
};
