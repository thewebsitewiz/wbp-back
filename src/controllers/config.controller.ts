/*
  addConfig,
  updateConfig,
  getConfig,
  getAllConfigs,
  */

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { Config } = require("../models/config.model");

import { IConfig, IConfigs } from "../interfaces/config.interface";

/**
module.exports.addTag = async (req, res) => {
  console.log("controller: ", req.body);

  try {
    await Tag.find({ tag: req.body.tag }).then((tags) => {
      if (tags.length > 0) {
        console.log(`Tag: ${req.body.tag} already exists`);
        res.status(304).send({
          status: 304,
          tag: req.body.tag,
          success: false,
          msg: "tag exists",
          err: false,
        });
      } else {
        const newTag = new Tag({
          tag: req.body.tag,
        });

        newTag.save().then((result) => {
          if (result._id) {
            res.status(201).send({
              status: 201,
              tag: req.body.tag,
              success: true,
              msg: "tag added",
              err: false,
            });
          } else {
            console.log(`error saving tag: ${result}`);
            res.status(500).send({
              status: 500,
              tag: req.body.tag,
              success: false,
              msg: result,
              err: true,
            });
          }
        });
      }
    });
  } catch (e) {
    res.status(500).send({
      status: 500,
      tag: req.body.tag,
      success: false,
      msg: `error in catch for addTags: ${e}`,
      err: true,
    });
  }
};
*/
module.exports.getAllConfigs = async (req, res) => {
  try {
    await Config.find().then((configs: IConfigs) => {
      return res.status(200).send(configs);
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `error in catch for getAllConfigs: ${e}`,
    });
  }
};
