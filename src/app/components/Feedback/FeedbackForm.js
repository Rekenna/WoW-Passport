import React, { Component } from 'react';

import jQuery from 'jquery';

import {slack} from '../../config/constants';

const $ = jQuery;

export default class FeedbackForm extends Component {
  constructor(){
    super()

    this.state = {
      progress: "closed"
    }

    this._sendSlackMessage = this._sendSlackMessage.bind(this)
  }

  _handleSubmit(e){
    e.preventDefault()

    this._sendSlackMessage(this._name.value, this._email.value, this._message.value)
  }

  _openForm(e){
      const progress = this.state.progress
      if(progress === "done"){
        return
      }
      else if(progress === "open"){
        this.setState({
          progress : 'closed'
        })
      }
      else{
        this.setState({
          progress : 'open'
        })
      }
      return
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
    this.setState({
      progress: "done"
    })
    return
  }
  render(){

    let icon;
    let form;
    const progress = this.state.progress

    switch (progress) {
      case "done" :
        icon = (<i className="fa fa-thumbs-up"></i>);
        break;
      case "open" :
        icon = (<i className="fa fa-close"></i>);
        form = (
          <div className="feedback-form-content">
            <div className="panel-heading">
              <h3 className="panel-title">Provide Feedback</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this._handleSubmit.bind(this)}>
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
                  <button type="submit" className="submit-btn">Send Message <i className="fa fa-send"></i></button>
                </div>
              </form>
            </div>
          </div>
        );
        break;
      default:
        icon = (<i className="fa fa-comment"></i>);
    }

    return(
      <div className="feedback-form-container">
        <div className="feedback-button" onClick={this._openForm.bind(this)}>
          {icon}
        </div>
        <div className={`feedback-form panel panel-default ${this.state.progress}`}>
          {form}
        </div>
      </div>
    );
  }
}
