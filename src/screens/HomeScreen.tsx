// src/screens/HomeScreen.tsx
import { useWeather } from '@/hooks/useWeather'
import { ActivityIndicator } from 'react-native'

export function HomeScreen() {
  const { data, isLoading, isError } = useWeather()

  if (isLoading) return <ActivityIndicator />
  if (isError)
    return (
      <>
        <p>"Could not load weather data"</p>
      </>
    )

  return (
    <>
      <h1>Weather in {data!.location}</h1>
      <p>
        {data!.current.description}, {data!.current.temperature}°C
      </p>
      <h2>7-day forecast</h2>
      <ul>
        {data!.dailyForecast.map((day) => (
          <li key={day.date}>
            {day.date}: {day.description}, {day.minTemperature}°C - {day.maxTemperature}°C
          </li>
        ))}
      </ul>
    </>
  )
}
