import React, { Component } from 'react';

export default class SiteFooter extends Component{
  render(){
    return(
      <div className="site-footer container">
        <div className="row">
          <div className="col-md-12">
            <p>Made with <i className="fa fa-heart"></i> by <a href="http://rekenna.github.io/" rel="noopener noreferrer" target="_blank">Ryan P McKenna</a>.</p>
          </div>
        </div>
      </div>
    )
  }
}
