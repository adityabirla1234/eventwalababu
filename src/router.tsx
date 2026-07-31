import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { PageLoader } from '@/components/ui/Loading'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Services = lazy(() => import('@/pages/Services'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Inquiry = lazy(() => import('@/pages/Inquiry'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function withSuspense(node: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{node}</Suspense>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: 'about', element: withSuspense(<About />) },
      { path: 'services', element: withSuspense(<Services />) },
      { path: 'gallery', element: withSuspense(<Gallery />) },
      { path: 'inquiry', element: withSuspense(<Inquiry />) },
      { path: 'contact', element: withSuspense(<Contact />) },
      { path: '*', element: withSuspense(<NotFound />) },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
