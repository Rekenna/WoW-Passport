import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import {unregister} from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

import SiteHeader from './views/includes/SiteHeader';
import PrivateLayout from './views/PrivateLayout';
import PublicLayout from "./views/PublicLayout";
import Character from "./views/public/Character";
import Home from "./views/public/Home";
import Search from "./views/public/Search";
import Login from "./views/public/Login";
import Register from "./views/public/Register";
import Account from "./views/private/Account";
import {appVersion, gaCode, auth, storageKey, db, isAuthenticated} from './client';

var ReactGA = require('react-ga');
ReactGA.initialize(gaCode);

class App extends Component {
    constructor(){
        super();

        this.state = {
            version: appVersion,
            needsReload: false,
            user: null,
            region: 'eu'
        }

        this._changeRegion = this._changeRegion.bind(this)
    }

    _detectLanguage(locale){
        switch (locale){
            case 'en-US':
                return this._changeRegion('us');
            case 'ko_KR':
                return this._changeRegion('kr');
            case 'zh_TW':
                return this._changeRegion('tw');
            default:
                return this._changeRegion('eu');
        }
    }

    _changeRegion(region){
        this.setState({region:region})
    }

    componentDidMount(){

        const self = this;

        this.checkAppVersion()
        this._detectLanguage(navigator.language);

        auth.onAuthStateChanged((user) => {
            if (user) {
                window.localStorage.setItem(storageKey, user.uid);
                self.setState({user: user, uid: user.uid})
            }else {
                window.localStorage.removeItem(storageKey);
                this.setState({user: null, uid: null});
            }
        });

    }

    checkAppVersion(){
        const self = this;
        db.collection('info').doc('system').get().then(function(doc) {
            self.setState({
                needsUpdate: doc.data().version !== self.state.version
            })
        });
    }

    render() {
        return (
            <Router history={this.props.history}>
                <div id="App">
                    <SiteHeader version={this.state.version} user={this.state.user} changeRegion={this._changeRegion} region={this.state.region}/>
                    <SwitchTracker>
                        <PublicRoute exact path="/" component={Home} region={this.state.region}/>
                        <PublicRoute path="/search" component={Search} region={this.state.region}/>
                        <PublicRoute path="/:region/:realm/character/:name" component={Character}/>
                        <NotAuthedRoute path="/login" component={Login}/>
                        <NotAuthedRoute path="/register" component={Register}/>
                        <AuthedRoute path="/account" user={this.state.user} component={Account}/>
                        <Redirect to="/"/>
                    </SwitchTracker>
                </div>
            </Router>
        );
    }
}

class SwitchTracker extends Switch {
    componentDidMount() {
        window.scrollTo(0, 0)
        ReactGA.set({page: window.location.pathname + window.location.search});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    componentWillReceiveProps() {
        ReactGA.set({page: window.location.pathname + window.location.search});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }
}

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <PublicLayout {...props}>
            <Component {...props} {...rest}/>
        </PublicLayout>
    )}/>
);

const NotAuthedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !isAuthenticated() ? (
            <PublicLayout {...props}>
                <Component {...props}/>
            </PublicLayout>
        ) : (
            <Redirect to={{
                pathname: '/account',
                state: { from: props.location }
            }}/>
        )
    )}/>
);


const AuthedRoute = ({ component: Component, user, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <PrivateLayout {...props} user={user}>
                <Component {...props} user={user}/>
            </PrivateLayout>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);


ReactDOM.render(
    <App/>, document.getElementById('root'));
unregister();
