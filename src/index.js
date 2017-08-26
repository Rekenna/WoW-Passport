import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './config/registerServiceWorker';

import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import HomePage from './views/HomePage';
import AboutPage from './views/AboutPage';
import ProfilePage from './views/ProfilePage';
import SearchResults from './views/SearchResults';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div id="App">
          <SiteHeader/>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/about" component={AboutPage}/>
            <Route path="/search" component={SearchResults}/>
            <Route path="/:region/:realm/character/:character" component={ProfilePage}/>
            <Redirect to="/"/>
          </Switch>
          <SiteFooter/>
        </div>
      </Router>
    );
  }
}

ReactDOM.render(
  <App/>, document.getElementById('root'));
registerServiceWorker();
