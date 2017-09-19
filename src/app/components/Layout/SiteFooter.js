import React, { Component } from 'react';

export default class SiteFooter extends Component{
  render(){
    return(
      <div className="site-footer container">
        <div className="row">
          <div className="col-md-12">
            <p className="center">World of Warcraft is a registered trademark of Blizzard Entertainment, Inc.</p>
            <p className="center">Love WoWPassport? <a className="mail" href="mailto:ryanpatmckenna@gmail.com">Tell me why</a></p>
            <p className="center">Made with <i className="fa fa-heart"></i> by <a href="mailto:ryanpatmckenna@gmail.com" rel="noopener noreferrer" target="_blank">Ryan P McKenna</a>.</p>
          </div>
        </div>
      </div>
    )
  }
}
