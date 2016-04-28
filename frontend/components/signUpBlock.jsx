var React = require('react');
var SessionActions = require('../actions/sessionActions');
var SessionStore = require('../stores/sessionStore');

module.exports = React.createClass({
  getInitialState: function(){
    return {name: "", email: "", organization: "", password: ""};
  },

  handleSubmit: function(e){
    e.preventDefault();
    SessionActions.getUser(this.state, "/api/users");
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
          <input type="text" onInput={this.linkState} id="name" placeholder="Name" value={this.state.name}></input>
          <input type="email" onInput={this.linkState} id="email" placeholder="Email" value={this.state.email}></input>
          <input type="text" onInput={this.linkState} id="organization" placeholder="Company/Organization" value={this.state.organization}></input>
          <input type="password" onInput={this.linkState} id="password" placeholder="Password" value={this.state.password}></input>
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
