import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom';
import {unregister} from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './styles/main.css';

import SiteHeader from './views/includes/SiteHeader';
// import PrivateLayout from './views/PrivateLayout';
import PublicLayout from "./views/PublicLayout";

import Character from "./views/public/Character";
import Home from "./views/public/Home";

import {appVersion, gaCode, auth, storageKey, db} from './client';

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
                    <SiteHeader version={this.state.version} authed={false} changeRegion={this._changeRegion} region={this.state.region}/>
                    <SwitchTracker>
                        <PublicRoute exact path="/" component={Home} region={this.state.region}/>
                        <PublicRoute path="/:region/:realm/character/:name" component={Character}/>
                        {/*<NotAuthedRoute path="/login" component={Login}/>*/}
                        {/*<NotAuthedRoute path="/register" component={Register}/>*/}
                        {/*<AuthedRoute path="/account/:id" user={this.state.user} account={this.state.accountData}/>*/}
                        <Redirect to="/"/>
                    </SwitchTracker>
                </div>
            </Router>
        );
    }
}

class SwitchTracker extends Switch {
    componentDidMount() {
        ReactGA.set({page: window.location.pathname + window.location.search});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    componentWillReceiveProps() {
        ReactGA.set({page: window.location.pathname + window.location.search});
        ReactGA.pageview(window.location.pathname + window.location.search);
    }
}

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <PublicLayout {...props}>
            <Component {...props} {...rest}/>
        </PublicLayout>
    )}/>
);

// const NotAuthedRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         !isAuthenticated() ? (
//             <PublicLayout {...props}>
//                 <Component {...props}/>
//             </PublicLayout>
//         ) : (
//             <Redirect to={{
//                 pathname: '/account/overview',
//                 state: { from: props.location }
//             }}/>
//         )
//     )}/>
// );
//
//
// const AuthedRoute = ({ component: Component, user, account, ...rest }) => (
//     <Route {...rest} render={props => (
//         isAuthenticated() ? (
//             <PrivateLayout {...props} user={user} account={account}>
//                 <Component {...props} user={user} account={account}/>
//             </PrivateLayout>
//         ) : (
//             <Redirect to={{
//                 pathname: '/login',
//                 state: { from: props.location }
//             }}/>
//         )
//     )}/>
// );


ReactDOM.render(
    <App/>, document.getElementById('root'));
unregister();
