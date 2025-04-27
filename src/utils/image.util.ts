const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

export const UPLOAD_FILE_SIZE_LIMIT = process.env.UPLOAD_FILE_SIZE_LIMIT;

export const FILE_TYPE_MAP: { [key: string]: string } = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const _multerFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image")) {
    cb(new Error("Not an image! Please upload an image."), false);
  }
  if (!FILE_TYPE_MAP[file.mimetype]) {
    cb(
      new Error(
        "Not an allowed image type! Please upload a jpg or a png image."
      ),
      false
    );
  }

  cb(null, true);
};

export const multerFilter = _multerFilter;
