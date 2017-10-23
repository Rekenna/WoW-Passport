import React from 'react';

import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css';

import HomePage from './views/HomePage';
import ProfilePage from './views/ProfilePage';
import SearchResults from './views/SearchResults';
import SiteHeader from './components/Layout/SiteHeader';
import SiteFooter from './components/Layout/SiteFooter';
import Bookmarks from './components/Bookmarks/Bookmarks';

// Analytics
import {gaCode} from './config/constants';
var ReactGA = require('react-ga');
ReactGA.initialize(gaCode);

export default class App extends React.Component {

  render() {
    return (
      <Router history={this.props.history}>
        <div id="App">
          <SiteHeader/>
          <SwitchTracker>
            <Route exact path="/" component={HomePage}/>
            <Route path="/search" component={SearchResults}/>
            <Route path="/:region/:realm/character/:character" component={ProfilePage}/>
            <Redirect to="/"/>
          </SwitchTracker>
          <Bookmarks/>
          <SiteFooter/>
        </div>
      </Router>
    );
  }
}

class SwitchTracker extends Switch {
  componentDidMount(){
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  componentWillReceiveProps(){
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
}
