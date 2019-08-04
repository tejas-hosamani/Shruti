import React, { Component, Fragment } from "react";
import { changePlaylist } from '../../actions/playerActions';
import { connect } from "react-redux";
import { FireworkSpinner } from "react-spinners-kit";
import Header from "../layout/Header";
import BottomPlayer from "../player/BottomPlayer";

class AudioBooksList extends Component {
    initialData = []
    thisbe = ''
    state = {
        loading: true
    }
                
    componentDidMount = () => {
        if(!this.props.auth.userLoggedIn) {
            setTimeout(() => {
                this.setState({
                    ...this.state,
                    loading: false
                })
                if(!this.props.auth.userLoggedIn) {
                    this.props.history.push('/login');
                }
            }, 3000)
        } else {
            this.setState({
                ...this.state,
                loading: false
            })
        }
    }

    goToPlayList = (playlist, key) => {
        // Convert object to array
        const arrayOfObj = Object.entries(playlist).map((e) => (  e[1] ));

        // Dispatch action
        this.props.changePlaylist(arrayOfObj, key);

        // Open the book page
        this.props.history.push('/book');
    }

    makeBookList = (player) => {
        const { allPlaylists } = player
        let currentSong = 'list-group-item waves-effect waves-light font-weight-bold darken-4 grey text-light'
        let tempFunction = this.goToPlayList;
        const list = allPlaylists ? Object.keys(allPlaylists).map(function(key, index) {
                        return  <div key={index} onClick={() => {tempFunction(allPlaylists[key], key)}} className={ currentSong }>
                                    {key}
                                </div>

                        }) : null

        return list;
    }

    headerOptions = {
        backLink: null,
        title: 'Shruti',
        narrator: null,
        year: null,
        floatButton: true
    }

    render () {

        const { player } = this.props

        if(this.state.loading) {
            return  <div className="loaderAniContainer">
                        <div className="loaderAni">
                            <FireworkSpinner
                                size={50}
                                color="rgb(0, 255, 137)"
                                loading={this.state.loading}
                            />
                        </div>
                    </div>
        } else {
            return  <Fragment>

                        <div className="container">
                            <div className="row">
                                <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
                                    <div className="col-xl-4 col-lg-4 col-md-8 col-sm-8">
                                        <Header options={this.headerOptions} />
                                        { this.makeBookList(player) }
                                    </div>
                                <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
                            </div>
                        </div>

                        <div style={{minHeight: '150px'}} ></div>

                        { player.song.title ? <BottomPlayer /> : null }

                    </Fragment>
        }
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
        changePlaylist: (playlist, bookName) => dispatch(changePlaylist(playlist, bookName))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(AudioBooksList);