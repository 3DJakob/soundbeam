function getHighResArtworkURL (trackInfo) {
    const url = trackInfo.track.artwork_url.split('large')[0] + 't500x500.jpg'
    return url
}

export default getHighResArtworkURL