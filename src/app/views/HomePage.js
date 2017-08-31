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
                <h3>Welcome to WoW Passport v1.0.0</h3>
                <p>I'm still working on this application every day, so expect bugs! You are welcome to follow my updates on the <a href="https://github.com/Rekenna/WoW-Passport" rel="noopener noreferrer" target="_blank">github repository</a> and if you have any suggestions feel free to leave a comment on the repository.</p>
              </article>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
