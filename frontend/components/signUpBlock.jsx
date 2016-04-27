var React = require('react');
var SessionActions = require('../actions/sessionActions');
var SessionStore = require('../stores/sessionStore');

module.exports = React.createClass({
  getInitialState: function(){
    return {name: "", email: "", organization: "", password: ""};
  },

  handleSubmit: function(e){
    e.preventDefault();
    SessionActions.createUser(this.state);
    this.setState({name: "", email: "", organization: "", password: ""});
  },

  linkState: function(e){
    var newState = {};
    newState[e.target.id] = e.target.value
    this.setState(newState);
  },

  form: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Name
          <input type="text" onInput={this.linkState} id="name" value={this.state.name}></input>
        </label>
        <label>Email
          <input type="email" onInput={this.linkState} id="email" value={this.state.email}></input>
        </label>
        <label>Company Organization
          <input type="text" onInput={this.linkState} id="organization" value={this.state.organization}></input>
        </label>
        <label>Password
          <input type="password" onInput={this.linkState} id="password" value={this.state.password}></input>
        </label>
        <input type="submit" value="Sign Up"></input>
      </form>
    )
  },

  render: function() {
    return (
      <div>
        {this.form()}
      </div>
    );
  }

});
