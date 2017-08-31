import React, {Component} from 'react';

import AppLogo from '../../../images/logo.png';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

import SearchForm from '../Search/SearchForm';

class SiteHeader extends Component{
  render(){

    return(
      <div className="site-header">
        <div className="container">
          <div className="row flex-row">
            <div className="col-md-3">
              <Link to="/"><img src={AppLogo} alt="WOW Passport Logo"/></Link>
            </div>
            <div className="col-md-6 col-md-offset-3">
              <SearchForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SiteHeader);
