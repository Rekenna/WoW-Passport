import React, { Component } from 'react';

import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class ProfileGear extends Component {
  render(){

    let legendaryItems = []

    for (var [key, value] of Object.entries(this.props.items)) {

      if(value.quality === 5 && key){
        legendaryItems = legendaryItems.concat([value])
      }
    }

    legendaryItems = legendaryItems.map((item, index) =>{
      return(getLegendaryItems(item))
    });

    return(
      <ul className="gear-list">
        {legendaryItems}
      </ul>
    );
  }
}

function getLegendaryItems(item) {
  let tooltip = <Tooltip id={`${item.id}-tooltip`}>
    <strong>{item.name}</strong>
  </Tooltip>;

  return (
    <OverlayTrigger key={item.id} placement="bottom" overlay={tooltip}>
      <li className="legendary"><img src={`https://wow.zamimg.com/images/wow/icons/large/${item.icon}.jpg`} alt={`${item.name} thumbnail`}/></li>
    </OverlayTrigger>
  );
}
