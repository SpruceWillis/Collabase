var React = require('react');
var SignUpBlock = require('./signUpBlock');
var CurrentUserState = require('../mixins/currentUserState');
var SessionActions = require('../actions/sessionActions');
var SignIn = require('../components/signIn')
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
    flexdirection: "column",
    alignitems: "center",
    justifycontent: "center",
    top             : '125px',
    left            : '375px',
    right           : '375px',
    bottom          : '125px',
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
    this.setState({modalOpen: true, type: "signUp"})
  },

  toggleModalType: function(e){
    e.preventDefault();
    if (this.state.type === "signIn"){
      this.setState({type: "signUp"});
    } else {
      this.setState({type: "signIn"})
    }
  },

  closeModal: function(){
    this.setState({modalOpen: false});

  },

  logout: function(e){
    e.preventDefault();
    SessionActions.logout();
  },

  componentWillUpdate: function() {
    if (this.hasUser() && this.state.modalOpen) {
      this.closeModal();

    }
  },

  greeting: function(){
    if (this.hasUser()){
      return (<div>
          <div className="greeting">Logged in as {this.state.currentUser.name}</div>
          <button onClick={this.logout}>Log out</button>
      </div>)
    } else {
      return (<div>
        <button onClick={this.openSignInModal} >Sign In</button>
        <button onClick={this.openSignUpModal} >Sign Up</button>
      </div>)
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
      return <SignIn close={this.closeModal} errors={this.state.userErrors} toggle={this.toggleModalType}/>
    } else if (this.state.type === "signUp"){
      return <SignUpBlock close={this.closeModal} errors={this.state.userErrors} toggle={this.toggleModalType}/>
    }
  },

  render: function() {
    return (
      <div className="navbar-auth group">
        {this.greeting()}
        <Modal isOpen={this.state.modalOpen && !this.hasUser()} type={this.state.type}
          onRequestClose={this.closeModal} style={style}>
          {this.form()}
        </Modal>
      </div>
    );
  }

});



module.exports = NavBar;
