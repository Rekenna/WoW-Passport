import React, {Component} from 'react';

import RealmList from '../components/Layout/RealmList';

export default class HomePage extends Component{

  componentWillMount(){
    document.title = "WoW Passport - Player Lookup and Analysis";
  }

  render(){
    return(
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
              <RealmList/>
            </div>
            <div className="col-md-6">
              <article>
                <h3>Welcome to WoW Passport v1.1.0</h3>
                <p>I'm still working on this application every day, so expect bugs! You are welcome to follow my updates on the <a href="https://github.com/Rekenna/WoW-Passport" rel="noopener noreferrer" target="_blank">github repository</a> and if you have any suggestions feel free to leave a comment on the repository.</p>
                <p>If you see any bugs or have a suggestion you can send me a message from the quick links on the side of the page. It goes directly to a slack channel I've setup to handle messages, and I'll definitely read what you have to say.</p>
                <p>I work on this project in my free time, so I've included a paypal button in the quick links in case anyone is feeling particularly generous and want to support this project.</p>
                <p>I have a lot planned for this project and will be keeping it up to date as patches are released.</p>
                <p className="center"><strong>Thanks for trying WoW Passport!</strong></p>
              </article>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
