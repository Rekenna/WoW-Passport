import React, {Component} from 'react';

import AppLogo from '../images/logo.png';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

import SearchForm from './SearchForm';

class SiteHeader extends Component{
  render(){

    return(
      <div className="site-header">
        <div className="container-fluid">
          <div className="row flex-row">
            <div className="col-md-3">
              <Link to="/"><img src={AppLogo} alt="WOW Passport Logo"/></Link>
            </div>
            <div className="col-md-6">
              <SearchForm/>
            </div>
            <div className="col-md-3">
              <nav>
                <ul className="header-nav">
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SiteHeader);
