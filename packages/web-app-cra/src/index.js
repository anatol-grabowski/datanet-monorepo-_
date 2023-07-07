import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Navigate, Routes } from 'react-router-dom'
import App from './App'
import { User } from './components/containers'

const RoutableApp = ({ match }) => <App graphName={match.params.graph} />

function RoutedApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/graph/" />} />
        <Route path="/graph" exact element={<App graphName="/" />} />
        <Route path="/graph/:graph" element={<RoutableApp />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  )
}

ReactDOM.render(<RoutedApp />, document.getElementById('root'))
