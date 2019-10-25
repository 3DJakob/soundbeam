import React, {useState} from 'react';
import logo from '../img/SoundBeam-white.svg';
import '../css/Login.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import InputWithButton from '../pages/Assets'
// const electronOpenLinkInBrowser = require("electron-open-link-in-browser")

function LoginPage() {
  const [email = '', setEmail] = useState({})

  const updateEmail = (email) => {
    console.log(email)
    setEmail(email)
  }

  const updatePassword = (password) => {

  }

  const PasswordComponent = () => {
    if (Object.keys(email).length !== 0) {
      return (
        <InputWithButton callback={updatePassword} placeholder={'password'}></InputWithButton>
      )
    }
    return (null)
  }
 
  return (
    <div className="PageLogin">
      <div className="GradientOverlay">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Log in with your existing SoundCloud account.</p>
        <InputWithButton callback={updateEmail} placeholder={'email'}></InputWithButton>

        <PasswordComponent></PasswordComponent>

        {/* <p>Don't have an account? <a onClick={shell.openExternal('google.se')}> Click here </a></p> */}
      </div>
    </div>
    )
  }

  export default LoginPage