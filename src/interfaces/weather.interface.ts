export interface WeatherParams {
  current?: string[];
  daily?: string[];
  forecast_days?: number;
  forecast_hours?: number;
  hourly?: string[];
  latitude: number;
  longitude: number;
  models: string;
  precipitation_unit: string;
  temperature_unit: string;
  timezone: string;
  wind_speed_unit: string;
}

export interface WeatherResponse {
  current_units: CurrentUnits;
  current: CurrentWeatherResponse;
  daily_units: DailyUnits;
  daily: DailyWeatherResponse;
  elevation: number;
  generationtime_ms: number;
  hourly_units: HourlyUnits;
  hourly: HourlyWeatherResponse;
  latitude: number;
  longitude: number;
  timezone_abbreviation: string;
  timezone: string;
  utc_offset_seconds: number;
}

export interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  apparent_temperature: string;
  is_day: string;
  precipitation: string;
  rain: string;
  showers: string;
  weather_code: string;
  cloud_cover: string;
  pressure_msl: string;
  surface_pressure: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
  visibility: string;
  uv_index: string;
  uv_index_clear_sky: string;
  sunshine_duration: string;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  dew_point_2m: string;
  apparent_temperature: string;
  precipitation_probability: string;
  precipitation: string;
  rain: string;
  showers: string;
  weather_code: string;
  surface_pressure: string;
  cloud_cover: string;
  visibility: string;
  wind_speed_10m: string;
  wind_direction_10m: string;
  wind_gusts_10m: string;
  uv_index: string;
  uv_index_clear_sky: string;
  is_day: string;
  sunshine_duration: string;
}

export interface DailyUnits {
  time: string;
  weather_code: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  apparent_temperature_max: string;
  apparent_temperature_min: string;
  sunrise: string;
  sunset: string;
  daylight_duration: string;
  sunshine_duration: string;
  uv_index_max: string;
  uv_index_clear_sky_max: string;
  precipitation_sum: string;
  rain_sum: string;
  showers_sum: string;
  precipitation_hours: string;
  precipitation_probability_max: string;
  wind_speed_10m_max: string;
  wind_gusts_10m_max: string;
  wind_direction_10m_dominant: string;
}

export interface CurrentWeatherResponse {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day?: number;
  precipitation: number;
  rain: number;
  showers: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  visibility: number;
  uv_index: number;
  uv_index_clear_sky: number;
  sunshine_duration: number;
}

export interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
  temperature_2m_metric?: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  apparent_temperature_metric?: number;
  is_day?: number;
  precipitation: number;
  precipitation_metric?: number;
  rain: number;
  rain_metric?: number;
  showers: number;
  showers_metric?: number;
  weather_code: number;
  cloud_cover: number;
  pressure_msl: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_speed_10m_metric?: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  wind_gusts_10m_metric?: number;
  visibility: number;
  visibility_metric?: number;
  uv_index: number;
  uv_index_clear_sky: number;
  sunshine_duration: number;
}

export interface DailyWeatherResponse {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  sunrise: string[];
  sunset: string[];
  daylight_duration: number[];
  sunshine_duration: number[];
  uv_index_max: number[];
  uv_index_clear_sky_max: number[];
  precipitation_sum: number[];
  rain_sum: number[];
  showers_sum: number[];
  precipitation_hours: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  wind_direction_10m_dominant: number[];
}

export interface DailyWeather {
  time: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_max_metric?: number;
  temperature_2m_min: number;
  temperature_2m_min_metric?: number;
  apparent_temperature_max: number;
  apparent_temperature_max_metric?: number;
  apparent_temperature_min: number;
  apparent_temperature_min_metric?: number;
  sunrise: string;
  sunset: string;
  daylight_duration: number;
  sunshine_duration: number;
  uv_index_max: number;
  uv_index_clear_sky_max: number;
  precipitation_sum: number;
  precipitation_sum_metric?: number;
  rain_sum: number;
  rain_sum_metric?: number;
  showers_sum: number;
  showers_sum_metric?: number;
  precipitation_hours: number;
  precipitation_probability_max: number;
  wind_speed_10m_max: number;
  wind_gusts_10m_max: number;
  wind_direction_10m_dominant: number;
}

export interface HourlyWeatherResponse {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  precipitation: number[];
  rain: number[];
  showers: number[];
  weather_code: number[];
  surface_pressure: number[];
  cloud_cover: number[];
  visibility: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  wind_gusts_10m: number[];
  uv_index: number[];
  uv_index_clear_sky: number[];
  is_day: number[];
  sunshine_duration: number[];
}

export interface HourlyWeather {
  time: string;
  temperature_2m: number;
  temperature_2m_metric?: number;
  relative_humidity_2m: number;
  dew_point_2m: number;
  apparent_temperature: number;
  apparent_temperature_metric?: number;
  precipitation_probability: number;
  precipitation: number;
  precipitation_metric?: number;
  rain: number;
  rain_metric?: number;
  showers: number;
  showers_metric?: number;
  weather_code: number;
  surface_pressure: number;
  cloud_cover: number;
  visibility: number;
  visibility_metric?: number;
  wind_speed_10m: number;
  wind_speed_10m_metric?: number;
  wind_direction_10m: number;
  wind_gusts_10m: number;
  wind_gusts_10m_metric?: number;
  uv_index: number;
  uv_index_clear_sky: number;
  is_day: number;
  sunshine_duration: number;
}
