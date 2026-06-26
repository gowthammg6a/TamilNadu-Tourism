import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './darkmode.css'
import App from './App.jsx'
import { ThemeProvider, LangProvider, BookmarkProvider } from './context/AppContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <BookmarkProvider>
          <App />
        </BookmarkProvider>
      </LangProvider>
    </ThemeProvider>
  </StrictMode>,
)
