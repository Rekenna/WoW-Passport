import React, { Component } from 'react';

import { determineClass, determineRace, getArmoryLink, getWclLink, getWowpLink } from './helpers';

import ProfileOverview from './ProfileOverview';
import ProfileProgression from './ProfileProgression';
import WarcraftLogs from './WarcraftLogs';
import RaiderIO from './RaiderIO';

var moment = require('moment');
var numeral = require('numeral');


export default class ProfileContainer extends Component {

  render(props){

    const {character, region} = this.props;
    const characterClass = determineClass(character.class, character.talents);
    const armoryLink = getArmoryLink(region, character.name, character.realm);
    const wclLink = getWclLink(character, region);
    const wowpLink = getWowpLink(character, region);

    const race = determineRace(character.race)

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
      <div className="profile-container">
        <div className={`profile-header ${character.faction ? 'horde' : 'alliance'}`}>
          <div className="profile-header-content animated fadeIn">
            <div className="avatar-container">
              <div className="img-wrapper">
                <img className="avatar" src={`https://render-${region}.worldofwarcraft.com/character/${character.thumbnail}`} alt={`${character.name} thumbnail`}/>
                <p>{character.level}</p>
              </div>
              <div className="character">
                <h2>{character.name}</h2>
                <p>
                  {race} {characterClass.talents.spec.name} {characterClass.spec}
                </p>
                <p className="realm">
                  {character.guild !== undefined ? `${character.guild.name} | ` : ''}{character.realm}
                </p>
              </div>
            </div>
            <div className="actions">
              <a href={armoryLink} className="armory-link" target="_blank">Armory <i className="fa fa-external-link"></i></a>
              <a href={wclLink} className="armory-link" target="_blank">Warcraft Logs <i className="fa fa-external-link"></i></a>
              <a href={wowpLink} className="armory-link" target="_blank">WoW Progress <i className="fa fa-external-link"></i></a>
            </div>
          </div>
          <p className="last-modified"><small>Last Online/Update:</small><br/> {lastLogout}</p>
        </div>
        <div className="player-information">
          <div className="pve">
            <ul>
              <li><span>{normalProg.value()}/{currentTier.bosses.length}</span><i>Normal</i></li>
              <li><span>{heroicProg.value()}/{currentTier.bosses.length}</span><i>Heroic</i></li>
              <li><span>{mythicProg.value()}/{currentTier.bosses.length}</span><i>Mythic</i></li>
            </ul>
          </div>
          <div className="ilvl">
            <div className={`ilvl-wrapper ${character.faction ? 'horde' : 'alliance'}`}>
              <p>
                <strong>{character.items.averageItemLevelEquipped}/{character.items.averageItemLevel}</strong>
                <i>iLvl</i>
              </p>
            </div>
          </div>
          <div className="pvp">
            <ul>
              <li><span>{character.pvp.brackets.ARENA_BRACKET_2v2.rating}</span><i>2v2</i></li>
              <li><span>{character.pvp.brackets.ARENA_BRACKET_3v3.rating}</span><i>3v3</i></li>
              <li><span>{character.pvp.brackets.ARENA_BRACKET_RBG.rating}</span><i>RBG</i></li>
            </ul>
          </div>
        </div>


        <div className="container animated fadeIn">
          <div className="row">
            <div className="col-md-8">
              <section className="profile-column">
                <ProfileOverview {...this.props}/>
              </section>
              <section className="profile-column">
                <ProfileProgression progression={character.progression.raids} />
              </section>
            </div>
            <div className="col-md-4">
              <section className="profile-column">
                <RaiderIO {...this.props}/>
                <WarcraftLogs {...this.props}/>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
