import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faSync} from "@fortawesome/fontawesome-pro-light/index.es";
import {requestCharacterData} from "../../../../client";

import RaiderIO from './RaiderIO';
import WarcraftLogs from './WarcraftLogs';

const moment = require('moment');
const numeral = require('numeral');

export default class ProfileHeader extends Component {
    constructor(){
        super();

        this.state = {
            updateRequested: false
        }

        this.requestUpdate = this.requestUpdate.bind(this)
    }

    requestUpdate(e){
        e.preventDefault();
        this.setState({
            updateRequested: true
        })
        const {character} = this.props;
        requestCharacterData(character.region, character.realm, character.name);
    }

    render(){

        const {character} = this.props;
        const data = JSON.parse(character.raw);

        const lastLogout = moment(character.lastModified).format("MMM Do YYYY, h:mm A")
        const currentTier = data.progression.raids.reverse()[0];

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

        let requestUpdateButton;

        if(this.state.updateRequested){
            requestUpdateButton = (<button onClick={this.requestUpdate} disabled  className={`request-update disabled`}><FontAwesomeIcon icon={faSync}/>Character Update Requested</button>);
        }else{
            requestUpdateButton = (<button onClick={this.requestUpdate} className={`request-update`}><FontAwesomeIcon icon={faSync}/>Request Character Update</button>);
        }

        return(
            <div className="profile-banner">
                <div className={`banner-content`}>
                    <div className={`container`}>
                        <div className={`row`}>
                            <div className={`col-md-6`}>
                                <div className={`character-summary`}>
                                    <div className="avatar-wrapper">
                                        <img className="avatar" src={character.renders.avatar} alt={`${character.name} avatar`}/>
                                        <div className="icons">
                                            <div className={`faction ${character.faction.toLowerCase()}`}></div>
                                            <div className="class" style={{'backgroundImage' : `url(${character.renders.spec})`}}></div>
                                            <div className="level"><p>{character.level}</p></div>
                                        </div>
                                    </div>
                                    <div className="info">
                                        <h2 className={`name`}>{character.name}</h2>
                                        <p>
                                            {character.race} {character.class.name}
                                        </p>
                                        <p className="realm">
                                            {data.guild !== undefined ? `${data.guild.name} | ` : ''}{data.realm}
                                        </p>
                                    </div>
                                    <div className="content">
                                        <ul className="pve">
                                            <li><span>{normalProg.value()}/{currentTier.bosses.length}</span><i>Normal</i></li>
                                            <li><span>{heroicProg.value()}/{currentTier.bosses.length}</span><i>Heroic</i></li>
                                            <li><span>{mythicProg.value()}/{currentTier.bosses.length}</span><i>Mythic</i></li>
                                        </ul>
                                        <ul className="pvp">
                                            <li><span>{data.pvp.brackets.ARENA_BRACKET_2v2.rating}</span><i>2v2</i></li>
                                            <li><span>{data.pvp.brackets.ARENA_BRACKET_3v3.rating}</span><i>3v3</i></li>
                                            <li><span>{data.pvp.brackets.ARENA_BRACKET_RBG.rating}</span><i>RBG</i></li>
                                        </ul>
                                    </div>
                                    <div className="meta">
                                        <p className="ilvl">
                                            <span>iLvl: </span> <strong>{data.items.averageItemLevelEquipped}/{data.items.averageItemLevel}</strong>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={`col-md-6`}>
                                <div className={`row`}>
                                    <div className="col-md-6">
                                        <RaiderIO character={character}/>
                                    </div>
                                    <div className="col-md-6">
                                        <WarcraftLogs character={character}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`banner-actions`}>
                    <div className={`container`}>
                        <div className={`row`}>
                            <div className={`col-md-12`}>
                                <div className={`actions`}>
                                    <p className="last-logout">Last Logout: {lastLogout}</p>
                                    {requestUpdateButton}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}