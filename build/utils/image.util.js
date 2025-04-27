"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerFilter = exports.FILE_TYPE_MAP = exports.UPLOAD_FILE_SIZE_LIMIT = void 0;
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
exports.UPLOAD_FILE_SIZE_LIMIT = process.env.UPLOAD_FILE_SIZE_LIMIT;
exports.FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};
const _multerFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith("image")) {
        cb(new Error("Not an image! Please upload an image."), false);
    }
    if (!exports.FILE_TYPE_MAP[file.mimetype]) {
        cb(new Error("Not an allowed image type! Please upload a jpg or a png image."), false);
    }
    cb(null, true);
};
exports.multerFilter = _multerFilter;
