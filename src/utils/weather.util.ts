const path = require("path");
require("dotenv").config({ path: "/.env" });

import moment from "moment";

const { dbConnect, gracefulExit } = require("../config/dbConnect");
const mongoose = require("mongoose");
const WBP_MONGO_PROD_URI = `mongodb+srv://dennis:DradReqOsISwet1PhubR@cluster0.hzr1z7m.mongodb.net/wbp-dev?retryWrites=true&w=majority&appName=Cluster0`;
const conn = dbConnect(WBP_MONGO_PROD_URI);

import {
  WeatherResponse,
  CurrentWeatherResponse,
  DailyWeatherResponse,
  DailyWeather,
  HourlyWeather,
  CurrentWeather,
} from "../interfaces/weather.interface";

import { CurrWeather } from "../models/currentWeather.model";
import { DlyWeather } from "../models/dailyWeather.model";
import { HrlyWeather } from "../models/hourlyWeather.model";

process.on("SIGINT", gracefulExit(conn)).on("SIGTERM", gracefulExit(conn));

const utcOffset = -1;
let uploads = 0;

const _uploadCurrentWeather = async (curr: CurrentWeather) => {
  // Current weather
  try {
    uploads++;
    const newCurrWeather = new CurrWeather(curr);
    newCurrWeather
      .save()
      .then((result) => {
        if (result._id) {
          // console.log(`Current weather data saved with id: ${result._id}`);
        }
      })
      .finally(() => {
        uploads--;
      });
  } catch (e) {
    throw new Error(e);
  }
};

const _uploadDailyWeather = async (daily: DailyWeather[]) => {
  DlyWeather.deleteMany({}).then(() => {
    // Success
    daily.forEach((daily) => {
      uploads++;
      const newDailyWeather = new DlyWeather(daily);
      newDailyWeather
        .save()
        .then((result) => {
          if (result._id) {
            //console.log(`Daily weather data saved  with id: ${result._id}`);
          }
        })
        .finally(() => {
          uploads--;
        });
    });
  });
};

const _uploadHourlyWeather = async (hourly: HourlyWeather[]) => {
  HrlyWeather.deleteMany({}).then(() => {
    // Success
    hourly.forEach((hourly) => {
      uploads++;
      const newHourlyWeather = new HrlyWeather(hourly);
      newHourlyWeather
        .save()
        .then((result) => {
          if (result._id) {
            //console.log(`Hourly weather data saved  with id: ${result._id}`);
          }
        })
        .finally(() => {
          uploads--;
        });
    });
  });
};

const _processWeatherData = async (data: WeatherResponse) => {
  // Current weather
  let tempTime = _subtractHoursFromUTC(data.current.time, utcOffset);
  data.current.time = tempTime.toString();

  const currentWeather = data["current"] as unknown as CurrentWeather;

  // Daily weather
  let dailyWeather: DailyWeather[] = [];
  data.daily.time.forEach((time, index) => {
    dailyWeather.push({
      time,
      weather_code: data.daily.weather_code[index],
      temperature_2m_max: data.daily.temperature_2m_max[index],
      temperature_2m_min: data.daily.temperature_2m_min[index],
      apparent_temperature_max: data.daily.apparent_temperature_max[index],
      apparent_temperature_min: data.daily.apparent_temperature_min[index],
      sunrise: data.daily.sunrise[index],
      sunset: data.daily.sunset[index],
      daylight_duration: data.daily.daylight_duration[index],
      sunshine_duration: data.daily.sunshine_duration[index],
      uv_index_max: data.daily.uv_index_max[index],
      uv_index_clear_sky_max: data.daily.uv_index_clear_sky_max[index],
      precipitation_sum: data.daily.precipitation_sum[index],
      rain_sum: data.daily.rain_sum[index],
      showers_sum: data.daily.showers_sum[index],
      precipitation_hours: data.daily.precipitation_hours[index],
      precipitation_probability_max:
        data.daily.precipitation_probability_max[index],
      wind_speed_10m_max: data.daily.wind_speed_10m_max[index],
      wind_gusts_10m_max: data.daily.wind_gusts_10m_max[index],
      wind_direction_10m_dominant:
        data.daily.wind_direction_10m_dominant[index],
    });
  });

  // Hourly weather
  let hourlyWeather: HourlyWeather[] = [];
  data.hourly.time.forEach((time, index) => {
    let tempTime = _subtractHoursFromUTC(time, utcOffset);
    time = tempTime.toString();

    hourlyWeather.push({
      time: time,
      temperature_2m: data.hourly.temperature_2m[index],
      relative_humidity_2m: data.hourly.relative_humidity_2m[index],
      dew_point_2m: data.hourly.dew_point_2m[index],
      apparent_temperature: data.hourly.apparent_temperature[index],
      precipitation_probability: data.hourly.precipitation_probability[index],
      precipitation: data.hourly.precipitation[index],
      rain: data.hourly.rain[index],
      showers: data.hourly.showers[index],
      weather_code: data.hourly.weather_code[index],
      surface_pressure: data.hourly.surface_pressure[index],
      cloud_cover: data.hourly.cloud_cover[index],
      visibility: data.hourly.visibility[index],
      wind_speed_10m: data.hourly.wind_speed_10m[index],
      wind_direction_10m: data.hourly.wind_direction_10m[index],
      wind_gusts_10m: data.hourly.wind_gusts_10m[index],
      uv_index: data.hourly.uv_index[index],
      uv_index_clear_sky: data.hourly.uv_index_clear_sky[index],
      is_day: data.hourly.is_day[index],
      sunshine_duration: data.hourly.sunshine_duration[index],
    });
  });

  Object.keys(currentWeather).forEach((key) => {
    switch (data.current_units[key]) {
      case "°F":
        currentWeather[`${key}_metric`] = _F2C(currentWeather[key]);
        break;
      case "inch":
        currentWeather[`${key}_metric`] = _inch2cm(currentWeather[key]);
        break;
      case "ft":
        currentWeather[`${key}_metric`] = _feet2m(currentWeather[key]);
        break;
      case "mp/h":
        currentWeather[`${key}_metric`] = _mph2kph(currentWeather[key]);
        break;
    }
  });

  dailyWeather.forEach((daily) => {
    Object.keys(daily).forEach((key) => {
      switch (data.daily_units[key]) {
        case "°F":
          daily[`${key}_metric`] = _F2C(daily[key]);
          break;
        case "inch":
          daily[`${key}_metric`] = _inch2cm(daily[key]);
          break;
        case "ft":
          daily[`${key}_metric`] = _feet2m(daily[key]);
          break;
        case "mp/h":
          daily[`${key}_metric`] = _mph2kph(daily[key]);
          break;
      }
    });
  });

  hourlyWeather.forEach((hourly) => {
    Object.keys(hourly).forEach((key) => {
      switch (data.hourly_units[key]) {
        case "°F":
          hourly[`${key}_metric`] = _F2C(hourly[key]);
          break;
        case "inch":
          hourly[`${key}_metric`] = _inch2cm(hourly[key]);
          break;
        case "ft":
          hourly[`${key}_metric`] = _feet2m(hourly[key]);
          break;
        case "mp/h":
          hourly[`${key}_metric`] = _mph2kph(hourly[key]);
          break;
      }
    });
  });

  console.log("Current Weather: ");
  await _uploadCurrentWeather(currentWeather);

  console.log("Daily Weather: ");
  await _uploadDailyWeather(dailyWeather);

  console.log("Hourly Weather: ");
  await _uploadHourlyWeather(hourlyWeather);
};

