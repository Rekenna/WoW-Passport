import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {faClipboard} from "@fortawesome/fontawesome-pro-light/index.es";
import {shortUrlApi} from '../../../../client';

let GoogleUrl = require('google-url')
let googleUrl = new GoogleUrl({key: shortUrlApi})

export default class CharacterURL extends Component {
  constructor() {
    super();
    this.state = {
      url: ''
    }
  }

  componentDidMount() {
    const self = this
    googleUrl.shorten(window.location.href, function(err, shortUrl) {
      self.setState({url: shortUrl})
    });
  }

  copyToClipboard() {
    var copyTextarea = document.querySelector('.js-copytextarea');
    copyTextarea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful
        ? 'successful'
        : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    return
  }

  render() {
    return (
      <div className="shortlink-container">
        <h5>Profile Quick Link</h5>
        <div className="input-group input-group-md">
          <input type="text" className="form-control js-copytextarea" value={this.state.url} aria-describedby="copy-shortlink" readOnly/>
          <span className="input-group-addon" id="copy-shortlink" onClick={this.copyToClipboard}>
            <FontAwesomeIcon icon={faClipboard}/>
          </span>
        </div>
      </div>
    );
  }
}
