import React, { Component } from 'react';

class User extends Component {

    render() {

        const user = this.props.user;

        return (
            <div className={`user`}>
                <div className={`container content`}>
                    <div className={`row`}>
                        <div className={`col-md-12`}>
                            <h5>User Page</h5>
                            <p>Logged in as {user.displayName}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
