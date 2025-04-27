const mongoose = require("mongoose");

const tagSchema = mongoose.Schema(
  {
    tag: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    tagColor: {
      type: String, // '255, 0, 0'
      required: false,
    },
    count: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

tagSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

tagSchema.set("toJSON", {
  virtuals: true,
});

exports.Tag = mongoose.model("Tag", tagSchema, "tags");
