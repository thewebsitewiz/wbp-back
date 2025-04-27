"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose = require("mongoose");
const vendorsSchema = mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    comments: {
        type: String,
        required: false,
    },
    fileSize: {
        type: mongodb_1.Decimal128,
        required: false,
    },
    mimeType: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    tags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tags",
            required: false,
        },
    ],
}, {
    timestamps: true,
});
vendorsSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
vendorsSchema.set("toJSON", {
    virtuals: true,
});
exports.Vendor = mongoose.model("Vendor", vendorsSchema);
