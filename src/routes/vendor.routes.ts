const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const router = express.Router();


const {
  addVendor,
  editVendor,
  editVendors,
  getVendors,
  uploadMulter,
} = require("../controllers/vendor.controller");

router.post(`/add-vendor`, uploadMulter, async (req, res, next) => {
  await addVendor(req, res, next);
});

router.post(`/edit-vendor`, async (req, res) => {
  await editVendor(req, res);
});

router.post(`/edit-vendors`, async (req, res) => {
  await editVendors(req, res);
});

router.get(`/get-vendors`, async (req, res) => {
  await getVendors(req, res);
});

module.exports = router;
