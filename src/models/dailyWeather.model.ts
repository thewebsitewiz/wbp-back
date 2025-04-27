import { Decimal128 } from "mongodb";

const mongoose = require("mongoose");

const dailyWeatherSchema = mongoose.Schema({
  time: {
    type: Date,
    required: true,
  },
  weather_code: {
    type: Number,
    required: true,
  },
  temperature_2m_max: {
    type: Number,
    required: true,
  },
  temperature_2m_max_metric: {
    type: Number,
    required: true,
  },
  temperature_2m_min: {
    type: Number,
    required: true,
  },
  temperature_2m_min_metric: {
    type: Number,
    required: true,
  },
  apparent_temperature_max: {
    type: Number,
    required: true,
  },
  apparent_temperature_max_metric: {
    type: Number,
    required: true,
  },
  apparent_temperature_min: {
    type: Number,
    required: true,
  },
  apparent_temperature_min_metric: {
    type: Number,
    required: true,
  },
  sunrise: {
    type: String,
    required: true,
  },
  sunset: {
    type: String,
    required: true,
  },
  daylight_duration: {
    type: Number,
    required: true,
  },
  sunshine_duration: {
    type: Number,
    required: true,
  },
  uv_index_max: {
    type: Number,
    required: true,
  },
  uv_index_clear_sky_max: {
    type: Number,
    required: true,
  },
  precipitation_sum: {
    type: Number,
    required: true,
  },
  precipitation_sum_metric: {
    type: Number,
    required: true,
  },
  rain_sum: {
    type: Number,
    required: true,
  },
  rain_sum_metric: {
    type: Number,
    required: true,
  },
  showers_sum: {
    type: Number,
    required: true,
  },
  showers_sum_metric: {
    type: Number,
    required: true,
  },
  precipitation_hours: {
    type: Number,
    required: true,
  },
  precipitation_probability_max: {
    type: Number,
    required: true,
  },
  wind_speed_10m_max: {
    type: Number,
    required: true,
  },
  wind_gusts_10m_max: {
    type: Number,
    required: true,
  },
  wind_direction_10m_dominant: {
    type: Number,
    required: true,
  },
});

dailyWeatherSchema.set("timestamps", true);

dailyWeatherSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

dailyWeatherSchema.set("toJSON", {
  virtuals: true,
});

export const DlyWeather = mongoose.model(
  "DlyWeather",
  dailyWeatherSchema,
  "DailyWeather"
);
