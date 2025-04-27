"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const ExifReader = require("exifreader");
const { dbConnect } = require("../config/dbConnect");
const conn = dbConnect("mongodb+srv://dennis:DradReqOsISwet1PhubR@cluster0.hzr1z7m.mongodb.net/wbp-dev?retryWrites=true&w=majority&appName=Cluster0");
const imgPathUtils = require("./imagePath.util");
const imageConstants_1 = require("../config/imageConstants");
const { Image } = require("../models/image.model");
const SOURCE_IMAGE_DIR = "/Users/dennisluken/Downloads/Will-Photos";
const TARGET_IMAGE_DIR = "/Users/dennisluken/Documents/Projects/wbp/back-end/src/public/images";
const limit = 0;
let FOLDER_LIMIT = limit;
let FILE_LIMIT = limit;
const MAX_NUMBER_OF_FILES_IN_DIR = 100;
const TAG_OBJECT_IDS = {
    Dive: "668023e19a8fe969c346ae2b",
    Portraits: "667b673e36a03aeea541fbf2",
};
let folders = 0;
// get image source directories
const imgFolders = fs.readdirSync(SOURCE_IMAGE_DIR);
main();
async function main() {
    // loop through each directory
    imgFolders.forEach((folder) => {
        const folderPath = path.join(SOURCE_IMAGE_DIR, folder);
        // check if folderPath is a directory
        if (fs.lstatSync(folderPath).isDirectory()) {
            folders++;
            if (FOLDER_LIMIT !== 0 && folders > FOLDER_LIMIT)
                return;
            console.log("folder: ", folder);
            // get the path of the current image source directory
            // get a list of all the files in the directory
            const imgFiles = fs.readdirSync(folderPath);
            // loop through each file in the directory
            let images = 0;
            imgFiles.forEach(async (imgFile) => {
                // check if imgSrcPath does not start with "."` and is a file with an image extension
                if (!imgFile.startsWith(".") && imgFile.match(/\.(jpg|jpeg|png)$/)) {
                    images++;
                    if (FILE_LIMIT !== 0 && images > FILE_LIMIT)
                        return;
                    await processImage(folder, folderPath, imgFile);
                }
            });
        }
    });
}
async function processImage(folder, folderPath, imgFile) {
    // get the path of the current file
    const imgSrcPath = path.join(folderPath, imgFile);
    console.log("\timgSrcPath: ", imgSrcPath);
    // get metadata for the image
    const md = await getMetadata(imgSrcPath);
    // get the target directory path
    const targetDir = getTargetDirPath();
    // get new image name and extension
    const [newImgName, imgExt] = getNewImageName(imgFile);
    // copy the image to the target directory with new image name
    const targetPath = path.join(targetDir, newImgName);
    fs.copyFileSync(imgSrcPath, targetPath);
    // get file size
    const stats = fs.statSync(targetPath);
    const fileSizeInKB = (stats.size / 1024).toFixed(2);
    // get mime type
    const mimeType = imageConstants_1.MIME_TYPE_MAP[imgExt];
    // truncate the image path
    const relativeImagePath = targetPath.split("public/").pop();
    // create a new Image object for the database
    const img = new Image({
        src: relativeImagePath,
        title: "",
        description: "",
        caption: "",
        comments: "",
        fileSize: fileSizeInKB,
        mimeType: mimeType,
        height: md["Image Height"]["value"],
        width: md["Image Width"]["value"],
        tags: [TAG_OBJECT_IDS[folder]],
    });
    // save the image to the database
    saveImageToDatabase(img);
}
async function saveImageToDatabase(img) {
    const imgResult = await img.save();
}
async function getMetadata(file) {
    return await ExifReader.load(file);
}
function getNewImageName(currentImgName) {
    // get current extension
    let currentExt = currentImgName.split(".").pop();
    // redefine extension if it is jpeg
    if (currentExt === "jpeg") {
        currentExt = "jpg";
    }
    // get currentName without extension
    const currentName = currentImgName.split(".").shift();
    // replace spaces with hyphens
    const newName = currentName.replace(/ /g, "-");
    // append seconds since epoch]
    const seconds = new Date().getTime();
    const newImgName = `${newName}-${seconds}.${currentExt}`;
    return [newImgName, currentExt];
}
function getTargetDirPath() {
    // get last directory in images directory
    const lastDir = getLastDirectoryInDirectory(TARGET_IMAGE_DIR);
    // get the number of files in the last directory
    const filesInLastDirectory = fs.readdirSync(lastDir).length;
    // if the number of files is less than 100,
    // return the last directory path
    if (filesInLastDirectory < MAX_NUMBER_OF_FILES_IN_DIR) {
        return lastDir;
    }
    // if the number of files is 100,
    // create a new directory
    const lastDirectory = lastDir.split("/").pop();
    const lastDirectoryNumber = parseInt(lastDirectory, 10);
    const nextDirectoryNumber = lastDirectoryNumber + 1;
    const nextDirectoryPath = `${TARGET_IMAGE_DIR}/${nextDirectoryNumber}`;
    // check if the new directory does not already exist
    if (!fs.existsSync(nextDirectoryPath)) {
        // create the new directory
        fs.mkdirSync(nextDirectoryPath);
    }
    // return the new directory path
    return nextDirectoryPath;
}
function getLastDirectoryInDirectory(dirPath) {
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
