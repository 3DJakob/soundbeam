import React from 'react'
import millify from 'millify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import CoverArt from '../components/CoverArt'
import Player from '../components/Player'
import getHighResArtworkURL from '../lib/utils'

function Track ({isPlaying, trackInfo, onTrackClicked}) {
    const count = millify(trackInfo.track.playback_count)

    const trackClick = () => {
        onTrackClicked(trackInfo)
    }

    return (
        <div style={isPlaying ? {backgroundColor: 'rgba(255, 255, 255, 0.4)'} : {}} className='track' onClick={trackClick}>
            <p>{trackInfo.track.user.username}</p>
            <p>{trackInfo.track.title}</p>
            <p>{count}</p>
            {trackInfo.kind === 'like' ? <FontAwesomeIcon style={{color: '#fff'}} icon={faHeart} /> : ''}
        </div>
    )
}

function PlayList ({nowPlaying, playlist, onTrackClicked, url}) {
    const trackClick = (trackInfo) => {
        // set to pause if clicked track is playing
        let state = true
        if (nowPlaying) {
            if (nowPlaying.trackInfo.track.id === trackInfo.track.id) {
                state = !nowPlaying.isPlaying
            }
        }
        const data = {
            isPlaying: state,
            trackInfo: trackInfo,
        }
        onTrackClicked(data)
    }

    const playingStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }

    const nowPlayingTrackId = nowPlaying && nowPlaying.trackInfo.track.id || null
    console.log(nowPlayingTrackId)

    if(playlist[0].track.id === nowPlayingTrackId) {
        console.log('make it red!')
    }

    return (
        <div className='playlist'>
            <Player nowPlaying={nowPlaying} playlist={playlist} url={url}/>

            <CoverArt trackInfo={nowPlaying ? nowPlaying.trackInfo : playlist[0]}/>

            <div className='trackList'>
                {playlist.map(trackInfo => <Track isPlaying={nowPlayingTrackId === trackInfo.track.id && nowPlaying.isPlaying ? true : false} onTrackClicked={trackClick} key={trackInfo.track.id} trackInfo={trackInfo} />)}
            </div>
            <div className='blurredBg' style={{backgroundImage: `url(${getHighResArtworkURL(nowPlaying ? nowPlaying.trackInfo : playlist[0])})`}}></div>

        </div>
    )
}

export default PlayList