var SessionStore = require('../stores/sessionStore');
var SessionActions = require('../actions/sessionActions');

var CurrentUserState = {

	getInitialState: function(){
		var currentUser = localStorage.getItem('currentUser') || SessionStore.currentUser();
		return {
			currentUser: SessionStore.currentUser(),
			userErrors: SessionStore.errors()
		};
	},
	componentDidMount: function(){

		SessionStore.addListener(this.updateUser);
		if (Object.keys(SessionStore.currentUser()).length === 0) {
			SessionActions.fetchCurrentUser();
		}
	},
	updateUser: function(){
		localStorage.setItem('currentUser', SessionStore.currentUser());
		this.setState({
			currentUser: SessionStore.currentUser(),
			userErrors: SessionStore.errors()
		});
	}

};

module.exports = CurrentUserState;
