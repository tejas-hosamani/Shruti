import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class FloatingButton extends Component {
    fixedButton = ''
    showDown = ''
    showMenu = false
    toggleMenu = () => {

        if(!this.showMenu) {
            this.fixedButton = 'active'
            this.showDown = 'shown'
        } else {
            this.fixedButton = ''
            this.showDown = ''
        }
        this.showMenu = !this.showMenu
    }

    render() {
        return (
            <div className={`fixed-action-btn ${this.fixedButton}`} style={{top: '0', right: '0', height: '316px'}}>
                <Link onClick={this.toggleMenu} to="#" className="btn-floating red waves-effect waves-light">
                    <i className="fas fa-bars"></i>
                </Link>

                <ul className="list-unstyled">
                    <li>
                        <Link to={'/settings'} className={`btn-floating btn-sm yellow darken-4 waves-effect waves-light ${this.showDown}`}>
                            <i className="fas fa-cog"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/'} className={`btn-floating btn-sm green waves-effect waves-light ${this.showDown}`}>
                            <i className="fas fa-home"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/help'} className={`btn-floating btn-sm blue darken-1 waves-effect waves-light ${this.showDown}`}>
                            <i className="fas fa-question"></i>
                        </Link>
                    </li>
                </ul>
            </div>
           
        )
    }
}

export default FloatingButton
