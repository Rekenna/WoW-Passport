import React, { Component } from 'react';

import ProfileTalents from './ProfileTalents';
import ProfileGear from './ProfileGear';

var numeral = require('numeral');

export default class Overview extends Component {

  _characterRenderFallback(){
    const fallbackUrl = this.props.character.renders.fallback
    let characterRender = document.getElementById('character-render');
    characterRender.src = fallbackUrl
    return
  }

  render(){

    const character = this.props.character;

    const stats = character.stats;

    let primaryStat;

    if (stats.str > stats.agi && stats.str > stats.int) {
      primaryStat = <p>{numeral(stats.str).format('0.0a')}
        <strong>Strength</strong>
      </p>;
    } else if (stats.agi > stats.int) {
      primaryStat = <p>{numeral(stats.agi).format('0.0a')}
        <strong>Agility</strong>
      </p>;
    } else {
      primaryStat = <p>{numeral(stats.int).format('0.0a')}
        <strong>Intellect</strong>
      </p>;
    }

    return(
      <div className="profile-overview container">
        <main className="row">
          <div className="col-md-8">
            <header><strong>Character Overview</strong><span><i className="fa fa-star-o"></i>{character.achievementPoints} Achievement Points</span></header>
            <div className="character-overview row">
              <aside className="col-md-2">
                <ul className="character-stats">
                  <div className="stat">

                    <div className="stat-icon health">
                      <i className="fa fa-heart"></i>
                    </div>

                    <p>{numeral(stats.health).format('0.0a')}
                      <strong>Health</strong>
                    </p>
                  </div>
                  <div className="stat">

                    <div className="stat-icon primary">
                      <i className="fa fa-bolt"></i>
                    </div>
                    {primaryStat}

                  </div>
                  <div className="stat">
                    <div className="stat-icon mastery">
                      <i className="fa fa-diamond"></i>
                    </div>
                    <p>{Math.round(stats.mastery)}%<strong>Mastery</strong>
                    </p>
                  </div>
                  <div className="stat">
                    <div className="stat-icon haste">
                      <i className="fa fa-clock-o"></i>
                    </div>
                    <p>{Math.round(stats.haste)}%<strong>Haste</strong>
                    </p>
                  </div>
                  <div className="stat">
                    <div className="stat-icon critical">
                      <i className="fa fa-crosshairs"></i>
                    </div>
                    <p>{Math.round(stats.crit)}%<strong>Critical</strong>
                    </p>
                  </div>
                  <div className="stat">
                    <div className="stat-icon versatility">
                      <i className="fa fa-wrench"></i>
                    </div>
                    <p>{stats.versatility}
                      <strong>Versatility</strong>
                    </p>
                  </div>
                </ul>
              </aside>
              <div className="content col-md-10">
                <div className="character-appearance">
                  <div className="appearance-wrapper">
                    <img id="character-render" src={character.renders.main} alt={`Rendering of Character`} onError={this._characterRenderFallback.bind(this)} />
                    <div className="content">
                      <ProfileTalents talents={character.class.talents.talents} />
                      <ProfileGear items={character.items} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
