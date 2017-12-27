import React, {Component} from 'react';
import {withRouter} from 'react-router';

import {db, requestCharacterData} from "../../client";

import Profile from "./components/Character/Profile";
import Loading from './components/Character/Loading';

var moment = require('moment');

class ProfilePage extends Component {
    constructor() {
        super();

        this.state = {
            progress: 'loading',
            character: null,
            updating: false,
            realm: '',
            region: '',
            name: ''
        }

        this.getCharacterData = this.getCharacterData.bind(this)
        this.bindToArchive = this.bindToArchive.bind(this)
    }

    componentWillReceiveProps(nextProps){
        const {region, realm, name} = nextProps.match.params;
        // If the new props are different than the current state, rebind to the archive.
        if(name !== this.state.name || realm !== this.state.realm || region !== this.state.region){
            this.setState({
                name: name,
                realm: realm,
                region: region,
                progress: 'loading',
                updating: false,
                character: null
            });
            this.bindToArchive(region, realm, name)
        }
    }

    componentDidMount(){
        const {region, realm, name} = this.props.match.params;
        this.setState({
            region: region,
            realm: realm,
            name: name
        });
        this.bindToArchive(region, realm, name);
    }

    bindToArchive(region, realm, name){
        const self = this;

        this.getCharacterData(region, realm, name);

        db.collection("characters").doc(((`${region}_${realm}_${name}`).toLowerCase()))
            .onSnapshot(function (character) {
                if (character.exists) {
                    self.setState({
                        progress: 'done',
                        character: character.data()
                    })
                }
            });
    }

    getCharacterData(region, realm, name) {
        const self = this;

        let characterRef = db.collection("characters").doc((`${region}_${realm}_${name}`).toLowerCase());

        characterRef.get().then(function (character) {
            if (character.exists) {
                if (moment().diff(character.data().lastUpdated, 'hours') >= 2) {
                    self.setState({
                        updating: true,
                        character: character.data(),
                        progress: 'done'
                    })
                    requestCharacterData(region, realm, name);
                }
                else{
                    self.setState({
                        updating: false,
                        character: character.data(),
                        progress: 'done'
                    })
                }
            } else {
                requestCharacterData(region, realm, name);
            }
        }).catch(function (error) {
            console.log("Error getting character:", error);
        });
    }

    render() {

        let content;

        switch (this.state.progress) {
            case 'done':
                content = (<Profile character={this.state.character}/>);
                break;
            default:
                content = (<Loading/>);

        }

        return (
            <div className="character-profile-page">
                {content}
            </div>
        );
    }
}

ProfilePage.defaultProps = {
    region: 'eu'
}

export default withRouter(ProfilePage);