import { HelmetProvider } from 'react-helmet-async'
import { AppRouter } from '@/router'
import { useAppPreloader } from '@/hooks/use-app-preloader'

export default function App() {
  useAppPreloader()

  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  )
}
