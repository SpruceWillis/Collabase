var React = require('react');
var NavBar = require('./navBar');
var CurrentUserState = require('../mixins/currentUserState');
var SplashPage = React.createClass({

  mixins: [CurrentUserState],

  handleStartClick: function(e){
    if (this.hasUser()){
      this.refs["nav"].refs["auth"].redirectLogin(this.state.currentUser);
    } else{
      this.refs["nav"].refs["auth"].openSignInModal(e);
    }
  },

  hasUser: function(){
    return !($.isEmptyObject(this.state.currentUser));
  },

  render: function() {
    return (
      <div>
        <img src="https://placekitten.com/1400/1200"
          className="bg"/>
        <NavBar ref="nav"/>
        <div className="content">
          <h1 className="tagline">Working Together</h1>
          <button className="startbutton"
            onClick={this.handleStartClick}>Get Started</button>
        </div>
      </div>
    );
  }

});

module.exports = SplashPage;
