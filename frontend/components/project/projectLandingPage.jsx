var React = require('react');
var NavBar = require('../navBar');

var ProjectLandingPage = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        <div>This is a landing page</div>
      </div>
    );
  }

});

module.exports = ProjectLandingPage;
