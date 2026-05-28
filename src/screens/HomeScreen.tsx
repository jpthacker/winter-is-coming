import { useWeather } from '@/hooks/useWeather'
import { WeatherIcon } from '@/components/WeatherIcon'
import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function HomeScreen() {
  const insets = useSafeAreaInsets()

  const { data, isLoading, isError } = useWeather()

  if (!data) return null

  if (isLoading) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.error}>Could not load weather data</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={data.dailyForecast}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={
          <View style={styles.current}>
            <Text style={styles.location}>{data.location}</Text>
            <WeatherIcon icon={data.current.icon} size={64} />
            <Text style={styles.temperature}>{data.current.temperature}°C</Text>
            <Text style={styles.description}>{data.current.description}</Text>
            <Text style={styles.feelsLike}>Feels like {data.current.apparentTemperature}°C</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.forecastRow}>
            <Text style={styles.forecastDate}>{item.date}</Text>
            <Text style={styles.forecastDescription}>{item.description}</Text>
            <Text style={styles.forecastTemp}>
              {item.minTemperature}° - {item.maxTemperature}°
            </Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  current: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  location: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
  },
  temperature: {
    fontSize: 64,
    fontWeight: '200',
    marginTop: 8,
  },
  description: {
    fontSize: 18,
    color: '#555',
  },
  feelsLike: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
  },
  forecastDate: {
    fontSize: 15,
    width: 120,
  },
  forecastDescription: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  forecastTemp: {
    fontSize: 15,
    fontWeight: '500',
    width: 90,
    textAlign: 'right',
  },
  error: {
    fontSize: 16,
    color: '#cc0000',
  },
})
