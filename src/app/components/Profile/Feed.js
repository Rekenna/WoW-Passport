import React, { Component } from 'react';

var moment = require('moment');

export default class Feed extends Component {

  render(){

    const character = this.props.character;

    let feed;

    feed = character.feed.map((feedItem, index) => {
      if (index < 30) {
        return renderFeed(feedItem)
      } else {
        return ''
      }
    })

    return(
      <div className="character-feed">
        <h4 className="title">Recent Achievements</h4>
        <ul className="feed-list">
          {feed}
        </ul>
      </div>
    );
  }
}


function renderFeed(feed){

  const timeMod = moment(feed.timestamp).format("MMM Do YYYY, h:mm A")

  let feedRender
  let icon

  switch (feed.type) {
    case 'ACHIEVEMENT':
      icon = 'trophy'
      feedRender = (
        <div className="feed-content">
          <h5>{feed.achievement.title}</h5>
          <span className="timestamp">{timeMod}</span>
        </div>
      );
      break;
    default:
    return
  }

  return (<li key={`${feed.timestamp}-${feed.type}`}><div className="feed-icon"><i className={`fa fa-${icon}`}></i></div>{feedRender}</li>)
}
