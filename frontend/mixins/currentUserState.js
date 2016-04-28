var SessionStore = require('../stores/sessionStore');
var SessionActions = require('../actions/sessionActions');

var CurrentUserState = {

	getInitialState: function(){
		return {
			currentUser: SessionStore.currentUser(),
			userErrors: SessionStore.errors()
		};
	},
	componentDidMount: function(){
		SessionStore.addListener(this.updateUser);
		if (typeof SessionStore.currentUser() === 'undefined') {
			SessionActions.fetchCurrentUser();
		}
	},
	updateUser: function(){
		this.setState({
			currentUser: SessionStore.currentUser(),
			userErrors: SessionStore.errors()
		});
	}

};

module.exports = CurrentUserState;
