var React = require('react');
var NavBarAuth = require('./navBarAuth');

var NavBar = React.createClass({



  render: function() {
    return (
      <div className="navbar">
        <NavBarAuth />
      </div>
    );
  }

});

module.exports = NavBar;
