import React, {Component} from 'react';

import {auth, db} from '../../firebase';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            redirectToReferrer: false
        }

    }

    _handleSubmit(e) {
        e.preventDefault();

        const name = this.state.name

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then((success) => {
            success.updateProfile({
                displayName: name,
            });
            let usersRef = db.ref(`users`)
            usersRef.child(success.uid).set({
                uid: success.uid,
                displayName: name,
                email: success.email
            }).then(function () {
                console.log('Account Created')
            }).catch(function (error) {
                console.error('Error writing new Account to Firebase Database', error);
            })
        }).then( () =>{
            this.setState({redirectToReferrer: true});
        });
    }


    render() {

        return (
            <div className="register content">
                <div className={`container`}>
                    <div className={`row`}>
                        <div className={`col-md-12`}>
                            <h1>Register</h1>
                        </div>
                        <div className={`col-md-6`}>
                            <form onSubmit={this._handleSubmit.bind(this)} className={`form`}>
                                <div className={`form-group`}>
                                    <label htmlFor="name">Name</label>
                                    <input className={`form-control`} type="text" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                                </div>
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
