"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_SIZE = exports.MIME_TYPE_MAP = exports.FILE_TYPE_MAP = void 0;
exports.FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};
exports.MIME_TYPE_MAP = {
    png: "image/png",
    jpg: "image/jpg",
};
exports.MAX_SIZE = 40 * 1024 * 1024; // 40MB
