import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import HomePage from '@/pages/Home/HomePage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
