import React, { useEffect, useState, useCallback } from 'react'
import ky from 'ky'
import usePromise from 'react-use-promise'
import '../css/Home.css'

import PlayList from '../components/PlayList'

const getLikes = async (userId) => {
	const parsed = await ky.get(`https://api-v2.soundcloud.com/users/${userId}/track_likes?client_id=1SoBYKkeYLyQsSAiFMTGD0dc0ShJDKUf&limit=10&offset=0&linked_partitioning=1&app_version=1571932339&app_locale=en`).json()
	return parsed.collection.map(row => row)
}

function Player ({trackInfo, debug}) {
	const [visible, setVisible] = useState(false)

	useEffect(() => setVisible(false), [trackInfo])

	const webviewRef = useCallback(node => {
    if (node !== null) {
      node.addEventListener('dom-ready', async () => {
				setVisible(await pressPlay(node))
      })
    }
	}, []);

	const style = visible ? {height: 50, position: 'absolute', bottom: 0, width: '100vw'} : {opacity: 0}

	return (
		<webview style={style} ref={webviewRef} webpreferences='images=no' src={trackInfo.track.permalink_url}>

		</webview>
	)
}

const pressPlay = (webview) => {
	return new Promise((resolve) => {
		webview.executeJavaScript(`(function () {
			const pauseElement = document.querySelector('.sc-button-play.sc-button-pause')
			if (!pauseElement) {
				const playElement = document.querySelector('.sc-button-play')
				playElement.click()
			}

			const playControls = document.querySelector('.playControls')

			document.body.innerHTML = ''
			document.body.appendChild(playControls)

			return true
		}())`, false, resolve)
	})
}

function HomePage ({user}) {
	const [nowPlaying, setNowPlaying] = useState()
	const [likes] = usePromise(() => getLikes(user.id), [user.id])
	const onTrackClicked = (trackInfo) => {
		setNowPlaying(trackInfo)
	}

	return (
		<div className='PageHome'>
			{likes ? <PlayList nowPlaying={nowPlaying} onTrackClicked={onTrackClicked} playlist={likes}></PlayList> : 'loading...'}
			{/* {nowPlaying ? <Player debug={true} trackInfo={nowPlaying}></Player> : ''} */}
		</div>
	)
}

export default HomePage