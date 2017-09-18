import React, { Component } from 'react';

export default class Bookmarks extends Component{
  constructor(){
    super()

    this.state = {
      open: true,
      bookmarks: []
    }

  }

  _openPanel(){
    this.setState({
      open: !this.state.open
    })
  }

  _fetchBookmarks(){

  }

  componentDidMount(){

  }

  render(){

    let bookmarksPanel;
    let bookmarkList;

    if(this.state.bookmarks.length >= 1){
      bookmarkList = this.state.bookmarks.map((bookmark, i) =>{
        return (
          <li key={`bookmark ${i}`}>
            <div className="bookmark-info">
              <h5>{bookmark.character.name}</h5>
            </div>
          </li>);
      });
    }
    else{
      bookmarkList = (
        <li className="center">
          <p className="no-bookmarks">No Bookmarks Found</p>
        </li>
      )
    }

    if(this.state.open){
      bookmarksPanel = (
        <div className={`bookmarks-panel panel panel-default ${this.state.progress}`}>
          <div className="bookmarks-panel-content">
            <div className="panel-heading">
              <h3 className="panel-title">Bookmarks</h3>
            </div>
            <div className="panel-body">
              <ul className="bookmark-list">
                {bookmarkList}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return(
      <li className="bookmarks quick-link">
        <div className="menu-icon" onClick={this._openPanel.bind(this)}>
          <i className="fa fa-bookmark"></i>
        </div>
        {bookmarksPanel}
      </li>
    )
  }
}
