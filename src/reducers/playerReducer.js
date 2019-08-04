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
  timerStatus: false,
  seekStatus: false,
  played: 0,
  playedSeconds: 0,
  loaded: 0,
  loadedSeconds: 0,
  totalDuration: 0,
  bookName: null
};

const playerReducer = (state = initState, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return {
        ...state,
        playing: !state.playing
      };

    case 'CHANGE_SONG':
      return { ...state, playing: true, song: action.songObject };

    case 'INIT_PLAYER':
      return {
        ...state,
        RPControls: action.RPControls,
        allPlaylists: action.initialData,
        songsList: []
      };

    case 'SEEK_SONG':
      return {
        ...state,
        seekSong: action.duration
      };

    case 'RESET_SEEK_VALUE':
      return {
        ...state,
        seekSong: null
      };

    case 'CHANGE_PLAYBACK_RATE':
      return {
        ...state,
        playbackRate: parseFloat(action.rate)
      };

    case 'TOGGLE_TIMER':
      return {
        ...state,
        timerStatus: !state.timerStatus
      };
    case 'UPDATE_SEEK_STATUS':
      return {
        ...state,
        seekStatus: action.seekStatus
      };

    case 'UPDATE_PLAYED':
      return {
        ...state,
        played: action.value
      };

    case 'REF_UPDATE':
      return {
        ...state,
        played: parseFloat(action.status.played),
        playedSeconds: parseFloat(action.status.playedSeconds),
        loaded: parseFloat(action.status.loaded),
        loadedSeconds: parseFloat(action.status.loadedSeconds),
        totalDuration: parseFloat(action.dur)
      };

    case 'CHANGE_PLAYLIST':
      return {
        ...state,
        songsList: action.playlist,
        bookName: action.bookName
      };
    default:
      return state;
  }
};

export default playerReducer;
