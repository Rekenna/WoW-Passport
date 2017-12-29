import React, { Component } from 'react';
import SiteFooter from "./includes/SiteFooter";

class PrivateLayout extends Component {
  render() {
      return (
          <div className={`private-layout`}>
              <div className={`private-page`}>
                  {this.props.children}
              </div>
              <SiteFooter/>
          </div>
      );
  }
}

export default PrivateLayout;
