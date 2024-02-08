import { memoryStorage, Options } from "multer";

export default {
  storage: memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024, // 8MB
  },
  fileFilter: (req, file, cb) => {
    const mimeTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!mimeTypes.includes(file.mimetype)) {
      return cb(null, false);
    }
    cb(null, true);
  },
} as Options;
