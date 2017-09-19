import React from 'react';

export default class Player extends React.Component {
  render(){

    const {url, character, server} = this.props


      return (
        <li key={`bookmark ${url}`}>
          <div className="bookmark-info">
            <h5><a href={url}>{character.charAt(0).toUpperCase() + character.slice(1)}</a></h5>
            <p>{(server.charAt(0).toUpperCase() + server.slice(1)).replace('-', ' ')}</p>
            <i className="fa fa-close delete" onClick={this._handleDelete.bind(this)}></i>
          </div>
        </li>
      );
  }

  _handleDelete(event){
    event.preventDefault();
    this.props.onDelete(this.props.url)
  }

}
