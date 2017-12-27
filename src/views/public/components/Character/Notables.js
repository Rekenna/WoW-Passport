import React, {Component} from 'react';

import { notableAchievements } from '../../../../config/notable_achievements';

export default class Notables extends Component {
  render() {

    const completedAchievements = this.props.achievements.achievementsCompleted

    let notables;
    notables = notableAchievements.map((achievement, i) =>{
      if(completedAchievements.includes(achievement.id)){
        return (<li key={achievement.id} className="complete">
          <div className="icon-wrapper">
            <img src={`//wow.zamimg.com/images/wow/icons/medium/${achievement.icon}.jpg`} alt="achievement icon"/>
          </div>
          <div className="achievement-content">
            <h5>{achievement.title}</h5>
          </div>
        </li>);
      }else{
        return false;
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
