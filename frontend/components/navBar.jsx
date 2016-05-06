var React = require('react');
var NavBarAuth = require('./navBarAuth');
var ProjectSelector = require('./project/projectSelector');
var CurrentUserState = require('../mixins/currentUserState');
var hashHistory = require('react-router').hashHistory;

var NavBar = React.createClass({
  toSplashPage: function(){
    hashHistory.push('/');
  },

  projectSelector: function(){
    if (!$.isEmptyObject(this.state.currentUser)){
        return <ProjectSelector user={this.state.currentUser} />;
    }
  },

  mixins: [CurrentUserState],

  // <img src="/assets/logo.png" title="home" />
  render: function() {
    return (
      <div className="navbar group">
        <div className="logo group" onClick={this.toSplashPage}>
        </div>
        {this.projectSelector()}
        <NavBarAuth ref="auth" />
      </div>
    );
  }

});

module.exports = NavBar;
