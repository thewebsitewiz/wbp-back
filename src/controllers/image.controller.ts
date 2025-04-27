const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose"); // for put and patch
const ExifReader = require("exifreader");
const multer = require("multer");

const imgPathUtils = require("../utils/imagePath.util");

const { getAllTags } = require("./tag.controller");

const { Image } = require("../models/image.model");
//const { Tag } = require("../models/tag.model");
const { Color } = require("../models/color.model");

import { FILE_TYPE_MAP } from "../config/imageConstants";

let newFileName = "";
let imageDirPath = "";

/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");
    if (isValid) uploadError = null;
    imageDirPath = imgPathUtils.getNewDirPath();
    cb(uploadError, imageDirPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    newFileName = `${fileName}-${Date.now()}.${extension}`;
    cb(null, newFileName);
  },
});

const uploadOptions = multer({
  storage: storage,
});

module.exports.uploadMulter = uploadOptions.single("image");
 */
const _getMetadata = async (file) => {
  return await ExifReader.load(file);
};

const _imageUpload = async (req, res) => {
  const { file } = req;
  console.log("image file: ", file);

  if (!file) {
    return res.status(400).send("No image in the request");
  }

  let tagIds = [];
  if (req.body.tags !== undefined || null) {
    tagIds = req.body.tags.split(",");
  }

  const md = await _getMetadata(`${imageDirPath}/${newFileName}`);

  const dbImgDirPath = imageDirPath.split("public/images")[1];

  try {
    let image = new Image({
      src: `${dbImgDirPath}/${newFileName}`,
      title: req.body.title,
      description: req.body.description,
      caption: req.body.caption,
      comments: req.body.comments,
      fileSize: file.size,
      mimeType: file.mimeType,
      height: md["Image Height"]["value"],
      width: md["Image Width"]["value"],
    });

    if (tagIds.length > 0) {
      image.tags = tagIds;
    }

    const imageResult = await image.save();
    console.log("imageResult: ", imageResult);

    if (!imageResult) {
      return res.status(400).send("The image data is not inserted");
    }

    return res.send(imageResult);
  } catch (e) {
    console.log("error in catch for image data insert: ", e);
    console.log(imageDirPath, dbImgDirPath);
    return res.status(500).json({
      success: false,
      message: `error in catch for image data insert: ${e}`,
    });
  }
};

module.exports.imageUpload = _imageUpload;

async function _getTagLookup() {
  try {
    const tagList = await getAllTags();
    console.log("tagList???: ", tagList.length);
    const tagLookup = {};
    if (!tagList) {
      return tagLookup;
    }
    tagList.forEach((tag) => {
      tagLookup[tag._id.toString()] = tag;
    });
    return tagLookup;
  } catch (error) {
    console.log("error in catch for _getTagLookup: ", error);
    return {};
  }
}

const _getAllImages = async (req, res) => {
  const tagLookup = await _getTagLookup();
  const imageList = await Image.find();
  const newImageList = [];

  imageList.forEach((image) => {
    const imageObj = image.toObject();
    imageObj["tagInfo"] = [];
    image.tags.forEach((tag) => {
      imageObj["tagInfo"].push(tagLookup[tag._id.toString()]);
    });
    newImageList.push(imageObj);
  });

  if (newImageList.length === 0) {
    res.status(500).json({ success: false });
  }

  res.status(200).json({ success: true, data: newImageList });
};

module.exports.getAllImages = _getAllImages;

const _getImageById = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await Image.findById(id);
    if (!image) {
      console.log("no image ");
      res
        .status(404)
        .json({ success: false, message: `Image not found: ${id}` });
    }

    const tagLookup = await _getTagLookup();

    const imageList = await Image.find();

    const imageObj = image.toObject();
    imageObj["tagInfo"] = [];
    image.tags.forEach((tag) => {
      imageObj["tagInfo"].push(tagLookup[tag._id.toString()]);
    });

    res.status(200).json({ success: true, data: imageObj });
  } catch (error) {
    console.log("image error: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getImageById = _getImageById;

//Updates a resource by replacing it entirely. If the resource does not exist, it may create a new one.
//A PUT request is idempotent. If you PUT a resource more than once, it has no effect.
/* const _putImage = async (req, res) => {
  const { file } = req;
  let metaData: unknown = {};
  if (file) {
    metaData = await _getMetadata(`${imageDirPath}/${newFileName}`);
  }

  let fileSize = req.body.fileSize || file.size || null;
  let mimeType = req.body.mimeType || file.mimeType || null;
  let height = req.body.height || metaData["Image Height"]["value"] || null;
  let width = req.body.width || metaData["Image Width"]["value"] || null;

  let tagIds = [];
  if (req.body.tags !== undefined || null) {
    tagIds = req.body.tags.split(",");
  }

  const md = await _getMetadata(`${imageDirPath}/${newFileName}`);

  const dbImgDirPath = imageDirPath.split("public/images")[1];

  try {
    let image = new Image({
      src: `${dbImgDirPath}/${newFileName}`,
      title: req.body.title,
      description: req.body.description,
      caption: req.body.caption,
      comments: req.body.comments,
      fileSize: file.size,
      mimeType: file.mimeType,
      height: md["Image Height"]["value"],
      width: md["Image Width"]["value"],
    });

    if (tagIds.length > 0) {
      image.tags = tagIds;
    }

    console.log("image: ", image);
    const imageResult = await image.save();

    if (!imageResult) {
      console.log("The image data is not inserted");
      return res.status(400).send("The image data is not inserted");
    }

    console.log("imageResult: ", imageResult);
    return res.send(imageResult);
  } catch (e) {
    console.log("error in catch for image data insert: ", e);
    console.log(dbImgDirPath, imageDirPath);
    return res.status(500).json({
      success: false,
      message: `error in catch for image data insert: ${e}`,
    });
  }
};

module.exports.putImage = _putImage; */

const _patchImage = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  /*  if (updates.tags !== null) {
    const tagList = [];
    updates.tags.split(",").forEach((tag) => {
      tagList.push(tag);
    });
    updates.tags = tagList;
  } */

  console.log("updates: ", id, updates);
  try {
    const updatedImage = await Image.findByIdAndUpdate(id, updates, {
      new: true, // Return updated document
      runValidators: true, // Ensure updates follow schema rules
    });

    if (!updatedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    console.log("updatedImage: ", updatedImage);
    res.status(200).json({ success: true, data: updatedImage });
  } catch (error) {
    console.log("error in catch for patchImage: ", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.patchImage = _patchImage;

/* 
const _getImagesWithTags = async (req, res) => {
  const imageList = await Image.find().populate("tags");

  if (!imageList) {
    res.status(500).json({ success: false });
  }
  res.status(200).json({ success: true, data: imageList });
  // res.send(imageList);
};

module.exports.getAllImages = _getAllImages;
*/
