import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { realms } from '../../config/data_resources';

class SearchForm extends Component{

  constructor(props){
    super(props);

    this.state = {
      region: 'us',
      locale: 'en_US',
      realms: realms,
      realm: 'bleeding-hollow'
    }
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
    return
  }

  _changeRealm(e){
    e.preventDefault()
    this.setState({realm: e.target.value})
  }

  _handleSubmit(e){
    e.preventDefault();

    const query = {
      realm: this._realm.value.toLowerCase().replace(/ /g,"-"),
      character: this._character.value,
      region: this._region.value,
      locale: this.state.locale
    }

    // Directly to page
    let url = (`/${query.region}/${query.realm}/character/${query.character}`).toLowerCase();

    // To Search Results
    // let url = (`/search#${query.region}+${query.realm}+${query.character}`).toLowerCase();

    this.props.history.push(url);
  }

  render(props){

    let availableRealms;
    if(this.state.realms !== null){
      availableRealms = this.state.realms.map((realm, i) =>{
        if(realm.slug === this.state.realm){
          return (<option key={realm.slug} value={realm.slug}>{realm.name}</option>);
        }
        else{
          return (<option key={realm.slug} value={realm.slug}>{realm.name}</option>);
        }
      });
    }
    else{
      availableRealms = (<option value="bleeding-hollow">Bleeding Hollow</option>);
    }

    return(
      <form className="search-form" onSubmit={this._handleSubmit.bind(this)}>
        <div className="fields">
          <input type="search" autoComplete="on" required placeholder="Player Name" ref={c => this._character = c} className="search-text" />
          <select ref={c => this._realm = c} value={this.state.realm} onChange={this._changeRealm.bind(this)}>
            {availableRealms}
          </select>
          <select ref={c => this._region = c} onChange={this._changeRegion.bind(this)}>
            <option value="us" defaultValue>US</option>
            <option value="eu">EU</option>
            <option value="kr">KR</option>
            <option value="tw">TW</option>
          </select>
        </div>
        <div className="submit">
          <button type="submit"><i className="fa fa-search"></i>Search</button>
        </div>
      </form>
    );
  }
}

export default withRouter(SearchForm);
