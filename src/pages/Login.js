import React, { useRef, useState, useCallback } from 'react'
import logo from '../img/SoundBeam-white.svg'
import whiteCloud from '../img/soundcloud-cloud-white.svg'
import '../css/Login.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import ky from 'ky'
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, keyframes, css } from '@emotion/core'
import InputWithButton from '../pages/Assets'

const connectStyle = {
  display: 'flex',
  borderRadius: 4,
  height: 20
}

function LoginWindow (props) {
  let style
  if (props.show) {
    style = {display: 'flex', animation: 'fade 600ms',}
  } else {
    style = {display: 'none'}
  }

  const webviewRef = useCallback(node => {
    if (node !== null) {
      node.addEventListener('dom-ready', () => {
        node.scrollTo(0,0);
        node.insertCSS('body{padding-bottom: 0 !important;} header{display: none !important;} .l-container.l-content{width: 100% !important; padding: 0 !important;} .l-signin .l-content{height: auto !important;} .l-footer{display:none !important;}')
      })
    }
  }, []);

  return (
    <webview ref={webviewRef} style={style} id="foo" src="https://soundcloud.com/signin"></webview>
  )
}

function XButton ({callback, show}) {

  const xClick = () => {

  }

  let style
  if (show) {
    style = {opacity: 1}
  } else {
    style = {opacity: 0}
  }

  return (
    <a style={style} className={'cross'} onClick={callback}>
      <FontAwesomeIcon style={{color: '#fff'}} icon={faTimes} />
    </a>
  )
}

function LoginPage () {
  const [showWebview, setShowWebview] = useState(false)
  const openLoginWindow = () => {
    setShowWebview(true)
  }

  const xClick = () => {
    setShowWebview(false)
  }

  return (
    <div className='PageLogin'>
      <div className='GradientOverlay'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Log in with your existing SoundCloud account.</p>

        <a onClick={openLoginWindow} className='connectBtn'><img src={whiteCloud}></img><p>Connect</p></a>

        <LoginWindow show={showWebview}></LoginWindow>
        <XButton callback={xClick} show={showWebview}></XButton>
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
      </div>
    </div>
  )
}

export default LoginPage
