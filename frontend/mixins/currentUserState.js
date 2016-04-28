var SessionStore = require('../stores/sessionStore');
var SessionActions = require('../actions/sessionActions');

var CurrentUserState = {

	getInitialState: function(){
		var currentUser =  SessionStore.currentUser();
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
		// localStorage.setItem('currentUser', SessionStore.currentUser());
		this.setState({
			currentUser: SessionStore.currentUser(),
			userErrors: SessionStore.errors()
		});
	},

	componentWillUnmount: function() {
		this.sessionListener.remove();
	},

};

module.exports = CurrentUserState;
