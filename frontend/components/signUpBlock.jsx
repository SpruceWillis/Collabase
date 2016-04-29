var React = require('react');
var SessionActions = require('../actions/sessionActions');
var SessionStore = require('../stores/sessionStore');

module.exports = React.createClass({
  getInitialState: function(){
    return {name: "", email: "", organization: "", password: "", errors: []};
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

  errors: function(){
    if (this.state.errors.length > 0){
      return (
        <ul>
          {this.state.errors.map(function(error){
            return <li key={error}>{error}</li>
          })}
        </ul>
      );
    }
  },

  componentWillReceiveProps: function(nextProps) {

    this.setState({errors: nextProps.errors})
  },

  form: function(){
    return (
      <div className="authmodal">
        {this.errors()}
        <form onSubmit={this.handleSubmit} className="authmodal-form">
            <input type="text" onInput={this.linkState} id="name" placeholder="Name" value={this.state.name}></input>
            <input type="email" onInput={this.linkState} id="email" placeholder="Email" value={this.state.email}></input>
            <input type="text" onInput={this.linkState} id="organization" placeholder="Company/Organization" value={this.state.organization}></input>
            <input type="password" onInput={this.linkState} id="password" placeholder="Password" value={this.state.password}></input>
          <input type="submit" value="Sign Up"></input>
        </form>
        <div className="authmodal-footer">Already have an account?
          <a onClick={this.props.toggle} >Sign In</a>
        </div>
      </div>
    )
  },

  render: function() {
    return (
        this.form()
    );
  }

});
