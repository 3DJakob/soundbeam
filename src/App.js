import React, { useState } from 'react'
import './css/App.css'

import LoginPage from './pages/Login'
import HomePage from './pages/Home'

function App() {
  const [route, setRoute] = useState('login')
  const [user, setUser] = useState()

  const goTo = (route) => {
    setRoute(route)
  }

  const loggedIn = (user) => {
    setUser(user)
    goTo('home')
  }

  return (
    <div style={{flex: 1}}>
      <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>
      {route === 'login' && <LoginPage onLoggedInCompleted={(user) => loggedIn(user)}></LoginPage>}
      {route === 'home' && <HomePage user={user}></HomePage>}
    </div>
  );
}

export default App;
