var React = require('react');
var NavBar = require('./navBar');

var SplashPage = React.createClass({

  render: function() {
    return (
      <div>
        < NavBar />
      </div>
    );
  }

});

module.exports = SplashPage;
