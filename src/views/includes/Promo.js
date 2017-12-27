import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faEnvelope} from "@fortawesome/fontawesome-pro-light/index.es";

import FeaturedImage from '../../assets/fanartbanner.png';

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
                        <p>I'm currently working on a feature to rotate a featured WoW artist in various places of the site, including the homepage banner! If you're interested in participating, or have any questions let me know by emailing me.</p>
                        <a className="mail" href="mailto:ryanpatmckenna@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope}/>Message Me</a>
                    </div>
                </div>
            </div>
        );
    }
}