import React, { Component } from 'react';

class User extends Component {

    render() {

        const user = this.props.user;

        if(!user) return false;

        return (
            <div className={`user`}>
                <div className={`container content`}>
                    <div className={`row`}>
                        <div className={`col-md-12`}>
                            <h5>User Page</h5>
                            <p>Logged in as {user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
