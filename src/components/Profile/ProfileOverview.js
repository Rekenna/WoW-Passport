import React, { Component } from 'react';


import { determineClass, determineRace } from './helpers';
import ProfileGear from './ProfileGear';
import ProfileTalents from './ProfileTalents';
import ProfileStatistics from './ProfileStatistics';

export default class ProfileOverview extends Component{

  _characterRenderFallback(){

    const character = this.props.character;
    const characterClass = determineClass(character.class, character.talents)
    const race = determineRace(character.race)

    const fallbackUrl = (`https://blzmedia-a.akamaihd.net/wow/renders/shadow/${characterClass.spec}-${race}-${character.gender ? 'female' : 'male'}.jpg`).toLowerCase().replace(' ', '')

    let characterRender = document.getElementById('character-render');
    characterRender.src = fallbackUrl
    console.log(character.thumbnail)
    return
  }

  render(){

    const character = this.props.character;
    const characterClass = determineClass(character.class, character.talents)

    return(
      <div className="profile-overview">
        <header><strong>Character Overview</strong><span><i className="fa fa-star-o"></i>{character.achievementPoints} Achievement Points</span></header>
        <main className="row">
          <aside className="col-md-2">
            <ProfileStatistics stats={character.stats} />
          </aside>
          <div className="content col-md-10">
            <div className="character-appearance">
              <div className="appearance-wrapper">
                <img id="character-render" src={`//render-us.worldofwarcraft.com/character/${(character.thumbnail.split('-avatar')[0])}-main.jpg`} alt={`Rendering of Character`} onError={this._characterRenderFallback.bind(this)} />
                <div className="content">
                  <ProfileGear items={character.items} />
                  <ProfileTalents talents={characterClass.talents.talents} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
