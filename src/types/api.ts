export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  current: {
    time: string
    temperature_2m: number
    apparent_temperature: number
    weather_code: number
    is_day: 0 | 1
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}