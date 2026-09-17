import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LoadingBarContainer } from 'react-top-loading-bar'
import App from './App'
import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingBarContainer>
      <App />
    </LoadingBarContainer>
  </StrictMode>,
)
