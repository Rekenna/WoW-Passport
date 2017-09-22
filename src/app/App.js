import React from 'react';

import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/index.css';

import HomePage from './views/HomePage';
import ProfilePage from './views/ProfilePage';
import SearchResults from './views/SearchResults';
import SiteHeader from './components/Layout/SiteHeader';
import SiteFooter from './components/Layout/SiteFooter';
import QuickLinks from './components/Layout/QuickLinks';

import {ga} from './config/constants';

var ReactGA = require('react-ga');
ReactGA.initialize(ga);

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export default class App extends React.Component {
  render() {
    return (
      <Router onUpdate={logPageView} history={this.props.history}>
        <div id="App">
          <SiteHeader/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/search" component={SearchResults}/>
            <Route path="/:region/:realm/character/:character" component={ProfilePage}/>
            <Redirect to="/"/>
          </Switch>
          <QuickLinks/>
          <SiteFooter/>
        </div>
      </Router>
    );
  }
}
