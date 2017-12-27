import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Search extends Component{
  render(){
    return(
        <div className={`search-page`}>
            <Helmet>
                <title>WoW Passport - Advanced Search</title>
            </Helmet>
            <div className="home-banner">
                <div className="splash-content">
                    <h1>Advanced Search</h1>
                </div>
            </div>
        </div>
    )
  }
}
