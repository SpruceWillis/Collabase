var React = require('react');
var SignUpBlock = require('./signUpBlock');
var CurrentUserState = require('../mixins/currentUserState');
var SessionActions = require('../actions/sessionActions');
var ProjectActions = require('../actions/projectActions');
var SignIn = require('../components/signIn');
var Modal = require("react-modal");
var history = require('react-router').hashHistory;

var style = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(0, 0, 0, 0.75)',
    "zindex"         : 10
  },
  content : {
    position        : 'fixed',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top             : '25%',
    left            : '37.5%',
    // right           : '375px',
    // bottom          : '125px',
    maxHeight: '400px',
    minWidth: '350px',
    maxWidth: '400px',
    border          : '1px solid #ccc',
    padding         : '20px',
    "zindex"         : 11
  }
};

var NavBar = React.createClass({

  mixins: [CurrentUserState],

  getInitialState: function(){
    return {modalOpen: false};
  },

  hasUser: function(){
    return !($.isEmptyObject(this.state.currentUser));
  },

  openSignInModal: function(e){
    e.preventDefault();
    this.setState({modalOpen: true, type: "signIn"});
  },

  openSignUpModal: function(e){
    e.preventDefault();
    this.setState({modalOpen: true, type: "signUp"});
  },

  toggleModalType: function(e){
    e.preventDefault();
    if (this.state.type === "signIn"){
      this.setState({type: "signUp"});
    } else {
      this.setState({type: "signIn"});
    }
  },

  closeModal: function(){
    this.setState({modalOpen: false});
  },

  logout: function(e){
    e.preventDefault();
    SessionActions.logout();
    history.push("/");
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (!$.isEmptyObject(nextState.currentUser) && !this.hasUser()
      && this.state.modalOpen) {
      this.closeModal();
      this.redirectLogin(nextState.currentUser);
    }
  },

  redirectLogin: function(user){
    if (user.projects.length === 0){
      history.push('/projects/new');
      alert ("You don't have any projects!");
    } else {
      history.push("/users/" + user.id + "/projects/" + user.projects[0].id);
    }
  },

  greeting: function(){
    if (this.hasUser()){
      return (<div>
          <div className="greeting">
            Logged in as {this.state.currentUser.name}
          </div>
          <button className="greeting" onClick={this.logout}>Log out</button>
      </div>);
    } else {
      return (<div>
        <button className="greeting" onClick={this.openSignInModal} >Sign In</button>
        <button className="greeting" onClick={this.openSignUpModal} >Sign Up</button>
      </div>);
    }
  },

  errors: function(){
    if (this.state.userErrors.length === 0){
      return;
    }
    var self = this;
		return (<ul>
		{
			Object.keys(this.state.userErrors).map(function(key, i){
				return (<li key={i}>{self.state.userErrors[key]}</li>);
			})
		}
		</ul>);
  },

  form: function(){
    if (this.hasUser()){
      return;
    } else if (this.state.type === "signIn"){
      return <SignIn close={this.closeModal} errors={this.state.userErrors}
        toggle={this.toggleModalType}/>;
    } else if (this.state.type === "signUp"){
      return <SignUpBlock close={this.closeModal}
        errors={this.state.userErrors} toggle={this.toggleModalType}/>;
    }
  },

  render: function() {
    return (
      <div className="navbar-auth group">
        {this.greeting()}
        <Modal isOpen={this.state.modalOpen && !this.hasUser()}
          type={this.state.type} onRequestClose={this.closeModal} style={style}>
          {this.form()}
        </Modal>
      </div>
    );
  }

});



module.exports = NavBar;
