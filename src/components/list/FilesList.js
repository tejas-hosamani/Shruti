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

        return  <Fragment>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
                            <div className="col-xl-4 col-lg-4 col-md-8 col-sm-8">
                                <Header options={headerOptions} />
                                <div className="list-group">
                                    { list }
                                </div>
                            </div>
                            <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
                        </div>
                    </div>

                    <div style={{minHeight: '150px'}} ></div>

                    { player.song.title ? <BottomPlayer /> : null }

                </Fragment>
            
        
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