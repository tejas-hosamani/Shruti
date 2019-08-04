/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class FloatingButton extends Component {
  fixedButton = 'fixed-action-btn';

  showDown = '';

  showMenu = false;

  toggleMenu = () => {
    if (!this.showMenu) {
      this.fixedButton = 'fixed-action-btn active';
      this.showDown = 'shown';
    } else {
      this.fixedButton = 'fixed-action-btn';
      this.showDown = '';
    }
    this.showMenu = !this.showMenu;
  };

  render() {
    return (
      <Fragment>
        <div
          className={this.fixedButton}
          style={{ top: '0', right: '0', height: '316px' }}
        >
          <Link
            to="#"
            onClick={this.toggleMenu}
            className="btn-floating red waves-effect waves-light"
          >
            <i className="fas fa-bars" />
          </Link>
          <ul className="list-unstyled">
            <li>
              <Link
                to="/settings"
                className={`btn-floating btn-sm yellow darken-4 waves-effect waves-light ${this.showDown}`}
              >
                <i className="fas fa-cog" />
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className={`btn-floating btn-sm green waves-effect waves-light ${this.showDown}`}
              >
                <i className="fas fa-home" />
              </Link>
            </li>
            <li>
              <Link
                to="/help"
                className={`btn-floating btn-sm blue darken-1 waves-effect waves-light ${this.showDown}`}
              >
                <i className="fas fa-question" />
              </Link>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default FloatingButton;
