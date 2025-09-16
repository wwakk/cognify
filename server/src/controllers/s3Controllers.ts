// server/controllers/uploadS3Controller.ts
import { Request, Response } from "express";
import { s3 } from "../config/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadToS3 = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    const file = req.file;

    const Key = `${Date.now()}-${file.originalname}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key,
      Body: file.buffer,
      ContentType: file.mimetype,
      //ACL: "public-read", // makes the file publicly accessible
    });

    await s3.send(command);

    // Construct public URL
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`;

    return res.json({ url });
  } catch (error) {
    console.error("S3 upload error:", error);
    return res.status(500).json({ error: "Failed to upload to S3" });
  }
};
