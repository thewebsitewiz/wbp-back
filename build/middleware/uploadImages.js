"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const imgPathUtils = require("../utils/imagePath.util");
const imageConstants_1 = require("../config/imageConstants");
let imageDirPath;
let newFileName;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = imageConstants_1.FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error("invalid image type");
        if (isValid)
            uploadError = null;
        imageDirPath = imgPathUtils.getNewDirPath();
        cb(uploadError, imageDirPath);
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(" ").join("-");
        const extension = imageConstants_1.FILE_TYPE_MAP[file.mimetype];
        newFileName = `${fileName}-${Date.now()}.${extension}`;
        cb(null, newFileName);
    },
});
const uploadOptions = multer({
    storage: storage,
});
module.exports.uploadPhoto = uploadOptions.single("image");
/* const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    imageDirPath = imgPathUtils.getNewDirPath();
    cb(null, imageDirPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    newFileName = `${fileName}-${Date.now()}.${extension}`;

    cb(null, newFileName);
  },
});

const multerFilter = (req, file, cb) => {
  if (FILE_TYPE_MAP[file.mimetype] !== undefined) {
    cb(null, true);
  } else {
    const errorString = `${FILE_TYPE_MAP} is invalid file type`;
    req.fileValidationError = errorString;
    cb(null, false, new Error(errorString));
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: MAX_SIZE },
}); */
const productImgResize = async (req, res, next) => {
    if (!req.files)
        return next();
    await Promise.all(req.files.map(async (file) => {
        await sharp(file.path)
            .resize(300, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/images/products/${file.filename}`);
        fs.unlinkSync(`public/images/products/${file.filename}`);
    }));
    next();
};
const blogImgResize = async (req, res, next) => {
    if (!req.files)
        return next();
    await Promise.all(req.files.map(async (file) => {
        await sharp(file.path)
            .resize(300, 300)
            .toFormat("jpeg")
            .jpeg({ quality: 90 })
            .toFile(`public/images/blogs/${file.filename}`);
        fs.unlinkSync(`public/images/blogs/${file.filename}`);
    }));
    next();
};
// module.exports = { uploadPhoto, blogImgResize, productImgResize };
