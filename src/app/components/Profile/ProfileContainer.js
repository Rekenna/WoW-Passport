import React, { Component } from 'react';

import { formatCharacterData } from './helpers';

// import { realms } from '../../config/data_resources';

import ProfileHeader from './ProfileHeader';
import Overview from './Overview';
import Progression from './Progression';
import Promo from './Promo';
import CharacterURL from './CharacterURL';
import PVP from './PVP';
import Notables from './Notables';

export default class ProfileContainer extends Component {

  render(){

    const { characterData, region } = this.props;

    let character = formatCharacterData(characterData, region)

    return(
      <div className="profile-container">
        <ProfileHeader character={character}/>

        <div className="container">
          <div className="row profile-section">
            <div className="col-md-8">
              <Overview character={character}/>
            </div>
            <div className="col-md-4">
              <CharacterURL character={character}/>
              <Notables character={character}/>
            </div>
          </div>
          <div className="row profile-section">
            <div className="col-md-8">
              <Progression character={character} progression={character.progression.raids}/>
            </div>
            <div className="col-md-4">
              <PVP character={character} brackets={character.pvp.brackets} statistics={character.statistics.subCategories[9]}/>
              <Promo/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
