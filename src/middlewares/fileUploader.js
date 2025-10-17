
import multer from "multer";
import ApiResponse  from "../utilites/ApiResponse.js";
import uploader from "../utilites/uploader.js";

export const uploadHandler = ({
  destination, //- Upload directory
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ["image/jpeg", "image/png", "image/jpg"],
  mode = "single", // Upload mode
  fieldName = "file",// Form field name
  maxCount = 5,
}) => {
  const upload = uploader({ destination, maxSize, allowedTypes });

  return (req, res, next) => {
    const uploadMethod =
      mode === "multiple" ? upload.array(fieldName, maxCount) : upload.single(fieldName);

    uploadMethod(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // Handle Multer-specific errors
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json(
            new ApiResponse(400, {}, `File too large. Max size is ${maxSize / (1024 * 1024)}MB.`)
          );
        }
        return res.status(400).json(new ApiResponse(400, {}, err.message));
      } else if (err) {
        // Handle custom file filter errors
        if (err.message === "Invalid file type") {
          return res.status(400).json(
            new ApiResponse(400, {}, `Invalid file type. Allowed: ${allowedTypes.join(", ")}`)
          );
        }
        return res.status(400).json(new ApiResponse(400, {}, err.message));
      }
      next();
    });
  };
};
