"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrlyWeather = void 0;
const mongoose = require("mongoose");
const hourlyWeatherSchema = mongoose.Schema({
    time: {
        type: Date,
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
    dew_point_2m: {
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
    precipitation_probability: {
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
    surface_pressure: {
        type: Number,
        required: true,
    },
    cloud_cover: {
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
    uv_index: {
        type: Number,
        required: true,
    },
    uv_index_clear_sky: {
        type: Number,
        required: true,
    },
    is_day: {
        type: Number,
        required: true,
        default: 0,
    },
    sunshine_duration: {
        type: Number,
        required: true,
    },
});
hourlyWeatherSchema.set("timestamps", true);
hourlyWeatherSchema.virtual("id").get(function () {
    return this._id.toHexString();
});
hourlyWeatherSchema.set("toJSON", {
    virtuals: true,
});
exports.HrlyWeather = mongoose.model("HrlyWeather", hourlyWeatherSchema, "HourlyWeather");
