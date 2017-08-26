import React, { Component } from 'react';

export default class AboutPage extends Component{
  render(){
    return(
      <div className="about-page">
        <div className="home-banner">
          <div className="splash-content">
            <h1>About WoW Passport</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <article>
                <h3>Welcome to WoW Passport v1.0</h3>
                <p>Ever wondered how some graphic designers always manage to produce beautiful looking designs for their brochures, website designs, logo designs? Talent…yes, it helps but there are a handful of more important things you can do that will have even complete beginners producing award winning design.</p>
                <p>Forget everything you’ve ever been told about Graphic Design.</p>
                <p>There are some hard and fast things that graphic designers will insist are to be obeyed. Only use limited fonts on a design for example or never use green on a magazine or book cover as people will not buy it. Stuff and nonsense.</p>
              </article>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
