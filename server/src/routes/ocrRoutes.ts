import express from "express";
import multer from "multer";
import { handleOCR } from "../controllers/ocrControllers";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), handleOCR);

export default router;
