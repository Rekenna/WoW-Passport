import React, { Component } from 'react';

import BookmarkList from '../Bookmarks/BookmarkList';
import FeedbackForm from '../Feedback/FeedbackForm';

import PatreonLogo from '../../../images/patreon.svg'

export default class QuickLinks extends Component{
  render(){
    return(
      <div className="quick-links">
        <ul className="quick-links-menu">
          <BookmarkList/>
          <FeedbackForm/>
          <li className="donate quick-link">
            <a className="menu-icon" rel="noopener noreferrer" href="https://www.patreon.com/rekenna" target="_blank">
              <img className="patreon-logo" src={PatreonLogo} alt="Patreon Logo" />
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
