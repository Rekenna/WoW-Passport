import React, {Component} from 'react';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

import { determineProgression } from './helpers';

var numeral = require('numeral');

export default class ProfileProgression extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRaids: [8524, 8025, 8440, 8026],
      totalBossKills: numeral(0)
    }
  }

  componentDidMount(){

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
    const legacyRaids = this.props.progression.filter(raid => !this.state.currentRaids.includes(raid.id));

    let currentProgression;
    currentProgression = currentRaids.map((raid, i) => {
      return (
        <li key={raid.id} className="raid-wrapper">
          <ProgressionItem raid={raid} progression={determineProgression(raid)}/>
        </li>
      );
    });

    let legacyProgression;
    legacyProgression = legacyRaids.map((raid, i) => {
      return (
        <li key={raid.id} className="legacy-raid">
          <LegacyProgressionItem raid={raid}/>
        </li>
      );
    });

    return (
      <div className="profile-overview progression-container">
        <header><strong>Legion Progression</strong><span><i className="fa fa-crosshairs"></i>{this.state.totalBossKills.format('0,0')} Boss Kills</span></header>
        <ul className="progression-list">
          {currentProgression}
        </ul>
        <ul className="legacy-progression-list">
          {legacyProgression}
        </ul>
    </div>
    );
  }

}

class ProgressionBar extends Component{

  _createTooltip(boss, numKills){
    if(numKills === undefined){
      numKills = 0
    }
    return <Tooltip id={`${boss.id}-tooltip`}>
     <strong>{boss.name}: </strong>
     {numKills} Kills</Tooltip>
  }

  render(){
    const {raid, progression, difficulty} = this.props;

    const numBosses = raid.bosses.length

    let killed;
    let complete;
    switch (difficulty) {
      case "mythic":
        killed = progression.mythicProgression
        complete = numeral(progression.mythicProgression/numBosses)
        break;
      case "heroic":
        killed = progression.heroicProgression
        complete = numeral(progression.heroicProgression/numBosses)
        break;
      case "normal":
        killed = progression.normalProgression
        complete = numeral(progression.normalProgression/numBosses)
        break;
      case "lfr":
        killed = progression.lfrProgression
        complete = numeral(progression.lfrProgression/numBosses)
        break;
      default:
    }

    let progress;
    progress = progression.bossKills.map((boss, i) =>{
      if(i < killed){
        return(
          <OverlayTrigger key={`${boss.id}-bar-${i}`} placement="bottom" overlay={this._createTooltip(boss, boss[difficulty])}>
            <div className="boss killed"></div>
          </OverlayTrigger>
        )
      }
      else{
        return(
          <OverlayTrigger key={`${boss.id}-bar-${i}`} placement="bottom" overlay={this._createTooltip(boss, boss[difficulty])}>
            <div className="boss"></div>
          </OverlayTrigger>
        )
      }
    });

    return(
      <div className="prog-bar">
        <span className="bar-label">{difficulty}<i className="total">{killed ? killed : '0'}/{numBosses}</i></span>
        <div className={`bar ${complete.value() === 1 ? 'complete' : 'incomplete'}`}>
          {progress}
        </div>
      </div>
    );

  }
}

class ProgressionItem extends Component {

  render(){
    const raid = this.props.raid;

    const progression = this.props.progression;

    return(
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

class LegacyProgressionItem extends Component {
  render(){

    const raid = this.props.raid

    let progress;
    let icon;
    if (raid.lfr > 0 || raid.normal > 0 || raid.heroic > 0 || raid.mythic > 0) {
      progress = "complete"
      icon = "fa fa-check"
    }
    else{
      progress = "incomplete"
      icon = "fa fa-close"
    }

    return(
      <div className="legacy-raid">
        <h5>
          <span className={`status ${progress}`}><i className={icon}></i></span>
          <i className="name">{raid.name}</i>
        </h5>
      </div>
    );
  }
}
