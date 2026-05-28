import { useQuery } from '@tanstack/react-query'
import { fetchWeather } from '@/api/openMeteo'
import { DEFAULT_LOCATION } from '@/constants/api'

export function useWeather(
  latitude: number = DEFAULT_LOCATION.latitude,
  longitude: number = DEFAULT_LOCATION.longitude,
  locationName: string = DEFAULT_LOCATION.name,
) {
  return useQuery({
    queryKey: ['weather', latitude, longitude],
    queryFn: () => fetchWeather(latitude, longitude, locationName),
    refetchInterval: 1000 * 60 * 15,      // refresh every 15 minutes
    refetchIntervalInBackground: false,
  })
}