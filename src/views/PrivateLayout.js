import React, { Component } from 'react';
import SiteHeader from "./includes/SiteHeader";
import SiteFooter from "./includes/SiteFooter";

class PrivateLayout extends Component {
    render() {

        if(!this.props.user){
            return false
        }

        return (
            <div className={`private-layout`}>
                <SiteHeader authed={true} user={this.props.user} account={this.props.account}/>
                <div className={`private-page`}>
                    {this.props.children}
                </div>
                <SiteFooter></SiteFooter>
            </div>
        );
    }
}

export default PrivateLayout;
