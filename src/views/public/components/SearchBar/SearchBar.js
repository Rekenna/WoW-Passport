import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faSearch, faSort} from "@fortawesome/fontawesome-pro-light/index.es";
import ResultsList from './ResultsList';

class SearchBar extends Component{
    constructor(){
        super();

        this.state = {
            name: '',
            realm: ''
        }

        this.nameChange = this.nameChange.bind(this)
        this.realmChange = this.realmChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.clearQuery = this.clearQuery.bind(this)
    }
    handleSubmit(e){
        e.preventDefault();
        let url = (`/${this.props.region}/${this.state.realm}/character/${this.state.name}`).toLowerCase();
        this.setState({
            name: ''
        })
        this.props.history.push(url);
    }
    nameChange(e){
        e.preventDefault();
        let name = e.target.value
        this.setState({
            name: name
        })
    }
    realmChange(e){
        e.preventDefault();
        let realm = e.target.value
        this.setState({
            realm: realm
        })
    }
    clearQuery(){
        this.setState({
            name: ''
        })
    }
    render(){
        let searchResults = <ResultsList clearQuery={this.clearQuery} name={this.state.name.toLowerCase()} region={this.props.region}/>
        let availableRealms = this.props.realms.map((realm, i) =>{
            if(realm.slug === this.state.realm){
                return (<option key={realm.slug} value={realm.slug}>{realm.name}</option>);
            }
            else{
                return (<option key={realm.slug} value={realm.slug}>{realm.name}</option>);
            }
        });
        return(
            <div className={`search-wrapper`}>
                <form onSubmit={this.handleSubmit.bind(this)} className={`search-form form-inline`}>
                    <input autoComplete={`off`} name={`name`} value={this.state.name} onChange={this.nameChange} ref={c => this.name = c} maxLength="24" placeholder={`Player Name`} type="search" className={`form-control`}/>
                    <div className={`realm-select`}>
                        <select ref={c => this.realm = c} value={this.state.realm} onChange={this.realmChange}>
                            {availableRealms}
                        </select>
                        <FontAwesomeIcon icon={faSort} />
                    </div>
                    <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faSearch} /></button>
                </form>
                {searchResults}
            </div>
        );
    }
}

SearchBar.defaultProps = {
    region: 'eu',
    realms: []
}

export default withRouter(SearchBar)