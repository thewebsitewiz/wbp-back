import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const imagesSchema = mongoose.Schema(
  {
    src: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    caption: {
      type: String,
      required: false,
    },
    comments: {
      type: String,
      required: false,
    },
    fileSize: {
      type: Decimal128,
      required: false,
    },
    mimeType: {
      type: String,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    dateTaken: {
      type: Date,
      required: false,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tags",
        required: false,
      },
    ],
    colors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Colors",
        required: false,
      },
    ],
    height: {
      type: Number,
      required: false,
    },
    width: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

imagesSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

imagesSchema.set("toJSON", {
  virtuals: true,
});

exports.Image = mongoose.model("Image", imagesSchema);
