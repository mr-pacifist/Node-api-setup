
import multer from "multer";
import path from "path";
import fs from "fs";

const uploader = ({ destination, maxSize = 5 * 1024 * 1024, allowedTypes = [] }) => {
  // Ensure the destination directory exists
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, destination),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (allowedTypes.length === 0 || allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};

export default uploader;
