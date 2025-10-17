
import express from "express";
import { uploadHandler } from "../middlewares/fileUploader.js";
import ApiResponse  from "../utilites/ApiResponse.js";

const router = express.Router();

// 🖼 Single image upload route
router.route("/add-image").post(
  uploadHandler({
    destination: "public/uploads",
    maxSize: 3 * 1024 * 1024, // 3MB
    allowedTypes: ["image/jpeg", "image/png"],
    mode: "single",
    fieldName: "image",
  }),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json(new ApiResponse(400, {}, "No file uploaded"));
    }
    res.json(
      new ApiResponse(200, { file: req.file }, "Image uploaded successfully")
    );
  }
);

// Multiple file upload route
router.route("/add-documents").post(
  uploadHandler({
    destination: "public/uploads/docs",
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ],
    mode: "multiple",
    fieldName: "documents",
    maxCount: 5,
  }),
  (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json(new ApiResponse(400, {}, "No files uploaded"));
    }
    res.json(
      new ApiResponse(200, { files: req.files }, "Documents uploaded successfully")
    );
  }
);

export default router;
