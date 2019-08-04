import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FireworkSpinner } from 'react-spinners-kit';
import { uuidv1 } from 'uuid/v1';
import { changePlaylist } from '../../actions/playerActions';
import Header from '../layout/Header';
import BottomPlayer from '../player/BottomPlayer';

class AudioBooksList extends Component {
  initialData = [];

  thisbe = '';

  state = {
    loading: true
  };

  headerOptions = {
    backLink: null,
    title: 'Shruti',
    narrator: null,
    year: null,
    floatButton: true
  };

  componentDidMount = () => {
    if (!this.props.auth.userLoggedIn) {
      setTimeout(() => {
        this.setState(state => {
          return {
            ...state,
            loading: false
          };
        });
        if (!this.props.auth.userLoggedIn) {
          this.props.history.push('/login');
        }
      }, 3000);
    } else {
      this.setState(state => {
        return {
          ...state,
          loading: false
        };
      });
    }
  };

  goToPlayList = (playlist, key) => {
    // Convert object to array
    const arrayOfObj = Object.entries(playlist).map(e => e[1]);

    // Dispatch action
    this.props.changePlaylist(arrayOfObj, key);

    // Open the book page
    this.props.history.push('/book');
  };

  makeBookList = player => {
    const { allPlaylists } = player;
    const currentSong =
      'list-group-item waves-effect waves-light font-weight-bold darken-4 grey text-light';
    const tempFunction = this.goToPlayList;
    const list = allPlaylists
      ? Object.keys(allPlaylists).map(key => {
          return (
            <div
              key={() => uuidv1()}
              onKeyPress={() => {
                tempFunction(allPlaylists[key], key);
              }}
              role="button"
              tabIndex="0"
              onClick={() => {
                tempFunction(allPlaylists[key], key);
              }}
              className={currentSong}
            >
              {key}
            </div>
          );
        })
      : null;

    return list;
  };

  render() {
    const { player } = this.props;
    return this.state.loading ? (
      <div className="loaderAniContainer">
        <div className="loaderAni">
          <FireworkSpinner
            size={50}
            color="rgb(0, 255, 137)"
            loading={this.state.loading}
          />
        </div>
      </div>
    ) : (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
            <div className="col-xl-4 col-lg-4 col-md-8 col-sm-8">
              <Header options={this.headerOptions} />
              {this.makeBookList(player)}
            </div>
            <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
          </div>
        </div>

        <div style={{ minHeight: '150px' }}> </div>

        {player.song.title ? <BottomPlayer /> : null}
      </Fragment>
    );
  }
}

const mapStoreToProps = state => {
  return {
    player: state.player,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePlaylist: (playlist, bookName) =>
      dispatch(changePlaylist(playlist, bookName))
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(AudioBooksList);
