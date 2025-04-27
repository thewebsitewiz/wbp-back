const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose"); // for put and patch
const ExifReader = require("exifreader");
const multer = require("multer");

const imgPathUtils = require("../utils/imagePath.util");
// const { getColorAnalysis } = require("../utils/pixels.util");

const { Vendor } = require("../models/vendor.model");

import {
  UPLOAD_FILE_SIZE_LIMIT,
  FILE_TYPE_MAP,
  multerFilter,
} from "../utils/image.util";

let newFileName = "";
let imageDirPath = "";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    imageDirPath = imgPathUtils.getNewDirPath();
    cb(null, imageDirPath);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    newFileName = path.parse(file.originalname).name;
    newFileName = newFileName.replaceAll(" ", "-");
    newFileName = `${newFileName}-${Date.now()}.${ext}`.toLowerCase();
    cb(null, newFileName);
  },
});

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: UPLOAD_FILE_SIZE_LIMIT },
});

module.exports.uploadMulter = upload.single("image");

const _getMetadata = async (file) => {
  return await ExifReader.load(file);
};

const _addVendor = async (req, res) => {
  const {file} = req;
  if (!file) {
    return res.status(400).send("No image in the request");
  }

  let tagIds = [];
  if (req.body.tags !== undefined || null) {
    tagIds = req.body.tags.split(",");
    console.log("tagIds: ", tagIds);
  }

  try {
    let vendor = new Vendor({
      fileName: newFileName,
      filePath: imageDirPath,
      name: req.body.name,
      description: req.body.description,
      website: req.body.website,
      address: req.body.address,
      city: req.body.city,
      phone: req.body.phone,
      email: req.body.email,
      category: req.body.category,
      comments: req.body.comments,
      fileSize: file.size,
      mimeType: file.mimeType,
      status: req.body.status,
    });

    if (tagIds.length > 0) {
      vendor.tags = tagIds;
    }

    const vendorResult = await vendor.save();
    console.log("vendorResult: ", vendorResult);

    if (!vendorResult) {
      return res.status(400).send("The vendor cannot be created");
    }

    return res.send(vendorResult);
  } catch (e) {
    console.log("error in catch for vendor: ", e);
    return res.status(500).json({
      success: false,
      message: `error in catch for vendor: ${e}`,
    });
  }
};

module.exports.addVendor = _addVendor;
