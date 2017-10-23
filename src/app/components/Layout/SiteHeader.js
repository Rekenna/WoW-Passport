import React, {Component} from 'react';

import AppLogo from '../../../images/logo.png';
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import axios from 'axios';

import SearchForm from '../Search/SearchForm';

import { bnet } from '../../config/constants';

class SiteHeader extends Component{

  constructor(){
    super();

    this.state = {
      bnet: true
    }
  }

  _checkBnetStatus(){
    const self = this;

    axios.get(`https://us.api.battle.net/wow/realm/status`, {
      params: {
        apikey: bnet
      }
    }).then(function(response) {
      self.setState({
        bnet: true
      });
    }).catch(function(error) {
      self.setState({
        bnet: false
      });
    });
  }

  componentDidMount(){
    this._checkBnetStatus()
  }

  render(){

    return(
      <div className="site-header">
        <div className="site-status">
          <p className={`bnet ${this.state.bnet}`}>
            Battle.net API
          </p>
        </div>
        <div className="site-nav">
          <div className="container-fluid">
            <div className="row flex-row">
              <div className="col-12 col-md-3">
                <Link to="/"><img src={AppLogo} alt="WOW Passport Logo"/></Link>
                <span className="app-version">Alpha v1.2.0</span>
              </div>
              <div className="col-12 col-md-6 col-md-offset-3">
                <SearchForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SiteHeader);
