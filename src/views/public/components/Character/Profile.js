import React, { Component } from 'react';
import Helmet from 'react-helmet';

import ProfileBanner from './ProfileBanner';
import Overview from './Overview';
import CharacterURL from './CharacterURL';
import Notables from './Notables';
import Progression from './Progression';
import PVP from './PVP';

import Promo from '../../../includes/Promo';
import NotFound from "../../NotFound";


export default class Profile extends Component {

    render(){
        if(!this.props.character.raw) return <NotFound/>;

        let data = JSON.parse(this.props.character.raw);
        return(
            <div className="character-profile">
                <Helmet>
                    <title>{data.name} - WoW Passport</title>
                </Helmet>
               <ProfileBanner character={this.props.character} requestUpdate={this.props.requestUpdate}/>
                <div className="container">
                    <div className="row profile-section">
                        <div className="col-md-8">
                            <Overview character={this.props.character} data={data}/>
                        </div>
                        <div className="col-md-4">
                            <CharacterURL/>
                            <Notables achievements={data.achievements}/>
                        </div>
                    </div>
                    <div className="row profile-section">
                        <div className="col-md-8">
                            <Progression character={data} progression={data.progression.raids.reverse()}/>
                        </div>
                        <div className="col-md-4">
                            <PVP character={data} brackets={data.pvp.brackets} statistics={data.statistics.subCategories[9]}/>
                            <Promo/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}