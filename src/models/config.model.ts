const mongoose = require("mongoose");

const configSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
      enum: ["string", "number", "date", "boolean"],
    },
  },
  {
    timestamps: true,
  }
);

configSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

configSchema.set("toJSON", {
  virtuals: true,
});

exports.Tag = mongoose.model("Config", configSchema, "config");
