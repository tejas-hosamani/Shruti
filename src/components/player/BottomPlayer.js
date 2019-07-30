import React, { Component } from 'react'
import { connect } from "react-redux";
import { togglePlayer } from '../../actions/playerActions';
import { withRouter } from 'react-router';

class BottomPlayer extends Component {

    togglePlay = () => {
        this.props.togglePlayer();
    }
    openFullPlayer = () => {
        this.props.history.push('/play');
    }
    render () {
        const { player }  = this.props;

        let button = player.playing ? 'fas fa-pause-circle' : 'fas fa-play-circle';
        
        return (
            <span>
                <div className="bottomPlayer">
                    <div className="container list-group-item text-light waves-effect waves-light font-weight-bold darken-4" style={{background: '#212121'}}>
                        <div className="row ">
                            <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
                            <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-10 black bottomPlayer-shadow" onClick={this.openFullPlayer}>
                                <div className="songTitle text-success">
                                    {player.song.title}
                                </div>
                                <p className="font-weight-lighter author-name">
                                    {player.song.narrator}
                                </p>
                            </div>
                            <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2 black bottomPlayer-shadow">
                                <span className="text-white bigFont float-right" onClick={this.togglePlay}>
                                    <i className={button}></i>
                                </span>
                            </div>
                            <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
                        </div>
                    </div>
                </div>
            </span>
        )
    }
}

const mapStoreToProps = (state) => {
    return {
        player: state.player
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        togglePlayer: () => dispatch(togglePlayer())
    }
}

export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(BottomPlayer));