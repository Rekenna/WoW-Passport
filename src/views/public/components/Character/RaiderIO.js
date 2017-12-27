import React, { Component } from 'react';
import axios from 'axios';

export default class RaiderIO extends Component{
  constructor(props){
    super(props);

    this.state = {
      logs: {},
      loaded: false,
      error: false
    }

    this._getRaiderIO = this._getRaiderIO.bind(this);
  }

  componentDidMount(){
    const {character} = this.props;

    this._getRaiderIO(character)
  }
  _getRaiderIO(character) {
    const self = this;
    let url = (`https://raider.io/api/v1/characters/profile?region=${character.region}&realm=${character.realm}&name=${character.name}&fields=mythic_plus_scores,mythic_plus_weekly_highest_level_runs`)
    axios.get( url.toLowerCase(), {
      params: {}
    }).then(function(response) {
      self.setState({logs: response.data, loaded: true, error: false})
    }).catch(function(error) {
      console.log(error);
      self.setState({logs: {}, loaded: false, error: true})
    });
  }

  render(props){

    const {character} = this.props;

    let ioResults;

    if(!this.state.error && this.state.loaded){

      ioResults = (
        <div className="raiderio-success">
          <h5>Mythic Plus Scores</h5>
          <ul className="averages">
            <li className="average heroic">
              <i>{this.state.logs.mythic_plus_scores.all}</i>
                <p>Mythic+ Total Score</p>
            </li>
          </ul>
        </div>
      )
    }
    else if (this.state.error && this.state.loaded) {
      ioResults = (
        <div className="raiderio-error">
          <p>It looks like we're unable to load Raider.io data for this character...</p>
        </div>
      )
    }
    else {
      ioResults = (
        <div className="raiderio-loading">
          <p>Connecting to Raider.io</p>
        </div>
      )
    }

    return(
      <div className="raiderio-container animated fadeIn">
        <h5>Raider.io</h5>
        {ioResults}
        <a href={character.urls.raiderio} target="_blank" className="raiderio-button">View Raider.io</a>
      </div>
    );
  }
}
