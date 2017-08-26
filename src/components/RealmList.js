import React, { Component } from 'react';
import axios from 'axios';

import { bnet } from '../config/constants';

export default class RealmList extends Component{
  constructor(){
    super();

    this.state = {
      realms: [],
      region: 'us',
      locale: 'en_US'
    }

    this._getAvailableRealms = this._getAvailableRealms.bind(this)

  }

  _getAvailableRealms(region){
    const self = this;

    axios.get(`https://${region}.api.battle.net/wow/realm/status`, {
      params: {
        apikey: bnet,
        locale: this.state.locale
      }
    }).then(function(response) {
      self.setState({
        realms: response.data.realms
      });
    }).catch(function(error) {
      console.log(error.response);
    });
  }

  _changeRegion(e){
  e.preventDefault();
  const region = this._region.value;

  switch (region) {
    case 'us':
      this.setState({
        region: region,
        locale: 'en_US'
      })
      break;
    case 'eu':
      this.setState({
        region: region,
        locale: 'en_GB'
      })
      break;
    case 'kr':
      this.setState({
        region: region,
        locale: 'ko_KR'
      })
      break;
    case 'tw':
      this.setState({
        region: region,
        locale: 'zh_TW'
      })
      break;
    default:
      this.setState({
        region: region,
        locale: 'en_GB'
      })
  }
  this._getAvailableRealms(region)
  return
}

  componentDidMount(){
    this._getAvailableRealms(this.state.region)
  }

  render(props){

    let realmList;
    if(this.state.realms !== null){
      realmList = this.state.realms.map((realm, i) =>{



        return (
          <li key={realm.slug}>
            <div className="realm-info">
              <h5>{realm.name}</h5>
              <p><span className="type">{realm.type}</span><span className="pop">{realm.population !== "n/a" ? ` - ${realm.population}` : ''}</span> - <span className="timezone">{realm.timezone.replace('_', ' ')}</span></p>
            </div>
            <div className="realm-status"><i className={`status-dot ${realm.status}`}></i></div>
          </li>);
      });
    }

    return(
      <div className="realm-list">
        <header className="realm-list-header">
          <span>Realm Status</span>
          <select ref={c => this._region = c} onChange={this._changeRegion.bind(this)}>
            <option value="us" defaultValue>US</option>
            <option value="eu">EU</option>
            <option value="kr">KR</option>
            <option value="tw">TW</option>
          </select>
        </header>
        <div className="realm-list-content">
          <ul className="list">
            {realmList}
          </ul>
        </div>
      </div>
    )
  }
}
