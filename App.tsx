import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HomeScreen } from '@/screens/HomeScreen'

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
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  )
}
