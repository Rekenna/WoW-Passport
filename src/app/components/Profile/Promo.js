import React, {Component} from 'react';

import FeaturedImage from '../../../images/splash.png';

export default class Promo extends Component {

  render() {
    return (
      <div className="featured-promotion">
        <div className="featured-artist">
          <div className="image">
            <img src={FeaturedImage} alt="featured-artist"/>
            <h4>Do you make WoW fanart?</h4>
          </div>
          <div className="content">
            <p>The banner image for this site was found by searching for WoW fanart submissions. I'm currently working on a feature to rotate a featured WoW artist in various places of the site, including that banner! If you're interested in participating, or have any questions let me know by emailing me.</p>
            <a className="mail" href="mailto:ryanpatmckenna@gmail.com">
              <i className="fa fa-envelope-o"></i>Message Me</a>
          </div>
        </div>
      </div>
    );
  }
}
