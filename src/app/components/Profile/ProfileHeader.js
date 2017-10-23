import React, { Component } from 'react';

import WarcraftLogs from './WarcraftLogs';
import RaiderIO from './RaiderIO';

var moment = require('moment');
var numeral = require('numeral');

export default class ProfileHeader extends Component {

  render(){

    const {character} = this.props;

    const lastLogout = moment(character.lastModified).format("MMM Do YYYY, h:mm A")

    const currentTier = character.progression.raids.reverse()[0];

    let normalProg = numeral(0);
    let heroicProg = numeral(0);
    let mythicProg = numeral(0);

    currentTier.bosses.map((boss) => {
      return normalProg.add(boss.normalKills > 0 ? 1 : 0)
    });

    currentTier.bosses.map((boss) => {
      return heroicProg.add(boss.heroicKills > 0 ? 1 : 0)
    });

    currentTier.bosses.map((boss) => {
      return mythicProg.add(boss.mythicKills > 0 ? 1 : 0)
    });

    return(
      <div className="profile-header">
        <div className="profile-header-content character-summary animated fadeIn">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="summary">
                  <header>
                    <div className="avatar-wrapper">
                      <img className="avatar" src={character.renders.avatar} alt={`${character.name} avatar`}/>
                      <div className="icons">
                        <div className={(`faction ${character.faction}`).toLowerCase()}></div>
                        <div className="class" style={{'backgroundImage' : `url(${character.renders.class})`}}></div>
                        <div className="level"><p>{character.level}</p></div>
                    </div>
                    </div>
                    <div className="info">
                      <h2>{character.name}</h2>
                        <p>
                          {character.race} {character.class.name}
                        </p>
                        <p className="realm">
                          {character.guild !== undefined ? `${character.guild.name} | ` : ''}{character.realm}
                        </p>
                    </div>
                    <div className="meta">
                      <p className="ilvl">
                        <span>iLvl: </span> <strong>{character.items.averageItemLevelEquipped}/{character.items.averageItemLevel}</strong>
                      </p>
                    </div>
                  </header>
                  <main>
                    <div className="content">
                      <ul className="pve">
                        <li><span>{normalProg.value()}/{currentTier.bosses.length}</span><i>Normal</i></li>
                        <li><span>{heroicProg.value()}/{currentTier.bosses.length}</span><i>Heroic</i></li>
                        <li><span>{mythicProg.value()}/{currentTier.bosses.length}</span><i>Mythic</i></li>
                      </ul>
                      <ul className="pvp">
                        <li><span>{character.pvp.brackets.ARENA_BRACKET_2v2.rating}</span><i>2v2</i></li>
                        <li><span>{character.pvp.brackets.ARENA_BRACKET_3v3.rating}</span><i>3v3</i></li>
                        <li><span>{character.pvp.brackets.ARENA_BRACKET_RBG.rating}</span><i>RBG</i></li>
                      </ul>
                    </div>
                  </main>
                </div>
              </div>
              <div className="col-md-6">
                <div className="col-md-6">
                  <RaiderIO character={character}/>
                </div>
                <div className="col-md-6">
                  <WarcraftLogs character={character}/>
                </div>
              </div>
            </div>
          </div>
          <p className="last-modified"><small>Last Updated:</small><br/> {lastLogout}</p>
        </div>
      </div>
    );
  }
}

// <div className="actions">
//   <span className="action update">
//     <i className="fa fa-refresh"></i> Request Update
//   </span>
// </div>
