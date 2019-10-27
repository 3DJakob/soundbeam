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

const getLikes = () => {
  (async () => {
    const parsed = await ky.get('https://api-v2.soundcloud.com/users/28072597/track_likes?client_id=1SoBYKkeYLyQsSAiFMTGD0dc0ShJDKUf&limit=10&offset=0&linked_partitioning=1&app_version=1571932339&app_locale=en').json()
    const titles = parsed.collection.map(trackObj => {
      return trackObj.track.title
    })
  })();
}

function LoginWindow ({onUserLoggedIn, show}) {
  let style
  if (show) {
    style = {display: 'flex', animation: 'fade 600ms',}
  } else {
    style = {display: 'none'}
  }

  const getHTML = (webview) => {
    return new Promise((resolve) => {
      webview.executeJavaScript(`(function () {
        const html = document.body.innerHTML
        return html
      }())`, false, resolve)
    })
  }

  const getUserInfoObject = (html) => {
    let userInfo = html.split('catch(t){}})},')[1]
    userInfo = userInfo.split(');</script>')[0]
    const userInfoObject = JSON.parse(userInfo)[4].data[0]
    return userInfoObject
  }

  const webviewRef = useCallback(node => {
    if (node !== null) {
      node.addEventListener('dom-ready', () => {
        node.scrollTo(0,0);
        node.insertCSS('body{padding-bottom: 0 !important;} header{display: none !important;} .l-container.l-content{width: 100% !important; padding: 0 !important;} .l-signin .l-content{height: auto !important;} .l-footer{display:none !important;}')
        node.addEventListener('did-stop-loading', async () => {
          if (node.getURL() === 'https://soundcloud.com/discover') {
            console.log('User logged in!')
            const html = await getHTML(node)
            const user = getUserInfoObject(html)
            onUserLoggedIn(user)
          }
        })
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

function LoginPage ({onLoggedInCompleted}) {
  const [showWebview, setShowWebview] = useState(false)
  const openLoginWindow = () => {
    setShowWebview(true)
  }

  const xClick = () => {
    setShowWebview(false)
    getLikes()
  }

  return (
    <div className='PageLogin'>
      <div className='GradientOverlay'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Log in with your existing SoundCloud account.</p>

        <a onClick={openLoginWindow} className='connectBtn'><img src={whiteCloud}></img><p>Connect</p></a>

        <LoginWindow onUserLoggedIn={onLoggedInCompleted} show={showWebview}></LoginWindow>
        <XButton callback={xClick} show={showWebview}></XButton>
      </div>
    </div>
  )
}

export default LoginPage
