"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openmeteo_1 = require("openmeteo");
const moment_1 = __importDefault(require("moment"));
const currentWeather_model_1 = require("../models/currentWeather.model");
const dailyWeather_model_1 = require("../models/dailyWeather.model");
const hourlyWeather_model_1 = require("../models/hourlyWeather.model");
const API_KEYs = {
    ipgeolocation: "8d906c8091124716b1ed301a05162b3c",
};
const _getCurrentWeather = (req, res) => {
    console.log("getCurrentWeather");
    try {
        return currentWeather_model_1.CurrWeather.findOne().sort({ createdAt: -1 }).limit(1);
    }
    catch (e) {
        console.error(`Error in catch for getCurrentWeather: ${e}`);
    }
};
const _getDailyWeather = (req, res) => {
    console.log("getDailyWeather");
    try {
        return dailyWeather_model_1.DlyWeather.find().sort({});
    }
    catch (e) {
        console.error(`Error in catch for getDailyWeather: ${e}`);
    }
};
const _getHourlyWeather = (req, res) => {
    console.log("getHourlyWeather");
    try {
        return hourlyWeather_model_1.HrlyWeather.find().sort({ time: 1 });
    }
    catch (e) {
        console.error(`Error in catch for getHourlyWeather: ${e}`);
    }
};
const _getMarine = async (req, res) => {
    const params = {
        latitude: 17.5712,
        longitude: -87.5904,
        current: [
            "wave_height",
            "wave_direction",
            "wave_period",
            "wind_wave_height",
            "wind_wave_direction",
            "wind_wave_period",
            "wind_wave_peak_period",
            "swell_wave_height",
            "swell_wave_direction",
            "swell_wave_period",
            "swell_wave_peak_period",
            "ocean_current_velocity",
            "ocean_current_direction",
        ],
        hourly: [
            "wave_height",
            "wave_direction",
            "wind_wave_height",
            "wind_wave_direction",
            "wind_wave_period",
            "wind_wave_peak_period",
            "swell_wave_height",
            "swell_wave_direction",
            "swell_wave_period",
            "swell_wave_peak_period",
            "ocean_current_velocity",
            "ocean_current_direction",
        ],
        length_unit: "imperial",
        wind_speed_unit: "mph",
        forecast_hours: 24,
        models: "best_match",
    };
    try {
        const url = "https://marine-api.open-meteo.com/v1/marine";
        const responses = await (0, openmeteo_1.fetchWeatherApi)(url, params);
        // Helper function to form time ranges
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
        // Process first location. Add a for-loop for multiple locations or weather models
        const response = responses[0];
        // Attributes for timezone and location
        const utcOffsetSeconds = response.utcOffsetSeconds();
        const timezone = response.timezone();
        const timezoneAbbreviation = response.timezoneAbbreviation();
        const latitude = response.latitude();
        const longitude = response.longitude();
        const current = response.current();
        const hourly = response.hourly();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const marineData = {
            current: {
                time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
                waveHeight: current.variables(0).value(),
                waveDirection: current.variables(1).value(),
                wavePeriod: current.variables(2).value(),
                windWaveHeight: current.variables(3).value(),
                windWaveDirection: current.variables(4).value(),
                windWavePeriod: current.variables(5).value(),
                windWavePeakPeriod: current.variables(6).value(),
                swellWaveHeight: current.variables(7).value(),
                swellWaveDirection: current.variables(8).value(),
                swellWavePeriod: current.variables(9).value(),
                swellWavePeakPeriod: current.variables(10).value(),
                oceanCurrentVelocity: current.variables(11).value(),
                oceanCurrentDirection: current.variables(12).value(),
            },
            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
                waveHeight: hourly.variables(0).valuesArray(),
                waveDirection: hourly.variables(1).valuesArray(),
                windWaveHeight: hourly.variables(2).valuesArray(),
                windWaveDirection: hourly.variables(3).valuesArray(),
                windWavePeriod: hourly.variables(4).valuesArray(),
                windWavePeakPeriod: hourly.variables(5).valuesArray(),
                swellWaveHeight: hourly.variables(6).valuesArray(),
                swellWaveDirection: hourly.variables(7).valuesArray(),
                swellWavePeriod: hourly.variables(8).valuesArray(),
                swellWavePeakPeriod: hourly.variables(9).valuesArray(),
                oceanCurrentVelocity: hourly.variables(10).valuesArray(),
                oceanCurrentDirection: hourly.variables(11).valuesArray(),
            },
        };
        // `marineData` now contains a simple structure with arrays for datetime and marine data
        for (let i = 0; i < marineData.hourly.time.length; i++) {
            /*console.log({
              time: marineData.hourly.time[i].toISOString(),
              timezone: timezone,
              timezoneAbbreviation: timezoneAbbreviation,
              waveHeight: marineData.hourly.waveHeight[i],
              waveDirection: marineData.hourly.waveDirection[i],
              windWaveHeight: marineData.hourly.windWaveHeight[i],
              windWaveDirection: marineData.hourly.windWaveDirection[i],
              windWavePeriod: marineData.hourly.windWavePeriod[i],
              windWavePeakPeriod: marineData.hourly.windWavePeakPeriod[i],
              swellWaveHeight: marineData.hourly.swellWaveHeight[i],
              swellWaveDirection: marineData.hourly.swellWaveDirection[i],
              swellWavePeriod: marineData.hourly.swellWavePeriod[i],
              swellWavePeakPeriod: marineData.hourly.swellWavePeakPeriod[i],
              oceanCurrentVelocity: marineData.hourly.oceanCurrentVelocity[i],
              oceanCurrentDirection: marineData.hourly.oceanCurrentDirection[i],
            }); */
        }
        return marineData;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
module.exports.getMarine = _getMarine;
const _getSunriseSunset = async (req, res) => {
    const date_start = new Date().toISOString().split("T")[0];
    const date_end = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const url = `https://api.sunrisesunset.io/json?lat=17.5711&lng=-87.5859&timezone=CST&date_start=${date_start}&date_end=${date_end}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log("Sunrise Sunset: ", data);
        return data;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
const _getAstro = async (req, res) => {
    const date = new Date().toISOString().split("T")[0];
    console.log("Astro Date: ", date);
    const url = `https://api.ipgeolocation.io/astronomy?apiKey=${API_KEYs.ipgeolocation}&lat=17.5711&long=-87.5859&date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log("getAstro: ", data);
        return data;
    }
    catch (e) {
        console.error(`Error fetching JSON data: ${e}`);
    }
};
module.exports.getAstro = _getAstro;
const _getMoonPhase = async (req, res) => {
    // Retrieve a unix timestamp for date
    const time = new Date();
    const timestamp = time.getTime();
    const date = Math.round(timestamp / 1000); //Returns a unix timestamp ie. 1572958651
    const DBdate = (0, moment_1.default)().format("MMM Do YY");
    const url = `http://api.farmsense.net/v1/moonphases/?d=${date}`;
    const response = await fetch(url);
    let data = [];
    data = await response.json();
    if (data.length === 0 || data[0].Error) {
        console.error(`Error fetching JSON data: ${data[0].ErrorMsg}`);
        throw new Error(data[0].ErrorMsg);
    }
    else {
        data = data[0];
        // console.log("Moon data: ", data);
        return data;
    }
    /*
  TIMESTAMP TESTS
  11% Waning Crescent: 49403867651 **
  100% Full Moon: 39209867651
  Waxing Crescent: 59403867651
  1st Quarter: 59666674651
  Waning Crescent: 5998374651
  New Moon: 5993902651
  31% Waxing Cresecnet: 5900002651
  30% Waxing Crescent: 6900115651
  3% Waning Crescent: 88379867651
  */
};
module.exports.getMoonPhase = _getMoonPhase;
const _getEnvironmentalData = async (req, res) => {
    Promise.all([
        _getMoonPhase(req, res),
        _getCurrentWeather(req, res),
        _getDailyWeather(req, res),
        _getHourlyWeather(req, res),
    ])
        .then((values) => {
        const value = {
            moon: values[0],
            current: values[1],
            daily: values[2],
            hourly: values[3],
        };
        return res.status(200).send(value);
    })
        .catch((error) => {
        return res.status(500).json({
            success: false,
            message: `error in catch for getTags: ${error}`,
        });
    });
};
module.exports.getEnvironmentalData = _getEnvironmentalData;
function takeAll(arg0) {
    throw new Error("Function not implemented.");
}
