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
        <img src="http://res.cloudinary.com/dkskiosh7/image/upload/v1466120157/Splash_Background_qa5bzf.jpg"
          className="bg"/>
        <NavBar ref="nav" transparent={true}/>
        <div className="content">
          <h1 className="tagline">Teamwork Simplified</h1>
          <button className="startbutton"
            onClick={this.handleStartClick}>Get Started</button>
        </div>
      </div>
    );
  }

});

module.exports = SplashPage;
