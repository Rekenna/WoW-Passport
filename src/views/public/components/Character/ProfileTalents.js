import React, { Component } from 'react';

import {Tooltip} from 'reactstrap';

export default class ProfileTalents extends Component {
  render(){

    const talents = this.props.talents.sort( (a,b) =>{
      return a.tier - b.tier
    })

    let talentList;

    talentList = talents.map((talent, i) =>{
      return(<TalentIcon talent={talent} index={i} key={talent.spell.id} />);
    });

    return(
      <ul className="talent-list">
        {talentList}
      </ul>
    );
  }
}

class TalentIcon extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    render() {
      const talent = this.props.talent;
        return (
            <li className={`talent`}>
              <img id={`talent-${talent.spell.id}`} src={`https://render-us.worldofwarcraft.com/icons/56/${talent.spell.icon}.jpg`} alt={`talent ${talent.spell.name} thumbnail`}/>
                <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} autohide={false} target={`talent-${talent.spell.id}`} toggle={this.toggle}>
                    <strong>{talent.spell.name}: </strong>{talent.spell.description}
                </Tooltip>
            </li>
        );
    }
}