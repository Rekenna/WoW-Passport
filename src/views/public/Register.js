import React, {Component} from 'react';

import {auth, db, googleProvider} from '../../client';

class Register extends Component {
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
        const self = this;

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((success) => {
            self._saveUser(success.uid, success.email);
        }).then( () =>{
            this.setState({redirectToReferrer: true});
        });
    }

    _saveUser(uid, email){
        let usersRef = db.collection(`users`)
        usersRef.doc(uid).set({
            uid: uid,
            email: email,
            admin: false
        }).then(function () {
            console.log('Account Created')
        }).catch(function (error) {
            console.error('Error writing new Account to Firebase Database', error);
        })
    }

    _googleRegister(e){
        e.preventDefault();
        const self = this;

        auth.signInWithPopup(googleProvider).then(function(result) {
            self._saveUser(result.user.uid, result.user.email);
        }).catch(function(error) {
           console.log(error);
        });
    }


    render() {

        return (
            <div className="register-page">
                <div className={`container`}>
                    <div className={`row`}>
                        <div className={`col-md-12`}>
                            <h1>Register</h1>
                        </div>
                        <div className={`col-md-6`}>
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
                                <button className={`btn btn-primary`} type="submit">Complete Registration</button>
                                <button className={`btn btn-danger google`} onClick={this._googleRegister.bind(this)} type="submit">Register with Google</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
