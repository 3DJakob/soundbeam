import React, { useState, useEffect} from 'react'
import Tilt from 'react-tilt'
import getHighResArtworkURL from '../lib/utils'
import '../css/CoverArt.css'

function CoverArt ({trackInfo}) {
    const [previous, setPrevious] = useState(null)
    const [current, setCurrent] = useState(trackInfo)
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        if (current.track.id !== trackInfo.track.id) {
            setPrevious(current)
            setCurrent(trackInfo)
        }
        setToggle(!toggle)
    }, [trackInfo])

    let firstElement = toggle ? current : (previous || current)
    let secondElement = toggle ? (previous || current) : current

	return (
        <Tilt className='Tilt artworkComponent' options={{ max: 20, scale: 1.01 }}>
            <div className='flipper'>
                <CoverArtFlipper flipped={toggle} trackInfo={firstElement}></CoverArtFlipper>
                <CoverArtFlipper flipped={!toggle} trackInfo={secondElement}></CoverArtFlipper>
            </div>
        </Tilt>
	)
}

function CoverArtFlipper ({trackInfo, flipped}) {
    const style = {
        backgroundImage: `url(${getHighResArtworkURL(trackInfo)})`,
        transform: !flipped ? 'rotateY(180deg)' : 'rotateY(0)'
    }

	return (
        <div className='artwork' style={style} />
	)
}

export default CoverArt