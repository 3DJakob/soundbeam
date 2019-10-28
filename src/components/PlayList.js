import React from 'react'
import millify from 'millify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

function Track ({trackInfo, onTrackClicked}) {
    const count = millify(trackInfo.track.playback_count)

    return (
        <div className='track' onClick={() => onTrackClicked(trackInfo)}>
            <p>{trackInfo.track.user.username}</p>
            <p>{trackInfo.track.title}</p>
            <p>{count}</p>
            {trackInfo.kind === 'like' ? <FontAwesomeIcon style={{color: '#fff'}} icon={faHeart} /> : ''}
        </div>
    )
}

function PlayList ({playlist, onTrackedClicked}) {

    return (
        <div className='playlist'>
            {playlist.map(trackInfo => <Track onTrackClicked={onTrackedClicked} key={trackInfo.track.id} trackInfo={trackInfo} />)}
            <div className='blurredBg' style={{backgroundImage: `url(${playlist[2].track.artwork_url})`}}></div>
        </div>
    )
}

export default PlayList