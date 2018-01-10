import React, {Component} from 'react'
import Result from "./Result";
import {db} from "../../../../client";

export default class ResultsList extends Component {
    constructor() {
        super();

        this.state = {
            searchable: []
        }

        this._getResults = this._getResults.bind(this);
        this._fetchSearchable = this._fetchSearchable.bind(this);
    }

    _fetchSearchable(region){
        const self = this;
        let searchableRef = db.collection(`searchable`);
        searchableRef.where("region", "==", region).get()
            .then(function (querySnapshot) {
                let searchable = [];
                querySnapshot.forEach(function (doc) {
                    searchable = searchable.concat([doc.data()]);
                    return;
                });
                self.setState({
                    searchable: searchable
                })
            })
            .catch(function (error) {
                console.log("Error getting searchable documents: ", error);
            });
    }

    _getResults() {
        const name = this.props.name;
        let filteredResults = this.state.searchable.filter(result => result.length >= name.length && result.name.toLowerCase().includes(name))
        if (filteredResults.length > 0) {
            return filteredResults.map((result) => {
                return Result(result)
            });
        } else {
            return (
                <div className={`loading-results`}>
                    <div className={`loading-bar`}></div>
                    <p className={`loading-message`}>If you aren't seeing a character you expect, it may not have been
                        indexed yet.</p>
                </div>
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.name.length < 1){
            this.setState({
                results: []
            })
        }
        if(nextProps.region !== this.props.region){
            this._fetchSearchable(nextProps.region)
        }
    }
    componentDidMount(){
        this._fetchSearchable(this.props.region)
    }

    render() {
        let searchResults = this._getResults();

        if(this.props.name.length < 2){
            return false;
        }

        return (
            <div className={`search-results`} onClick={this.props.clearQuery}>
                {searchResults}
            </div>
        )
    }
}

ResultsList.defaultProps = {
    name: '',
    region: 'us'
}