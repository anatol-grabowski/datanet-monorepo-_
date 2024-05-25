import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import App from './App'
import { User } from './components/containers'

function RoutedApp() {
  return (
    <Router>
      <Routes>
        <Route path='/graph/:graph' Component={App} />
        <Route path='/user' Component={User} />
      </Routes>
    </Router>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoutedApp />
  </React.StrictMode>,
)
