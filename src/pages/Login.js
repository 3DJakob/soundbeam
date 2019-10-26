import React, { useRef, useState } from 'react'
import logo from '../img/SoundBeam-white.svg'
import '../css/Login.css'

// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx } from '@emotion/core'
import InputWithButton from '../pages/Assets'

const { ipcRenderer } = window.require('electron')

function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showUsernameButton, setShowUsernameButton] = useState(true)
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const passwordRef = useRef()

  const updateEmail = (email) => {
    setEmail(email)
    setShowUsernameButton(false)
    passwordRef.current.focus()
    setShowPasswordInput(true)
  }

  const updatePassword = (password) => {
    const data = JSON.stringify({ email: email, password: password })
    ipcRenderer.send('login', data)
  }

  const emailInputClick = (e) => {
    if (showUsernameButton === false) {
      setShowUsernameButton(true)
      setShowPasswordInput(false)
    }
  }

  return (
    <div className='PageLogin'>
      <div className='GradientOverlay'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Log in with your existing SoundCloud account.</p>
        <InputWithButton onClick={emailInputClick} callback={updateEmail} showButton={showUsernameButton} placeholder='email' />
        <InputWithButton callback={updatePassword} show={showPasswordInput} password email={email} inputRef={passwordRef} />
        {/* <PasswordComponent password={true} inputRef={passwordRef} email={email} /> */}
        {/* <p css={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      transition: 200ms;
      &:hover {
        color: red;
        transform: scale(1.1);
      }
    `}>TEST</p> */}
        {/* <p>Don't have an account? <a onClick={shell.openExternal('google.se')}> Click here </a></p> */}
      </div>
    </div>
  )
}

export default LoginPage
