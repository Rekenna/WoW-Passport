import React, {Component} from 'react';

import { determineProgression } from './helpers';

var numeral = require('numeral');

export default class ProfileProgression extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raidsListed: 1
    }
  }

  render(props) {

    const raids = this.props.progression;

    let totalBossKills = numeral(0)

    raids.map((raid, i) =>{
      return totalBossKills.add(raid.lfr + raid.normal + raid.heroic + raid.mythic)
    })

    let progression;

    if (raids.length > 0) {
      progression = raids.map((raid, i) => {
        if (i < this.state.raidsListed) {

          return (
            <li key={i}><ProgressionItem raid={raid} progression={determineProgression(raid)}/></li>
          );
        }
        return true;
      });
    }

    return (
      <div className="profile-overview progression-container">
        <header><strong>Progression</strong><span><i className="fa fa-crosshairs"></i>{totalBossKills.format('0,0')} Boss Kills</span></header>
        <ul className="progression-list">
          {progression}
        </ul>
    </div>
    );
  }


  _changeRaidDisplay(e){
    e.preventDefault()
    this.setState({raidsListed: this._raids.value})
  }
}

class ProgressionItem extends Component {

  componentDidMount(){
    // const raid = this.props.raid;
  }

  render(){
    const raid = this.props.raid;
    const progression = this.props.progression;

    return(
      <div className="raid">
        <div className="row">
          <div className="col-md-12 flex-header">
            <h4>{raid.name}</h4>
            <div className="progs">
              <p>N: <span className="total">{progression.normalProgression}/{progression.bosses}</span></p>
              <p>H: <span className="total">{progression.heroicProgression}/{progression.bosses}</span></p>
              <p>M: <span className="total">{progression.mythicProgression}/{progression.bosses}</span></p>
            </div>
          </div>
          <div className="col-md-12">

          </div>
        </div>
      </div>
    );
  }
}
