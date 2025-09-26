// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import bootstrap CSS BEFORE your app CSS so you can override if needed
import 'bootstrap/dist/css/bootstrap.min.css'

// Optional: import bootstrap JS (includes Popper) for components like dropdowns, modals
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Your app CSS (Tailwind or custom)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

