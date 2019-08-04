import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import FloatingButton from './FloatingButton';

class Header extends Component {
  navigate = path => {
    if (path !== 'back') {
      this.props.history.push(path);
    } else {
      this.props.history.goBack();
    }
  };

  render() {
    const { options } = this.props;

    return (
      <div
        className="text-white text-center center container"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        <div className="row">
          {options.backLink ? (
            <div
              onClick={() => this.navigate(options.backLink)}
              onKeyPress={() => this.navigate(options.backLink)}
              role="button"
              tabIndex="0"
              className="col-2 waves-effect waves-light closeButton"
            >
              <i className="fas fa-chevron-left" />
            </div>
          ) : (
            <div className="col-2 waves-effect waves-light closeButton">
              <i className="fas fa-headphones" />
            </div>
          )}

          {options.narrator ? (
            <div className="col-8 text-center font-weight-bold">
              {options.title}
              <p className="font-weight-lighter">
                {`${options.narrator} - ${options.year}`}
              </p>
            </div>
          ) : (
            <div className="col-8 waves-effect waves-light closeButton">
              {options.title}
            </div>
          )}

          <div className="col-2">
            <FloatingButton />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
