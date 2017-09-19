import React, { Component } from 'react';

import BookmarkList from '../Bookmarks/BookmarkList';
import FeedbackForm from '../Feedback/FeedbackForm';

export default class QuickLinks extends Component{
  render(){
    return(
      <div className="quick-links">
        <ul className="quick-links-menu">
          <BookmarkList/>
          <FeedbackForm/>
          <li className="donate quick-link">
            <a className="menu-icon" rel="noopener noreferrer" href="https://www.paypal.me/ryanpmckenna" target="_blank"><i className="fa fa-paypal"></i></a>
          </li>
        </ul>
      </div>
    )
  }
}
