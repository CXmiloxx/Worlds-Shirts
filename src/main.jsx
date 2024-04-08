import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppRouter from './AppRouter'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter>
      <App />
    </AppRouter>
  </React.StrictMode>,
)
