var UserStore = require('../stores/userStore');
var UserActions = require('../actions/userActions');

module.exports = {

  getInitialState: function(){
    return {
      currentUsers: UserStore.currentUsers(),
      projectErrors: UserStore.errors()
    };
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this.update);
  },

  componentWillUnmount: function() {
    this.userListener.remove();
  },

  update: function(){
    this.setState({
      currentUsers: UserStore.currentUsers(),
      projectErrors: UserStore.errors()
    });
  }

};
