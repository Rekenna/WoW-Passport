import React, { Component } from 'react';


import { determineClass } from './helpers';

import ProfileGear from './ProfileGear';
import ProfileTalents from './ProfileTalents';
import ProfileStatistics from './ProfileStatistics';

export default class ProfileOverview extends Component{
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
            <div className="appearance-wrapper">
              <img src={`//render-us.worldofwarcraft.com/character/${(character.thumbnail.split('-')[0])}-main.jpg`} alt={`Rendering of Character`} />
              <div className="content">
                <ProfileTalents talents={characterClass.talents.talents} />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
