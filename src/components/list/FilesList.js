import React, { Component, Fragment } from "react";
import BottomPlayer from "../player/BottomPlayer";
import { connect } from "react-redux";
import { changeSong } from '../../actions/playerActions';
import Header from "../layout/Header";

class FilesList extends Component {

    componentDidMount () {
        if(!this.props.player.songsList) {
            this.props.history.push('/');
            
        } else if(!this.props.auth.userLoggedIn) {
            this.props.history.push('/login');
        }
    }

    selectSong = (songObject) => {
        this.props.changeSong(songObject);
    }

    openFullPlayer = () => {
        this.props.history.push('/play');
    }
    
    render() {
        const { player } = this.props;
        let selectingSong = this.selectSong;
        let list = player.songsList ? (

            Object.keys(player.songsList).map(function(key, index) {
                let currentSong = 'list-group-item waves-effect waves-light font-weight-bold darken-4 grey ';
                currentSong +=  player.song.title === player.songsList[key].title ? 'text-success' : 'text-light';
                return (
                            <div key={index} onClick={() => selectingSong(player.songsList[key])} className={ currentSong }>
                                {player.songsList[key].title}
                                <p className="font-weight-lighter author-name">{player.songsList[key].narrator}</p>
                                
                            </div>
                        )
            })
        ) : null;

        const headerOptions = {
            backLink: '/',
            title: player.bookName,
            narrator: null,
            year: null,
            floatButton: true
        }

        return (
            <Fragment>
                <Header options={headerOptions} />
                <div className="list-group">
                    { list }
                    { player.song.title ? <BottomPlayer openPlayer={this.openFullPlayer} /> : null }
                </div>
            </Fragment>
        )
    }
}

const mapStoreToProps = (state, ownProps) => {
    return {
        player: state.player,
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSong: (songId) => dispatch(changeSong(songId))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(FilesList);