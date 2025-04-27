// // @ts-ignore
const express = require("express");
const router = express.Router();

const Tag = require("../controllers/tag.controller");
const { Tags } = require("../models/tag.model");

router.get(`/get-tags`, async (req, res) => {
  try {
    await Tag.getAllTags(req, res);
  } catch (e) {
    console.error(`error in catch for getAllTags: ${e}`);
  }
});
router.get(`/get-tags/:type`, async (req, res) => {
  try {
    await Tag.getTagsByType(req, res);
  } catch (e) {
    console.error(`error in catch for getTags: ${e}`);
  }
});

router.post(`/add-tag`, (req, res) => {
  console.log(req.body);
  try {
    Tag.addTag(req, res);
  } catch (e) {
    console.error(`error in router catch for addTags: ${e}`);
  }
});

module.exports = router;
