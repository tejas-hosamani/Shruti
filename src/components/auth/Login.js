import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect, Link } from 'react-router-dom'
import { loginWithEmail } from '../../actions/authActions';

class Login extends Component {

    state = {
        email: '',
        password: ''
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginWithEmail(this.state)
    }
    
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    render() {
        if(this.props.auth.userLoggedIn) {
            return <Redirect to='/' />
        } else {
            return  <section className="form-elegant">
                        <div className="row">
                            <div className="col-xl col-lg col-md-2 col-sm-2"> </div>
                            <div className="col-xl-3 col-lg-4 col-md-8 col-sm-8">
                                <div className="card">
                                    <div className="card-body mx-4">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="text-center">
                                                <h3 className="dark-grey-text mb-5"><strong>Login</strong></h3>
                                            </div>
                                            <div className="md-form">
                                                <input onChange={this.handleChange} type="text" id="email" className="form-control" />
                                                <label htmlFor="email">Email</label>
                                            </div>
                                            <div className="md-form">
                                                <input onChange={this.handleChange} type="password" id="password" className="form-control" />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                            <div className="text-center mb-3">
                                                <button type="submit" className="btn blue-gradient btn-block btn-rounded z-depth-1a text-white">Login</button>
                                            </div>
                                        </form>

                                        {/* <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2"> or Sign in with:</p>
                                                // TODO: For future implementation: Use google authentication
                                        <div className="row d-flex justify-content-center">
                                            <button type="button" className="btn btn-danger btn-rounded z-depth-1a">
                                                Google
                                            </button>
                                        </div> */}

                                    </div>
                                    { this.props.auth.authError ? (
                                        <div class="alert alert-danger" role="alert">
                                            { this.props.auth.authError }
                                        </div>

                                    ) : (
                                        null
                                    ) }
                                    <div className="modal-footer mx-5 pt-3 mb-1">
                                        <p className="font-small grey-text d-flex justify-content-end">
                                            New here? 
                                            <Link to={'/signup'} className="blue-text ml-1">
                                                Sign Up
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl col-lg col-md-2 col-sm-2"> </div>

                        </div>
                    </section>
            
        }
    }
}

const mapStoreToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginWithEmail: (playlist) => dispatch(loginWithEmail(playlist))
    }
}

export default connect(mapStoreToProps, mapDispatchToProps)(Login);

