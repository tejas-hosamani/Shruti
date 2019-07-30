import db from '../config/fbConfig'


export const initPlayer = (RPControls) => {
    return (dispatch, getState) => {
        // Async CODE
        let initialData = [];

        db.collection("Books").doc('books').get().then((querySnapshot) => {
            initialData = querySnapshot.data()
        }).then(() => {
            dispatch({ type: 'INIT_PLAYER', RPControls, initialData})
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const togglePlayer = () => {
    return {
        type: 'TOGGLE_PLAY'
    }
}

export const changeSong = (songObject) => {
    return {
        type: 'CHANGE_SONG',
        songObject
    }
}

export const seekSong = (duration) => {
    return {
        type: 'SEEK_SONG',
        duration
    }
}

export const resetSeekValue = () => {
    return {
        type: 'RESET_SEEK_VALUE'
    }
}

export const changePlaybackRate = (rate) => {
    return {
        type: 'CHANGE_PLAYBACK_RATE',
        rate
    }
}

export const toggleTimer = () => {
    return {
        type: 'TOGGLE_TIMER',
    }
}

export const updateSeekStatus = (status) => {
    return {
        type: 'UPDATE_SEEK_STATUS',
        seekStatus: status
    }
}

export const updatePlayed = (value) => {
    return {
        type: 'UPDATE_PLAYED',
        value
    }
}

export const refUPDATE = (status, dur) => {
    return {
        type: 'REF_UPDATE',
        status: status,
        dur
    }
}

export const changePlaylist = (playlist, bookName) => {
    return {
        type: 'CHANGE_PLAYLIST',
        playlist,
        bookName
    }
}

