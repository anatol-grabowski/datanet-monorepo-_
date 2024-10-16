import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  HashRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
import { User, Login } from './components/containers'

function RoutedApp() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path='/graph/:graph' Component={App} />
          <Route path='/user' Component={User} />
          <Route path='/login' Component={Login} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RoutedApp />
  </React.StrictMode>,
)
