import React, { Component } from 'react';

import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class ProfileTalents extends Component {
  render(){

    const talents = this.props.talents.sort( (a,b) =>{
      return a.tier - b.tier
    })

    let talentList;

    talentList = talents.map((talent, i) =>{
      return(getTalentIcon(talent));
    });

    return(
      <ul className="talent-list">
        {talentList}
      </ul>
    );
  }
}

function getTalentIcon(talent) {

  let tooltip = <Tooltip id={`${talent.spell.id}-tooltip`}>
    <strong>{talent.spell.name}: </strong>
    {talent.spell.description}</Tooltip>;

  return (
    <OverlayTrigger key={talent.spell.id} placement="bottom" overlay={tooltip}>
      <li className="talent"><img src={`https://render-us.worldofwarcraft.com/icons/56/${talent.spell.icon}.jpg`} alt={`talent ${talent.spell.name} thumbnail`}/></li>
    </OverlayTrigger>
  );
}
