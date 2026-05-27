import type { ComponentProps } from 'react'
import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

interface WeatherMeta {
  description: string
  icon: IconName
  nightIcon?: IconName
}

export const WEATHER_META: Record<number, WeatherMeta> = {
  0:  { description: 'Clear sky',         icon: 'weather-sunny',         nightIcon: 'weather-night' },
  1:  { description: 'Mainly clear',      icon: 'weather-partly-cloudy', nightIcon: 'weather-night-partly-cloudy' },
  2:  { description: 'Partly cloudy',     icon: 'weather-partly-cloudy', nightIcon: 'weather-night-partly-cloudy' },
  3:  { description: 'Overcast',          icon: 'weather-cloudy' },
  45: { description: 'Foggy',             icon: 'weather-fog' },
  48: { description: 'Icy fog',           icon: 'weather-fog' },
  51: { description: 'Light drizzle',     icon: 'weather-partly-rainy' },
  53: { description: 'Drizzle',           icon: 'weather-partly-rainy' },
  55: { description: 'Heavy drizzle',     icon: 'weather-rainy' },
  61: { description: 'Light rain',        icon: 'weather-rainy' },
  63: { description: 'Rain',              icon: 'weather-rainy' },
  65: { description: 'Heavy rain',        icon: 'weather-pouring' },
  71: { description: 'Light snow',        icon: 'weather-snowy' },
  73: { description: 'Snow',              icon: 'weather-snowy' },
  75: { description: 'Heavy snow',        icon: 'weather-snowy-heavy' },
  77: { description: 'Snow grains',       icon: 'weather-snowy' },
  80: { description: 'Light showers',     icon: 'weather-partly-rainy' },
  81: { description: 'Showers',           icon: 'weather-partly-rainy' },
  82: { description: 'Heavy showers',     icon: 'weather-pouring' },
  85: { description: 'Snow showers',      icon: 'weather-snowy-rainy' },
  86: { description: 'Heavy snow showers',icon: 'weather-snowy-rainy' },
  95: { description: 'Thunderstorm',      icon: 'weather-lightning' },
  96: { description: 'Thunderstorm',      icon: 'weather-lightning-rainy' },
  99: { description: 'Heavy thunderstorm',icon: 'weather-lightning-rainy' },
} as const