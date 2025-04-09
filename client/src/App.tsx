import { Routes, Route } from 'react-router-dom'
import ListPage from './pages/ListPage'
import SinglePage from './pages/SinglePage'
import AccessDeniedPage from './pages/AccessDeniedPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<ListPage />} />
      <Route path='/:id' element={<SinglePage />} />
      <Route path='/access-denied' element={<AccessDeniedPage />} />
    </Routes>
  )
}

export default App
