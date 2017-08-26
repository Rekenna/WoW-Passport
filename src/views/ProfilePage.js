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
  }

  componentWillReceiveProps(nextProps){
    this.setState({progress: 'loading'})
    this._searchForPlayer(nextProps.match.params)
  }

  componentDidMount(){
    this._searchForPlayer(this.props.match.params)
  }

  _searchForPlayer(params){
    const {region, realm, character} = params;

    const self = this;

    axios.get(`https://${region}.api.battle.net/wow/character/${realm}/${character}`, {
      params: {
        apikey: bnet,
        fields: 'stats,talents,statistics,guild,items,progression,pvp,feed,acheivements'
      }
    }).then(function(response) {
      console.log(response.data)
      self.setState({player: response.data, progress: 'done', region: region})
    }).catch(function(error) {
      console.log(error);
      self.setState({player: null, progress: 'error', region: region})
    });
  }

  render(){

    let content;

    switch (this.state.progress) {
      case 'done':
        content = (<ProfileContainer character={this.state.player} region={this.state.region}/>);
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
