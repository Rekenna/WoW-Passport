import React, {Component} from 'react';

import { notableAchievements } from '../../config/notable_achievements';

var moment = require('moment');

export default class Notables extends Component {
  render() {

    const completedAchievements = this.props.character.achievements.achievementsCompleted
    const completedTimestamps = this.props.character.achievements.achievementsCompletedTimestamp

    let notables;
    notables = notableAchievements.map((achievement, i) =>{
      if(completedAchievements.includes(achievement.id)){
        return (<li key={achievement.id} className="complete">
          <div className="icon-wrapper">
            <img src={`//wow.zamimg.com/images/wow/icons/medium/${achievement.icon}.jpg`} alt="achievement icon"/>
          </div>
          <div className="achievement-content">
            <h5>{achievement.title}</h5>
            <p className="timestamp">Completed {moment(completedTimestamps[i]).format("MMMM Do")}</p>
          </div>
        </li>);
      }
      else{
        return (<li key={achievement.id} className="incomplete">
          <div className="icon-wrapper">
            <img src={`//wow.zamimg.com/images/wow/icons/medium/${achievement.icon}.jpg`} alt="achievement icon"/>
          </div>
          <div className="achievement-content">
            <h5>{achievement.title}</h5>
            <p className="timestamp">Not Completed</p>
          </div>
        </li>);
      }
    });

    return (
      <div className="notables-container">
        <h4 className="title">Notable Achievements</h4>
        <ul className="notable-achievements">
          {notables}
        </ul>
      </div>
    );
  }
}
