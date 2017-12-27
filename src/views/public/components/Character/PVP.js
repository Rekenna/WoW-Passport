import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faBalanceScale} from "@fortawesome/fontawesome-pro-light/index.es";

var numeral = require('numeral');

export default class PVP extends Component {

  render(){

    const {character, brackets, statistics} = this.props;

    let arenaStats = statistics.subCategories[0]
    let bgStats = statistics.subCategories[1]

    let ratingArray = [arenaStats.statistics[23].quantity, arenaStats.statistics[24].quantity, arenaStats.statistics[25].quantity]

    let highestPersonalRating = ratingArray.reduce(function(a, b) {
        return Math.max(a, b)
    })

    return(
      <div className="profile-pvp">
        <header>
          <strong>Player vs. Player</strong>
          <span><FontAwesomeIcon icon={faBalanceScale}/>{numeral(arenaStats.statistics[1].quantity + bgStats.statistics[0].quantity).format('0,0')} Games Played</span>
        </header>
        <div className="pvp-progression">
          <div className="highest-personal-rating">
            <p><span>{numeral(highestPersonalRating).format('0,0')}</span>Highest Personal Rating</p>
          </div>
          <ul className="rankings">
            <li><span>{brackets.ARENA_BRACKET_2v2.rating}</span>2v2</li>
            <li><span>{brackets.ARENA_BRACKET_3v3.rating}</span>3v3</li>
            <li><span>{brackets.ARENA_BRACKET_3v3.rating}</span>RGB</li>
          </ul>
          <ul className="statistics">
            <li><span>{numeral(character.totalHonorableKills).format('0,0')}</span>Honorable Kills</li>
            <li><span>{numeral(arenaStats.statistics[1].quantity).format('0,0')}</span>Arenas Played</li>
            <li><span>{numeral(bgStats.statistics[0].quantity).format('0,0')}</span>Battlegrounds Played</li>
          </ul>
        </div>
      </div>
    );
  }
}
