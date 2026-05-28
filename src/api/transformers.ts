import { WEATHER_META } from "@/constants/weather";
import type { OpenMeteoResponse } from "@/types/api"
import type { ForecastDay, WeatherData } from "@/types/weather";

const DEFAULT_WEATHER_META = {
  description: 'Unknown',
  icon: 'cloud-question',
} as const

export function transformWeatherResponse(
  raw: OpenMeteoResponse,
  locationName: string,
): WeatherData {
  const weatherMeta = WEATHER_META[raw.current.weather_code] || DEFAULT_WEATHER_META
  const isDay = raw.current.is_day === 1
  return {
    location: locationName,
    current: {
      temperature: Math.round(raw.current.temperature_2m),
      apparentTemperature: Math.round(raw.current.apparent_temperature),
      weatherCode: raw.current.weather_code,
      isDay: isDay,
      description: weatherMeta.description,
      icon: isDay ? weatherMeta.icon : (weatherMeta.nightIcon || weatherMeta.icon),
    },
    dailyForecast: raw.daily.time.map((dateString, i): ForecastDay => ({
      date: new Date(`${dateString}T00:00:00`).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }),
      description: WEATHER_META[raw.daily.weather_code[i]]?.description || DEFAULT_WEATHER_META.description,
      maxTemperature: Math.round(raw.daily.temperature_2m_max[i]),
      minTemperature: Math.round(raw.daily.temperature_2m_min[i]),
    }))}
}