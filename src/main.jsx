import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>  removi o strictr mode para não executar duas vezes o codigo
    <App />
  // </React.StrictMode>,
)
