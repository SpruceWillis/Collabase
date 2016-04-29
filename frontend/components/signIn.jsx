var React = require('react');
var SessionActions = require('../actions/sessionActions');

var SignIn = React.createClass({

  getInitialState: function() {
    return {
      email: "",
      password: "",
      errors: []
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

  errors: function(){
    if (this.state.errors.length > 0){
      return (
        <ul>
          {this.state.errors.map(function(error){
            return <li key="error" className="signinerror">{error}</li>
          })}
        </ul>
      );
    }
  },

  guestLogin: function(e){
    e.preventDefault();
    SessionActions.getUser({email: "guest@guest.com", password:"password"}, "/api/session");
  },

  componentWillReceiveProps: function(nextProps) {

    this.setState({errors: nextProps.errors})
  },

  render: function() {
    return (
      <div className="authmodal">
        {this.errors()}
        <form id="signinform" onSubmit={this.handleSubmit} className="authmodal-form">
          <input type="text" onInput={this.linkState} id="email" placeholder="Email" value={this.state.email}></input>
          <input type="password" onInput={this.linkState} id="password" placeholder="Password" value={this.state.password}></input>
        </form>
        <button type="submit" value="Sign In"></button>
        <button onClick={this.guestLogin} type="button" value="Guest Login"></button>
        <div className="authmodal-footer">Don't have an account?
          <a onClick={this.props.toggle}>Sign Up</a>
        </div>
      </div>
    );
  }

});

module.exports = SignIn;
