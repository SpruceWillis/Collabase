var SessionStore = require('../stores/sessionStore');
var SessionActions = require('../actions/sessionActions');
var history = require('react-router').hashHistory;

var CurrentUserState = {

	getInitialState: function(){
		return {
			currentUser: SessionStore.currentUser(),
			userErrors: SessionStore.errors()
		};
	},

	componentDidMount: function(){
		this.sessionListener = SessionStore.addListener(this.updateUser);
		if (Object.keys(SessionStore.currentUser()).length === 0) {
			SessionActions.fetchCurrentUser();
		}
	},
	updateUser: function(){
		this.setState({
			currentUser: SessionStore.currentUser(),
			userErrors: SessionStore.errors()
		});
	},

	componentWillUnmount: function() {
		this.sessionListener.remove();
	},

	redirectUnlessLoggedIn: function(){
		if (Object.keys(SessionStore.currentUser()).length === 0){
			alert("You do not have permission to view this page");
			history.push("/");
		}
	}

};

module.exports = CurrentUserState;
