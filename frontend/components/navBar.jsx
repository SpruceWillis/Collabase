var React = require('react');
var NavBarAuth = require('./navBarAuth');

var NavBar = React.createClass({
  render: function() {
    return (
      <div className="navbar group">
        <div className="logo group" >
          <img src="https://placekitten.com/80/30" />
          
        </div>
        <NavBarAuth />
      </div>
    );
  }

});

module.exports = NavBar;
