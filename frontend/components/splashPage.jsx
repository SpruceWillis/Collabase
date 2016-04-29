var React = require('react');
var NavBar = require('./navBar');

var SplashPage = React.createClass({

  render: function() {
    return (
      <div>
        < NavBar />
      <h1>collaBase: where teamwork goes to die</h1>
      </div>
    );
  }

});

module.exports = SplashPage;
