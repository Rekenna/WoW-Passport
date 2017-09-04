import React, { Component } from 'react';

import jQuery from 'jquery';

import {slack} from '../../config/constants';

const $ = jQuery;

export default class FeedbackForm extends Component {
  constructor(){
    super()

    this.state = {
      formOpen: false
    }
  }

  _handleSubmit(e){
    e.preventDefault()

    this._sendSlackMessage(this._name.value, this._email.value, this._message.value)
  }

  _openForm(e){
      this.setState({
        formOpen : !this.state.formOpen
      })
  }

  _sendSlackMessage(name, email, message){
    let url = `https://hooks.slack.com/services/${slack}`
    let text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    $.ajax({
        data: 'payload=' + JSON.stringify({
            "text": text
        }),
        dataType: 'json',
        processData: false,
        type: 'POST',
        url: url
    });
    return
  }
  render(){

    let form;
    if(this.state.formOpen){
      form = (
        <form className="feedback-form" onSubmit={this._handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Name</label>
            <input ref={c => this._name = c} type="text" className="form-control" placeholder="Johnny Awesome"/>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input ref={c => this._email = c} type="email" className="form-control" placeholder="johnny@awesome.com"/>
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea ref={c => this._message = c} className="form-control" placeholder="Here's my awesome message. What were you expecting?"></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="submit-btn">Send Message</button>
          </div>
        </form>
      );
    }

    return(
      <div className="feedback-form-container">
        <div className="feedback-button" onClick={this._openForm.bind(this)}>
          <i className="fa fa-comment"></i>
        </div>
        {form}
      </div>
    );
  }
}
