import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faGlobe, faSort } from '@fortawesome/fontawesome-pro-light'
import {faDiscord} from "@fortawesome/fontawesome-free-brands/index";

import {auth} from '../../client';
import {realms} from "../../config/realms";
import Logo from '../../assets/logo.png';

import SearchBar from '../public/components/SearchBar/SearchBar';

class SiteHeader extends Component {
    constructor(){
        super();

        this.state = {
            query: '',
            realms: realms.eu
        }

    }
    _signOut() {
        auth.signOut();
    }

    _onChangeRegion(e){
        e.preventDefault()
        this.props.changeRegion(e.target.value)
    }

    componentWillReceiveProps(nextProps){
        switch (nextProps.region){
            case 'us':
                return this.setState({realms:realms.us})
            case 'kr':
                return this.setState({realms:realms.kr})
            case 'tw':
                return this.setState({realms:realms.tw})
            default:
                return this.setState({realms:realms.eu})
        }
    }

    render() {

        // let accountMenu;
        //
        // if(this.props.user){
        //     accountMenu = (
        //         <ul className={`menu account`}>
        //             <li><Link className={`btn index`} to={`/search`}>Advanced Search</Link></li>
        //             <li><button className={`btn logout`} onClick={this._signOut.bind(this)}>Logout</button></li>
        //         </ul>
        //     );
        // }else{
        //     accountMenu = (
        //         <ul className={`menu account`}>
        //             <li><Link className={`btn index`} to={`/search`}>Advanced Search</Link></li>
        //             <li><Link className={`btn login`} to={`/login`}>Log In</Link></li>
        //             <li><Link className={`btn register`} to={`/register`}>Create Account</Link></li>
        //         </ul>
        //     );
        // }

        return(
            <div className="site-header">
                <div className="site-meta">
                    <div className="container-fluid">
                        <div className="row flex-row">
                            <div className="col-3">
                                <div className={`actions`}>
                                    <div className={`region-info`}>
                                        <form action={`${this.props.region}/search`} className={`region-change`}>
                                            <FontAwesomeIcon icon={faGlobe} />
                                            <select ref={c => this.region = c} value={this.props.region} onChange={this._onChangeRegion.bind(this)}>
                                                <option value="us">US</option>
                                                <option value="eu">EU</option>
                                                <option value="kr">KR</option>
                                                <option value="tw">TW</option>
                                            </select>
                                            <FontAwesomeIcon icon={faSort} />
                                        </form>
                                    </div>
                                    <a className="discord" href="https://discord.gg/NNc3QcE">
                                        <FontAwesomeIcon icon={faDiscord}/>Discord</a>
                                </div>
                            </div>
                            <div className="col-9 d-none d-sm-block">
                              
                            </div>
                        </div>
                    </div>
                </div>
                <div className="site-nav">
                    <div className="container-fluid">
                        <div className="row flex-row">
                            <div className="col-12 col-sm-12 col-md-6">
                                <Link to="/"><img className={`brand`} src={Logo} alt="WOW Passport Logo"/></Link>
                                <span className="app-version">Alpha v{this.props.version}</span>
                            </div>
                            <div className="col-12 col-sm-12 col-md-6">
                                <SearchBar region={this.props.region} realms={this.state.realms}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SiteHeader);
