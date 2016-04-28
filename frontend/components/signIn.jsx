var React = require('react');
var SessionActions = require('../actions/sessionActions');

var SignIn = React.createClass({

  getInitialState: function() {
    return {
      email: "",
      password: ""
    };
  },

  linkState: function(e){
    var newState = {};
    newState[e.target.id] = e.target.value
    this.setState(newState);
  },

  handleSubmit: function(e){
    e.preventDefault();
    SessionActions.getUser(this.state, "/api/session");
    this.setState({password: ""});
  },

  render: function() {
    return (
      <div >
        <div>Sign In</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onInput={this.linkState} id="email" placeholder="Email" value={this.state.email}></input>
          <input type="password" onInput={this.linkState} id="password" placeholder="Password" value={this.state.password}></input>
          <input type="submit" value="Sign In"></input>
        </form>
      </div>
    );
  }

});

module.exports = SignIn;
