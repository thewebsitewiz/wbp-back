const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const router = express.Router();
/*
  addConfig,
  updateConfig,
  getConfig,
  */

const { getAllConfigs } = require("../controllers/config.controller");

router.get(`/get-all-configs`, async (req, res) => {
  await getAllConfigs(req, res);
});
/*
router.post(`/add-config`, async (req, res, next) => {
  await addConfig(req, res, next);
});

router.patch(`/update-config`, async (req, res) => {
  await updateConfig(req, res);
});

router.get(`/get-config`, async (req, res) => {
  await getConfig(req, res);
});
*/

module.exports = router;
