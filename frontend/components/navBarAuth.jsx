var React = require('react');
var SignUpBlock = require('./signUpBlock');
var CurrentUserState = require('../mixins/currentUserState');
var SessionActions = require('../actions/sessionActions');
var SignIn = require('../components/signIn')
var Modal = require("react-modal");

var style = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
    "zindex"         : 10
  },
  content : {
    position        : 'fixed',
    top             : '100px',
    left            : '150px',
    right           : '150px',
    bottom          : '100px',
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

  openModal: function(e){
    this.setState({modalOpen: true, type: e.target.value});
  },

  closeModal: function(){
    this.setState({modalOpen: false});
  },

  logout: function(e){
    e.preventDefault();
    SessionActions.logout();
  },

  componentWillUpdate: function() {
    if (this.hasUser() && this.state.modalOpen) this.closeModal();
  },

  greeting: function(){
    if (this.hasUser()){
      return (<div>
          <label>Logged in as {this.state.currentUser.name}</label>
          <button onClick={this.logout}>Log out</button>
      </div>)
    } else {
      return (<div>
        <button onClick={this.openModal} value="signin">Sign In</button>
        <button onClick={this.openModal} value="signup">Sign Up</button>
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
    } else if (this.state.type === "signin"){
      return <SignIn close={this.closeModal} errors={this.state.userErrors}/>
    } else if (this.state.type === "signup"){
      return <SignUpBlock close={this.closeModal} />
    }
  },

  render: function() {
    return (
      <div>
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
