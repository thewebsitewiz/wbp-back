const test = async () => {
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

  let url = `https://api.open-meteo.com/v1/forecast?latitude=17.5711&longitude=-87.5859&
current=${currentParams.join(",")}&daily=${dailyParams.join(
    ","
  )}&hourly=${hourlyParams.join(",")}&
temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FChicago&forecast_days=14&forecast_hours=24&models=best_match`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();

    json["daily"]["sunrise"].forEach((element) => {
      console.log(element);
    });
  } catch (error) {
    console.error(error.message);
  }
};

test();
