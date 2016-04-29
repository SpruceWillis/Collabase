var React = require('react');
var NavBarAuth = require('./navBarAuth');
var hashHistory = require('react-router').hashHistory;

var NavBar = React.createClass({
  toSplashPage: function(){
    hashHistory.push('/');
  },
  render: function() {
    return (
      <div className="navbar group">
        <div className="logo group" onClick={this.toSplashPage}>
          <img src="https://placekitten.com/80/30"  />
        </div>
        <NavBarAuth />
      </div>
    );
  }

});

module.exports = NavBar;
