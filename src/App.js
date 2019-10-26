import React from 'react';
import './css/App.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import LoginPage from './pages/Login';

function App() {
  return (
    <div style={{flex: 1}}>
      <link href="https://fonts.googleapis.com/css?family=Varela+Round&display=swap" rel="stylesheet"></link>
      <LoginPage></LoginPage>
    </div>
  );
}

export default App;