const _retrieveWeatherData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = (await response.json()) as WeatherResponse;
    try {
      await _processWeatherData(json);
    } finally {
      console.log("Weather data uploaded successfully");
      while (uploads > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      gracefulExit(conn);
      process.exit(0);              
    }
  } catch (error) {
    console.error(error.message);
  }
};

const _getParams = () => {
  const currentParams = [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "is_day",
    "precipitation",
    "rain",
    "showers",
    "weather_code",
    "cloud_cover",
    "pressure_msl",
    "surface_pressure",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
    "visibility",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
    "uv_index",
    "uv_index_clear_sky",
    "is_day",
    "sunshine_duration",
  ];

  const dailyParams = [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "apparent_temperature_max",
    "apparent_temperature_min",
    "sunrise",
    "sunset",
    "daylight_duration",
    "sunshine_duration",
    "uv_index_max",
    "uv_index_clear_sky_max",
    "precipitation_sum",
    "rain_sum",
    "showers_sum",
    "precipitation_hours",
    "precipitation_probability_max",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
    "wind_direction_10m_dominant",
  ];

  const hourlyParams = [
    "temperature_2m",
    "relative_humidity_2m",
    "dew_point_2m",
    "apparent_temperature",
    "precipitation_probability",
    "precipitation",
    "rain",
    "showers",
    "weather_code",
    "surface_pressure",
    "cloud_cover",
    "visibility",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
    "uv_index",
    "uv_index_clear_sky",
    "is_day",
    "sunshine_duration",
  ];

  return { currentParams, dailyParams, hourlyParams };
};

const params = _getParams();

const url = `https://api.open-meteo.com/v1/forecast?latitude=17.5711&longitude=-87.5859&current=${params.currentParams.join(
  ","
)}&daily=${params.dailyParams.join(",")}&hourly=${params.hourlyParams.join(
  ","
)}&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=14&forecast_hours=24&models=best_match`;

const weatherData = _retrieveWeatherData(url);

function _subtractHoursFromUTC(utcTime, hoursToSubtract) {
  const date = new Date(utcTime);
  date.setHours(date.getHours() - hoursToSubtract);
  return date.toISOString();
}

function _feet2m(feet: number): number {
  return _round(feet * 0.3048, 2);
}

function _mph2kph(mph: number): number {
  return _round(mph * 1.60934, 2);
}

function _inch2cm(inch: number): number {
  return _round(inch * 2.54, 3);
}

function _F2C(F: number): number {
  const C = (F - 32) * (5 / 9);
  return _round(C, 1);
}

function _round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
