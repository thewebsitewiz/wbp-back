import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const currentWeatherSchema = mongoose.Schema({
  time: {
    type: Date,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
  temperature_2m: {
    type: Number,
    required: true,
  },
  temperature_2m_metric: {
    type: Number,
    required: true,
  },
  relative_humidity_2m: {
    type: Number,
    required: true,
  },
  apparent_temperature: {
    type: Number,
    required: true,
  },
  apparent_temperature_metric: {
    type: Number,
    required: true,
  },
  is_day: {
    type: Number,
    required: true,
  },
  precipitation: {
    type: Number,
    required: true,
  },
  precipitation_metric: {
    type: Number,
    required: true,
  },
  rain: {
    type: Number,
    required: true,
  },
  rain_metric: {
    type: Number,
    required: true,
  },
  showers: {
    type: Number,
    required: true,
  },
  showers_metric: {
    type: Number,
    required: true,
  },
  weather_code: {
    type: Number,
    required: true,
  },
  cloud_cover: {
    type: Number,
    required: true,
  },
  pressure_msl: {
    type: Number,
    required: true,
  },
  surface_pressure: {
    type: Number,
    required: true,
  },
  wind_speed_10m: {
    type: Number,
    required: true,
  },
  wind_speed_10m_metric: {
    type: Number,
    required: true,
  },
  wind_direction_10m: {
    type: Number,
    required: true,
  },
  wind_gusts_10m: {
    type: Number,
    required: true,
  },
  wind_gusts_10m_metric: {
    type: Number,
    required: true,
  },
  visibility: {
    type: Number,
    required: true,
  },
  visibility_metric: {
    type: Number,
    required: true,
  },
  uv_index: {
    type: Number,
    required: true,
  },
  uv_index_clear_sky: {
    type: Number,
    required: true,
  },
  sunshine_duration: {
    type: Number,
    required: true,
  },
});

currentWeatherSchema.set("timestamps", true);

currentWeatherSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

currentWeatherSchema.set("toJSON", {
  virtuals: true,
});

export const CurrWeather = mongoose.model(
  "CurrWeather",
  currentWeatherSchema,
  "CurrentWeather"
);
