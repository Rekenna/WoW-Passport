import React, { Component } from 'react';

import {Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class ProfileGear extends Component {
  render(){

    const items = this.props.items;
    const itemsKeys = Object.keys(items)

    let artifactWeapon;

    if(items.offHand){
      if (items.offHand.artifactTraits.length > items.mainHand.artifactTraits.length) {
        artifactWeapon = items.offHand;
      }
      else{
        artifactWeapon = items.mainHand;
      }
    }
    else{
      artifactWeapon = items.mainHand;
    }

    let equippedGear = [];
    equippedGear = itemsKeys.map((key, i) => {
      if(key !== 'averageItemLevel' && key !== 'averageItemLevelEquipped'){
        return({slot: key, data: items[key]})
      }
      else{
        return undefined
      }
    });
    equippedGear = equippedGear.filter(item => item !== undefined)

    return(
      <div className="profile-gear">
        <GearList gear={equippedGear} artifact={artifactWeapon}/>
      </div>
    );
  }
}

class GearList extends Component{

  render(){

    const gear = this.props.gear

    let leftList = this._filterGearSlots(gear, ['head', 'neck', 'shoulder', 'back', 'chest', 'shirt', 'tabard', 'wrist'], 'left', this._compileGearPiece.bind(this), this._getItemQuality.bind(this))
    let rightList = this._filterGearSlots(gear, ['hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2'], 'right', this._compileGearPiece.bind(this), this._getItemQuality.bind(this))
    let centerList = this._filterGearSlots(gear, ['mainHand', 'offHand'], 'center', this._compileGearPiece.bind(this), this._getItemQuality.bind(this))

    let artifactLevel = this._sumArtifactRanks(this.props.artifact)


    return(
      <div className="gear-grid">
        {leftList}
        {centerList}
        {rightList}
        <div className="artifact-power">
          <p>Artifact Level {artifactLevel}</p>
        </div>
      </div>
    );
  }

  _sumArtifactRanks(artifactWeapon){
    let ranksArray = artifactWeapon.artifactTraits.map((trait, index) =>{
      return trait.rank
    })

    let ranksTotal = ranksArray.reduce(function(sum, value) {
      return sum + value;
    }, 0)
    // Subtract 3 for ranks given by slotted relics.
    return ranksTotal - 3;
  }

  _filterGearSlots(gearPieces, locations, position, compileGearPiece, getItemQuality){
    let tooltipPosition;
    if(position === 'center'){
      tooltipPosition = 'top'
    }
    else if (position === 'left') {
      tooltipPosition = 'right'
    }
    else{
      tooltipPosition = 'left'
    }

    let gearList = gearPieces.map((piece, i) => {
      if(locations.includes(piece.slot)){
        return piece.data
      }
      else{
        return false
      }
    }).filter(piece => piece)

    let listedSlots = gearList.map((piece, i) => {
      return(
        compileGearPiece(piece, tooltipPosition, getItemQuality(piece.quality))
      )
    });

    return(
      <ul className={`gear-list ${position}`}>
        {listedSlots}
      </ul>
    )
  }

  _compileGearPiece(item, tooltipPosition, quality){

    let tooltip = (
      <Tooltip id={`${item.id}-tooltip`} className={`tooltip ${tooltipPosition} ${quality}`}>
        <h5>{item.name}</h5>
      </Tooltip>
    );

    return (
      <OverlayTrigger key={item.id} placement={tooltipPosition} overlay={tooltip}>
        <li key={item.id} className={`gear-piece ${this._getItemQuality(item.quality)} tooltip-${tooltipPosition}`}>
          <img src={`https://render-us.worldofwarcraft.com/icons/56/${item.icon}.jpg`} alt={item.name}/>
          <span className="itemLevel">{item.itemLevel}</span>
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
