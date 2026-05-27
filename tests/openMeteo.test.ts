import { fetchWeather } from '@/api/openMeteo'
import { DEFAULT_LOCATION } from '@/constants/api'

const mockWeatherResponse = {
  latitude: 51.53,
  longitude: -3.39,
  timezone: 'Europe/London',
  timezone_abbreviation: 'GMT+1',
  current: {
    time: '2026-05-27T20:30',
    interval: 900,
    temperature_2m: 24.6,
    apparent_temperature: 25.5,
    weather_code: 2,
    is_day: 1,
  },
  daily: {
    time: ['2026-05-27', '2026-05-28'],
    weather_code: [3, 53],
    temperature_2m_max: [28.9, 26.4],
    temperature_2m_min: [18.3, 14.4],
  },
}

describe('fetchWeather', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('returns transformed weather data on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    })

    const result = await fetchWeather(
      DEFAULT_LOCATION.latitude,
      DEFAULT_LOCATION.longitude,
      DEFAULT_LOCATION.name,
    )

    expect(result.location).toBe(DEFAULT_LOCATION.name)
    expect(result.current.temperature).toBe(25)
    expect(result.dailyForecast).toHaveLength(2)
  })

  it('throws on non-2xx response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    })

    await expect(
      fetchWeather(
        DEFAULT_LOCATION.latitude,
        DEFAULT_LOCATION.longitude,
        DEFAULT_LOCATION.name,
      )
    ).rejects.toThrow('Weather API error: 500 Internal Server Error')
  })

  it('throws on network failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network request failed')
    )

    await expect(
      fetchWeather(
        DEFAULT_LOCATION.latitude,
        DEFAULT_LOCATION.longitude,
        DEFAULT_LOCATION.name,
      )
    ).rejects.toThrow('Network request failed')
  })
})