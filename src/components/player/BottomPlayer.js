import React, { Component } from 'react'
import { connect } from "react-redux";
import { togglePlayer } from '../../actions/playerActions';

class BottomPlayer extends Component {

    togglePlay = () => {
        this.props.togglePlayer();
    }
    openFullPlayer = () => {
        this.props.openPlayer();
    }
    render () {
        const { player }  = this.props;

        let button = player.playing ? 'fas fa-pause-circle' : 'fas fa-play-circle';
        
        return (
            <span>
                <div className="bottomPlayer">
                    <div className="list-group-item text-light waves-effect waves-light font-weight-bold black darken-4">
                        <div className="row">
                            <div className="col-10" onClick={this.openFullPlayer}>
                                <div className="songTitle text-success">
                                    {player.song.title}
                                </div>
                                <p className="font-weight-lighter author-name">
                                    {player.song.narrator}
                                </p>
                            </div>
                            <div className="col-2">
                                <span className="text-white bigFont float-right" onClick={this.togglePlay}>
                                    <i className={button}></i>
                                </span>
                            </div>
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

export default connect(mapStoreToProps, mapDispatchToProps)(BottomPlayer);