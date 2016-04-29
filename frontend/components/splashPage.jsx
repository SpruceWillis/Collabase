var React = require('react');
var NavBar = require('./navBar');

var SplashPage = React.createClass({

  render: function() {
    return (
      <div className="">
        <img src="https://placekitten.com/1400/1200" className="bg"/>
        <NavBar />

      </div>
    );
  }

});

module.exports = SplashPage;
