import React, {Component} from 'react';

import FeaturedImage from '../../images/splash.png';

export default class HomePage extends Component {

  componentWillMount() {
    document.title = "WoW Passport - Player Lookup and Analysis";
  }

  render() {
    return (
      <div className="home-page">
        <div className="home-banner">
          <div className="splash-content">
            <h1>Search the Frontlines</h1>
            <h2>Quick Player Lookup &amp; Analysis</h2>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
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
            <div className="col-md-6">
              <article>
                <h3>WoW Passport
                  <strong className="cherry">Alpha v1.2.0</strong>
                </h3>
                <p>Patch Notes - Update October 22nd 2017</p>
                <h5>General Updates</h5>
                <ul>
                  <li>Player portfolio's have been redesigned.</li>
                  <li>Removed feedback and patreon links from the side menu.</li>
                  <li>Added quicklinks using Google Short-URLs for character profiles.</li>
                  <li>Added a battle.net status indicator to the header.</li>
                </ul>
                <h5>Player Portfolios</h5>
                <ul>
                  <li>Added a notable achievements section.</li>
                  <li>Added a PvP dedicated section.</li>
                  <li>Removed legacy progression.</li>
                </ul>
                <h5>Bug Fixes</h5>
                <ul>
                  <li>Warcraft Logs and Raider.io links should now be more reliable.</li>
                  <li>Fixed a visual bug that allowed bookmarking the same page twice.</li>
                  <li>Segment.io has been replaced with Google Analytics and has been properly integrated to track consecutive page views. Yay data!</li>
                </ul>
              </article>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
