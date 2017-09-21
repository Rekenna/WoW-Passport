import React, { Component } from 'react';
import axios from 'axios';

import { wcl } from '../../config/constants';
import WarcraftLogsLogo from '../../../images/warcraft-logs-logo.png';
import { averagePerformance, getWclLink } from './helpers';


export default class WarcraftLogs extends Component{
  constructor(props){
    super(props);

    this.state = {
      logs: {},
      loaded: false,
      error: false
    }

    this._getWarcraftLogs = this._getWarcraftLogs.bind(this);
  }

  componentDidMount(){
    const {character, region} = this.props;

    this._getWarcraftLogs(character, region)
  }
  _getWarcraftLogs(character, region) {
    const self = this;
    let url = (`https://www.warcraftlogs.com:443/v1/rankings/character/${character.name}/${character.realm.replace(' ', '-').replace("'", "").toLowerCase()}/${region.toUpperCase()}`)
    axios.get( url.toLowerCase(), {
      params: {
        api_key: wcl
      }
    }).then(function(response) {
      self.setState({logs: response.data, loaded: true, error: false})
    }).catch(function(error) {
      // console.log(error);
      self.setState({logs: {}, loaded: false, error: true})
    });
  }

  render(props){

    const {character, region} = this.props;

    let logResults;

    let normalAverage;
    let heroicAverage;
    let mythicAverage;

    let wclurl = getWclLink(character, region)

    if(this.state.loaded){
      normalAverage = averagePerformance(this.state.logs, 3);
      heroicAverage = averagePerformance(this.state.logs, 4);
      mythicAverage = averagePerformance(this.state.logs, 5);

      logResults = (
        <div className="wcl-success">
          <img src={WarcraftLogsLogo} className="wcl-logo" alt="wcl logo"/>
          <h5>Warcraft Logs</h5>
          <ul className="averages">
            <li className="average normal">
              <i>{normalAverage}</i>
              <p>Normal</p>
            </li>
            <li className="average heroic">
              <i>{heroicAverage}</i>
                <p>Heroic</p>
            </li>
            <li className="average mythic">
              <i>{mythicAverage}</i>
                <p>Mythic</p>
            </li>
          </ul>
          <small>Median Performance Averages</small>
          <p className="disclaimer">Notice: For recruiters seeking a tank or healer the Warcraft Logs API only allows me to pull dps performance averages on the analysis page. To get more detailed information view their logs directly through one of the links.</p>
          <a href={wclurl.toLowerCase().replace(' ', '-')} target="_blank" className="wcl-button">View Warcraft Logs</a>
        </div>
      );
    }else if (this.state.error) {
      logResults = (
        <div className="wcl-error">
          <img src={WarcraftLogsLogo} className="animated wcl-logo" alt="wcl logo"/>
          <p>It looks like we had an issue trying to load logs for this character...</p>
          <a href={wclurl} target="_blank" className="wcl-button">I'll Look for Myself</a>
        </div>
      );
    }
    else{
      logResults = (
        <div className="wcl-loading">
          <img className="wcl-logo" src={WarcraftLogsLogo} alt="wcl logo"/>
          <p>Attempting to load data from Warcraft Logs...</p>
        </div>
      );
    }

    return(
      <div className="warcraftlogs-container animated fadeIn">
        {logResults}
      </div>
    );
  }
}
