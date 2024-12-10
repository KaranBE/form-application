import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './index.jsx'
import './styles/index.css'
import './styles/tailwind.css'
import './styles/font.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
