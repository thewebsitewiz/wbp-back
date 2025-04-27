import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const moonName = mongoose.Schema({
  name: String,
});

/*         TargetDate: "1718640497",
        Moon: ["Honey Moon"],
        Index: 10,
        Age: 10.49036191242409,
        Phase: "Waxing Gibbous",
        Distance: 400940.18,
        Illumination: 0.81,
        AngularDiameter: 0.4967278557765187,
        DistanceToSun: 152003508.738933,
        SunAngularDiameter: 0.5246928164334679,
      */

const moonSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    moonName: [moonName],
    moonIndex: {
      type: Number,
    },
    moonAge: {
      type: Decimal128,
    },
    moonPhase: {
      type: String,
    },
    distance: {
      type: Decimal128,
    },
    illumination: {
      type: Decimal128,
    },
    angularDiameter: {
      type: Decimal128,
    },
    sunAngularDiameter: {
      type: Decimal128,
    },
  },
  {
    timestamps: true,
  }
);

moonSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

moonSchema.set("toJSON", {
  virtuals: true,
});

exports.Moon = mongoose.model("Moon", moonSchema);
