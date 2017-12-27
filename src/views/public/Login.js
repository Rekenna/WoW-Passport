import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'

import {auth, googleProvider} from '../../client';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirectToReferrer: false
        }

    }

    _handleSubmit(e) {
        e.preventDefault();
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            this.setState({redirectToReferrer: true});
        });
    }

    _googleLogin(e){
        e.preventDefault();
        auth.signInWithPopup(googleProvider);
    }

    render() {
        const {from} = this.props.location.state || '/';
        const {redirectToReferrer} = this.state;

        return (
            <div className="login-page">
                <div className={`container`}>
                    <div className={`row`}>
                        <div className={`col-md-12`}>
                            <h1>Login</h1>
                        </div>
                        <div className={`col-md-6`}>
                            {redirectToReferrer && (
                                <Redirect to={from || '/dashboard'}/>
                            )}
                            {from && (
                                <div className="alert alert-danger" role="alert">
                                    You must log in to view this page.
                                </div>
                            )}
                            <form onSubmit={this._handleSubmit.bind(this)} className={`form`}>
                                <div className={`form-group`}>
                                    <label htmlFor="email">Email</label>
                                    <input className={`form-control`} type="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                                </div>
                                <div className={`form-group`}>
                                    <label htmlFor="password">Password</label>
                                    <input className={`form-control`} type="password" value={this.state.password}
                                           onChange={e => this.setState({password: e.target.value})}/>
                                </div>
                                <button className={`btn btn-primary`} type="submit">Sign In</button>
                                <button className={`btn btn-danger`} onClick={this._googleLogin.bind(this)} type="submit">Sign In with Google</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
