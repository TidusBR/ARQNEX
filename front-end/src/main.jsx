//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  /**
   * Modo restrito desativado porque ele re-renderiza todos os elementos duas vezes no modo de desenvolvimento.
   * Fonte: https://dev.to/jahid6597/why-useeffect-is-running-twice-in-react-18c6#comment-24m0a
   */
    <App />
)
