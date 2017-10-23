import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

import { bnet } from '../config/constants';

import NotFound from './NotFound';

import ProfileContainer from '../components/Profile/ProfileContainer';


class ProfilePage extends Component{
  constructor(){
    super();

    this.state = {
      progress: 'loading',
      player: null
    }

    this._updatePageTitle = this._updatePageTitle.bind(this)
  }

  componentWillReceiveProps(nextProps){
    this.setState({progress: 'loading'})
    this._updatePageTitle(nextProps.match.params)
    this._searchForPlayer(nextProps.match.params)
  }

  componentDidMount(){
    this._searchForPlayer(this.props.match.params)
    this._updatePageTitle(this.props.match.params)
  }

  _updatePageTitle(params){
    const character = params.character;
    document.title = `${character.charAt(0).toUpperCase() + character.slice(1)} - WoW Passport`;
  }

  _searchForPlayer(params){
    const {region, realm, character} = params;

    const self = this;

    axios.get(`https://${region}.api.battle.net/wow/character/${realm}/${character}`, {
      params: {
        apikey: bnet,
        fields: 'stats,talents,statistics,guild,items,progression,pvp,feed,professions,achievements'
      }
    }).then(function(response) {
      let data = response.data
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        self.setState({player: null, progress: 'error'})
      }
      else{
        self.setState({player: response.data, progress: 'done', region: region})
      }
    }).catch(function(error) {
      self.setState({player: null, progress: 'error'})
    });
  }

  render(){

    let content;

    switch (this.state.progress) {
      case 'done':
        content = (<ProfileContainer characterData={this.state.player} region={this.state.region}/>);
        break;
      case 'error':
        content = (<NotFound/>);
        break;
      default:
        content = (<Loading/>);

    }

    return(
      <div className="profile-page">
        {content}
      </div>
    );
  }
}

export default withRouter(ProfilePage);

function Loading(props){
  return(
    <div className="profile-container loading">
      <div className="profile-header">
        <div className="loading-wrapper">
          <div className="loader">
            Loading...
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <p className="loading-text"><i>Searching the archives...</i></p>
          </div>
        </div>
      </div>
    </div>
  )
}
