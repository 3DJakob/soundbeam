import React from 'react'
import {useEffect, useRef} from 'react'


function Player ({nowPlaying, url}) {
  const webviewRef = useRef()

  useEffect( () => {
    if (nowPlaying) {
      console.log('Playing: ' + nowPlaying.isPlaying)
      if (webviewRef.current != null && nowPlaying != null) {
        (async () => {
          console.log(await pressPlay(webviewRef.current, nowPlaying))
        })()
      }
    }
  }, [nowPlaying])

  return (
    <webview ref={webviewRef} webpreferences='images=no' src={url} style={{display:'none'}}/>
  )
}

function pressPlay (webview, nowPlaying) {
  return new Promise((resolve) => {
    console.log(webview.executeJavaScript(`(function () {
      const permalink_url = ${JSON.stringify(nowPlaying.trackInfo.track.permalink_url)}
      const isPlaying = ${JSON.stringify(nowPlaying.isPlaying)}
      const playElements = document.querySelectorAll('.playableTile__artworkLink.audibleTile__artworkLink')
      const urls = []
      let pause
      playElements.forEach((button) => {
        if (button.href === permalink_url) {
          if (isPlaying) {
            const play = button.parentElement.querySelector('.sc-button-play')
            play.click()
          } else {
            pause = button.parentElement.querySelector('.sc-button-pause')
            pause.click()
          }
        }
      })

      if(pause) {
        return pause.innerHTML
      }


      return true
    }())`, false, resolve))
  })
}

export default Player