import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faClock, faBolt, faHeart, faDiamond, faWrench, faCrosshairs, faStar} from "@fortawesome/fontawesome-pro-light/index.es";

import ProfileTalents from './ProfileTalents';
import ProfileGear from './ProfileGear';

var numeral = require('numeral');

export default class Overview extends Component {

    _characterRenderFallback() {
        const fallbackUrl = this.props.character.renders.fallback
        let characterRender = document.getElementById('character-render');
        characterRender.src = fallbackUrl
        return
    }

    render() {

        const {character, data} = this.props;

        const stats = data.stats;

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
            <div className="profile-overview container">
                <header><strong>Character Overview</strong><span><FontAwesomeIcon icon={faStar}/>{data.achievementPoints} Achievement Points</span></header>
                <div className="character-overview row">
                    <aside className="col-md-2">
                        <ul className="character-stats">
                            <div className="stat">

                                <div className="stat-icon health">
                                    <FontAwesomeIcon icon={faHeart}/>
                                </div>

                                <p>{numeral(stats.health).format('0.0a')}
                                    <strong>Health</strong>
                                </p>
                            </div>
                            <div className="stat">

                                <div className="stat-icon primary">
                                    <FontAwesomeIcon icon={faBolt}/>
                                </div>
                                {primaryStat}

                            </div>
                            <div className="stat">
                                <div className="stat-icon mastery">
                                    <FontAwesomeIcon icon={faDiamond}/>
                                </div>
                                <p>{Math.round(stats.mastery)}%<strong>Mastery</strong>
                                </p>
                            </div>
                            <div className="stat">
                                <div className="stat-icon haste">
                                    <FontAwesomeIcon icon={faClock}/>
                                </div>
                                <p>{Math.round(stats.haste)}%<strong>Haste</strong>
                                </p>
                            </div>
                            <div className="stat">
                                <div className="stat-icon critical">
                                    <FontAwesomeIcon icon={faCrosshairs}/>
                                </div>
                                <p>{Math.round(stats.crit)}%<strong>Critical</strong>
                                </p>
                            </div>
                            <div className="stat">
                                <div className="stat-icon versatility">
                                    <FontAwesomeIcon icon={faWrench}/>
                                </div>
                                <p>{Math.round(stats.versatilityDamageDoneBonus)}%<strong>Versatility</strong>
                                </p>
                            </div>
                        </ul>
                    </aside>
                    <div className="content col-md-10">
                        <div className="character-appearance">
                            <div className="appearance-wrapper">
                                <img id="character-render" src={character.renders.main} alt={`Rendering of Character`}
                                     onError={this._characterRenderFallback.bind(this)}/>
                                <div className="content">
                                    <ProfileTalents talents={character.class.talents.talents}/>
                                    <ProfileGear items={data.items}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
