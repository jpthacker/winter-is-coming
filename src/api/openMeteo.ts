// src/api/openMeteo.ts
import { BASE_URL, DEFAULT_LOCATION } from '@/constants/api'
import { transformWeatherResponse } from '@/api/transformers'
import type { OpenMeteoResponse } from '@/types/api'
import type { WeatherData } from '@/types/weather'

export async function fetchWeather(
  latitude: number = DEFAULT_LOCATION.latitude,
  longitude: number = DEFAULT_LOCATION.longitude,
  locationName: string = DEFAULT_LOCATION.name,
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'weather_code',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
    ].join(','),
    timezone: 'auto',
    forecast_days: '7',
  })

  const response = await fetch(`${BASE_URL}?${params}`)

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
  }

  const data: OpenMeteoResponse = await response.json()
  return transformWeatherResponse(data, locationName)
}