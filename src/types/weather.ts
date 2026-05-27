export interface CurrentWeather {
  temperature: number
  apparentTemperature: number
  weatherCode: number
  isDay: boolean
  description: string,
  icon: string
}

export interface ForecastDay {
  date: string
  description: string
  maxTemperature: number
  minTemperature: number
}

export interface WeatherData {
  location: string,
  current: CurrentWeather
  dailyForecast: ForecastDay[]
}