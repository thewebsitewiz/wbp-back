const mongoose = require("mongoose");

const tagColorSchema = mongoose.Schema(
  {
    tagColor: {
      type: String, // '255, 0, 0'
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tagColorSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

tagColorSchema.set("toJSON", {
  virtuals: true,
});

exports.Tag = mongoose.model("TagColor", tagColorSchema, "tagColors");
