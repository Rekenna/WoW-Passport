import React, { Component } from 'react';

var numeral = require('numeral');

export default class ProfileStatistics extends Component {
  render(){

    const stats = this.props.stats;

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

    return (
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
    )
  }
}
