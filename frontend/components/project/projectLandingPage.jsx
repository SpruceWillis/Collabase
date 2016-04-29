var React = require('react');
var NavBar = require('../navBar');

var ProjectLandingPage = React.createClass({
  render: function() {
    return (
      <div>
        <div>This is a landing page</div>
        <NavBar />
      </div>
    );
  }

});

module.exports = ProjectLandingPage;
