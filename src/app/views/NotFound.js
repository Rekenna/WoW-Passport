import React, { Component } from 'react';

export default class NotFound extends Component{

  componentWillMount(){
    document.title = "404 - WoW Passport";
  }

  componentDidMount(){
    window.analytics.page();
  }

  render(props){
    return(
      <div className="profile-container loading">
        <div className="profile-header">
          <div className="loading-wrapper">
            <h1 className="not-found animated flipInX">Something's not quite right...</h1>
            <p className="animated fadeIn status-code">404</p>
          </div>
        </div>
        <div className="container animated fadeIn">
          <div className="row">
            <div className="col-md-12">
              <p className="loading-text"><i>It seems this character might be lost in the nether. Hopefully they'll turn up soon.</i></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
