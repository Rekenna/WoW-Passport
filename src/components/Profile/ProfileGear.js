import React, { Component } from 'react';

import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class ProfileGear extends Component {
  render(){

    const items = this.props.items;

    let equippedGear = [];

    for(var prop in items){
      let item = items[prop]
      if(item.id !== undefined){
        equippedGear.push(item)
      }
    }


    let gearList = equippedGear.map((item, i) => {
      return(this._compileGearPiece(item));
    });

    return(
      <ul className="gear-list">
        {gearList}
      </ul>
    );
  }

  _compileGearPiece(item){

    let tooltip = <Tooltip id={`${item.id}-tooltip`}>
      <strong>{item.name}</strong></Tooltip>;

    return (
      <OverlayTrigger key={item.id} placement="left" overlay={tooltip}>
        <li key={item.id} className={`gear-piece ${this._getItemQuality(item.quality)}`}>
          <div className="gear-image">
            <img src={`https://render-us.worldofwarcraft.com/icons/56/${item.icon}.jpg`} alt=""/>
          </div>
          <div className="gear-content">

          </div>
        </li>
      </OverlayTrigger>
    );
  }

  _getItemQuality(quality){
    let qualityName;
    switch (quality) {
      case 0:
        // Poor
        qualityName = "poor"
        break;
      case 1:
        // Common
        qualityName = "common"
        break;
      case 2:
        // Uncommon
        qualityName = "uncommon"
        break;
      case 3:
        // Rare
        qualityName = "rare"
        break;
      case 4:
        // Epic
        qualityName = "epic"
        break;
      case 5:
        // Legendary
        qualityName = "legendary"
        break;
      case 6:
        // Artifact
        qualityName = "artifact"
        break;
      case 7:
        // Heirloom
        qualityName = "heirloom"
        break;
      default:
        // default
        qualityName = "common"
        break;
    }
    return qualityName
  }
}
