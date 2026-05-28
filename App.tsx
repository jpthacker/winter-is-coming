import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HomeScreen } from '@/screens/HomeScreen'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 15,
      retry: 2,
    },
  },
})

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
