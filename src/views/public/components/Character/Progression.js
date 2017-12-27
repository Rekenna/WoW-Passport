import React, {Component} from 'react';
import {UncontrolledTooltip} from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faCrosshairs} from "@fortawesome/fontawesome-pro-light/index.es";

import {determineProgression} from './helpers';

var numeral = require('numeral');

export default class Progression extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRaids: [
                8638, 8524, 8025, 8440, 8026
            ],
            totalBossKills: numeral(0)
        }
    }

    componentDidMount() {

        const currentRaids = this.props.progression.filter(raid => this.state.currentRaids.includes(raid.id));

        let bossKills = numeral(0);
        for (var i = 0; i < currentRaids.length; i++) {
            let bosses = currentRaids[i].bosses
            for (var j = 0; j < bosses.length; j++) {
                let boss = bosses[j]
                let kills = boss.lfrKills + boss.normalKills + boss.heroicKills + boss.mythicKills
                bossKills.add(kills)
            }
        }

        this.setState({
            totalBossKills: this.state.totalBossKills.add(bossKills.value())
        })

    }

    render(props) {

        const currentRaids = this.props.progression.filter(raid => this.state.currentRaids.includes(raid.id));

        let currentProgression;
        currentProgression = currentRaids.map((raid, i) => {
            return (
                <li key={raid.id} className="raid-wrapper">
                    <ProgressionItem raid={raid} progression={determineProgression(raid)}/>
                </li>
            );
        });

        return (
            <div className="profile-progression container">
                <header>
                    <strong>Legion Progression</strong>
                    <span><FontAwesomeIcon
                        icon={faCrosshairs}/>{this.state.totalBossKills.format('0,0')} Boss Kills</span>
                </header>
                <ul className="progression-list">
                    {currentProgression}
                </ul>
            </div>
        );
    }

}

class ProgressionBar extends Component {

    _createTooltip(slug, boss, numKills) {
        if (numKills === undefined) {
            numKills = 0
        }
        return (
            <UncontrolledTooltip target={`tooltip-${slug}`} placement={'bottom'}>
                <strong>{boss.name}:</strong><span className="kills"> {numKills} Kills</span>
            </UncontrolledTooltip>
        )
    }

    render() {
        const {raid, progression, difficulty} = this.props;

        const numBosses = raid.bosses.length

        let progress;
        let killed;
        progress = progression.bossKills.map((boss, i) => {

            let slug = raid.bosses[i].id + '_' + difficulty

            switch (difficulty) {
                case "mythic":
                    killed = progression.mythicProgression
                    return (
                        <div key={`${slug}-bar-${i}`} id={`tooltip-${slug}`} className={`boss ${boss.mythic > 0
                            ? 'killed'
                            : ''}`}>
                            {this._createTooltip(slug, boss, boss[difficulty])}
                        </div>
                    );
                case "heroic":
                    killed = progression.heroicProgression
                    return (
                        <div key={`${slug}-bar-${i}`} id={`tooltip-${slug}`} className={`boss ${boss.heroic > 0
                            ? 'killed'
                            : ''}`}>
                            {this._createTooltip(slug, boss, boss[difficulty])}
                        </div>
                    );
                case "normal":
                    killed = progression.normalProgression;
                    return (
                        <div key={`${slug}-bar-${i}`} id={`tooltip-${slug}`} className={`boss ${boss.normal > 0
                            ? 'killed'
                            : ''}`}>
                            {this._createTooltip(slug, boss, boss[difficulty])}
                        </div>
                    );
                case "lfr":
                    killed = progression.lfrProgression;
                    return (
                        <div key={`${slug}-bar-${i}`} id={`tooltip-${slug}`} className={`boss ${boss.lfr > 0
                            ? 'killed'
                            : ''}`}>
                            {this._createTooltip(slug, boss, boss[difficulty])}
                        </div>
                    );
                default:
                    return false
            }
        });

        return (
            <div className="prog-bar">
        <span className="bar-label">{difficulty}
            <i className="total">{killed > 0
                ? killed
                : '0'}/{numBosses}</i>
        </span>
                <div className={`bar ${killed === numBosses
                    ? 'complete'
                    : 'incomplete'}`}>
                    {progress}
                </div>
            </div>
        );

    }
}

class ProgressionItem extends Component {

    render() {
        const raid = this.props.raid;

        const progression = this.props.progression;

        return (
            <div className="raid">
                <div className="row">
                    <div className="col-md-12 flex-header">
                        <h4>{raid.name}</h4>
                        <div className="progs">
                            <ProgressionBar raid={raid} progression={progression} difficulty="mythic"/>
                            <ProgressionBar raid={raid} progression={progression} difficulty="heroic"/>
                            <ProgressionBar raid={raid} progression={progression} difficulty="normal"/>
                            <ProgressionBar raid={raid} progression={progression} difficulty="lfr"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
