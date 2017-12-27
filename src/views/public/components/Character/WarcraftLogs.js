import React, { Component } from 'react';
import axios from 'axios';

import { wcl } from '../../../../client';

export default class WarcraftLogs extends Component{
  constructor(props){
    super(props);

    this.state = {
      logs: [],
      loaded: false,
      error: false
    }

    this._getWarcraftLogs = this._getWarcraftLogs.bind(this);
  }

  componentDidMount(){
    const {character, region} = this.props;

    this._getWarcraftLogs(character, region)
  }

  _getWarcraftLogs(character) {
    const self = this;

    let url = `https://www.warcraftlogs.com:443/v1/rankings/character/${character.name}/${character.realm}/${character.region}`

    axios.get( url, {
      params: {
        api_key: wcl
      }
    }).then(function(response) {
      self.setState({logs: response.data, loaded: true, error: false})
    }).catch(function(error) {
      self.setState({loaded: false, error: true})
    });
  }

  render(props){

    const {character} = this.props;

    let logResults;

    let normalAverage;
    let heroicAverage;
    let mythicAverage;

    if(this.state.loaded){
      normalAverage = averagePerformance(this.state.logs, 3);
      heroicAverage = averagePerformance(this.state.logs, 4);
      mythicAverage = averagePerformance(this.state.logs, 5);

      logResults = (
        <div className="wcl-success">
          <h5>Median Performance Averages</h5>
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
          <a href={character.urls.warcraftlogs} target="_blank" className="wcl-button">View Warcraft Logs</a>
        </div>
      );
    }else if (this.state.error) {
      logResults = (
        <div className="wcl-error">
          <p>It looks like we had an issue trying to load logs for this character...</p>
          <a href={character.urls.warcraftlogs} target="_blank" className="wcl-button">I'll Look for Myself</a>
        </div>
      );
    }
    else{
      logResults = (
        <div className="wcl-loading">
          <p>Attempting to load data from Warcraft Logs...</p>
        </div>
      );
    }

    return(
      <div className="warcraftlogs-container animated fadeIn">
        <h5>Warcraft Logs</h5>
        {logResults}
      </div>
    );
  }
}

function averagePerformance(performances, difficulty) {
  const encounters = performances.map((performance, i) => {
    return ({"encounter": performance.encounter, "difficulty": performance.difficulty, "rank": performance.rank, "outOf": performance.outOf, "reportID": performance.reportID})
  });

  const encountersToAverage = encounters.filter(encounter => encounter.difficulty === difficulty)

  if (encountersToAverage.length > 0) {
    const average = 100 - (encountersToAverage.map((encounter, i) => {
      return ((encounter.rank / encounter.outOf) * 100)
    }).reduce(getSum) / encountersToAverage.length);

    return Math.floor(average);
  }
  else{
    return 0;
  }

}

function getSum(total, num) {
  return total + num;
}
