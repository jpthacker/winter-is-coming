// __tests__/transformers.test.ts
import { transformWeatherResponse } from '@/api/transformers'
import type { OpenMeteoResponse } from '@/types/api'

const mockResponse: OpenMeteoResponse = {
  latitude: 51.53,
  longitude: -3.39,
  current: {
    time: '2026-05-27T20:30',
    temperature_2m: 24.6,
    apparent_temperature: 25.5,
    weather_code: 2,
    is_day: 1,
  },
  daily: {
    time: ['2026-05-27', '2026-05-28', '2026-05-29'],
    weather_code: [3, 3, 53],
    temperature_2m_max: [28.9, 26.4, 18.4],
    temperature_2m_min: [18.3, 14.4, 12.0],
  },
}

describe('transformWeatherResponse', () => {
  describe('current weather', () => {
    it('rounds temperature to nearest integer', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.current.temperature).toBe(25)
    })

    it('rounds apparent temperature to nearest integer', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.current.apparentTemperature).toBe(26)
    })

    it('converts is_day integer to boolean', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.current.isDay).toBe(true)

      const nightResult = transformWeatherResponse(
        { ...mockResponse, current: { ...mockResponse.current, is_day: 0 } },
        'Bristol'
      )
      expect(nightResult.current.isDay).toBe(false)
    })

    it('resolves weather code to description', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.current.description).toBe('Partly cloudy')
    })

    it('falls back to default meta for unknown weather code', () => {
      const result = transformWeatherResponse(
        { ...mockResponse, current: { ...mockResponse.current, weather_code: 999 } },
        'Bristol'
      )
      expect(result.current.description).toBe('Unknown')
      expect(result.current.icon).toBe('cloud-question')
    })

    it('attaches location name', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.location).toBe('Bristol')
    })
  })

  describe('daily forecast', () => {
    it('returns correct number of forecast days', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.dailyForecast).toHaveLength(3)
    })

    it('rounds max and min temperatures', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.dailyForecast[0].maxTemperature).toBe(29)
      expect(result.dailyForecast[0].minTemperature).toBe(18)
    })

    it('formats date as localised string', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.dailyForecast[0].date).toBe('Wednesday 27 May')
    })

    it('maps weather code to description for each day', () => {
      const result = transformWeatherResponse(mockResponse, 'Bristol')
      expect(result.dailyForecast[2].description).toBe('Drizzle')
    })
  })
})