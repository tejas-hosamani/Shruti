const initState = {
    playing: false,
    song: {
        title: null,
        narrator: null,
        id: null
    },
    RPControls: '',
    seekSong: '',
    playbackRate: 1,
    timerStatus: null,
    seekStatus: false,
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
    totalDuration: 0,
    bookName: null
}

const playerReducer = (state = initState, action) => {
    // This whole thing should be a switch - not if-else
    if(action.type === 'TOGGLE_PLAY') {
        return {
            ...state,
            playing: !state.playing
        }
    } else if(action.type === 'CHANGE_SONG') {
        const sel = state.songsList.filter(song => {
            return song === action.songObject;
        });
        state.RPControls.seekTo(10);
        return !sel.length ? { ...state } : { ...state, playing: true, song: sel[0] } ;
    } else if(action.type === 'INIT_PLAYER') {
        return {
            ...state,
            RPControls: action.RPControls,
            allPlaylists: action.initialData,
            songsList: []
        }
    } else if(action.type === 'SEEK_SONG') {
        return {
            ...state,
            seekSong: action.duration
        }
    } else if(action.type === 'RESET_SEEK_VALUE') {
        return {
            ...state,
            seekSong: null
        }
    } else if(action.type === 'CHANGE_PLAYBACK_RATE') {
        return {
            ...state,
            playbackRate: parseFloat(action.rate)
        }
    } else if(action.type === 'TOGGLE_TIMER') {
        if(state.timerStatus === null) {
            return {
                ...state,
                timerStatus: 1
            }
        } else if(state.timerStatus === 1) {
            return {
                ...state,
                timerStatus: null
            }
        }
    } else if(action.type === 'UPDATE_SEEK_STATUS') {
        return {
            ...state,
            seekStatus: action.seekStatus
        }
    } else if(action.type === 'UPDATE_PLAYED') {
        return {
            ...state,
            played: action.value
        }
    } else if(action.type === 'REF_UPDATE') {
        return {
            ...state,
            played: parseFloat(action.status.played),
            playedSeconds: parseFloat(action.status.playedSeconds), 
            loaded: parseFloat(action.status.loaded), 
            loadedSeconds: parseFloat(action.status.loadedSeconds),
            totalDuration: parseFloat(action.dur)
        }
    } else if(action.type === 'CHANGE_PLAYLIST') {
        return {
            ...state,
            songsList: action.playlist,
            bookName: action.bookName
        }
    }
    
    return state;
}

export default playerReducer;