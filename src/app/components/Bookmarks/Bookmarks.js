import React, {Component} from 'react';
import {withRouter} from 'react-router';

import cookie from 'react-cookies'

class Bookmarks extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
      bookmarked: false,
      bookmarks: [],
      acceptedCookies: true
    }

    this._createBookmark = this._createBookmark.bind(this)
    this._isBookmarked = this._isBookmarked.bind(this)
  }

  _createBookmark() {
    let url = window.location.href
    let params = this.props.location.pathname.split('/')

    let bookmark = {
      url: url,
      key: this.props.location.key,
      character: params[4],
      server: params[2]
    }

    let isBookmarked

    this.state.bookmarks.map((bookmark, i) => {
      if (bookmark.url === url) {
        return isBookmarked = true
      } else {
        return isBookmarked = false
      }
    })

    if (params.length > 4 && !isBookmarked) {
      this.setState({
        bookmarks: this.state.bookmarks.concat([bookmark]),
        bookmarked: true
      })
    } else if (isBookmarked) {
      this._deleteBookmark(url)
      this.setState({bookmarked: false})
    }
  }

  _handleDelete(e) {
    e.preventDefault();
    this._deleteBookmark(this.props.url)
  }

  _deleteBookmark(url) {
    const bookmarks = this.state.bookmarks.filter(bookmark => bookmark.url !== url);

    this.setState({bookmarks: bookmarks})
    this._isBookmarked()
  }

  componentWillReceiveProps(nextProps) {
    this._isBookmarked()
  }

  componentWillUpdate(nextProps, nextState) {
    cookie.save('bookmarks', nextState.bookmarks, {path: '/'})
  }

  componentDidMount() {
    if (cookie.load('bookmarks') !== "undefined" && cookie.load('bookmarks') !== undefined) {
      this.setState({bookmarks: cookie.load('bookmarks')})
    }
  }

  _isBookmarked() {
    let isBookmarked = this.state.bookmarks.map((bookmark, index) => {
      if (bookmark.url === window.location.url) {
        return isBookmarked = true
      } else {
        return isBookmarked = false
      }
    })

    this.setState({bookmarked: isBookmarked})
  }

  _openPanel() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {

    let bookmarkList;

    if (this.state.bookmarks.length >= 1) {
      bookmarkList = this.state.bookmarks.map((bookmark, i) => {
        const {url, key, character, server} = bookmark
        return (<Bookmark url={url} character={character} server={server} key={key} onDelete={this._deleteBookmark.bind(this)}/>)
      })
    } else {
      bookmarkList = <p className="acknowledgement">By using our bookmarking feature you acknowledge our use of cookies to make the magic happen.</p>
    }

    return (
      <div className="bookmarks-container">
        <div className={`bookmark-button ${this.state.bookmarked}`} onClick={this._createBookmark.bind(this)} onMouseEnter={this._openPanel.bind(this)}>
          <i className="fa fa-bookmark"></i>
        </div>
        <div className={`bookmark-list ${this.state.open}`} onMouseLeave={this._openPanel.bind(this)}>
          {bookmarkList}
        </div>
      </div>
    )
  }
}

export default withRouter(Bookmarks);

class Bookmark extends React.Component {
  render() {

    const {url, character, server} = this.props

    return (
      <li key={`bookmark ${url}`} className="bookmark">
        <div className="bookmark-info">
          <h5>
            <a href={url}>{character.charAt(0).toUpperCase() + character.slice(1)}</a>
          </h5>
          <p>{(server.charAt(0).toUpperCase() + server.slice(1)).replace('-', ' ')}</p>
          <i className="fa fa-close delete" onClick={this._handleDelete.bind(this)}></i>
        </div>
      </li>
    );
  }

  _handleDelete(event) {
    event.preventDefault();
    this.props.onDelete(this.props.url)
  }

}
