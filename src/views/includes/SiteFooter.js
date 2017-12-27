import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faEnvelope, faHeart} from "@fortawesome/fontawesome-pro-light/index.es";

import PatreonLogo from '../../assets/patreon.svg'

export default class SiteFooter extends Component {
    render() {
        return (
            <div className="site-footer">
                <div className="container information">
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            <div id="mc_embed_signup">
                                <form action="https://wowpassport.us16.list-manage.com/subscribe/post?u=90382259fa096f3247de5fd52&amp;id=e21284ded5" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank">
                                    <div className="form-group">
                                        <label>Interested in Updates?</label>
                                        <p>I'll never send you garbage, pinky promise.</p>
                                        <input type="email" name="EMAIL" className="email form-control" id="mce-EMAIL" placeholder="Email Address"/>
                                    </div>
                                    <div style={{"display": "none"}}>
                                        <input type="text" name="b_90382259fa096f3247de5fd52_e21284ded5" value=""/>
                                    </div>
                                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="btn btn-default"/>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-8 copyright">
                            <p>World of Warcraft is a registered trademark of Blizzard Entertainment, Inc.</p>
                            <p>&copy; Copyright 2017</p>
                        </div>
                    </div>
                </div>
                <div className="meta">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <p className="text-left">Made with <FontAwesomeIcon icon={faHeart}/> by <a href="https://www.ryanmckenna.io" rel="noopener noreferrer" target="_blank">Ryan P McKenna</a>.</p>
                            </div>
                            <div className="col-md-6">
                                <div className="actions">
                                    <a className="mail" href="mailto:ryanpatmckenna@gmail.com">
                                        <FontAwesomeIcon icon={faEnvelope}/>Send Feedback</a>
                                    <a className="patreon" href="https://www.patreon.com/rekenna" rel="noopener noreferrer" target="_blank"><img className="patreon-logo" src={PatreonLogo} alt="Patreon Logo"/>Support Development</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
