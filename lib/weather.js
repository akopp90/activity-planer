const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchWeatherData(lat, lon) {
  const response = await fetch(
    `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,is_day,rain,showers,snowfall,cloud_cover`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data = await response.json();

  let condition = "Unknown";

  if (data.current.rain > 0 || data.current.showers > 0) {
    condition = "Rainy";
  } else if (data.current.snowfall > 0) {
    condition = "Snowy";
  } else if (data.current.cloud_cover > 50) {
    condition = "Cloudy";
  } else if (data.current.is_day && data.current.cloud_cover <= 50) {
    condition = "Sunny";
  } else {
    condition = "Clear Night";
  }

  const temperature = `${data.current.temperature_2m} ${data.current_units.temperature_2m}`;

  return {
    temperature,
    condition,
  };
}
