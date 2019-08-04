import React, { Component } from 'react';
import FilesList from "./components/list/FilesList";
import { connect } from "react-redux";
import FullPlayer from './components/player/FullPlayer';
import Player from "./components/player/Player";
import { HashRouter, Route } from "react-router-dom";
import AudioBooksList from "./components/list/AudioBooksList";
import './App.css';
import { updateLoginStatus } from './actions/authActions';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Settings from './components/pages/Settings';

class App extends Component {
    componentDidMount = () => {
        this.props.updateLoginStatus();
    }
    render () {
        
        if(!localStorage.getItem('sleepTime')) {
            localStorage.setItem('sleepTime', 3600);
        }

        return (
            <HashRouter>
                <div className="App">
                    
                    <Player />
                    <Route exact path='/' component={AudioBooksList} />
                    <Route exact path='/book' component={FilesList}/>
                    <Route path='/play' component={FullPlayer}/>
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/settings' component={Settings} />

    
                </div>
            </HashRouter>
        )
    }
}

const mapStoreToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateLoginStatus: () => dispatch(updateLoginStatus())
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(App);
