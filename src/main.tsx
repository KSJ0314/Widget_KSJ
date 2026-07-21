import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/orbitron/400.css'
import '@fontsource/orbitron/700.css'
import '@fontsource/orbitron/900.css'
import '@fontsource/playfair-display/400.css'
import '@fontsource/playfair-display/700.css'
import '@fontsource/libre-baskerville/400.css'
import '@fontsource/libre-baskerville/700.css'
import '@fontsource/dm-serif-display/400.css'
import '@fontsource/pretendard/400.css'
import '@fontsource/pretendard/700.css'
import '@fontsource/gowun-batang/400.css'
import '@fontsource/gowun-batang/700.css'
import '@fontsource/gaegu/400.css'
import '@fontsource/gaegu/700.css'
import '@fontsource/nanum-pen-script/400.css'
import './theme/fonts.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
