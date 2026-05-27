import { MaterialCommunityIcons } from '@expo/vector-icons'
import type { ComponentProps } from 'react'

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name']

interface Props {
  icon: string
  size?: number
  color?: string
}

export function WeatherIcon({ icon, size = 48, color = '#000' }: Props) {
  return <MaterialCommunityIcons name={icon as IconName} size={size} color={color} />
}
