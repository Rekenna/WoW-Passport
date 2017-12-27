import React, { Component } from 'react';
import SiteFooter from "./includes/SiteFooter";

class PublicLayout extends Component {
    render() {
        return (
            <div className={`public-layout`}>
                <div className={`public-page`}>
                    {this.props.children}
                </div>
                <SiteFooter/>
            </div>
        );
    }
}

export default PublicLayout;
