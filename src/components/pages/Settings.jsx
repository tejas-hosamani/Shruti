/* eslint-disable no-undef */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authActions';
import Header from '../layout/Header';

class Settings extends Component {
  state = {
    sleepTime: localStorage.getItem('sleepTime')
  };

  componentDidMount = () => {
    if (!this.props.auth.userLoggedIn) {
      this.props.history.push('/');
    }
  };

  logout = () => {
    this.props.signOut();
    setTimeout(() => {
      this.props.history.push('/login');
    }, 200);
  };

  setSleepTimer = () => {
    localStorage.setItem('sleepTime', this.state.sleepTime);
  };

  handleChange = e => {
    this.setState(state => {
      return {
        ...state,
        sleepTime: e.target.value * 60
      };
    });
  };

  render() {
    const headerOptions = {
      backLink: 'back',
      title: 'Settings',
      narrator: null,
      year: null,
      floatButton: true
    };
    return (
      <Fragment>
        <Header options={headerOptions} />

        <ul className="list-group">
          <li className="list-group-item waves-effect waves-light darken-4 grey text-info">
            <div className="md-form">
              <input
                onChange={this.handleChange}
                value={this.state.sleepTime / 60}
                type="text"
                id="sleepTime"
                className="form-control"
              />
              {this.state.sleepTime}
              minute(s)
              <label htmlFor="sleepTime" className="active">
                Sleep Time
              </label>
            </div>
            <button className="btn btn-success" onClick={this.setSleepTimer}>
              Update sleep timer
            </button>
          </li>
          <li className="list-group-item waves-effect waves-light darken-4 grey">
            <div className="btn btn-danger" onClick={this.logout}>
              Logout
            </div>
          </li>
        </ul>
      </Fragment>
    );
  }
}

const mapStoreToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStoreToProps,
  mapDispatchToProps
)(Settings);
