import React from 'react'
import {useState} from 'react'
import millify from 'millify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import CoverArt from '../components/CoverArt'
import getHighResArtworkURL from '../lib/utils'

function Track ({trackInfo, onTrackClicked}) {
    const count = millify(trackInfo.track.playback_count)

    const trackClick = () => {
        onTrackClicked(trackInfo)
    }

    return (
        <div className='track' onClick={trackClick}>
            <p>{trackInfo.track.user.username}</p>
            <p>{trackInfo.track.title}</p>
            <p>{count}</p>
            {trackInfo.kind === 'like' ? <FontAwesomeIcon style={{color: '#fff'}} icon={faHeart} /> : ''}
        </div>
    )
}

function PlayList ({nowPlaying, playlist, onTrackClicked}) {
    if (nowPlaying === undefined) {
        nowPlaying = playlist[0]
    }

    const trackClick = (trackInfo) => {
        onTrackClicked(trackInfo)
    }

    return (
        <div className='playlist'>
            <CoverArt trackInfo={nowPlaying}></CoverArt>

            <div className='trackList'>
                {playlist.map(trackInfo => <Track onTrackClicked={trackClick} key={trackInfo.track.id} trackInfo={trackInfo} />)}
            </div>
            <div className='blurredBg' style={{backgroundImage: `url(${getHighResArtworkURL(nowPlaying)})`}}></div>

        </div>
    )
}

export default PlayList