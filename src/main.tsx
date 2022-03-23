import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { VersionProvider } from './contexts/version'

ReactDOM.render(
  <React.StrictMode>
    <VersionProvider>
      <App />
    </VersionProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
