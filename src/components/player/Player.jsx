import React, { Component } from "react";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import {
    initPlayer,
    resetSeekValue,
    updatePlayed,
    refUPDATE
} from "../../actions/playerActions";

class Player extends Component {
    ref = player => {
        this.player = player;
    };

    componentDidMount = () => {
        this.props.initPlayer(this.player);
    };

    seekValue = dur => {
        if (dur * dur < 1) {
            this.player.seekTo(this.player.getDuration() * dur);
        } else {
            this.player.seekTo(this.player.getCurrentTime() + dur);
        }
    };

    resetSeek = () => {
        this.props.resetSeekValue();
    };

    onProgress = state => {
        // We only want to update time slider if we are not currently seeking
        this.props.refUPDATE(state, this.player.getDuration());
    };

    render() {
        const { player } = this.props;

        switch (player.seekSong) {
            case "10m":
                this.seekValue(-10);
                this.resetSeek();
                break;
            case "60m":
                this.seekValue(-60);
                this.resetSeek();
                break;
            case "10p":
                this.seekValue(10);
                this.resetSeek();
                break;
            case "60p":
                this.seekValue(60);
                this.resetSeek();
                break;

            default:
                if (player.seekSong > 0 && !player.seekStatus) {
                    this.seekValue(player.played);
                    this.resetSeek();
                }
                break;
        }

        return (
            <span>
                <ReactPlayer
                    ref={this.ref}
                    playbackRate={player.playbackRate}
                    onPause={this.onPause}
                    playing={player.playing}
                    className="PlayerDia"
                    url={player.song.url}
                    onProgress={this.onProgress}
                />
            </span>
        );
    }
}

const mapStoreToProps = (state, ownProps) => {
    return {
        player: state.player
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initPlayer: RPControls => dispatch(initPlayer(RPControls)),
        resetSeekValue: () => dispatch(resetSeekValue()),
        updatePlayed: value => dispatch(updatePlayed(value)),
        refUPDATE: (status, dur) => dispatch(refUPDATE(status, dur))
    };
};

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(Player);
