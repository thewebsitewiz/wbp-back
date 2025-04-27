import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const colorSchema = mongoose.Schema(
  {
    hex: {
      type: String,
      required: true,
    },
    red: {
      type: Number,
      required: true,
    },
    green: {
      type: Number,
      required: true,
    },
    blue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

colorSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

colorSchema.set("toJSON", {
  virtuals: true,
});
exports.Color = mongoose.model("Color", colorSchema);
