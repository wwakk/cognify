// server/routes/uploads.ts
import express from "express";
import multer from "multer";
import { uploadToS3 } from "../controllers/s3Controllers";
import { storeUpload, getUserUploads } from "../controllers/uploadControllers";

const router = express.Router();
const upload = multer(); // in-memory storage for buffer

// Upload to S3
router.post("/s3", upload.single("image"), uploadToS3);

// Store a new user upload in DB
router.post("/store", storeUpload);

// Get uploads for a user
router.get("/", getUserUploads);

export default router;
