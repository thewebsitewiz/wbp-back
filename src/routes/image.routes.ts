const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const router = express.Router();

const { uploadPhoto } = require("../middleware/uploadImages");
const {
  imageUpload,
  getAllImages,
  patchImage,
  putImage,
  getImageById,
} = require("../controllers/image.controller");

router.get(`/get-all-images`, async (req, res, next) => {
  try {
    await getAllImages(req, res, next);
  } catch (error) {
    console.log("getAllImages route error: ", error);
  }
});

router.get(`/get-image/:id`, async (req, res, next) => {
  try {
    await getImageById(req, res, next);
  } catch (error) {
    console.log("getImageById route error: ", error);
  }
});

router.get(`/delete-images`, async (req, res) => {});

router.post(`/upload-image`, uploadPhoto, async (req, res, next) => {
  try {
    await imageUpload(req, res, next);
  } catch (error) {
    console.log("imageUpload route error: ", error);
  }
});

router.put(`/put-image/:id`, uploadPhoto, async (req, res, next) => {
  try {
    await putImage(req, res, next);
  } catch (error) {
    console.log("putImage route error: ", error);
  }
});

router.patch(`/patch-image/:id`, async (req, res) => {
  try {
    await patchImage(req, res);
  } catch (error) {
    console.log("patchImage route error: ", error);
  }
});

module.exports = router;
