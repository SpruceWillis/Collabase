var React = require('react');
var NavBar = require('./navBar');

var SplashPage = React.createClass({

  handleStartClick: function(e){
    e.preventDefault();
    debugger;
    this.refs["nav"].refs["auth"].openSignInModal(e);
  },

  render: function() {
    return (
      <div>
        <img src="https://placekitten.com/1400/1200" className="bg"/>
        <NavBar ref="nav"/>
        <div className="content">
          <h1 className="tagline">Working Together</h1>
          <button className="startbutton" onClick={this.handleStartClick}>Get Started</button>
        </div>
      </div>
    );
  }

});

module.exports = SplashPage;
