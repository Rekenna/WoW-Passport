import React, { Component } from 'react';

import Bookmarks from '../Bookmarks/Bookmarks';
import FeedbackForm from '../Feedback/FeedbackForm';

export default class QuickLinks extends Component{
  render(){
    return(
      <div className="quick-links">
        <ul className="quick-links-menu">
          <Bookmarks/>
          <FeedbackForm/>
        </ul>
      </div>
    )
  }
}
