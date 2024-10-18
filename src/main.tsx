import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GraphBase from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GraphBase />
  </StrictMode>,
)
