import React, { Component } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

import { bnet } from '../config/constants';
// import { bnet, index } from '../config/constants';

export default class SearchResults extends Component{
  constructor(props){
    super(props);

    this.state = {
      progress: 'loading',
      results: []
    };
  }

  componentDidMount(){

    const hashParts = (window.location.hash.split('#'))[1].split('+');


    let parsedParams = {
      region: hashParts[0],
      realm: hashParts[1],
      term: hashParts[2]
    };

    this._searchForPlayer(parsedParams)
    this._searchForGuild(parsedParams)

  }

  componentWillReceiveProps(nextProps){
    this.setState({results: [], progress: 'loading'})

    const hashParts = (window.location.hash.split('#'))[1].split('+');

    let parsedParams = {
      region: hashParts[0],
      realm: hashParts[1],
      term: hashParts[2]
    };

    this._searchForPlayer(parsedParams)
    this._searchForGuild(parsedParams)
  }

  _searchForPlayer(params){
    const {region, realm, term} = params;

    const self = this;

    axios.get(`https://${region}.api.battle.net/wow/character/${realm}/${term}`, {
      params: {
        apikey: bnet,
        fields: 'stats,talents,statistics,guild,items,progression,feed,acheivements'
      }
    }).then(function(response) {
      console.log(response.data)
      self.setState({results: self.state.results.concat([response.data]), progress: 'done', region: region})
    }).catch(function(error) {
      console.log(error);
      self.setState({region: region})
    });
  }

  _searchForGuild(params){
    const {region, realm, term} = params;

    const self = this;

    axios.get(`https://${region}.api.battle.net/wow/guild/${realm}/${term}`, {
      params: {
        apikey: bnet,
        fields: 'achievements,challenge'
      }
    }).then(function(response) {
      console.log(response.data)
      self.setState({results: self.state.results.concat([response.data]), progress: 'done', region: region})
    }).catch(function(error) {
      console.log(error);
      self.setState({region: region})
    });
  }

  render(props){

    let results;

    if(this.state.results.length > 0 && this.state.progress === 'done'){
      results = this.state.results.map((result, index)  => {

        const type = result.race ? 'player' : 'guild';

        let card;

        if(type === 'player'){
          card = (
            <div className="player-results">
              <h4>{result.name}</h4>
              <p>Player</p>
              <Link to={`/${this.state.region}/${result.realm}/character/${result.name}`} className="button primary">View Player</Link>
            </div>
          );
        }
        else{
          card = (
            <div className="guild-results">
              <h4>{result.name}</h4>
              <p>Guild</p>
            </div>
          );
        }

        return(
          <div key={result.lastModified} className="col-md-6">
            <div className="result-card">
              {card}
            </div>
          </div>
        );
      });
    }
    else{
      results = (
        <div className="col-md-12">
          <p className="loading">Loading results...</p>
        </div>
      );
    };

    return(
      <div className="search-results-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <h3>Search Results</h3>
            </div>
            {results}
          </div>
        </div>
      </div>
    )
  }
}
