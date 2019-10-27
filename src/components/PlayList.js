import React from 'react'

function Track ({info}) {
    return <div>{info.title}</div>
}

function PlayList ({playlist}) {
    console.log(playlist)

    return (
        <div>
            Playlist

            <div>
                {playlist.map(track => <Track key={track.id} info={track} />)}
            </div>
        </div>
    )
}

export default PlayList