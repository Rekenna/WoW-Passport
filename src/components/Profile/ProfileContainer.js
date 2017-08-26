import React, { Component } from 'react';

import { determineClass, determineRace } from './helpers';

import ProfileOverview from './ProfileOverview';
import ProfileProgression from './ProfileProgression';

export default class ProfileContainer extends Component {
  render(props){

    const {character, region} = this.props;
    const characterClass = determineClass(character.class, character.talents);
    const armoryLink = getArmoryLink(region, character.name, character.realm);
    const race = determineRace(character.race)
    // const faction = determineFaction(character.faction)

    const currentTier = character.progression.raids.reverse()[0];

    return(
      <div className="profile-container">
        <div className={`profile-header ${character.faction ? 'horde' : 'alliance'}`}>
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
              <a href={armoryLink} className="armory-link" target="_blank">View Armory <i className="fa fa-external-link"></i></a>
            </div>
          </div>
        </div>
        <div className="player-information">
          <div className="pve">
            <ul>
              <li><span>{currentTier.normal}/{currentTier.bosses.length}</span><i>Normal</i></li>
              <li><span>{currentTier.heroic}/{currentTier.bosses.length}</span><i>Heroic</i></li>
              <li><span>{currentTier.mythic}/{currentTier.bosses.length}</span><i>Mythic</i></li>
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
                <ProfileOverview character={character}/>
              </section>
            </div>
            <div className="col-md-4">
              <section className="profile-column">
                <ProfileProgression progression={character.progression.raids} />
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function getArmoryLink(region, name, realm){
  let locale = 'en_US';

  switch (region) {
    case 'us':
      locale = 'en_US'
      break;
    case 'eu':
      locale = 'en_GB'
      break;
    case 'kr':
      locale = 'ko_KR'
      break;
    case 'tw':
      locale = 'zh_TW'
      break;
    default:
      locale = 'en_US'
  }

  return(`https://worldofwarcraft.com/${locale}/character/${realm}/${name}`).toLowerCase().replace(' ', '-');

}
