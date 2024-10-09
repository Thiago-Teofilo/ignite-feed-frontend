import { BrowserRouter } from 'react-router-dom'
import './global.css'
import { Router } from './Router'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  )
}
