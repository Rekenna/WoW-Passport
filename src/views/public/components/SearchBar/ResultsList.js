import React, {Component} from 'react'
import Result from "./Result";
import {db} from "../../../../client";

export default class ResultsList extends Component {
    constructor() {
        super();

        this.state = {
            results: []
        }

        this._getResults = this._getResults.bind(this)
        this._fetchResults = this._fetchResults.bind(this)
    }

    _fetchResults(name, region) {
        const self = this;
        let searchableRef = db.collection(`searchable`)
        searchableRef.where("region", "==", region).where("length", ">=", name.length).get()
            .then(function (querySnapshot) {
                let results = [];
                querySnapshot.forEach(function (doc) {
                    if(doc.data().name.toLowerCase().startsWith(name.toLowerCase())){
                        results = results.concat([doc.data()]);
                    }
                    return;
                });
                self.setState({
                    results: results
                })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    _getResults() {
        if (this.state.results.length > 0) {
            return this.state.results.map((result) => {
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
        this._fetchResults(nextProps.name, nextProps.region);
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
    region: 'eu'
}