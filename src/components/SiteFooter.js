import React, { Component } from 'react';

export default class SiteFooter extends Component{
  render(){
    return(
      <div className="site-footer container">
        <div className="row">
          <div className="col-md-12">
            <p>Copyright 2017 - <a href="http://rekenna.github.io/" rel="noopener noreferrer" target="_blank">Ryan P McKenna</a>. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    )
  }
}
