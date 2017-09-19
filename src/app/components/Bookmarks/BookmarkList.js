import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Bookmark from './Bookmark';

import cookie from 'react-cookies'

class BookmarkList extends Component{
  constructor(){
    super()

    this.state = {
      open: false,
      bookmarks: [],
      acceptedCookies: false
    }

    this._createBookmark = this._createBookmark.bind(this)
    this._acceptCookies = this._acceptCookies.bind(this)
  }

  _openPanel(){
    this.setState({
      open: !this.state.open
    })
  }

  _createBookmark(){
    let url = window.location.href
    let params = this.props.location.pathname.split('/')

    let bookmark = {
      url: url,
      character: params[4],
      server: params[2]
    }

    this._deleteBookmark(url)

    if(params.length > 4){
      this.setState({
        bookmarks: this.state.bookmarks.concat([bookmark])
      })
    }
  }

  _handleDelete(e){
    e.preventDefault();
    this._deleteBookmark(this.props.url)
  }

  _deleteBookmark(url){
    const bookmarks = this.state.bookmarks.filter(
      bookmark => bookmark.url !== url
    );

    this.setState({bookmarks: bookmarks})
  }

  componentDidMount(){
    this.setState({
      acceptedCookies: cookie.load('acceptedCookies')
    })
    if(cookie.load('bookmarks') !== "undefined" && cookie.load('bookmarks') !== undefined){
      this.setState({
        bookmarks: cookie.load('bookmarks')
      })
    }

  }

  _acceptCookies(){
    cookie.save('acceptedCookies', true, {path: '/'})
    this.setState({
      acceptedCookies: true
    })
  }

  componentWillUpdate(nextProps, nextState){
    cookie.save('bookmarks', nextState.bookmarks, {path: '/'})
  }

  render(){

    let bookmarksPanel;
    let bookmarkList;

    let cookieWarning;

    if(!this.state.acceptedCookies){
      cookieWarning = (
        <div className="cookie-warning">
          <p>Our bookmarking feature uses cookies.</p>
          <button onClick={this._acceptCookies}>I'm Cool With That <i className="fa fa-thumbs-up"></i></button>
        </div>
      )
    }

    if(this.state.bookmarks.length >= 1){
      bookmarkList = this.state.bookmarks.map((bookmark, i) =>{

        const {url, character, server} = bookmark

        return (
          <Bookmark url={url} character={character} server={server} key={guid()} onDelete={this._deleteBookmark.bind(this)} />
          )
      })
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
                <li className="center">
                  <p onClick={this._createBookmark.bind(this)} className="bookmark-current"><i className="fa fa-plus"></i> Bookmark Current Character</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return(
      <li className="bookmarks quick-link">
        <div className={`menu-icon`} onClick={this._openPanel.bind(this)}>
          <i className="fa fa-bookmark"></i>
        </div>
        {cookieWarning}
        {bookmarksPanel}
      </li>
    )
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default withRouter(BookmarkList);
