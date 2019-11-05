import React, { useEffect, useState, useCallback } from 'react'
import ky from 'ky'
import usePromise from 'react-use-promise'
import '../css/Home.css'

import PlayList from '../components/PlayList'

const getLikes = async (userId) => {
	const parsed = await ky.get(`https://api-v2.soundcloud.com/users/${userId}/track_likes?client_id=1SoBYKkeYLyQsSAiFMTGD0dc0ShJDKUf&limit=10&offset=0&linked_partitioning=1&app_version=1571932339&app_locale=en`).json()
	return parsed.collection.map(row => row)
}

function HomePage ({user}) {
	const [nowPlaying, setNowPlaying] = useState()

	const [likeNowPlaying, setLikeNowPlaying] = useState()

	const [likes] = usePromise(() => getLikes(user.id), [user.id])
	const onLikeTrackClicked = (clicked) => {
		setLikeNowPlaying(clicked)
		setNowPlaying(clicked)
	}

	return (
		<div className='PageHome'>
			{likes ? <PlayList nowPlaying={likeNowPlaying} onTrackClicked={onLikeTrackClicked} playlist={likes} url='https://soundcloud.com/you/likes'></PlayList> : 'loading...'}
			{/* {nowPlaying ? <Player debug={true} trackInfo={nowPlaying}></Player> : ''} */}
		</div>
	)
}

export default HomePage