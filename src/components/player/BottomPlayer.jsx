import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { togglePlayer } from '../../actions/playerActions';

class BottomPlayer extends Component {
  togglePlay = () => {
    this.props.togglePlayer();
  };

  openFullPlayer = () => {
    this.props.history.push('/play');
  };

  render() {
    const { player } = this.props;

    const button = player.playing
      ? 'fas fa-pause-circle'
      : 'fas fa-play-circle';

    return (
      <Fragment>
        <div className="bottomPlayer">
          <div
            className="container list-group-item text-light waves-effect waves-light font-weight-bold darken-4"
            style={{ background: '#212121' }}
          >
            <div className="row ">
              <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
              <div
                className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-10 black bottomPlayer-shadow"
                onClick={this.openFullPlayer}
                onKeyPress={this.openFullPlayer}
                role="button"
                tabIndex="0"
              >
                <div className="songTitle text-success">
                  {player.song.title}
                </div>
                <p className="font-weight-lighter author-name">
                  {player.song.narrator}
                </p>
              </div>
              <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2 black bottomPlayer-shadow">
                <div
                  className="text-white bigFont float-right"
                  onClick={this.togglePlay}
                  onKeyPress={this.togglePlay}
                  role="button"
                  tabIndex="0"
                >
                  <i className={button} />
                </div>
              </div>
              <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStoreToProps = state => {
  return {
    player: state.player
  };
};

const mapDispatchToProps = dispatch => {
  return {
    togglePlayer: () => dispatch(togglePlayer())
  };
};

export default withRouter(
  connect(
    mapStoreToProps,
    mapDispatchToProps
  )(BottomPlayer)
);
