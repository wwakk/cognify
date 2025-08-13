import { Request, Response } from "express";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

export const handleOCR = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const formData = new FormData();
    formData.append("apikey", process.env.OCR_SPACE_API_KEY!);
    formData.append("language", "eng");
    formData.append("OCREngine", "2");
    formData.append("scale", "true");
    formData.append("isOverlayRequired", "false");
    formData.append("file", fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData as any,
    });

    const data = await response.json();

    // console.log("OCR Response:", data);

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete temp file:", err);
    });

    res.json(data);
  } catch (error) {
    console.error("Error during OCR request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
