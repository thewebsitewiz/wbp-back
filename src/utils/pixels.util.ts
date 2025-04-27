const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const fs = require("fs");

const getPixels = require("get-pixels");
const ndarray = require("ndarray");

const _pixelGetter = (file) => {
  // does file exist
  if (!fs.existsSync(file)) {
    console.log("File not found");
    return;
  }

  getPixels(file, function (err, pixels) {
    if (err) {
      console.log(err);
      return;
    }
    console.log("pixels.data:\n", pixels.data);
    console.log("pixelData type: ", typeof pixels.data);
    return pixels.data;
  });
};

const _getPixelNDArray = async (pixelData, width, height) => {
  const pixelNDArray = await ndarray(new Float64Array(pixelData), [10, 10, 4]);
};

const _getColorAnalysis = async (file, width, height) => {
  // if width height missing
  if (!width || !height) {
    console.log(`width: ${width} or height:${height} missing`);
    return;
  }
  const pixelData = await _pixelGetter(file);

  

  

  return pixelData;
};

module.exports.getColorAnalysis = _getColorAnalysis;
