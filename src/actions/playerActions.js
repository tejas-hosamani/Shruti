import db from '../config/fbConfig';

export const initPlayer = RPControls => {
  return dispatch => {
    // Async CODE
    let initialData = [];

    db.collection('Books')
      .doc('books')
      .get()
      .then(querySnapshot => {
        initialData = querySnapshot.data();
      })
      .then(() => {
        dispatch({ type: 'INIT_PLAYER', RPControls, initialData });
      })
      .catch(err => {
        dispatch({ type: 'INIT_PLAYER_ERROR', err });
      });
  };
};

export const togglePlayer = () => {
  return {
    type: 'TOGGLE_PLAY'
  };
};

export const changeSong = songObject => {
  return (dispatch, getState) => {
    const sel = getState().player.songsList.filter(song => {
      return song === songObject;
    });
    // getState().player.RPControls.seekTo(10); // Not sure purpose of this. Keeping it here for a while.
    if (sel.length) {
      dispatch({ type: 'CHANGE_SONG', songObject: sel[0] });
    }
  };
};

export const seekSong = duration => {
  return {
    type: 'SEEK_SONG',
    duration
  };
};

export const resetSeekValue = () => {
  return {
    type: 'RESET_SEEK_VALUE'
  };
};

export const changePlaybackRate = rate => {
  return {
    type: 'CHANGE_PLAYBACK_RATE',
    rate
  };
};

export const toggleTimer = () => {
  return {
    type: 'TOGGLE_TIMER'
  };
};

export const updateSeekStatus = status => {
  return {
    type: 'UPDATE_SEEK_STATUS',
    seekStatus: status
  };
};

export const updatePlayed = value => {
  return {
    type: 'UPDATE_PLAYED',
    value
  };
};

export const refUPDATE = (status, dur) => {
  return {
    type: 'REF_UPDATE',
    status,
    dur
  };
};

export const changePlaylist = (playlist, bookName) => {
  return {
    type: 'CHANGE_PLAYLIST',
    playlist,
    bookName
  };
};
