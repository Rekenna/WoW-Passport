import React from 'react';

export default function Loading(props){
    return(
        <div className="profile-container loading">
            <div className="profile-banner">
                <div className="loading-wrapper">
                    <div className="loader">
                        Loading...
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <p className="loading-text"><i>Searching the archives...</i></p>
                    </div>
                </div>
            </div>
        </div>
    )
}