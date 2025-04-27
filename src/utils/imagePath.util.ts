const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const fs = require("fs");

const maxNumberOfFilesInDirectory = 100;

module.exports.getNewDirPath = () => {
  const currentScriptPath = path.join(__dirname);
  const srcPath = currentScriptPath.replace(/src\/utils/, "");
  const imgPath = `${srcPath}public/images`;
  const currentImgPath = _getCurrentDirPath(imgPath);
  console.log("old currentImgPath: ", currentImgPath);
  return currentImgPath;
};

function _getCurrentDirPath(imgPath) {
  const lastImgDirPath = _getLastDirectoryInDirectory(imgPath);

  const filesInLastDirectory = fs.readdirSync(lastImgDirPath).length;

  if (filesInLastDirectory < maxNumberOfFilesInDirectory) {
    return lastImgDirPath;
  }

  const lastDirectory = lastImgDirPath.split("/").pop();

  const lastDirectoryNumber = parseInt(lastDirectory);
  const nextDirectoryNumber = lastDirectoryNumber + 1;
  const nextDirectoryPath = `${imgPath}/${nextDirectoryNumber}`;

  if (!fs.existsSync(nextDirectoryPath)) {
    fs.mkdirSync(nextDirectoryPath);
  }

  return nextDirectoryPath;
}

function _getLastDirectoryInDirectory(dirPath) {
  let contents = fs.readdirSync(dirPath);
  let directories = [];

  contents.forEach((item) => {
    const testPath = `${dirPath}/${item}`;
    if (fs.statSync(testPath).isDirectory()) {
      directories.push(item);
    }
  });

  const lastDir = directories.slice(-1);
  const lastDirPath = `${dirPath}/${lastDir}`;

  return lastDirPath;
}
